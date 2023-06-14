import { transformData } from '../src/utils/dataTransformations';

const commonSettings = {
  indexName: 'searchable-items',
  entriesQuery: {
    populate: 'deep',
  },
  settings: {
    searchableAttributes: ['data'],
    typoTolerance: {
      enabled: false
    },
  },
};

export const getMeilisearchPluginConfig = (env) => {
  return {
    host: env('MEILISEARCH_HOST'),
    apiKey: env('MEILISEARCH_APP_KEY'),
    'analytic-article': {
      ...commonSettings,
      transformEntry({ entry }) {
        const { id, slug, ...rest } = entry;

        return {
          id,
          type: 'analytic-article',
          slug,
          data: transformData(rest, ['id', 'createdAt', 'updatedAt', 'published', 'files', 'number'])
        };
      }
    },
    'news-item': {
      ...commonSettings,
      transformEntry({ entry }) {
        const { id, slug, ...rest } = entry;

        const type = rest.isEvent ? 'webinars-item' : 'news-item' ;

        return {
          id,
          type,
          slug,
          data: transformData(rest, ['id', 'createdAt', 'updatedAt', 'published', 'files', 'previewImage', 'isEvent', 'eventDate', 'eventYoutubeVideoId', 'eventLink', 'eventCalendar'])
        };
      }
    },
    'product': {
      ...commonSettings,
      transformEntry({ entry }) {
        const { id, slug, ...rest } = entry;

        return {
          id,
          type: 'product',
          slug,
          data: transformData(rest, ['id', 'createdAt', 'updatedAt', 'order', 'icon', 'bannerImage', '__component', 'sectionId', 'image', 'files'])
        };
      }
    },
    'about-page': {
      ...commonSettings,
      transformEntry({ entry }) {
        const { id, slug, ...rest } = entry;

        return {
          id,
          type: 'about-page',
          slug,
          data: transformData(rest, ['id', 'createdAt', 'updatedAt', 'photo'])
        };
      }
    }
  };
};
