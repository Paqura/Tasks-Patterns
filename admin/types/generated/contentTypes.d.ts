import type { Schema, Attribute } from '@strapi/strapi';

export interface AdminPermission extends Schema.CollectionType {
  collectionName: 'admin_permissions';
  info: {
    name: 'Permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    subject: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    properties: Attribute.JSON & Attribute.DefaultTo<{}>;
    conditions: Attribute.JSON & Attribute.DefaultTo<[]>;
    role: Attribute.Relation<'admin::permission', 'manyToOne', 'admin::role'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::permission', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::permission', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminUser extends Schema.CollectionType {
  collectionName: 'admin_users';
  info: {
    name: 'User';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    firstname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    username: Attribute.String;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.Private &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    registrationToken: Attribute.String & Attribute.Private;
    isActive: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>;
    roles: Attribute.Relation<'admin::user', 'manyToMany', 'admin::role'> & Attribute.Private;
    blocked: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>;
    preferedLanguage: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> & Attribute.Private;
    updatedBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> & Attribute.Private;
  };
}

export interface AdminRole extends Schema.CollectionType {
  collectionName: 'admin_roles';
  info: {
    name: 'Role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    code: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String;
    users: Attribute.Relation<'admin::role', 'manyToMany', 'admin::user'>;
    permissions: Attribute.Relation<'admin::role', 'oneToMany', 'admin::permission'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> & Attribute.Private;
    updatedBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> & Attribute.Private;
  };
}

export interface AdminApiToken extends Schema.CollectionType {
  collectionName: 'strapi_api_tokens';
  info: {
    name: 'Api Token';
    singularName: 'api-token';
    pluralName: 'api-tokens';
    displayName: 'Api Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    type: Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
      Attribute.Required &
      Attribute.DefaultTo<'read-only'>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<'admin::api-token', 'oneToMany', 'admin::api-token-permission'>;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::api-token', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::api-token', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminApiTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_api_token_permissions';
  info: {
    name: 'API Token Permission';
    description: '';
    singularName: 'api-token-permission';
    pluralName: 'api-token-permissions';
    displayName: 'API Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<'admin::api-token-permission', 'manyToOne', 'admin::api-token'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::api-token-permission', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::api-token-permission', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminTransferToken extends Schema.CollectionType {
  collectionName: 'strapi_transfer_tokens';
  info: {
    name: 'Transfer Token';
    singularName: 'transfer-token';
    pluralName: 'transfer-tokens';
    displayName: 'Transfer Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::transfer-token',
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::transfer-token', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::transfer-token', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminTransferTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_transfer_token_permissions';
  info: {
    name: 'Transfer Token Permission';
    description: '';
    singularName: 'transfer-token-permission';
    pluralName: 'transfer-token-permissions';
    displayName: 'Transfer Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::transfer-token-permission',
      'manyToOne',
      'admin::transfer-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::transfer-token-permission', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::transfer-token-permission', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface PluginUploadFile extends Schema.CollectionType {
  collectionName: 'files';
  info: {
    singularName: 'file';
    pluralName: 'files';
    displayName: 'File';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    alternativeText: Attribute.String;
    caption: Attribute.String;
    width: Attribute.Integer;
    height: Attribute.Integer;
    formats: Attribute.JSON;
    hash: Attribute.String & Attribute.Required;
    ext: Attribute.String;
    mime: Attribute.String & Attribute.Required;
    size: Attribute.Decimal & Attribute.Required;
    url: Attribute.String & Attribute.Required;
    previewUrl: Attribute.String;
    provider: Attribute.String & Attribute.Required;
    provider_metadata: Attribute.JSON;
    related: Attribute.Relation<'plugin::upload.file', 'morphToMany'>;
    folder: Attribute.Relation<'plugin::upload.file', 'manyToOne', 'plugin::upload.folder'> &
      Attribute.Private;
    folderPath: Attribute.String &
      Attribute.Required &
      Attribute.Private &
      Attribute.SetMinMax<{
        min: 1;
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'plugin::upload.file', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'plugin::upload.file', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface PluginUploadFolder extends Schema.CollectionType {
  collectionName: 'upload_folders';
  info: {
    singularName: 'folder';
    pluralName: 'folders';
    displayName: 'Folder';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 1;
      }>;
    pathId: Attribute.Integer & Attribute.Required & Attribute.Unique;
    parent: Attribute.Relation<'plugin::upload.folder', 'manyToOne', 'plugin::upload.folder'>;
    children: Attribute.Relation<'plugin::upload.folder', 'oneToMany', 'plugin::upload.folder'>;
    files: Attribute.Relation<'plugin::upload.folder', 'oneToMany', 'plugin::upload.file'>;
    path: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 1;
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'plugin::upload.folder', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'plugin::upload.folder', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface PluginI18NLocale extends Schema.CollectionType {
  collectionName: 'i18n_locale';
  info: {
    singularName: 'locale';
    pluralName: 'locales';
    collectionName: 'locales';
    displayName: 'Locale';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.SetMinMax<{
        min: 1;
        max: 50;
      }>;
    code: Attribute.String & Attribute.Unique;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'plugin::i18n.locale', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'plugin::i18n.locale', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsPermission extends Schema.CollectionType {
  collectionName: 'up_permissions';
  info: {
    name: 'permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String & Attribute.Required;
    role: Attribute.Relation<
      'plugin::users-permissions.permission',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsRole extends Schema.CollectionType {
  collectionName: 'up_roles';
  info: {
    name: 'role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    description: Attribute.String;
    type: Attribute.String & Attribute.Unique;
    permissions: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    users: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'plugin::users-permissions.role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'plugin::users-permissions.role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsUser extends Schema.CollectionType {
  collectionName: 'up_users';
  info: {
    name: 'user';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  options: {
    draftAndPublish: false;
    timestamps: true;
  };
  attributes: {
    username: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: Attribute.String;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    confirmationToken: Attribute.String & Attribute.Private;
    confirmed: Attribute.Boolean & Attribute.DefaultTo<false>;
    blocked: Attribute.Boolean & Attribute.DefaultTo<false>;
    role: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'plugin::users-permissions.user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'plugin::users-permissions.user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiAboutPageAboutPage extends Schema.SingleType {
  collectionName: 'about_pages';
  info: {
    singularName: 'about-page';
    pluralName: 'about-pages';
    displayName: 'AboutPage';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    description: Attribute.Text & Attribute.Required;
    expertsSectionManagersList: Attribute.Component<'about.employee', true> & Attribute.Required;
    expertsSectionManagersBlockTitle: Attribute.String & Attribute.Required;
    expertsSectionExpertsList: Attribute.Component<'about.employee', true> & Attribute.Required;
    expertsSectionExpertsBlockTitle: Attribute.String & Attribute.Required;
    expertsSectionTitle: Attribute.String & Attribute.Required;
    expertsSectionDescription: Attribute.Text & Attribute.Required;
    historySectionTitle: Attribute.String & Attribute.Required;
    historySectionDescription: Attribute.Text & Attribute.Required;
    historySectionHistoryItems: Attribute.Component<'about.history-item', true> &
      Attribute.Required;
    showExpertsSection: Attribute.Boolean & Attribute.Required & Attribute.DefaultTo<true>;
    showExpertsSectionManagersBlock: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<true>;
    showExpertsSectionExpertsBlock: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<true>;
    showHistorySection: Attribute.Boolean & Attribute.Required & Attribute.DefaultTo<true>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::about-page.about-page', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::about-page.about-page', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiAllProductsPageAllProductsPage extends Schema.SingleType {
  collectionName: 'all_products_pages';
  info: {
    singularName: 'all-products-page';
    pluralName: 'all-products-pages';
    displayName: 'AllProductsPage';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    title: Attribute.String & Attribute.Required & Attribute.DefaultTo<'Our Products'>;
    description: Attribute.Text &
      Attribute.Required &
      Attribute.DefaultTo<'Our software is&nbsp;designed to&nbsp;provide the highest level of&nbsp;protection while minimizing disruption to&nbsp;your business. We&nbsp;use the latest technology and techniques to&nbsp;stay ahead of&nbsp;the ever-evolving threat landscape. And with years of&nbsp;experience working with businesses of&nbsp;all sizes and in&nbsp;all industries, our team of&nbsp;experts has the knowledge and expertise to&nbsp;keep your organization secure.'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::all-products-page.all-products-page',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::all-products-page.all-products-page',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiAnalyticArticleAnalyticArticle extends Schema.CollectionType {
  collectionName: 'articles';
  info: {
    singularName: 'analytic-article';
    pluralName: 'analytic-articles';
    displayName: 'AnalyticArticles';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    topic: Attribute.Text & Attribute.Required;
    published: Attribute.Date & Attribute.Required;
    tag: Attribute.String;
    articleText: Attribute.Component<'article-section.article-section', true>;
    slug: Attribute.UID<'api::analytic-article.analytic-article', 'title'> & Attribute.Required;
    tableOfContent: Attribute.String & Attribute.DefaultTo<'Table of contents'>;
    files: Attribute.Media;
    titleOfHelpfulFiles: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::analytic-article.analytic-article',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::analytic-article.analytic-article',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiAnalyticsPageAnalyticsPage extends Schema.SingleType {
  collectionName: 'analytics_pages';
  info: {
    singularName: 'analytics-page';
    pluralName: 'analytics-pages';
    displayName: 'AnalyticsPage';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    description: Attribute.Text & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::analytics-page.analytics-page', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::analytics-page.analytics-page', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiAnyQuestionAnyQuestion extends Schema.SingleType {
  collectionName: 'any_questions';
  info: {
    singularName: 'any-question';
    pluralName: 'any-questions';
    displayName: 'AnyQuestions';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    title: Attribute.String & Attribute.Required & Attribute.DefaultTo<'Any questions?'>;
    description: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<'Fill in the form and our specialists<br/> will contact you shortly'>;
    feedback: Attribute.Component<'any-questions.general-questions'> & Attribute.Required;
    partnership: Attribute.Component<'any-questions.partnership'> & Attribute.Required;
    pilotApplication: Attribute.Component<'any-questions.pilot-application'> & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::any-question.any-question', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::any-question.any-question', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiClientClient extends Schema.CollectionType {
  collectionName: 'clients';
  info: {
    singularName: 'client';
    pluralName: 'clients';
    displayName: 'Clients';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    logo: Attribute.Media & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::client.client', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::client.client', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiConfigConfig extends Schema.SingleType {
  collectionName: 'configs';
  info: {
    singularName: 'config';
    pluralName: 'configs';
    displayName: 'Config';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    seo: Attribute.Component<'share.seo'> & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::config.config', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::config.config', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiEmailTemplateEmailTemplate extends Schema.SingleType {
  collectionName: 'email_templates';
  info: {
    singularName: 'email-template';
    pluralName: 'email-templates';
    displayName: 'EmailTemplates';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    feedback: Attribute.Component<'email.email-template'> &
      Attribute.Required &
      Attribute.DefaultTo<{
        subject: 'test';
      }>;
    partnership: Attribute.Component<'email.email-template'> & Attribute.Required;
    pilotApplication: Attribute.Component<'email.email-template'> & Attribute.Required;
    webinar: Attribute.Component<'email.email-template'> & Attribute.Required;
    webinarUser: Attribute.Component<'email.email-template'> & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::email-template.email-template', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::email-template.email-template', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiFeedbackRequestFeedbackRequest extends Schema.CollectionType {
  collectionName: 'feedback_requests';
  info: {
    singularName: 'feedback-request';
    pluralName: 'feedback-requests';
    displayName: 'FeedbackRequests';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    fullName: Attribute.String & Attribute.Required;
    phone: Attribute.String;
    email: Attribute.Email & Attribute.Required;
    comment: Attribute.Text & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::feedback-request.feedback-request',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::feedback-request.feedback-request',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiFooterFooter extends Schema.SingleType {
  collectionName: 'footers';
  info: {
    singularName: 'footer';
    pluralName: 'footers';
    displayName: 'Footer';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    title: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<'Cyber security market leader'>;
    copyright: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<'Positive Technologies 2023'>;
    productsTitle: Attribute.String & Attribute.Required & Attribute.DefaultTo<'Products'>;
    company: Attribute.Component<'footer.nav-block'> & Attribute.Required;
    social: Attribute.Component<'footer.nav-block'> & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::footer.footer', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::footer.footer', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiHeaderHeader extends Schema.SingleType {
  collectionName: 'headers';
  info: {
    singularName: 'header';
    pluralName: 'headers';
    displayName: 'Header';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    navItem: Attribute.Component<'share.nav-item', true>;
    searchInputPlaceholder: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<'Search on ptsecurity.com'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::header.header', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::header.header', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiMainPageMainPage extends Schema.SingleType {
  collectionName: 'main_pages';
  info: {
    singularName: 'main-page';
    pluralName: 'main-pages';
    displayName: 'MainPage';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    title: Attribute.Text &
      Attribute.Required &
      Attribute.DefaultTo<'Technologically preventing the unacceptable for business and government'>;
    subtitle: Attribute.Text &
      Attribute.DefaultTo<'Bringing experts and enthusiasts together to&nbsp;create cutting-edge cybersecurity technology'>;
    contactButtonText: Attribute.String & Attribute.Required & Attribute.DefaultTo<'Contact us'>;
    contactsAnchorText: Attribute.String & Attribute.Required & Attribute.DefaultTo<'Contact'>;
    headingVideo: Attribute.Media;
    blocks: Attribute.DynamicZone<
      [
        'main.advantages-block',
        'main.tools-block',
        'main.products-block',
        'main.analytics-block',
        'main.news-block'
      ]
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::main-page.main-page', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::main-page.main-page', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiNewsItemNewsItem extends Schema.CollectionType {
  collectionName: 'news';
  info: {
    singularName: 'news-item';
    pluralName: 'news';
    displayName: 'News&Events';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    previewImage: Attribute.Media;
    published: Attribute.Date & Attribute.Required;
    title: Attribute.String & Attribute.Required;
    slug: Attribute.UID<'api::news-item.news-item', 'title'> & Attribute.Required;
    topic: Attribute.Text;
    filesTitle: Attribute.String;
    files: Attribute.Media;
    content: Attribute.RichText &
      Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'toolbar';
        }
      >;
    event: Attribute.Component<'event.event-props'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::news-item.news-item', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::news-item.news-item', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiNewsPageNewsPage extends Schema.SingleType {
  collectionName: 'news_pages';
  info: {
    singularName: 'news-page';
    pluralName: 'news-pages';
    displayName: 'NewsPage';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    description: Attribute.Text & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::news-page.news-page', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::news-page.news-page', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiNotFoundNotFound extends Schema.SingleType {
  collectionName: 'not_founds';
  info: {
    singularName: 'not-found';
    pluralName: 'not-founds';
    displayName: 'NotFound';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    title: Attribute.String & Attribute.Required & Attribute.DefaultTo<'404'>;
    description: Attribute.RichText &
      Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'toolbar';
        }
      >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::not-found.not-found', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::not-found.not-found', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiPartnershipRequestPartnershipRequest extends Schema.CollectionType {
  collectionName: 'partnership_requests';
  info: {
    singularName: 'partnership-request';
    pluralName: 'partnership-requests';
    displayName: 'PartnershipRequests';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    fullName: Attribute.String & Attribute.Required;
    companyName: Attribute.String & Attribute.Required;
    phone: Attribute.String;
    email: Attribute.Email & Attribute.Required;
    address: Attribute.String;
    comment: Attribute.Text;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::partnership-request.partnership-request',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::partnership-request.partnership-request',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPilotApplicationRequestPilotApplicationRequest extends Schema.CollectionType {
  collectionName: 'pilot_application_requests';
  info: {
    singularName: 'pilot-application-request';
    pluralName: 'pilot-application-requests';
    displayName: 'PilotApplicationRequests';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    product: Attribute.String & Attribute.Required;
    fullName: Attribute.String & Attribute.Required;
    companyName: Attribute.String & Attribute.Required;
    phone: Attribute.String;
    email: Attribute.Email & Attribute.Required;
    comment: Attribute.Text;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::pilot-application-request.pilot-application-request',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::pilot-application-request.pilot-application-request',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiProductProduct extends Schema.CollectionType {
  collectionName: 'products';
  info: {
    singularName: 'product';
    pluralName: 'products';
    displayName: 'Products';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    subtitle: Attribute.Text;
    icon: Attribute.Media & Attribute.Required;
    order: Attribute.Integer & Attribute.Required & Attribute.DefaultTo<1>;
    slug: Attribute.UID & Attribute.Required;
    bannerImage: Attribute.Media;
    blocks: Attribute.DynamicZone<
      [
        'product.product-tasks-block',
        'product.imaged-cards-grid-block',
        'product.images-slider-block',
        'product.faq-block',
        'product.welcome-to-pilot-block',
        'product.files-block',
        'product.other-products-block',
        'product.product-overview-block'
      ]
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::product.product', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::product.product', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiSearchPageSearchPage extends Schema.SingleType {
  collectionName: 'search_pages';
  info: {
    singularName: 'search-page';
    pluralName: 'search-pages';
    displayName: 'SearchPage';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    title: Attribute.String & Attribute.Required & Attribute.DefaultTo<'Search results for'>;
    hasNoResultsTitle: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<'Nothing found for'>;
    noResultsBlockTitle: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<'We couldn\u2019t find any matches for'>;
    noResultsBlockDescription: Attribute.Text &
      Attribute.Required &
      Attribute.DefaultTo<'Double check your search for any typos or spelling errors \u2013 or try a different search term.<br>Also you can navigate directly to our products via footer section of the website.'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::search-page.search-page', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::search-page.search-page', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiWebinarConfigWebinarConfig extends Schema.SingleType {
  collectionName: 'webinar_configs';
  info: {
    singularName: 'webinar-config';
    pluralName: 'webinar-configs';
    displayName: 'WebinarConfig';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    title: Attribute.String & Attribute.DefaultTo<'Registration for the webinar'>;
    fieldName: Attribute.String & Attribute.Required & Attribute.DefaultTo<'Your name'>;
    fieldCompany: Attribute.String & Attribute.Required & Attribute.DefaultTo<'Company name'>;
    fieldPosition: Attribute.String & Attribute.Required & Attribute.DefaultTo<'Your position'>;
    fieldPhone: Attribute.String & Attribute.Required & Attribute.DefaultTo<'Your phone'>;
    fieldEmail: Attribute.String & Attribute.Required & Attribute.DefaultTo<'Your email'>;
    buttonSubmit: Attribute.String & Attribute.Required & Attribute.DefaultTo<'Registration'>;
    checkboxSubscription: Attribute.Text &
      Attribute.Required &
      Attribute.DefaultTo<'I agree to receive advertising and information messages.'>;
    checkboxConsentsTerms: Attribute.Text &
      Attribute.Required &
      Attribute.DefaultTo<'I consent to the processing of my personal data in accordance with the terms of the <a href="#">privacy policy</a>.'>;
    successTitle: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<'Thank you, your application has been sent'>;
    successDescription: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<'Our specialists will contact you soon.'>;
    calendarTitle: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<'Don\u2019t miss <mark>the event!</mark>'>;
    calendarDescription: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<"Download the event information to add it to your calendar so you don't miss the event">;
    calendarButton: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<'Add to my calendar'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::webinar-config.webinar-config', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::webinar-config.webinar-config', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiWebinarRequestWebinarRequest extends Schema.CollectionType {
  collectionName: 'webinar_requests';
  info: {
    singularName: 'webinar-request';
    pluralName: 'webinar-requests';
    displayName: 'WebinarRequests';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    fullName: Attribute.String & Attribute.Required;
    email: Attribute.Email & Attribute.Required;
    phone: Attribute.String;
    companyName: Attribute.String;
    companyPosition: Attribute.String;
    eventName: Attribute.String & Attribute.Required;
    eventDate: Attribute.Date & Attribute.Required;
    eventLink: Attribute.String & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::webinar-request.webinar-request',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::webinar-request.webinar-request',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

declare module '@strapi/strapi' {
  export module Shared {
    export interface ContentTypes {
      'admin::permission': AdminPermission;
      'admin::user': AdminUser;
      'admin::role': AdminRole;
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::i18n.locale': PluginI18NLocale;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
      'api::about-page.about-page': ApiAboutPageAboutPage;
      'api::all-products-page.all-products-page': ApiAllProductsPageAllProductsPage;
      'api::analytic-article.analytic-article': ApiAnalyticArticleAnalyticArticle;
      'api::analytics-page.analytics-page': ApiAnalyticsPageAnalyticsPage;
      'api::any-question.any-question': ApiAnyQuestionAnyQuestion;
      'api::client.client': ApiClientClient;
      'api::config.config': ApiConfigConfig;
      'api::email-template.email-template': ApiEmailTemplateEmailTemplate;
      'api::feedback-request.feedback-request': ApiFeedbackRequestFeedbackRequest;
      'api::footer.footer': ApiFooterFooter;
      'api::header.header': ApiHeaderHeader;
      'api::main-page.main-page': ApiMainPageMainPage;
      'api::news-item.news-item': ApiNewsItemNewsItem;
      'api::news-page.news-page': ApiNewsPageNewsPage;
      'api::not-found.not-found': ApiNotFoundNotFound;
      'api::partnership-request.partnership-request': ApiPartnershipRequestPartnershipRequest;
      'api::pilot-application-request.pilot-application-request': ApiPilotApplicationRequestPilotApplicationRequest;
      'api::product.product': ApiProductProduct;
      'api::search-page.search-page': ApiSearchPageSearchPage;
      'api::webinar-config.webinar-config': ApiWebinarConfigWebinarConfig;
      'api::webinar-request.webinar-request': ApiWebinarRequestWebinarRequest;
    }
  }
}
