require('dotenv').config();
const { App } = require('@slack/bolt');

// Import handlers
const commandHandlers = require('./handlers/commands');
const viewHandlers = require('./handlers/views');

// Initialize Slack app
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN,
});

// Register handlers
commandHandlers.register(app);
viewHandlers.register(app);

// Error handling middleware
app.error((error) => {
  console.error('Slack app error:', error);
});

// Global error handler
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Start the application
(async () => {
  try {
    await app.start(process.env.PORT || 3000);
    console.log('⚡️ Slack Bolt app is running!');
  } catch (error) {
    console.error('Failed to start application:', error);
    process.exit(1);
  }
})(); 