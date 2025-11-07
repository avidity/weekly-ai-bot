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

## ✨ Summary Template

This is the universal template for all summaries. It should be used to generate non-technical, outcome-focused updates that are adaptable to any context (e.g., a large feature, a small bug fix, or research).

**✨ [Highlight Title]**
*A brief, engaging summary of the key accomplishments from the entire period. This should be a single, impactful sentence.*

**🎯 Goal**
*What was the primary objective for the period? Infer this from the collection of PRs. (e.g., "Improve user login speed," "Fix critical payment bugs," "Release version 2.1 of the dashboard.")*

**🚀 What's New**
*Provide a bulleted list of the most important changes from a user's perspective. Synthesize information from all the PRs.*
- Change 1
- Change 2
- ...

**📈 Impact**
*Describe the overall outcome of this work. (e.g., "Reduces login time by 50%," "Prevents incorrect charges for customers," "The new dashboard is now live for all users.")*

**🔗 Details**
*You can optionally list the PRs or tasks that were completed.*

---

## 🔌 API Reference

The bot exposes an API to generate summaries on demand, for example, via a Slack slash command.

### `POST /summarize`

Triggers a summary generation job.

- **Endpoint:** `/summarize`
- **Method:** `POST`
- **Content-Type:** `application/x-www-form-urlencoded`

**Request Body:**

- `text`: A string containing the period in days and the repository URL, separated by a space.
  - **Format:** `"<period> <repo_url>"`
  - **Example:** `"7 https://github.com/avidity/weekly-ai-bot"`

**Responses:**

- **200 OK:**
  ```
  ⏳ Got it! Generating summary for *<repo_url>* (last <period> days)...
  ```
  The bot immediately confirms receipt and starts the summary generation asynchronously. The final summary is posted to the configured Slack channel.

- **400 Bad Request:**
  ```json
  {
    "error": "Missing text parameter."
  }
  ```
  ```json
  {
    "error": "Use the format: \"/summary 7 https://github.com/org/repo\""
  }
  ```

---

## 👥 Maintainers

- Henrique Tegel
- Marina Melo

_Hackday 2025 — AI Automation Theme_
