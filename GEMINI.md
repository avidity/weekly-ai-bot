# 🤖 Gemini Instructions — GitHub Weekly AI Bot

## 📌 Project Summary

This repository implements a bot that automates weekly progress updates by:

1. Accepting a task number and PR link.
2. Fetching task details from a GitHub project board.
3. Gathering PR metadata, commits, and file changes.
4. Summarizing the changes using **Gemini AI**.
5. Posting the summary to Slack via webhook.

**Goal:** Provide automated, natural-language updates for weekly progress.

---

## 🧩 Tech Stack

| Area       | Tool                |
|------------|---------------------|
| Runtime    | Node.js 20+         |
| AI Engine  | Gemini API / CLI    |
| SCM        | GitHub REST API     |
| Messaging  | Slack Webhook       |
| Deployment | Docker + Compose    |

---

## 🤝 Gemini’s Role

You are assisting two developers building this bot.
**Principles:**

- Generate modular, readable JS (use ESM or CommonJS consistently).
- Use the existing structure under `/src/`.
- Always read `README.md` before coding.
- Comment briefly **what** and **why** (not just **how**).
- When unsure about API shapes, generate mock responses under `/src/test-data/`.

---

## 📁 Folder Structure

```
src/
    github/   # GitHub API clients and parsers
    ai/       # Gemini prompt and summarizer logic
    slack/    # Slack webhook integration
    config/   # Environment and constants
    utils/    # Logging, helpers
```

---

## ⚙️ Conventions

- Use `async/await` for all I/O.
- Centralize tokens in `.env`.
- Prefer named exports.
- Lint style:
    ```json
    {
        "semi": false,
        "singleQuote": true,
        "tabWidth": 2
    }
    ```
- Commit messages use [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`, `chore:`).

---

## 🧠 Prompt Examples

**Create a new module:**
```bash
gemini code --file src/github/client.js --prompt "Implement a GitHub API client that fetches PR details by URL using axios and a GITHUB_TOKEN env var"
```

**Summarize logic:**
```bash
gemini explain --file src/ai/summarizer.js
```

**Refactor for clarity:**
```bash
gemini code --file src/slack/notifier.js --prompt "Refactor for clarity and add error handling"
```

---

## 🔒 Boundaries

- Never expose API tokens or secrets in code.
- Do not install new dependencies without checking `package.json`.
- Avoid large or blocking network requests in tests.
- Use mock data for AI prompts when possible.

---

## 🚧 Current TODOs

- Build GitHub client (fetch PR details)
- Implement Gemini summarizer logic
- Add Slack notification module
- Create integration test for full flow

---

## 🧭 Output Goals

Each PR processed should yield:

```json
{
    "task": 123,
    "pr": "https://github.com/org/project/pull/99",
    "summary": "Added caching layer and improved login speed by 30%",
    "filesChanged": 5,
    "commits": 3
}
```

This summary will be posted to Slack and optionally logged locally.

---

## 👥 Maintainers

- Henrique Tegel
- Marina Melo

_Hackday 2025 — AI Automation Theme_
