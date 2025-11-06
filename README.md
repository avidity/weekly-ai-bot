# 🧠 “What Did We Even Do This Week?” Bot

**AI-powered GitHub + Slack summarizer for project updates**

---

## 🚀 Overview

This bot connects to GitHub, reads Pull Requests and related tasks, and uses Gemini AI to generate short, human-friendly summaries of what changed — then automatically posts the result to Slack.

Perfect for weekly updates, client meeting prep, or just keeping track of progress without digging through commits.

---

## 🧩 Features

- 🔍 Fetch PR details, commits, and file changes from GitHub
- 🧠 Summarize using Gemini AI (via API or CLI)
- 💬 Post result to Slack automatically
- 🧰 Run locally, in Docker, or via GitHub Actions
- ⚙️ Accepts task number and PR URL as input

---

## ⚙️ Setup

1. **Clone the repo**
    ```sh
    git clone https://github.com/<your-org>/github-weekly-ai-bot.git
    cd github-weekly-ai-bot
    ```

2. **Install dependencies**
    ```sh
    npm install
    ```

3. **Configure environment**

    Copy `.env.example` to `.env` and fill in:

    ```
    GITHUB_TOKEN=<your_token>
    SLACK_WEBHOOK_URL=<your_slack_webhook>
    GEMINI_API_KEY=<your_gemini_api_key>
    ```

---

## 🐳 Run

- **In Docker**
    ```sh
    docker-compose up --build
    ```

- **Local dev mode**
    ```sh
    npm run dev
    ```

---

## 🧠 Usage

Run the bot with a task number and PR link:

```sh
node src/index.js --task 312 --pr https://github.com/acme/project/pull/45
```

**Example output:**
> ✨ Summary ready!
> "This week, 12 commits and 3 PRs were merged. The new authentication flow was completed, login error handling improved, and dashboard layout refactored for responsiveness. Two caching issues remain open."

The same summary will be automatically posted to your configured Slack channel.

---

## 🔌 Tech Stack

| Layer            | Tool                    |
|------------------|------------------------|
| Runtime          | Node.js (v20+)         |
| AI Engine        | Gemini API / CLI       |
| API Source       | GitHub REST API        |
| Notifications    | Slack Webhook          |
| Containerization | Docker + Compose       |

---

## 📁 Project Structure

```
/github-weekly-ai-bot
├── src/
│   ├── index.js
│   ├── github/
│   │   ├── client.js
│   │   └── parser.js
│   ├── ai/
│   │   └── summarizer.js
│   ├── slack/
│   │   └── notifier.js
│   ├── config/
│   │   └── env.js
│   └── utils/
│       └── logger.js
├── Dockerfile
├── docker-compose.yml
├── .env.example
└── README.md
```

---

## ⚡ AI-Driven Development Workflow

You’re encouraged to use Gemini CLI or ChatGPT during development to:

- Scaffold modules (`github/client.js`, `ai/summarizer.js`, etc.)
- Generate prompt templates
- Create fake PR payloads for testing
- Fix errors and refactor quickly
- Write inline comments and docs
- Prepare your demo pitch

> 💡 Treat the AI like your third teammate. It writes boilerplate, finds bugs, and explains things while you focus on testing and wiring it all together.

---

## 🧾 Stretch Goals

- Support multiple PRs per summary (weekly digest)
- Add cron job for weekly automation
- Different tones (“client-friendly”, “technical”, “fun”)
- Charts for commit/PR stats (QuickChart API)
- Simple web dashboard or Slack slash command

---

## 🎤 Demo Script

**Command:**
```sh
node src/index.js --task 42 --pr https://github.com/acme/app/pull/99
```

**Flow:**
1. Fetch PR + task info from GitHub
2. Summarize using Gemini
3. Post result to Slack

**Output Example:**
> PR #99 merged 🎉 — The new caching layer improves API speed by 30%. Added cache invalidation logic and updated tests. Two edge cases pending next sprint.

---

## 👥 Team

**Henrique Tegel & Marina Melo**
_Pairing for Hackday 2025 — AI Theme_
