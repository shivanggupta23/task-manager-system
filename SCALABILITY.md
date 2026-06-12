# Scalability Notes — Future Improvements

This document explains how this Task Manager project can be scaled up in the future.
These are ideas for after the basic version is working.

---

## 1. Adding Redis Caching

Right now, every API request hits MongoDB directly. If there are thousands of users
making requests at the same time, the database will slow down.

**What is Redis?**  
Redis is an in-memory key-value store. It stores data in RAM, so reads are much faster
than reading from MongoDB.

**How to add it:**

1. Install Redis on your server and install the npm package:
   ```
   npm install redis
   ```

2. Create a `config/redis.js` file:
   ```js
   const redis = require('redis');
   const client = redis.createClient({ url: 'redis://localhost:6379' });
   client.connect();
   module.exports = client;
   ```

3. In `taskController.js`, before querying MongoDB, check Redis first:
   ```js
   const cached = await redisClient.get(`tasks:${userId}`);
   if (cached) return res.json(JSON.parse(cached));

   // If not in cache, get from MongoDB
   const tasks = await Task.find({ user: userId });

   // Save to cache for 60 seconds
   await redisClient.setEx(`tasks:${userId}`, 60, JSON.stringify(tasks));
   ```

4. When a task is created, updated, or deleted — clear the cache:
   ```js
   await redisClient.del(`tasks:${userId}`);
   ```

**Good for:** Caching task lists, user profiles, and frequently read data.

---

## 2. Adding Load Balancing

Right now, we run only one Node.js server. If too many users connect at once, the
server becomes slow or crashes.

**What is Load Balancing?**  
A load balancer sits in front of multiple server instances and distributes incoming
requests across them so no single server gets overloaded.

**Simple way using Node.js cluster module:**
```js
// In server.js
const cluster = require('cluster');
const os = require('os');

if (cluster.isPrimary) {
  const numCPUs = os.cpus().length;
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork(); // Start one worker per CPU core
  }
} else {
  // Each worker runs the Express app
  app.listen(PORT);
}
```

**Better way using Nginx (production):**
- Run multiple Node.js processes on ports 5001, 5002, 5003
- Configure Nginx as a reverse proxy and load balancer:
  ```nginx
  upstream taskapi {
    server localhost:5001;
    server localhost:5002;
    server localhost:5003;
  }

  server {
    location /api/ {
      proxy_pass http://taskapi;
    }
  }
  ```

**Good for:** High traffic applications with many concurrent users.

---

## 3. Splitting into Microservices

Right now, everything is in one backend (a monolith). As the app grows, it can be split
into separate independent services.

**Current monolith:**
```
backend/
  └── Everything in one app (auth, tasks, users)
```

**Microservices architecture:**
```
auth-service/      → Handles register, login, JWT (port 5001)
task-service/      → Handles task CRUD (port 5002)
user-service/      → Handles user management (port 5003)
api-gateway/       → Single entry point, routes requests (port 5000)
```

**How it would work:**
- Each service has its own Express app and its own MongoDB collection (or database)
- The API Gateway receives all requests and forwards them to the right service
- Services communicate with each other via HTTP or a message queue (like RabbitMQ)

**Steps to migrate:**
1. Start by separating auth into its own folder with its own `server.js`
2. Move task routes and controllers to a separate service
3. Build an API gateway using `http-proxy-middleware`
4. Deploy each service independently (e.g., using Docker containers)

**Tools commonly used:**
- Docker + Docker Compose (to run each service in a container)
- Kubernetes (to manage many containers at scale)
- RabbitMQ or Kafka (for communication between services)

---

## Summary Table

| Feature | When to add | Benefit |
|---------|------------|---------|
| Redis Caching | 1000+ daily users | Faster reads, less DB load |
| Load Balancing | High traffic, server overload | Distribute load, more uptime |
| Microservices | Large team, large codebase | Independent deployment, better scaling |

> Note: Don't add these too early. Start simple, measure the problem, then solve it.
> This is called "premature optimization is the root of all evil" — only optimize when you need to.
