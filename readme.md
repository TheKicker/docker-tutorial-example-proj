# 🐳 Docker Tutorial Example Project

Welcome! This guide walks you through how to run a Node.js app inside a Docker container, step-by-step, even if you're brand new to Docker.

🎯 **Example project:** [https://github.com/TheKicker/docker-tutorial-example-proj](https://github.com/TheKicker/docker-tutorial-example-proj)

---

## 🐳 What is Docker?

**Docker** is a tool that lets you package up your code and everything it needs to run — like Node.js, dependencies, and system settings — into a container.

Think of a **container** like a self-contained box: it’ll run the same way on your computer, a friend’s laptop, or a cloud server. No more “it works on my machine” excuses.

---

## ⚖️ Docker vs Virtual Machines

| Feature            | Docker                            | Virtual Machine (VM)                 |
| ------------------ | --------------------------------- | ------------------------------------ |
| **Speed**          | Starts in seconds                 | Takes minutes                        |
| **Size**           | Lightweight (MBs)                 | Heavy (GBs)                          |
| **Resources Used** | Shares your OS kernel             | Needs full OS per VM                 |
| **Isolation**      | App-level isolation               | Full system isolation                |
| **Best For**       | Developers and apps in containers | Running different OSs or full setups |

💡 **TL;DR:** Docker is faster, lighter, and more developer-friendly than VMs.

---

## 🖥️ How to Install Docker (on Windows)

1. Go to [https://www.docker.com/](https://www.docker.com/)
2. Click **"Get Docker"** and download **Docker Desktop for Windows (AMD64)**.
3. Run the installer and follow the steps.
4. After install, restart your computer if needed.
5. Open **Docker Desktop** and make sure it’s running.

📌 You’ll also want to have **WSL 2** installed — the Docker installer should guide you through it.

---

## 📦 What is a Dockerfile?

A **Dockerfile** is a text file with instructions that tell Docker how to build your app into a container.

Here’s a simple example for a Node.js app:

```Dockerfile
# Uses the official Node.js 14 image
FROM node:14

# Set working directory
WORKDIR /app

# Copy dependencies (includes package and package-lock files)
COPY package*.json .

# Install dependencies for production
RUN npm install --production

# Copy all project files
COPY . .

# Expose port 3000
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
````

🔍 **What it does:**

* Pulls a Node 14 environment
* Copies your code
* Installs `npm` dependencies
* Starts the app on port 3000

---

## 🚀 How to Run Your Project

After installing Docker, open a terminal like PowerShell, then:

### 1. Clone your project

```bash
git clone https://github.com/TheKicker/docker-tutorial-example-proj.git
cd docker-tutorial-example-proj
```

---

### 🛠️ Step 2: Build the Docker Image

```bash
docker build -t my-node-app .
```

Let’s break that down:

| Part             | What it means                                                                                                                                                              |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `docker build`   | Tells Docker: “Let’s build a container image.”                                                                                                                             |
| `-t my-node-app` | The `-t` stands for **tag**, which is basically a **name** or **nickname** for your image. So instead of using a long ID to run it later, you can just type `my-node-app`. |
| `.` (the dot)    | This says: “Use the Dockerfile in **this folder**.”                                                                                                                        |

🔍 **Why this matters:**
Without the `-t` flag, Docker builds your image but doesn’t give it a name — which means you’d have to refer to it by a long weird SHA ID later. With `-t my-node-app`, you're basically saying:

> “Hey Docker, when you’re done building this thing, call it `my-node-app` so I can easily run it later.”

---

### 3. Run the app

```bash
docker run -p 3000:3000 my-node-app
```

Then open your browser and go to:

```
http://localhost:3000
```

---

### 🔍 But wait... what does `-p 3000:3000` mean?

When your app is running **inside the container**, it’s living in its own little world — like a mini-computer inside your computer. Just because it’s running doesn’t mean your main computer can talk to it yet.

🧱 Here's the issue:

* Inside the container, your Node app is listening on **port 3000**.
* But your **actual computer** (the host) doesn't automatically know about that.

🏡 The `-p` flag says:

> “Hey Docker, please open a door between my computer and the container.”

Specifically, `-p 3000:3000` means:

> "Take port **3000** inside the container, and connect it to port **3000** on **my computer**."

So now when you visit:

```
http://localhost:3000
```

Your browser is talking to your **computer’s port 3000**, which is directly connected to the **container’s port 3000**. Magic! ✨

🛑 If you forget the `-p` flag, the app still runs inside the container — but you won’t be able to access it from your browser.

---

## 🧠 Common Docker `run` Flags

| Flag           | What it does                                |
| -------------- | ------------------------------------------- |
| `-p 3000:3000` | Maps port 3000 in the container to your PC  |
| `-d`           | Runs the container in the background        |
| `--name`       | Lets you give the container a name          |
| `-v`           | Mounts a folder as a volume (for live code) |

Example with more flags:

```bash
docker run -d -p 3000:3000 --name dev-app my-node-app
```

---

## 🧹 Useful Commands 

When you’re done, you can clean up your containers and images:

```bash
docker ps            # See running containers on your machine
docker stop <ID>     # Stop a running container
docker rm <ID>       # Remove a stopped container
docker image prune   # Remove unused images (be careful)
```

---
<br>
Happy Dockering! 🐳✨