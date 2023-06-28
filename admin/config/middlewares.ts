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
              `${env('S3_BUCKET')}.s3.${env('AWS_REGION')}.amazonaws.com`,
              ...(env('S3_ENDPOINT')
                ? [`${env('S3_BUCKET')}.${new URL(env('S3_ENDPOINT'))?.host}`]
                : []),
            ],
            'media-src': [
              '\'self\'',
              'data:',
              'blob:',
              'dl.airtable.com',
              `${env('S3_BUCKET')}.s3.${env('AWS_REGION')}.amazonaws.com`,
              ...(env('S3_ENDPOINT')
                ? [`${env('S3_BUCKET')}.${new URL(env('S3_ENDPOINT'))?.host}`]
                : []),
            ],
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
