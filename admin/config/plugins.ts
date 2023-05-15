export default ({ env }) => {
  return {
    'import-export-entries': {
      enabled: true,
    },
    'strapi-plugin-populate-deep': {
      config: {
        defaultDepth: 3
      }
    },
    upload: env.bool('S3_ENABLED')
      ? {
        config: {
          provider: 'aws-s3',
          providerOptions: {
            s3Options: {
              accessKeyId: env('AWS_ACCESS_KEY_ID'),
              secretAccessKey: env('AWS_SECRET_ACCESS_KEY'),
              region: env('AWS_REGION'),
              params: {
                Bucket: env('S3_BUCKET'),
                ACL: 'public-read'
              },
            }
          },
        },
      }
      : undefined,
  };
};
