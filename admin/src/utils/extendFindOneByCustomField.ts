export const extendFindOneByCustomField = ( serviceName, fieldId = 'slug') => ({ strapi }) => ({
  async findOne(ctx) {
    const { id: slug } = ctx.params;
    const { query } = ctx;
    if (!query.filters) {
      query.filters = {};
    }
    query.filters[fieldId] = { '$eq': slug };
    const entity = await strapi.service(serviceName).find(query);
    const { results } = await this.sanitizeOutput(entity, ctx);

    return this.transformResponse(results[0]);
  }
});
