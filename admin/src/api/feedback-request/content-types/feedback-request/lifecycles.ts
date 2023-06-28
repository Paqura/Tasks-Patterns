module.exports = {
  async afterCreate(event) {
    if (!process.env.SMTP_HOST) {
      return;
    }

    const { result } = event;

    try {
      const entity = await strapi.db.query('api::email-template.email-template').findOne({});
      const template = await strapi.db
        .query('api::email-template.email-template')
        .load(entity, 'feedback', {});

      await strapi.plugins['email'].services.email.sendTemplatedEmail(
        {
          to: process.env.REQUESTS_EMAIL,
        },
        template,
        {
          fullName: result.fullName,
          phone: result.phone,
          email: result.email,
          comment: result.comment,
        }
      );
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
  },
};
