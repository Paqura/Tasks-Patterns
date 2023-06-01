import type { Schema, Attribute } from '@strapi/strapi';

export interface AboutAchievementsItem extends Schema.Component {
  collectionName: 'components_about_achievements_items';
  info: {
    displayName: 'AchievementsItem';
    description: '';
  };
  attributes: {
    value: Attribute.Text & Attribute.Required;
  };
}

export interface AboutEmployee extends Schema.Component {
  collectionName: 'components_about_employees';
  info: {
    displayName: 'employee';
    description: '';
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    roles: Attribute.Text & Attribute.Required;
    photo: Attribute.Media & Attribute.Required;
  };
}

export interface AboutHistoryItem extends Schema.Component {
  collectionName: 'components_about_history_items';
  info: {
    displayName: 'HistoryItem';
    description: '';
  };
  attributes: {
    date: Attribute.String & Attribute.Required;
    number: Attribute.String & Attribute.Required;
    numberDescription: Attribute.String & Attribute.Required;
    achievements: Attribute.Component<'about.achievements-item', true>;
  };
}

export interface AnyQuestionsGeneralQuestions extends Schema.Component {
  collectionName: 'components_any_questions_general_questions';
  info: {
    displayName: 'GeneralQuestions';
    description: '';
  };
  attributes: {
    title: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<'General<br/> questions'>;
    description: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<"Have a question? Contact us and&nbsp;we'll&nbsp;help.">;
    fieldName: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<'Your name'>;
    fieldPhone: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<'Your phone'>;
    fieldEmail: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<'Or Email'>;
    fieldComment: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<'Your question'>;
    checkboxConsentsTerms: Attribute.Text &
      Attribute.Required &
      Attribute.DefaultTo<'I consent to the processing of my personal data in accordance with the terms of the <a href=\\"#\\">privacy policy</a>.'>;
    checkboxSubscription: Attribute.Text &
      Attribute.Required &
      Attribute.DefaultTo<'I agree to receive advertising and information messages.'>;
    buttonSubmit: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<'SEND'>;
    successTitle: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<'Thank you, your application has been sent'>;
    successDescription: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<'Our specialists will contact you soon.'>;
  };
}

export interface AnyQuestionsPartnership extends Schema.Component {
  collectionName: 'components_any_questions_partnership';
  info: {
    displayName: 'Partnership';
    description: '';
  };
  attributes: {
    title: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<'Partnership'>;
    description: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<"Let's partner <br/>and make the world <br/>a safer place.">;
    fieldName: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<'Your name'>;
    fieldCompanyName: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<'Company name'>;
    fieldPhone: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<'Your phone'>;
    fieldEmail: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<'Or Email'>;
    fieldAddress: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<'Address'>;
    fieldComment: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<'Your question'>;
    checkboxConsentsTerms: Attribute.Text &
      Attribute.Required &
      Attribute.DefaultTo<'I consent to the processing of my personal data in accordance with the terms of the <a href=\\"#\\">privacy policy</a>.'>;
    checkboxSubscription: Attribute.Text &
      Attribute.Required &
      Attribute.DefaultTo<'I agree to receive advertising and information messages.'>;
    buttonSubmit: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<'Send'>;
    successTitle: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<'Thank you, your application has been sent'>;
    successDescription: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<'Our specialists will contact you soon.'>;
  };
}

export interface AnyQuestionsPilotApplication extends Schema.Component {
  collectionName: 'components_any_questions_pilot_application';
  info: {
    displayName: 'PilotApplication';
    description: '';
  };
  attributes: {
    title: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<'Pilot<br/> application'>;
    description: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<'Test drive our solutions. Get started with a pilot program.'>;
    fieldProduct: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<'Select a product'>;
    fieldCompanyName: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<'Company name'>;
    fieldName: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<'Your name'>;
    fieldPhone: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<'Your phone'>;
    fieldEmail: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<'Or Email'>;
    fieldComment: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<'Your question'>;
    checkboxConsentsTerms: Attribute.Text &
      Attribute.Required &
      Attribute.DefaultTo<'I consent to the processing of my personal data in accordance with the terms of the <a href=\\"#\\">privacy policy</a>.'>;
    checkboxSubscription: Attribute.Text &
      Attribute.Required &
      Attribute.DefaultTo<'I agree to receive advertising and information messages.'>;
    buttonSubmit: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<'SEND'>;
    successTitle: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<'Thank you, your application has been sent'>;
    successDescription: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<'Our specialists will contact you soon.'>;
  };
}

export interface ArticleSectionArticleSection extends Schema.Component {
  collectionName: 'components_analytics_article_sections';
  info: {
    displayName: 'ArticleSectionItem';
    description: '';
  };
  attributes: {
    value: Attribute.RichText &
      Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'toolbar';
        }
      >;
    title: Attribute.String;
  };
}

export interface EmailEmailTemplate extends Schema.Component {
  collectionName: 'components_email_email_templates';
  info: {
    displayName: 'EmailTemplate';
    description: '';
  };
  attributes: {
    subject: Attribute.String & Attribute.Required;
    html: Attribute.Text & Attribute.Required;
    text: Attribute.Text & Attribute.Required;
  };
}

export interface FooterNavBlockItem extends Schema.Component {
  collectionName: 'components_footer_nav_block_items';
  info: {
    displayName: 'NavBlockItem';
    description: '';
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    link: Attribute.String;
  };
}

export interface FooterNavBlock extends Schema.Component {
  collectionName: 'components_footer_nav_blocks';
  info: {
    displayName: 'NavBlock';
    description: '';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    items: Attribute.Component<'footer.nav-block-item', true>;
  };
}

export interface MainAdvantageCard extends Schema.Component {
  collectionName: 'components_main_advantage_cards';
  info: {
    displayName: 'AdvantageCard';
    description: '';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    description: Attribute.Text & Attribute.Required;
  };
}

export interface MainAdvantagesBlock extends Schema.Component {
  collectionName: 'components_main_advantages_blocks';
  info: {
    displayName: 'AdvantagesBlock';
    description: '';
  };
  attributes: {
    sectionId: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<'advantages'>;
    title: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<'Why Positive Technologies?'>;
    description: Attribute.Text &
      Attribute.DefaultTo<'We&nbsp;have extensive experience in&nbsp;protecting businesses in&nbsp;various sectors of&nbsp;the economy, we&nbsp;know the nature of&nbsp;today&rsquo;s threats and regulatory requirements well&nbsp;&mdash; and we&nbsp;put that experience and that knowledge into everything we&nbsp;do'>;
    expertiseCard: Attribute.Component<'main.advantage-card'> &
      Attribute.Required;
    customerServiceCard: Attribute.Component<'main.advantage-card'> &
      Attribute.Required;
    trackRecordCard: Attribute.Component<'main.advantage-card'> &
      Attribute.Required;
    technologyCard: Attribute.Component<'main.advantage-card'> &
      Attribute.Required;
    solutionsCard: Attribute.Component<'main.advantage-card'> &
      Attribute.Required;
    welcomeToContact: Attribute.Component<'main.welcome-to-contact'>;
  };
}

export interface MainAnalyticsBlock extends Schema.Component {
  collectionName: 'components_main_analytics_blocks';
  info: {
    displayName: 'AnalyticsBlock';
    description: '';
  };
  attributes: {
    sectionId: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<'analytics'>;
    title: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<'Analytics'>;
    description: Attribute.Text &
      Attribute.Required &
      Attribute.DefaultTo<'Our team of&nbsp;experts stays up-to-date on&nbsp;the latest threats and trends in&nbsp;the industry, and we&rsquo;re always looking for ways to&nbsp;improve our solutions and services.'>;
    articlesListTitle: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<'Analytical articles'>;
    allArticlesLinkText: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<'All articles'>;
    statisticsTitle: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<'Summary statistics for 2022'>;
    statisticsDescription: Attribute.Text &
      Attribute.DefaultTo<'Our software is&nbsp;designed to&nbsp;provide the highest level of&nbsp;protection while minimizing disruption to&nbsp;your business. We&nbsp;use the latest technology and techniques to&nbsp;stay ahead of&nbsp;the ever-evolving threat landscape. And with years of&nbsp;experience working with businesses of&nbsp;all sizes and in&nbsp;all industries, our team of&nbsp;experts has the knowledge and expertise to&nbsp;keep your organization secure.'>;
    contactUsText: Attribute.Text &
      Attribute.Required &
      Attribute.DefaultTo<'Contact&nbsp;us today to&nbsp;learn more about our cybersecurity solutions and how we&nbsp;can help protect your business.'>;
    contactUsButtonText: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<'Contact us'>;
    staisticsCardFirst: Attribute.Component<'main.statistics-item'> &
      Attribute.Required;
    staisticsCardSecond: Attribute.Component<'main.statistics-item'> &
      Attribute.Required;
    staisticsCardThird: Attribute.Component<'main.statistics-item'> &
      Attribute.Required;
    staisticsCardFourth: Attribute.Component<'main.statistics-item'> &
      Attribute.Required;
    staisticsCardFifth: Attribute.Component<'main.statistics-item'> &
      Attribute.Required;
    videoBackground: Attribute.Media;
  };
}

export interface MainClients extends Schema.Component {
  collectionName: 'components_main_clients';
  info: {
    displayName: 'Clients';
  };
  attributes: {
    title: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<'Our Clients'>;
    description: Attribute.Text &
      Attribute.DefaultTo<'Our technology and services are used by&nbsp;more than 2,300 organisations worldwide, including&nbsp;80% of&nbsp;the Expert 400.'>;
  };
}

export interface MainNewsBlock extends Schema.Component {
  collectionName: 'components_main_news_blocks';
  info: {
    displayName: 'NewsBlock';
  };
  attributes: {
    sectionId: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<'news'>;
    title: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<'Events & News'>;
    description: Attribute.Text &
      Attribute.DefaultTo<'Stay up-to-date with the latest news and events in&#160;the cybersecurity industry with&#160;us. From webinars and training sessions to&#160;conferences and hackathons, we&#146;ve got you covered with all the latest happenings in&#160;the cybersecurity space.'>;
    allNewsLinkText: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<'All news'>;
  };
}

export interface MainProductsBlock extends Schema.Component {
  collectionName: 'components_main_products_blocks';
  info: {
    displayName: 'ProductsBlock';
    description: '';
  };
  attributes: {
    sectionId: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<'products'>;
    title: Attribute.Text &
      Attribute.Required &
      Attribute.DefaultTo<'Our Products'>;
    description: Attribute.Text &
      Attribute.Required &
      Attribute.DefaultTo<'At&nbsp;PT&nbsp;Security, we&nbsp;take a&nbsp;comprehensive approach to&nbsp;cybersecurity. Our solutions are designed to&nbsp;protect your business from a&nbsp;wide range of&nbsp;threats, both internal and external.'>;
    allProductsLinkText: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<'All products'>;
    clients: Attribute.Component<'main.clients'>;
  };
}

export interface MainStatisticsItem extends Schema.Component {
  collectionName: 'components_analytics_statistics_items';
  info: {
    displayName: 'StatisticsItem';
  };
  attributes: {
    value: Attribute.String & Attribute.Required;
    title: Attribute.Text & Attribute.Required;
  };
}

export interface MainToolCard extends Schema.Component {
  collectionName: 'components_main_tool_cards';
  info: {
    displayName: 'ToolCard';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    description: Attribute.Text & Attribute.Required;
  };
}

export interface MainToolsBlock extends Schema.Component {
  collectionName: 'components_main_tools_blocks';
  info: {
    displayName: 'ToolsBlock';
    description: '';
  };
  attributes: {
    sectionId: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<'tools'>;
    title: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<'What we&nbsp;do?'>;
    description: Attribute.Text &
      Attribute.DefaultTo<'At&nbsp;PT&nbsp;Security, we&nbsp;take a&nbsp;comprehensive approach to&nbsp;cybersecurity. Our solutions are designed to&nbsp;protect your business from a&nbsp;wide range of&nbsp;threats, both internal and external.'>;
    assessmentCard: Attribute.Component<'main.tool-card'> & Attribute.Required;
    complianceCard: Attribute.Component<'main.tool-card'> & Attribute.Required;
    monitoringCard: Attribute.Component<'main.tool-card'> & Attribute.Required;
    trainingCard: Attribute.Component<'main.tool-card'> & Attribute.Required;
  };
}

export interface MainWelcomeToContact extends Schema.Component {
  collectionName: 'components_main_welcome_to_contacts';
  info: {
    displayName: 'WelcomeToContact';
    description: '';
  };
  attributes: {
    title: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<'Ready to&nbsp;secure your business?'>;
    accentText: Attribute.String &
      Attribute.DefaultTo<'Get&nbsp;in&nbsp;touch'>;
    description: Attribute.Text &
      Attribute.Required &
      Attribute.DefaultTo<'Contact&nbsp;us today to&nbsp;learn how our cybersecurity solutions can help protect your organization from threats and vulnerabilities. Don&rsquo;t wait until it&rsquo;s too late&nbsp;&mdash; take action now to&nbsp;ensure the safety and integrity of&nbsp;your data.'>;
    buttonText: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<'Contact us'>;
  };
}

export interface ProductFaqBlock extends Schema.Component {
  collectionName: 'components_product_faq_blocks';
  info: {
    displayName: 'FAQBlock';
    description: '';
  };
  attributes: {
    sectionId: Attribute.String & Attribute.Required;
    title: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<'F.A.Q.'>;
    description: Attribute.Text &
      Attribute.DefaultTo<'Quick answers to&nbsp;questions you may have. Can&rsquo;t find what you&rsquo;re looking for? Check out our full documentation'>;
    items: Attribute.Component<'product.faq-item', true>;
  };
}

export interface ProductFaqItem extends Schema.Component {
  collectionName: 'components_product_faq_items';
  info: {
    displayName: 'FAQItem';
    description: '';
  };
  attributes: {
    question: Attribute.String & Attribute.Required;
    answer: Attribute.Text & Attribute.Required;
    icon: Attribute.Media;
  };
}

export interface ProductFilesBlock extends Schema.Component {
  collectionName: 'components_product_files_blocks';
  info: {
    displayName: 'FilesBlock';
    description: '';
  };
  attributes: {
    title: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<'Helpful info'>;
    description: Attribute.Text &
      Attribute.Required &
      Attribute.DefaultTo<'At&nbsp;PT&nbsp;Security, we&nbsp;take a&nbsp;comprehensive approach to&nbsp;cybersecurity. Our solutions are designed to&nbsp;protect your business from a&nbsp;wide range of&nbsp;threats, both internal and external.'>;
    files: Attribute.Media & Attribute.Required;
    sectionId: Attribute.String & Attribute.Required;
  };
}

export interface ProductImageSlide extends Schema.Component {
  collectionName: 'components_product_image_slides';
  info: {
    displayName: 'ImageSlide';
  };
  attributes: {
    image: Attribute.Media & Attribute.Required;
    caption: Attribute.Text;
  };
}

export interface ProductImagedCard extends Schema.Component {
  collectionName: 'components_product_imaged_cards';
  info: {
    displayName: 'ImagedCard';
    description: '';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    description: Attribute.Text;
    image: Attribute.Media & Attribute.Required;
  };
}

export interface ProductImagedCardsGridBlock extends Schema.Component {
  collectionName: 'components_product_imaged_cards_grid_blocks';
  info: {
    displayName: 'ImagedCardsGridBlock';
    description: '';
  };
  attributes: {
    sectionId: Attribute.String & Attribute.Required;
    title: Attribute.String & Attribute.Required;
    description: Attribute.Text;
    items: Attribute.Component<'product.imaged-card', true>;
  };
}

export interface ProductImagesSliderBlock extends Schema.Component {
  collectionName: 'components_product_images_slider_blocks';
  info: {
    displayName: 'ImagesSliderBlock';
    description: '';
  };
  attributes: {
    sectionId: Attribute.String & Attribute.Required;
    title: Attribute.String & Attribute.Required;
    description: Attribute.Text;
    slides: Attribute.Component<'product.image-slide', true>;
  };
}

export interface ProductOtherProductsBlock extends Schema.Component {
  collectionName: 'components_product_other_products_blocks';
  info: {
    displayName: 'OtherProductsBlock';
    description: '';
  };
  attributes: {
    sectionId: Attribute.String & Attribute.Required;
    title: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<'Our Products'>;
    description: Attribute.Text &
      Attribute.DefaultTo<'At&nbsp;PT&nbsp;Security, we&nbsp;take a&nbsp;comprehensive approach to&nbsp;cybersecurity. Our solutions are designed to&nbsp;protect your business from a&nbsp;wide range of&nbsp;threats, both internal and external.'>;
    products: Attribute.Relation<
      'product.other-products-block',
      'oneToMany',
      'api::product.product'
    >;
  };
}

export interface ProductProductOverviewBlock extends Schema.Component {
  collectionName: 'components_product_product_overview_blocks';
  info: {
    displayName: 'ProductOverviewBlock';
    description: '';
  };
  attributes: {
    sectionId: Attribute.String & Attribute.Required;
    title: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<'Product Overview'>;
    content: Attribute.RichText &
      Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'toolbar';
        }
      >;
  };
}

export interface ProductProductStatisticsItem extends Schema.Component {
  collectionName: 'components_product_product_statistics_items';
  info: {
    displayName: 'ProductStatisticsItem';
  };
  attributes: {
    value: Attribute.String & Attribute.Required;
    label: Attribute.Text & Attribute.Required;
  };
}

export interface ProductProductTasksBlock extends Schema.Component {
  collectionName: 'components_product_product_tasks_blocks';
  info: {
    displayName: 'ProductTasksBlock';
    description: '';
  };
  attributes: {
    sectionId: Attribute.String & Attribute.Required;
    title: Attribute.String & Attribute.Required;
    description: Attribute.Text & Attribute.Required;
    tasks: Attribute.Component<'product.imaged-card', true>;
    statisticsTitile: Attribute.String;
    statisticsValues: Attribute.Component<
      'product.product-statistics-item',
      true
    >;
  };
}

export interface ProductWelcomeToPilotBlock extends Schema.Component {
  collectionName: 'components_product_welcome_to_pilot_blocks';
  info: {
    displayName: 'WelcomeToPilotBlock';
    description: '';
  };
  attributes: {
    title: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<'Quick start and scalability'>;
    description: Attribute.Text &
      Attribute.DefaultTo<'A&nbsp;flexible mix of&nbsp;components makes PT&nbsp;ISIM easy and quick to&nbsp;deploy, with minimal configuration required, on&nbsp;infrastructures belonging to&nbsp;companies in&nbsp;any industry. Whether rapid or&nbsp;gradual, scaling up&nbsp;is&nbsp;always a&nbsp;smooth process on&nbsp;even the most complex networks.'>;
    image: Attribute.Media;
    button: Attribute.Component<'share.link'>;
  };
}

export interface ShareLink extends Schema.Component {
  collectionName: 'components_share_links';
  info: {
    displayName: 'Link';
  };
  attributes: {
    text: Attribute.String & Attribute.Required;
    link: Attribute.String & Attribute.Required;
    targetBlank: Attribute.Boolean & Attribute.DefaultTo<false>;
  };
}

export interface ShareNavItem extends Schema.Component {
  collectionName: 'components_share_nav_items';
  info: {
    displayName: 'navItem';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    link: Attribute.String & Attribute.Required;
    navSubItem: Attribute.Component<'share.nav-sub-item', true>;
  };
}

export interface ShareNavSubItem extends Schema.Component {
  collectionName: 'components_share_nav_sub_items';
  info: {
    displayName: 'navSubItem';
    description: '';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    description: Attribute.String;
    link: Attribute.String & Attribute.Required;
  };
}

export interface ShareSeo extends Schema.Component {
  collectionName: 'components_share_seos';
  info: {
    displayName: 'Seo';
    description: '';
  };
  attributes: {
    title: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<'PT Security'>;
    description: Attribute.Text;
  };
}

export interface ShareTest extends Schema.Component {
  collectionName: 'components_share_tests';
  info: {
    displayName: 'test';
  };
  attributes: {};
}

declare module '@strapi/strapi' {
  export module Shared {
    export interface Components {
      'about.achievements-item': AboutAchievementsItem;
      'about.employee': AboutEmployee;
      'about.history-item': AboutHistoryItem;
      'any-questions.general-questions': AnyQuestionsGeneralQuestions;
      'any-questions.partnership': AnyQuestionsPartnership;
      'any-questions.pilot-application': AnyQuestionsPilotApplication;
      'article-section.article-section': ArticleSectionArticleSection;
      'email.email-template': EmailEmailTemplate;
      'footer.nav-block-item': FooterNavBlockItem;
      'footer.nav-block': FooterNavBlock;
      'main.advantage-card': MainAdvantageCard;
      'main.advantages-block': MainAdvantagesBlock;
      'main.analytics-block': MainAnalyticsBlock;
      'main.clients': MainClients;
      'main.news-block': MainNewsBlock;
      'main.products-block': MainProductsBlock;
      'main.statistics-item': MainStatisticsItem;
      'main.tool-card': MainToolCard;
      'main.tools-block': MainToolsBlock;
      'main.welcome-to-contact': MainWelcomeToContact;
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
      'share.link': ShareLink;
      'share.nav-item': ShareNavItem;
      'share.nav-sub-item': ShareNavSubItem;
      'share.seo': ShareSeo;
      'share.test': ShareTest;
    }
  }
}