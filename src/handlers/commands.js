// Command handlers
const commandHandlers = {
  // Onboarding command handler (original functionality)
  async handleOnboarding({ ack, body, client }) {
    console.log('Received /onboarding command from user:', body.user_id);
    await ack();
    try {
      await client.views.open({
        trigger_id: body.trigger_id,
        view: {
          type: 'modal',
          callback_id: 'contact_form',
          title: { type: 'plain_text', text: 'Agency Onboarding Form' },
          submit: { type: 'plain_text', text: 'Submit' },
          close: { type: 'plain_text', text: 'Cancel' },
          blocks: [
            {
              type: 'input',
              block_id: 'primary_contact',
              label: { type: 'plain_text', text: 'Primary Contact Person' },
              element: {
                type: 'plain_text_input',
                action_id: 'contact_input',
              },
            },
            {
              type: 'input',
              block_id: 'agency_name',
              label: { type: 'plain_text', text: 'Agency Name' },
              element: {
                type: 'plain_text_input',
                action_id: 'agency_input',
              },
            },
            {
              type: 'input',
              block_id: 'website_url',
              label: { type: 'plain_text', text: 'Website URL' },
              element: {
                type: 'plain_text_input',
                action_id: 'website_input',
              },
            },
            {
              type: 'input',
              block_id: 'assigned_consultant',
              label: { type: 'plain_text', text: 'Assigned Consultant' },
              element: {
                type: 'static_select',
                action_id: 'consultant_select',
                options: [
                  {
                    text: { type: 'plain_text', text: 'Dev Pandya' },
                    value: 'dev_pandya',
                  },
                  {
                    text: { type: 'plain_text', text: 'Ishita Thakker' },
                    value: 'ishita_thakker',
                  },
                ],
              },
            },
            {
              type: 'input',
              block_id: 'active_plan',
              label: { type: 'plain_text', text: 'Active Plan' },
              element: {
                type: 'static_select',
                action_id: 'plan_select',
                options: [
                  {
                    text: { type: 'plain_text', text: '5 Hours Weekly' },
                    value: '5_hours_weekly',
                  },
                  {
                    text: { type: 'plain_text', text: '10 Hours Weekly' },
                    value: '10_hours_weekly',
                  },
                ],
              },
            },
            {
              type: 'input',
              block_id: 'share_email_access',
              label: { type: 'plain_text', text: 'Share Email Access to' },
              element: {
                type: 'plain_text_input',
                action_id: 'email_access_input',
                placeholder: { type: 'plain_text', text: 'Enter email(s) or names' },
              },
            },
          ],
        },
      });
      console.log('Modal opened for user:', body.user_id);
    } catch (error) {
      console.error('Error opening modal:', error);
    }
  },
};

// Register all command handlers
function register(app) {
  // Register onboarding command
  app.command('/onboarding', commandHandlers.handleOnboarding);
  
  console.log('Command handlers registered');
}

module.exports = {
  register,
  commandHandlers,
}; 