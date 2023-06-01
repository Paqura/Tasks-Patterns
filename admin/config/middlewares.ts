export default ({ env }) => {
  return [
    'strapi::errors',
    {
      name: 'strapi::security',
      config: {
        contentSecurityPolicy: {
          useDefaults: true,
          directives: {
            'connect-src': ['\'self\'', 'https:'],
            'img-src': [
              '\'self\'',
              'data:',
              'blob:',
              'dl.airtable.com',
              'storage.yandexcloud.net',
              env('AWS_REGION') && `${env('S3_BUCKET')}.s3.${env('AWS_REGION')}.amazonaws.com`,
            ].filter(Boolean),
            'media-src': [
              '\'self\'',
              'data:',
              'blob:',
              'dl.airtable.com',
              'storage.yandexcloud.net',
              env('AWS_REGION') && `${env('S3_BUCKET')}.s3.${env('AWS_REGION')}.amazonaws.com`,
            ].filter(Boolean),
            upgradeInsecureRequests: null,
          },
        },
      },
    },
    {
      name: 'strapi::cors',
      config: {
        origin: (env('ALLOW_ORIGINS') || '*').split(','),
      },
    },
    'strapi::poweredBy',
    'strapi::logger',
    'strapi::query',
    'strapi::body',
    'strapi::session',
    'strapi::favicon',
    'strapi::public',
  ];
};
