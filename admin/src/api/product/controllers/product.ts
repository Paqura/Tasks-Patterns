/**
 * product controller
 */

import { factories } from '@strapi/strapi';
import { extendFindOneByCustomField } from '../../../utils/extendFindOneByCustomField';

export default factories.createCoreController('api::product.product', extendFindOneByCustomField('api::product.product', 'slug'));
