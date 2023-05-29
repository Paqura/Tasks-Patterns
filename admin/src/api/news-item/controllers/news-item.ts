/**
 * news-item controller
 */

import { factories } from '@strapi/strapi';
import { extendFindOneByCustomField } from '../../../utils/extendFindOneByCustomField';

export default factories.createCoreController('api::news-item.news-item', extendFindOneByCustomField('api::news-item.news-item', 'slug'));
