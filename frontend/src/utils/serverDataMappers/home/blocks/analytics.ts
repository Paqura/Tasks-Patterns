import { GetAttributesValues } from '@admin/general-schemas'

import { TAnalyticBlocksData } from '@/components/HomePage/components/Analytics'
import { TStatisticsValue } from '@/components/HomePage/components/Analytics/components/Statistics'
import { mapVideoMediaFile } from '@/utils/serverDataMappers/media'

type TBackendBlockData = Extract<
    Exclude<GetAttributesValues<'api::main-page.main-page'>['blocks'], undefined>[0],
    { __component: 'main.analytics-block' }
>

const mapStatisticsCard = (
    data?: GetAttributesValues<'main.statistics-item'>
): TStatisticsValue => ({
    title: data?.title || '',
    value: data?.value || '',
})

export const mapAnalyticsBlockServerData = ({
    block,
    articles,
}: {
    block: TBackendBlockData
    articles: GetAttributesValues<'api::analytic-article.analytic-article'>[]
}): TAnalyticBlocksData => {
    return {
        sectionId: block.sectionId || '',
        title: block.title || '',
        description: block.description,
        articles: {
            title: block.title || '',
            allArticlesLinkText: block.allArticlesLinkText || 'All articles',
            articles: articles.map((article) => {
                return {
                    title: article.title || '',
                    tag: article.tag,
                    date: article.published && article.published,
                    href: `/analytics/${article.slug}` || '/',
                }
            }),
        },
        statistics: {
            title: block.statisticsTitle || '',
            description: block.statisticsDescription,
            contactWelcomeText: block.contactUsText || '',
            contactButtonText: block.contactUsButtonText || '',
            videoBackground: mapVideoMediaFile(block.videoBackground),
            first: mapStatisticsCard(block.staisticsCardFirst),
            second: mapStatisticsCard(block.staisticsCardSecond),
            third: mapStatisticsCard(block.staisticsCardThird),
            fourth: mapStatisticsCard(block.staisticsCardFourth),
            fifth: mapStatisticsCard(block.staisticsCardFifth),
        },
    }
}
