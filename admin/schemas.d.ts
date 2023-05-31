import {
  CollectionTypeSchema,
  StringAttribute,
  RequiredAttribute,
  SetMinMaxLength,
  JSONAttribute,
  DefaultTo,
  RelationAttribute,
  DateTimeAttribute,
  PrivateAttribute,
  EmailAttribute,
  UniqueAttribute,
  PasswordAttribute,
  BooleanAttribute,
  EnumerationAttribute,
  BigIntegerAttribute,
  IntegerAttribute,
  DecimalAttribute,
  SetMinMax,
  SingleTypeSchema,
  TextAttribute,
  ComponentAttribute,
  DateAttribute,
  UIDAttribute,
  MediaAttribute,
  RichTextAttribute,
  DynamicZoneAttribute,
  ComponentSchema,
  CustomField,
} from '@strapi/strapi';

export interface AdminPermission extends CollectionTypeSchema {
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
    action: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    subject: StringAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    properties: JSONAttribute & DefaultTo<{}>;
    conditions: JSONAttribute & DefaultTo<[]>;
    role: RelationAttribute<'admin::permission', 'manyToOne', 'admin::role'>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface AdminUser extends CollectionTypeSchema {
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
    firstname: StringAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    lastname: StringAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    username: StringAttribute;
    email: EmailAttribute &
      RequiredAttribute &
      PrivateAttribute &
      UniqueAttribute &
      SetMinMaxLength<{
        minLength: 6;
      }>;
    password: PasswordAttribute &
      PrivateAttribute &
      SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: StringAttribute & PrivateAttribute;
    registrationToken: StringAttribute & PrivateAttribute;
    isActive: BooleanAttribute & PrivateAttribute & DefaultTo<false>;
    roles: RelationAttribute<'admin::user', 'manyToMany', 'admin::role'> &
      PrivateAttribute;
    blocked: BooleanAttribute & PrivateAttribute & DefaultTo<false>;
    preferedLanguage: StringAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<'admin::user', 'oneToOne', 'admin::user'> &
      PrivateAttribute;
    updatedBy: RelationAttribute<'admin::user', 'oneToOne', 'admin::user'> &
      PrivateAttribute;
  };
}

export interface AdminRole extends CollectionTypeSchema {
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
    name: StringAttribute &
      RequiredAttribute &
      UniqueAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    code: StringAttribute &
      RequiredAttribute &
      UniqueAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    description: StringAttribute;
    users: RelationAttribute<'admin::role', 'manyToMany', 'admin::user'>;
    permissions: RelationAttribute<
      'admin::role',
      'oneToMany',
      'admin::permission'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<'admin::role', 'oneToOne', 'admin::user'> &
      PrivateAttribute;
    updatedBy: RelationAttribute<'admin::role', 'oneToOne', 'admin::user'> &
      PrivateAttribute;
  };
}

export interface AdminApiToken extends CollectionTypeSchema {
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
    name: StringAttribute &
      RequiredAttribute &
      UniqueAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    description: StringAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }> &
      DefaultTo<''>;
    type: EnumerationAttribute<['read-only', 'full-access', 'custom']> &
      RequiredAttribute &
      DefaultTo<'read-only'>;
    accessKey: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: DateTimeAttribute;
    permissions: RelationAttribute<
      'admin::api-token',
      'oneToMany',
      'admin::api-token-permission'
    >;
    expiresAt: DateTimeAttribute;
    lifespan: BigIntegerAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface AdminApiTokenPermission extends CollectionTypeSchema {
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
    action: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    token: RelationAttribute<
      'admin::api-token-permission',
      'manyToOne',
      'admin::api-token'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface AdminTransferToken extends CollectionTypeSchema {
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
    name: StringAttribute &
      RequiredAttribute &
      UniqueAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    description: StringAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }> &
      DefaultTo<''>;
    accessKey: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: DateTimeAttribute;
    permissions: RelationAttribute<
      'admin::transfer-token',
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    expiresAt: DateTimeAttribute;
    lifespan: BigIntegerAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface AdminTransferTokenPermission extends CollectionTypeSchema {
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
    action: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    token: RelationAttribute<
      'admin::transfer-token-permission',
      'manyToOne',
      'admin::transfer-token'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface PluginUploadFile extends CollectionTypeSchema {
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
    name: StringAttribute & RequiredAttribute;
    alternativeText: StringAttribute;
    caption: StringAttribute;
    width: IntegerAttribute;
    height: IntegerAttribute;
    formats: JSONAttribute;
    hash: StringAttribute & RequiredAttribute;
    ext: StringAttribute;
    mime: StringAttribute & RequiredAttribute;
    size: DecimalAttribute & RequiredAttribute;
    url: StringAttribute & RequiredAttribute;
    previewUrl: StringAttribute;
    provider: StringAttribute & RequiredAttribute;
    provider_metadata: JSONAttribute;
    related: RelationAttribute<'plugin::upload.file', 'morphToMany'>;
    folder: RelationAttribute<
      'plugin::upload.file',
      'manyToOne',
      'plugin::upload.folder'
    > &
      PrivateAttribute;
    folderPath: StringAttribute &
      RequiredAttribute &
      PrivateAttribute &
      SetMinMax<{
        min: 1;
      }>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface PluginUploadFolder extends CollectionTypeSchema {
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
    name: StringAttribute &
      RequiredAttribute &
      SetMinMax<{
        min: 1;
      }>;
    pathId: IntegerAttribute & RequiredAttribute & UniqueAttribute;
    parent: RelationAttribute<
      'plugin::upload.folder',
      'manyToOne',
      'plugin::upload.folder'
    >;
    children: RelationAttribute<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.folder'
    >;
    files: RelationAttribute<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.file'
    >;
    path: StringAttribute &
      RequiredAttribute &
      SetMinMax<{
        min: 1;
      }>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface PluginI18NLocale extends CollectionTypeSchema {
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
    name: StringAttribute &
      SetMinMax<{
        min: 1;
        max: 50;
      }>;
    code: StringAttribute & UniqueAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface PluginUsersPermissionsPermission extends CollectionTypeSchema {
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
    action: StringAttribute & RequiredAttribute;
    role: RelationAttribute<
      'plugin::users-permissions.permission',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface PluginUsersPermissionsRole extends CollectionTypeSchema {
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
    name: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 3;
      }>;
    description: StringAttribute;
    type: StringAttribute & UniqueAttribute;
    permissions: RelationAttribute<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    users: RelationAttribute<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.user'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface PluginUsersPermissionsUser extends CollectionTypeSchema {
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
    username: StringAttribute &
      RequiredAttribute &
      UniqueAttribute &
      SetMinMaxLength<{
        minLength: 3;
      }>;
    email: EmailAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: StringAttribute;
    password: PasswordAttribute &
      PrivateAttribute &
      SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: StringAttribute & PrivateAttribute;
    confirmationToken: StringAttribute & PrivateAttribute;
    confirmed: BooleanAttribute & DefaultTo<false>;
    blocked: BooleanAttribute & DefaultTo<false>;
    role: RelationAttribute<
      'plugin::users-permissions.user',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiAboutPageAboutPage extends SingleTypeSchema {
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
    title: StringAttribute & RequiredAttribute;
    description: TextAttribute & RequiredAttribute;
    expertsSectionManagersList: ComponentAttribute<'about.employee', true> &
      RequiredAttribute;
    expertsSectionManagersBlockTitle: StringAttribute & RequiredAttribute;
    expertsSectionExpertsList: ComponentAttribute<'about.employee', true> &
      RequiredAttribute;
    expertsSectionExpertsBlockTitle: StringAttribute & RequiredAttribute;
    expertsSectionTitle: StringAttribute & RequiredAttribute;
    expertsSectionDescription: TextAttribute & RequiredAttribute;
    historySectionTitle: StringAttribute & RequiredAttribute;
    historySectionDescription: TextAttribute & RequiredAttribute;
    historySectionHistoryItems: ComponentAttribute<'about.history-item', true> &
      RequiredAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::about-page.about-page',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::about-page.about-page',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiAnalyticArticleAnalyticArticle
  extends CollectionTypeSchema {
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
    title: StringAttribute & RequiredAttribute;
    topic: TextAttribute & RequiredAttribute;
    published: DateAttribute & RequiredAttribute;
    tag: StringAttribute;
    articleText: ComponentAttribute<'article-section.article-section', true>;
    slug: UIDAttribute<'api::analytic-article.analytic-article', 'title'>;
    tableOfContent: StringAttribute;
    files: MediaAttribute;
    titleOfHelpfulFiles: StringAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::analytic-article.analytic-article',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::analytic-article.analytic-article',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiAnalyticsPageAnalyticsPage extends SingleTypeSchema {
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
    title: StringAttribute & RequiredAttribute;
    description: TextAttribute & RequiredAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::analytics-page.analytics-page',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::analytics-page.analytics-page',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiClientClient extends CollectionTypeSchema {
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
    name: StringAttribute & RequiredAttribute;
    logo: MediaAttribute & RequiredAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::client.client',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::client.client',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiConfigConfig extends SingleTypeSchema {
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
    seo: ComponentAttribute<'share.seo'> & RequiredAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::config.config',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::config.config',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiHeaderHeader extends SingleTypeSchema {
  info: {
    singularName: 'header';
    pluralName: 'headers';
    displayName: 'Header';
  };
  attributes: {
    navItem: ComponentAttribute<'share.nav-item', true>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::header.header',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::header.header',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiMainPageMainPage extends SingleTypeSchema {
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
    title: TextAttribute &
      RequiredAttribute &
      DefaultTo<'Technologically preventing the unacceptable for business and government'>;
    subtitle: TextAttribute &
      DefaultTo<'Bringing experts and enthusiasts together to&nbsp;create cutting-edge cybersecurity technology'>;
    headingVideo: MediaAttribute;
    statistics: ComponentAttribute<'analytics.statistics-summary'>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::main-page.main-page',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::main-page.main-page',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiNewsItemNewsItem extends CollectionTypeSchema {
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
    previewImage: MediaAttribute & RequiredAttribute;
    published: DateAttribute & RequiredAttribute;
    title: StringAttribute & RequiredAttribute;
    isEvent: BooleanAttribute & DefaultTo<false>;
    eventDate: DateAttribute;
    slug: UIDAttribute<'api::news-item.news-item', 'title'>;
    topic: TextAttribute & RequiredAttribute;
    filesTitle: StringAttribute;
    files: MediaAttribute;
    articleText: RichTextAttribute;
    eventForm: ComponentAttribute<'webinar.webinar-form'>;
    eventYoutubeVideoId: StringAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::news-item.news-item',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::news-item.news-item',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiNewsPageNewsPage extends SingleTypeSchema {
  info: {
    singularName: 'news-page';
    pluralName: 'news-pages';
    displayName: 'NewsPage';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    title: StringAttribute & RequiredAttribute;
    description: TextAttribute & RequiredAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::news-page.news-page',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::news-page.news-page',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiProductProduct extends CollectionTypeSchema {
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
    title: StringAttribute & RequiredAttribute;
    subtitle: TextAttribute;
    icon: MediaAttribute & RequiredAttribute;
    slug: UIDAttribute;
    bannerImage: MediaAttribute;
    blocks: DynamicZoneAttribute<
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
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::product.product',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::product.product',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiWebinarRequestWebinarRequest extends CollectionTypeSchema {
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
    fullName: StringAttribute & RequiredAttribute;
    email: EmailAttribute & RequiredAttribute;
    phone: StringAttribute;
    eventName: StringAttribute & RequiredAttribute;
    eventDate: DateAttribute & RequiredAttribute;
    companyName: StringAttribute;
    companyPosition: StringAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::webinar-request.webinar-request',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::webinar-request.webinar-request',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface AboutAchievementsItem extends ComponentSchema {
  info: {
    displayName: 'AchievementsItem';
    description: '';
  };
  attributes: {
    value: TextAttribute & RequiredAttribute;
  };
}

export interface AboutEmployee extends ComponentSchema {
  info: {
    displayName: 'employee';
    description: '';
  };
  attributes: {
    name: StringAttribute & RequiredAttribute;
    roles: TextAttribute & RequiredAttribute;
    photo: MediaAttribute & RequiredAttribute;
  };
}

export interface AboutHistoryItem extends ComponentSchema {
  info: {
    displayName: 'HistoryItem';
    description: '';
  };
  attributes: {
    date: StringAttribute & RequiredAttribute;
    number: StringAttribute & RequiredAttribute;
    numberDescription: StringAttribute & RequiredAttribute;
    achievements: ComponentAttribute<'about.achievements-item', true>;
  };
}

export interface AnalyticsStatisticsItem extends ComponentSchema {
  info: {
    displayName: 'StatisticsItem';
  };
  attributes: {
    value: StringAttribute & RequiredAttribute;
    title: TextAttribute & RequiredAttribute;
  };
}

export interface AnalyticsStatisticsSummary extends ComponentSchema {
  info: {
    displayName: 'StatisticsSummary';
    description: '';
  };
  attributes: {
    first: ComponentAttribute<'analytics.statistics-item'> & RequiredAttribute;
    second: ComponentAttribute<'analytics.statistics-item'> & RequiredAttribute;
    third: ComponentAttribute<'analytics.statistics-item'> & RequiredAttribute;
    fourth: ComponentAttribute<'analytics.statistics-item'> & RequiredAttribute;
    fifth: ComponentAttribute<'analytics.statistics-item'> & RequiredAttribute;
  };
}

export interface ArticleSectionArticleSection extends ComponentSchema {
  info: {
    displayName: 'ArticleSectionItem';
    description: '';
  };
  attributes: {
    value: RichTextAttribute & RequiredAttribute;
    number: IntegerAttribute;
    title: RichTextAttribute &
      CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'toolbar';
        }
      >;
  };
}

export interface ProductFaqBlock extends ComponentSchema {
  info: {
    displayName: 'FAQBlock';
    description: '';
  };
  attributes: {
    sectionId: StringAttribute & RequiredAttribute;
    title: StringAttribute & RequiredAttribute & DefaultTo<'F.A.Q.'>;
    description: TextAttribute &
      DefaultTo<'Quick answers to&nbsp;questions you may have. Can&rsquo;t find what you&rsquo;re looking for? Check out our full documentation'>;
    items: ComponentAttribute<'product.faq-item', true>;
  };
}

export interface ProductFaqItem extends ComponentSchema {
  info: {
    displayName: 'FAQItem';
    description: '';
  };
  attributes: {
    question: StringAttribute & RequiredAttribute;
    answer: TextAttribute & RequiredAttribute;
    icon: MediaAttribute;
  };
}

export interface ProductFilesBlock extends ComponentSchema {
  info: {
    displayName: 'FilesBlock';
    description: '';
  };
  attributes: {
    title: StringAttribute & RequiredAttribute & DefaultTo<'Helpful info'>;
    description: TextAttribute &
      RequiredAttribute &
      DefaultTo<'At&nbsp;PT&nbsp;Security, we&nbsp;take a&nbsp;comprehensive approach to&nbsp;cybersecurity. Our solutions are designed to&nbsp;protect your business from a&nbsp;wide range of&nbsp;threats, both internal and external.'>;
    files: MediaAttribute & RequiredAttribute;
    sectionId: StringAttribute & RequiredAttribute;
  };
}

export interface ProductImageSlide extends ComponentSchema {
  info: {
    displayName: 'ImageSlide';
  };
  attributes: {
    image: MediaAttribute & RequiredAttribute;
    caption: TextAttribute;
  };
}

export interface ProductImagedCard extends ComponentSchema {
  info: {
    displayName: 'ImagedCard';
    description: '';
  };
  attributes: {
    title: StringAttribute & RequiredAttribute;
    description: TextAttribute;
    image: MediaAttribute & RequiredAttribute;
  };
}

export interface ProductImagedCardsGridBlock extends ComponentSchema {
  info: {
    displayName: 'ImagedCardsGridBlock';
    description: '';
  };
  attributes: {
    sectionId: StringAttribute & RequiredAttribute;
    title: StringAttribute & RequiredAttribute;
    description: TextAttribute;
    items: ComponentAttribute<'product.imaged-card', true>;
  };
}

export interface ProductImagesSliderBlock extends ComponentSchema {
  info: {
    displayName: 'ImagesSliderBlock';
    description: '';
  };
  attributes: {
    sectionId: StringAttribute & RequiredAttribute;
    title: StringAttribute & RequiredAttribute;
    description: TextAttribute;
    slides: ComponentAttribute<'product.image-slide', true>;
  };
}

export interface ProductOtherProductsBlock extends ComponentSchema {
  info: {
    displayName: 'OtherProductsBlock';
  };
  attributes: {
    sectionId: StringAttribute & RequiredAttribute;
    title: StringAttribute & RequiredAttribute & DefaultTo<'Our Products'>;
    description: TextAttribute &
      DefaultTo<'At&nbsp;PT&nbsp;Security, we&nbsp;take a&nbsp;comprehensive approach to&nbsp;cybersecurity. Our solutions are designed to&nbsp;protect your business from a&nbsp;wide range of&nbsp;threats, both internal and external.'>;
  };
}

export interface ProductProductOverviewBlock extends ComponentSchema {
  info: {
    displayName: 'ProductOverviewBlock';
    description: '';
  };
  attributes: {
    sectionId: StringAttribute & RequiredAttribute;
    title: StringAttribute & RequiredAttribute & DefaultTo<'Product Overview'>;
    content: RichTextAttribute &
      CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'toolbar';
        }
      >;
  };
}

export interface ProductProductStatisticsItem extends ComponentSchema {
  info: {
    displayName: 'ProductStatisticsItem';
  };
  attributes: {
    value: StringAttribute & RequiredAttribute;
    label: TextAttribute & RequiredAttribute;
  };
}

export interface ProductProductTasksBlock extends ComponentSchema {
  info: {
    displayName: 'ProductTasksBlock';
    description: '';
  };
  attributes: {
    sectionId: StringAttribute & RequiredAttribute;
    title: StringAttribute & RequiredAttribute;
    description: TextAttribute & RequiredAttribute;
    tasks: ComponentAttribute<'product.imaged-card', true>;
    statisticsTitile: StringAttribute;
    statisticsValues: ComponentAttribute<
      'product.product-statistics-item',
      true
    >;
  };
}

export interface ProductWelcomeToPilotBlock extends ComponentSchema {
  info: {
    displayName: 'WelcomeToPilotBlock';
    description: '';
  };
  attributes: {
    title: StringAttribute &
      RequiredAttribute &
      DefaultTo<'Quick start and scalability'>;
    description: TextAttribute &
      RequiredAttribute &
      DefaultTo<'A&nbsp;flexible mix of&nbsp;components makes PT&nbsp;ISIM easy and quick to&nbsp;deploy, with minimal configuration required, on&nbsp;infrastructures belonging to&nbsp;companies in&nbsp;any industry. Whether rapid or&nbsp;gradual, scaling up&nbsp;is&nbsp;always a&nbsp;smooth process on&nbsp;even the most complex networks.'>;
    buttonText: StringAttribute &
      RequiredAttribute &
      DefaultTo<'Order pilot now'>;
    image: MediaAttribute & RequiredAttribute;
  };
}

export interface ShareNavItem extends ComponentSchema {
  info: {
    displayName: 'navItem';
  };
  attributes: {
    title: StringAttribute & RequiredAttribute;
    link: StringAttribute & RequiredAttribute;
    navSubItem: ComponentAttribute<'share.nav-sub-item', true>;
  };
}

export interface ShareNavSubItem extends ComponentSchema {
  info: {
    displayName: 'navSubItem';
    description: '';
  };
  attributes: {
    title: StringAttribute & RequiredAttribute;
    description: StringAttribute;
    link: StringAttribute & RequiredAttribute;
  };
}

export interface ShareSeo extends ComponentSchema {
  info: {
    displayName: 'Seo';
    description: '';
  };
  attributes: {
    title: StringAttribute & RequiredAttribute & DefaultTo<'PT Security'>;
    description: TextAttribute;
  };
}

export interface ShareTest extends ComponentSchema {
  info: {
    displayName: 'test';
  };
  attributes: {};
}

export interface WebinarWebinarForm extends ComponentSchema {
  info: {
    displayName: 'WebinarForm';
    description: '';
  };
  attributes: {
    title: StringAttribute & DefaultTo<'Registration for the webinar'>;
    fieldName: StringAttribute & RequiredAttribute & DefaultTo<'Your name'>;
    fieldCompany: StringAttribute &
      RequiredAttribute &
      DefaultTo<'Company name'>;
    fieldPosition: StringAttribute &
      RequiredAttribute &
      DefaultTo<'Your position'>;
    fieldPhone: StringAttribute & RequiredAttribute & DefaultTo<'Your phone'>;
    fieldEmail: StringAttribute & RequiredAttribute & DefaultTo<'Your email'>;
    buttonSubmit: StringAttribute &
      RequiredAttribute &
      DefaultTo<'Registration'>;
    checkboxSubscription: StringAttribute &
      RequiredAttribute &
      DefaultTo<'I agree to receive advertising and information messages.'>;
    checkboxConsentsTerms: StringAttribute &
      RequiredAttribute &
      DefaultTo<'I consent to the processing of my personal data in accordance with the terms of the <a href="#">privacy policy</a>.'>;
  };
}

declare global {
  namespace Strapi {
    interface Schemas {
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
      'api::analytic-article.analytic-article': ApiAnalyticArticleAnalyticArticle;
      'api::analytics-page.analytics-page': ApiAnalyticsPageAnalyticsPage;
      'api::client.client': ApiClientClient;
      'api::config.config': ApiConfigConfig;
      'api::header.header': ApiHeaderHeader;
      'api::main-page.main-page': ApiMainPageMainPage;
      'api::news-item.news-item': ApiNewsItemNewsItem;
      'api::news-page.news-page': ApiNewsPageNewsPage;
      'api::product.product': ApiProductProduct;
      'api::webinar-request.webinar-request': ApiWebinarRequestWebinarRequest;
      'about.achievements-item': AboutAchievementsItem;
      'about.employee': AboutEmployee;
      'about.history-item': AboutHistoryItem;
      'analytics.statistics-item': AnalyticsStatisticsItem;
      'analytics.statistics-summary': AnalyticsStatisticsSummary;
      'article-section.article-section': ArticleSectionArticleSection;
      'product.faq-block': ProductFaqBlock;
      'product.faq-item': ProductFaqItem;
      'product.files-block': ProductFilesBlock;
      'product.image-slide': ProductImageSlide;
      'product.imaged-card': ProductImagedCard;
      'product.imaged-cards-grid-block': ProductImagedCardsGridBlock;
      'product.images-slider-block': ProductImagesSliderBlock;
      'product.other-products-block': ProductOtherProductsBlock;
      'product.product-overview-block': ProductProductOverviewBlock;
      'product.product-statistics-item': ProductProductStatisticsItem;
      'product.product-tasks-block': ProductProductTasksBlock;
      'product.welcome-to-pilot-block': ProductWelcomeToPilotBlock;
      'share.nav-item': ShareNavItem;
      'share.nav-sub-item': ShareNavSubItem;
      'share.seo': ShareSeo;
      'share.test': ShareTest;
      'webinar.webinar-form': WebinarWebinarForm;
    }
  }
}
