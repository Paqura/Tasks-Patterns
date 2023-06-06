module.exports = {
  async afterCreate(event) {
    const { result } = event;

    try{
      const entity = await strapi.db.query('api::email-template.email-template').findOne({});
      const templateAdmin = await strapi.db.query('api::email-template.email-template').load(entity, 'webinar', {});
      const templateUser = await strapi.db.query('api::email-template.email-template').load(entity, 'webinarUser', {});

      const params = {
        fullName: result.fullName,
        phone: result.phone,
        email: result.email,
        companyName: result.companyName,
        companyPosition: result.companyPosition,
        eventDate: new Date(result.eventDate).toLocaleDateString('en-EN', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        }),
        eventName: result.eventName,
        eventLink: result.eventLink,
      };

      await strapi.plugins['email'].services.email.sendTemplatedEmail(
        {
          to: process.env.REQUESTS_EMAIL,
        },
        templateAdmin,
        params
      );

      await strapi.plugins['email'].services.email.sendTemplatedEmail(
        {
          to: result.email,
        },
        templateUser,
        params
      );
    } catch(err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
  }
};
