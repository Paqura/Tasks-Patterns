const emailTemplate = {
  subject: 'New register to <%= event.eventName %>',
  text: `Params:
    eventName: <%= event.eventName %>
    createdAt: <%= event.createdAt %>
    fullName: <%= user.fullName %>
    email: <%= user.email %>
    phone: <%= user.phone %>
    companyName: <%= user.companyName %>
    companySite: <%= user.companySite %>`,
  html: `<h1>Params:</h1>
    <p>eventName: <%= event.eventName %><p>
    <p>createdAt: <%= event.createdAt %><p>
    <p>fullName: <%= user.fullName %><p>
    <p>email: <%= user.email %><p>
    <p>phone: <%= user.phone %><p>
    <p>companyName: <%= user.companyName %><p>
    <p>companySite: <%= user.companySite %><p>`,
};

module.exports = {
  async afterCreate(event) {
    const { result } = event;

    try{
      await strapi.plugins['email'].services.email.sendTemplatedEmail(
        {
          to: process.env.REQUESTS_EMAIL,
        },
        emailTemplate,
        {
          event: {
            name: result.eventName,
            createdAt: result.createdAt,
          },
          user: {
            fullName: result.fullName,
            email: result.email,
            phone: result.phone,
            companyName: result.companyName,
            companySite: result.companySite,
          },
        }
      );
    } catch(err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
  }
};
