## 🎯 Core Goal

Given a repository URL and an optional period in days (defaulting to 7), the bot will:

1. **Connect to GitHub**
2. **Fetch all PRs (merged and open) within the given period**
3. **For each PR, read its description, commits, and file changes**
4. **Use Gemini to summarize all the activity**
5. **Post the summary to Slack**

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
node src/index.js --repo <github_repo_url> --period <days>
```

**Flow:**
1. Parse repo URL → extract org/repo.
2. Fetch all PRs (merged and open) from the last `n` days.
3. For each PR, fetch commits and file changes.
4. Feed all data to Gemini with a summarization prompt.
5. Receive a human-readable summary.
6. Post summary to Slack via webhook.

---

## 🔌 GitHub Integration

- **Endpoints:**
  - `GET /repos/{owner}/{repo}/pulls`
  - `GET /repos/{owner}/{repo}/pulls/{pull_number}/commits`
  - `GET /repos/{owner}/{repo}/pulls/{pull_number}/files`

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
> “You are an expert AI assistant specializing in summarizing a period's worth of software development work for a non-technical audience.
> Your goal is to generate a single, clear, concise, and engaging summary based on the provided list of Pull Requests and their associated tasks.
> Use the following template and adhere to the instructions for each section.
>
> *✨ [Highlight Title]*
> *A brief, engaging summary of the key accomplishments from the entire period. This should be a single, impactful sentence.*
>
> *🎯 Goal*
> What was the primary objective for the period? Infer this from the collection of PRs. (e.g., "Improve user login speed," "Fix critical payment bugs," "Release version 2.1 of the dashboard.")
>
> *🚀 What's New*
> Provide a bulleted list of the most important changes from a user's perspective. Synthesize information from all the PRs.
> - Change 1
> - Change 2
> - ...
>
> *📈 Impact*
> Describe the overall outcome of this work. (e.g., "Reduces login time by 50%," "Prevents incorrect charges for customers," "The new dashboard is now live for all users.")
>
> *🔗 Details*
> You can optionally list the PRs or tasks that were completed.

**Input JSON Example:**
```json
{
  "prs": [
    {
      "title": "Improve authentication flow",
      "description": "Refactor login logic and fix token expiration bug.",
      "commits": ["Add JWT helper", "Refactor login route", "Fix token refresh issue"],
      "files_changed": ["auth.js", "routes/login.js", "tests/auth.test.js"],
      "task": {
        "taskNumber": 123,
        "title": "As a user, I want to log in securely",
        "description": "The current login flow is insecure and needs to be updated."
      }
    },
    {
      "title": "Fix caching issue",
      "description": "Add cache invalidation for user profiles.",
      "commits": ["Add cache invalidation", "Update user profile tests"],
      "files_changed": ["cache.js", "tests/user.test.js"],
      "task": null
    }
  ]
}
```

**Expected Output:**
> ✨ **Authentication and Caching Refinements**
> *This week, we overhauled the authentication flow for better security and fixed a key caching bug.*
>
> 🎯 **Goal**
> The primary objective was to enhance system reliability by improving the login process and resolving a user profile caching issue.
>
> 🚀 **What's New**
> - The authentication flow was refactored for cleaner token management and better reliability.
> - A new JWT helper was added and login routes were simplified.
> - A caching issue for user profiles was resolved by implementing cache invalidation.
>
> 📈 **Impact**
> These changes improve the security and performance of the application, leading to a better user experience.
>
> 🔗 **Details**
> - PR #1: Improve authentication flow
> - PR #2: Fix caching issue

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
node src/index.js --repo https://github.com/acme/app --period 7
```

**Process:**
1. Fetch GitHub data for the last 7 days
2. Summarize via Gemini
3. Post summary to Slack

**Output (Slack):**
> Weekly Summary 🎉 — 3 PRs merged, 1 open. Key updates include the new caching layer which improves API speed by 30%, and a fix for the authentication flow. Two edge cases are pending for the next sprint.

That’s your “what did we even do this week?” moment.
