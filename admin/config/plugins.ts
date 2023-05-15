export default () => {
  return {
    'import-export-entries': {
      enabled: true,
    },
    'strapi-plugin-populate-deep': {
      config: {
        defaultDepth: 3
      }
    },
  };
};
