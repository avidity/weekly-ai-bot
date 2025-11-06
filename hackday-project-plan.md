# 🚀 Hackday Project Plan: “What Did We Even Do This Week?” Bot

## 🧠 Overview

Build an AI-powered GitHub summary bot that reads Pull Requests and related tasks, generates human-friendly summaries, and posts them automatically to Slack.

---

## 🎯 Core Goal

Given a task number and a PR link, the bot will:

1. **Connect to GitHub**
2. **Fetch task details** (from the project board)
3. **Read PR description, commits, and file changes**
4. **Use Gemini to summarize activity**
5. **Post summary to Slack**

> **Focus:** 2-day hackathon for experimentation, automation, and maximizing AI usage.

---

## 🧩 Tech Stack

| Purpose         | Technology                  |
|-----------------|----------------------------|
| Runtime         | Node.js (v20+)             |
| AI Model        | Gemini API / CLI           |
| Source Control  | GitHub REST API            |
| Notifications   | Slack Webhook              |
| Containerization| Docker + Docker Compose    |
| Task Runner     | npm scripts / optional cron|
| Language        | JavaScript (optionally TS) |

---

## 📁 Repository Structure

```
/github-weekly-ai-bot
├── src/
│   ├── index.js          # Entry point
│   ├── github/
│   │   ├── client.js     # GitHub API logic
│   │   └── parser.js     # PR + commit parsing
│   ├── ai/
│   │   └── summarizer.js # Gemini summarization logic
│   ├── slack/
│   │   └── notifier.js   # Slack message sender
│   ├── config/
│   │   └── env.js        # Environment loader
│   └── utils/
│       └── logger.js     # Simple console logger
├── .env.example
├── docker-compose.yml
├── Dockerfile
├── package.json
└── README.md
```

---

## ⚙️ Setup Steps

1. **Create Repo**
    - Create GitHub repo: `github-weekly-ai-bot`
    - Clone locally, run `npm init -y`
    - Add `.gitignore` (Node template), commit

2. **Environment Variables (`.env`)**
    ```
    GITHUB_TOKEN=<your_token_here>
    SLACK_WEBHOOK_URL=<slack_webhook_here>
    GEMINI_API_KEY=<gemini_api_key_here>
    ```

3. **Install Dependencies**
    ```sh
    npm install axios dotenv @google/generative-ai
    npm install --save-dev nodemon
    ```

---

## 🐳 Docker Setup

**Dockerfile**
```dockerfile
FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "start"]
```

**docker-compose.yml**
```yaml
version: "3.9"
services:
  github-weekly-ai-bot:
     build: .
     container_name: github-weekly-ai-bot
     env_file:
        - .env
     volumes:
        - .:/app
     command: npm run dev
```

**package.json scripts**
```json
"scripts": {
  "dev": "nodemon src/index.js",
  "start": "node src/index.js"
}
```

---

## 🧠 Workflow Logic

**Input:**
```sh
node src/index.js --task <task_number> --pr <github_pr_url>
```

**Flow:**
1. Parse PR URL → extract org/repo + PR number
2. Fetch PR details, commits, and changed files from GitHub API
3. Fetch related task details from the project board (if available)
4. Feed all data to Gemini with a summarization prompt
5. Receive a human-readable summary (technical or executive tone)
6. Post summary to Slack via webhook

---

## 🔌 GitHub Integration

- **Endpoints:**
  - `GET /repos/{owner}/{repo}/pulls/{pull_number}`
  - `GET /repos/{owner}/{repo}/pulls/{pull_number}/commits`
  - `GET /repos/{owner}/{repo}/pulls/{pull_number}/files`
  - `GET /issues/{issue_number}` or project card details (for the task)

- **Authentication:**
  ```js
  headers: {
     Authorization: `token ${process.env.GITHUB_TOKEN}`,
     'User-Agent': 'github-weekly-ai-bot'
  }
  ```

---

## 🤖 AI Summarization (Gemini)

**Prompt Template:**
> “You are an AI assistant that summarizes GitHub development activity into a concise, human-friendly update.
> Given the task description, PR title, commits, and file changes, write a short report describing what was achieved, the main areas changed, and any notable technical aspects.”

**Input JSON Example:**
```json
{
  "task": "Improve authentication flow",
  "pr_description": "Refactor login logic and fix token expiration bug.",
  "commits": ["Add JWT helper", "Refactor login route", "Fix token refresh issue"],
  "files_changed": ["auth.js", "routes/login.js", "tests/auth.test.js"]
}
```

**Expected Output:**
> This week’s update: the authentication flow was refactored for cleaner token management and better reliability. A new JWT helper was added and login routes were simplified. Test coverage improved for edge cases like token refresh.

---

## 💬 Slack Integration

- Use Webhook or Bot token.
- **Basic webhook example:**
  ```sh
  curl -X POST -H "Content-Type: application/json" \
     --data '{"text":"Weekly Summary: Auth flow refactor complete 🚀"}' \
     $SLACK_WEBHOOK_URL
  ```
- Format with Markdown blocks or emojis for clarity.

---

## ⚡ AI-Assisted Development Workflow

**Let AI help you build and debug:**

- **Repo setup:** Ask Gemini/ChatGPT to scaffold project structure, Dockerfile, compose file.
- **Feature coding:** Generate modules by prompting:
  > “Write a Node.js module that fetches PR details using GitHub REST API with axios.”
- **Prompt tuning:** Ask AI to improve summarization prompt tone.
- **Documentation:** Let AI generate comments and README sections.
- **Debugging:** Paste stack traces and ask AI to fix/refactor code.
- **Mock data:** Generate fake PR payloads for testing.
- **Slack messages:** Ask AI to design Slack message JSON blocks.
- **Demo pitch:** Before presentation, ask Gemini:
  > “Write a 30-second hackathon pitch explaining this project.”

> **Principle:** Treat AI as your third teammate — it writes boilerplate, explains errors, and generates docs while you focus on integration and testing.

---

## 🧾 Stretch Goals

- Summarize multiple PRs at once (weekly digest)
- Add cron job to run weekly automatically
- Tone selector (“client-friendly”, “technical”, “fun mode”)
- Chart integration (commits per week via quickchart.io)
- Optional web dashboard

---

## 📅 Suggested Schedule

| Time             | Goal                                   |
|------------------|----------------------------------------|
| Day 1 Morning    | Repo, Docker, env setup                |
| Day 1 Afternoon  | GitHub API integration + mock data test|
| Day 2 Morning    | Gemini summarization integration       |
| Day 2 Afternoon  | Slack integration + polish + demo prep |

---

## 🧩 Demo Script (for final presentation)

**Input:**
```sh
node src/index.js --task 312 --pr https://github.com/acme/app/pull/56
```

**Process:**
1. Fetch GitHub data
2. Summarize via Gemini
3. Post summary to Slack

**Output (Slack):**
> PR #56 merged 🎉 Auth flow refactor complete, improved login handling and token refresh reliability. Two minor tasks remain (unit tests, cache cleanup).

That’s your “what did we even do this week?” moment.
