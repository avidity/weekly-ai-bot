# 🧠 “What Did We Even Do This Week?” Bot

**AI-powered GitHub + Slack summarizer for project updates**

---

## 🚀 Overview

This bot connects to GitHub, reads Pull Requests and related tasks, and uses Gemini AI to generate short, human-friendly summaries of what changed — then automatically posts the result to Slack.

Perfect for weekly updates, client meeting prep, or just keeping track of progress without digging through commits.

---

## 🧩 Features

- 🔍 Fetch PRs, commits, and file changes from a repository within a given period
- 🧠 Summarize using Gemini AI (via API or CLI)
- 💬 Post result to Slack automatically
- 🧰 Run locally, in Docker, or via GitHub Actions
- ⚙️ Accepts a repository URL and an optional period in days (defaults to 7)

---

## ⚙️ Setup

1. **Clone the repo**
    ```sh
    git clone https://github.com/avidity/weekly-ai-bot.git
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

Run the bot with a repository URL and an optional period in days:

```sh
node src/index.js --repo https://github.com/acme/project --period 7
```

**Example output:**
> ✨ Summary ready!
> "This week, 5 PRs were merged and 2 are still open. The new features include a revamped authentication flow and improved dashboard layout. Several bugs were fixed, including a critical one related to caching. The team also refactored the logging mechanism for better performance."

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

- Add cron job for weekly automation
- Different tones (“client-friendly”, “technical”, “fun”)
- Charts for commit/PR stats (QuickChart API)
- Simple web dashboard or Slack slash command

---

## 🎤 Demo Script

**Command:**
```sh
node src/index.js --repo https://github.com/acme/app --period 7
```

**Flow:**
1. Fetch PRs from the last 7 days from GitHub
2. Summarize using Gemini
3. Post result to Slack

**Output Example:**
> Weekly Summary 🎉 — 3 PRs merged, 1 open. Key updates include the new caching layer which improves API speed by 30%, and a fix for the authentication flow. Two edge cases are pending for the next sprint.

---

## 👥 Team

**Henrique Tegel & Marina Melo**
_Pairing for Hackday 2025 — AI Theme_
