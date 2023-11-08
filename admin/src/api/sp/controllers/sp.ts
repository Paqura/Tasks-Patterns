/**
 * sp controller
 */

import { factories } from '@strapi/strapi';
import { extendFindOneByCustomField } from '../../../utils/extendFindOneByCustomField';

export default factories.createCoreController('api::sp.sp', extendFindOneByCustomField('api::sp.sp', 'slug'));
