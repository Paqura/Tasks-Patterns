module.exports = {
  async afterCreate(event) {
    if (!process.env.SMTP_HOST) {
      return;
    }

    const { result } = event;

    if (!result.recipientEmail || !result.emailTemplateName) return;

    try {
      const entity = await strapi.db
        .query('api::special-page-email-template.special-page-email-template')
        .findOne({
          where: {
            templateName: result.emailTemplateName
          }
        });

      await strapi.plugins['email'].services.email.sendTemplatedEmail(
        {
          to: result.recipientEmail,
        },
        entity,
        {
          fullName: result.fullName,
          email: result.email,
          company: result.company,
          message: result.message,
        }
      );
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
  },
};
