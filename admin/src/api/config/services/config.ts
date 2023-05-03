/**
 * config service
 */

import { factories } from '@strapi/strapi';
const a = {
  test:1,
  test2: 2,
};

export default factories.createCoreService('api::config.config');
