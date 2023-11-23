import { CardsSlider } from '@/shared/ui/common/CardsSlider'
import { Link } from '@/shared/ui/common/Link'
import { PageSection } from '@/shared/ui/project/PageSection'
import { TWithSectionParams } from '@/types'

import styles from './index.module.scss'
import { NewsCard, TNewsCardProps } from './ui/NewsCard'

export type TNewsBlockData = TWithSectionParams<{
    allNewsLinkText: string
    news: TNewsCardProps[]
}>

type TNewsProps = {
    number: number
    data: TNewsBlockData
}

export const News = ({ data, number }: TNewsProps) => {
    const { title, description, allNewsLinkText, news } = data

    return (
        <PageSection.Card sectionId="news">
            <PageSection.Header title={title} description={description} number={number} />
            <CardsSlider
                controls={
                    <Link type="s" href={'/news'}>
                        {allNewsLinkText}
                    </Link>
                }
                className={styles.newsList}
                scrollAreaClassName={styles.newsListScrollArea}
            >
                {news.map((newsItem, index) => (
                    <NewsCard key={index} {...newsItem} />
                ))}
            </CardsSlider>
        </PageSection.Card>
    )
}
