module.exports = {
  async afterCreate(event) {
    const { result } = event;

    try{
      const entity = await strapi.db.query('api::email-template.email-template').findOne({});
      const template = await strapi.db.query('api::email-template.email-template').load(entity, 'pilotApplication', {});

      await strapi.plugins['email'].services.email.sendTemplatedEmail(
        {
          to: process.env.REQUESTS_EMAIL,
        },
        template,
        {
          product: result.product,
          fullName: result.fullName,
          companyName: result.companyName,
          phone: result.phone,
          email: result.email,
          comment: result.comment,
        }
      );
    } catch(err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
  }
};
