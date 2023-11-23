import { factories } from '@strapi/strapi';

type TParams = Parameters<typeof factories.createCoreController>[1];

type TService = Parameters<typeof strapi.service>[0];

type TExtendFindOneByCustomField<ServiceName extends string = TService> = (serviceName: ServiceName, fieldId?: string) => TParams;

export const extendFindOneByCustomField: TExtendFindOneByCustomField = ( serviceName, fieldId = 'slug') => ({ strapi }) => ({
  async findOne(ctx) {
    const { id: slug } = ctx.params;

    const { query } = ctx;

    if (!query.filters) {
      query.filters = {};
    }

    query.filters[fieldId] = { '$eq': slug };

    const entity = await strapi.service(serviceName).find(query);

    const { results } = (await this.sanitizeOutput(entity, ctx)) as { results: unknown[] };

    return this.transformResponse(results[0]);
  }
});
