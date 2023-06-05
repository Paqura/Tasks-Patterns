import { getMeilisearchPluginConfig } from './meilisearchPluginConfig';

export default ({ env }) => {
  return {
    'import-export-entries': {
      enabled: true,
    },
    'strapi-plugin-populate-deep': {
      config: {
        defaultDepth: 10
      }
    },
    email: {
      config: env('EMAIL_PROVIDER') === 'nodemailer' ? {
        provider: 'nodemailer',
        providerOptions: {
          host: env('SMTP_HOST'),
          port: env('SMTP_PORT'),
          auth: {
            user: env('SMTP_USERNAME'),
            pass: env('SMTP_PASSWORD'),
          },
        },
        settings: {
          defaultFrom: env('SMTP_USERNAME'),
          defaultReplyTo: env('SMTP_USERNAME'),
        },
      } : {
        providerOptions: {},
      },
    },
    meilisearch: {
      config: getMeilisearchPluginConfig(env)
    },
    upload: env.bool('S3_ENABLED')
      ? {
        config: {
          provider: 'aws-s3',
          providerOptions: {
            s3Options: {
              accessKeyId: env('AWS_ACCESS_KEY_ID'),
              secretAccessKey: env('AWS_SECRET_ACCESS_KEY'),
              endpoint: env('S3_ENDPOINT', undefined),
              region: env('AWS_REGION', undefined),
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
