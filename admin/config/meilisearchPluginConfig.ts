import { transformData } from '../src/utils/dataTransformations';

const commonSettings = {
  indexName: 'searchable-items',
  entriesQuery: {
    populate: 'deep',
  },
  settings: {
    searchableAttributes: ['data'],
    filterableAttributes: ['locale'],
    typoTolerance: {
      enabled: false,
    },
  },
};

const internalFields = [
  'id',
  'createdAt',
  'updatedAt',
  'publishedAt',
  'localizations',
  '__component',
];

export const getMeilisearchPluginConfig = (env) => {
  return {
    host: env('MEILISEARCH_HOST'),
    apiKey: env('MEILISEARCH_APP_KEY'),
    'analytic-article': {
      ...commonSettings,
      transformEntry({ entry }) {
        const { id, slug, locale, ...rest } = entry;

        return {
          id,
          type: 'analytic-article',
          slug,
          locale,
          data: transformData(rest, [...internalFields, 'published', 'files', 'number']),
        };
      },
    },
    'news-item': {
      ...commonSettings,
      transformEntry({ entry }) {
        const { id, slug, locale, ...rest } = entry;

        const type = rest.event ? 'webinars-item' : 'news-item';

        return {
          id,
          type,
          slug,
          locale,
          data: transformData(rest, [
            ...internalFields,
            'published',
            'files',
            'previewImage',
            'calendar',
          ]),
        };
      },
    },
    product: {
      ...commonSettings,
      transformEntry({ entry }) {
        const { id, slug, locale, ...rest } = entry;

        return {
          id,
          type: 'product',
          slug,
          locale,
          data: transformData(rest, [
            ...internalFields,
            'icon',
            'bannerImage',
            'sectionId',
            'image',
            'files',
          ]),
        };
      },
    },
    'about-page': {
      ...commonSettings,
      transformEntry({ entry }) {
        const { id, slug, locale, ...rest } = entry;

        return {
          id,
          type: 'about-page',
          slug,
          locale,
          data: transformData(rest, [...internalFields, 'photo']),
        };
      },
    },
  };
};
