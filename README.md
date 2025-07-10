# Slack Bolt Onboarding Bot

A modular Slack bot built with Slack Bolt framework for agency onboarding, featuring Docker support and webhook integration.

## Features

- 🚀 **Slack Bolt Framework** - Modern Slack app development
- 🐳 **Docker Support** - Containerized deployment
- 📝 **Modal Forms** - Interactive onboarding form collection
- 🔗 **Webhook Integration** - External service communication
- 🏗️ **Modular Architecture** - Clean, organized code structure

## Project Structure

```
├── src/
│   ├── app.js              # Main application file
│   ├── handlers/           # Event handlers
│   │   ├── commands.js     # Slash command handlers
│   │   └── views.js        # Modal view handlers
│   └── services/           # Business logic
│       └── webhook.js      # Webhook service
├── docker-compose.yml      # Docker orchestration
├── Dockerfile             # Docker image definition
├── package.json           # Node.js dependencies
├── .env                   # Environment variables
└── README.md             # This file
```

## Quick Start

### Prerequisites

- Node.js 18+ 
- Docker and Docker Compose
- Slack App credentials (Bot Token, Signing Secret, App Token)

### 1. Setup Environment

```bash
# Copy environment template
cp .env.example .env

# Edit .env with your Slack credentials
```

### 2. Configure Slack App

1. Create a new Slack app at [api.slack.com/apps](https://api.slack.com/apps)
2. Enable Socket Mode
3. Add required scopes: `commands`, `chat:write`, `users:read`
4. Create slash command: `/onboarding`
5. Install the app to your workspace

### 3. Run with Docker

```bash
# Build and start
docker-compose up --build

# Run in background
docker-compose up -d --build
```

### 4. Run Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Start production server
npm start
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `SLACK_BOT_TOKEN` | Bot User OAuth Token | Yes |
| `SLACK_SIGNING_SECRET` | App Signing Secret | Yes |
| `SLACK_APP_TOKEN` | App-Level Token | Yes |
| `WEBHOOK_URL` | External webhook URL | Yes |
| `NOTIFY_CHANNEL` | Channel ID for notifications | Yes |
| `PORT` | Server port (default: 3000) | No |

## Usage

1. In Slack, type `/onboarding`
2. Fill out the agency onboarding form
3. Submit the form
4. Data is sent to your webhook URL
5. Notification is posted to your specified channel

## Development

### Adding New Commands

Edit `src/handlers/commands.js`:

```javascript
// Add new command handler
async handleNewCommand({ ack, body, client }) {
  await ack();
  // Your command logic here
}

// Register in register function
app.command('/newcommand', commandHandlers.handleNewCommand);
```

### Adding New Forms

Edit `src/handlers/views.js`:

```javascript
// Add new view handler
async handleNewForm({ ack, body, view, client }) {
  await ack();
  // Extract form data and process
}

// Register in register function
app.view('new_form', viewHandlers.handleNewForm);
```

## Docker Commands

```bash
# Build image
docker-compose build

# Start services
docker-compose up

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## Troubleshooting

### Bot not responding?
- Check your tokens in `.env`
- Verify the app is installed to your workspace
- Check Docker logs: `docker-compose logs -f`

### Commands not working?
- Ensure slash command is created in Slack app settings
- Verify OAuth scopes include `commands`
- Check the app is installed to your workspace

### Webhook errors?
- Verify `WEBHOOK_URL` is correct and accessible
- Check webhook endpoint accepts POST requests
- Review logs for detailed error messages

## License

MIT License
