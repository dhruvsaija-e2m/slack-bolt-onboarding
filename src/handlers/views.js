const webhookService = require('../services/webhook');

// View handlers
const viewHandlers = {
  // Contact form submission handler (original functionality)
  async handleContactForm({ ack, body, view, client }) {
    await ack();
    const contact = view.state.values.primary_contact.contact_input.value;
    const agency = view.state.values.agency_name.agency_input.value;
    const website = view.state.values.website_url.website_input.value;
    const consultant = view.state.values.assigned_consultant.consultant_select.selected_option.value;
    const plan = view.state.values.active_plan.plan_select.selected_option.value;

    const payload = {
      contact,
      agency,
      website,
      consultant,
      plan,
      user: body.user.id,
    };
    console.log('Form submitted. Data to send to webhook:');

    // Send data to webhook
    try {
      const WEBHOOK_URL = process.env.WEBHOOK_URL; // e.g., 'https://n8n.sitepreviews.dev/webhook/a389b096-8474-4073-aef7-a4c818d78df5'
      const response = await webhookService.sendToWebhook(payload);
      console.log('Webhook POST success. Status:', response.status);
      
      // Post confirmation to a channel (replace 'onboarding-notifications' with your channel ID or name)
      const NOTIFY_CHANNEL = process.env.NOTIFY_CHANNEL; // e.g., 'C094ZC0AAKF'
      await client.chat.postMessage({
        channel: NOTIFY_CHANNEL,
        text: `New onboarding submitted by <@${body.user.id}>.`,
      });
    } catch (error) {
      console.error('Error sending to webhook:', error.response ? error.response.data : error);
    }
  },
};

// Register all view handlers
function register(app) {
  // Register contact form submission
  app.view('contact_form', viewHandlers.handleContactForm);
  
  console.log('View handlers registered');
}

module.exports = {
  register,
  viewHandlers,
}; 