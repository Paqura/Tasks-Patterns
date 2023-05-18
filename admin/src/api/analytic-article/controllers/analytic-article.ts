/**
 * article controller
 */

import { factories } from '@strapi/strapi';
import { extendFindOneByCustomField } from '../../../utils/extendFindOneByCustomField';

export default factories.createCoreController('api::analytic-article.analytic-article',  extendFindOneByCustomField('api::analytic-article.analytic-article','slug'));
