import { GetAttributesValues } from '@admin/general-schemas'

import { TNewsBlockData } from '@/components/HomePage/components/News'
import { mapImageMediaFile } from '@/utils/serverDataMappers/media'

type TBackendBlockData = Extract<
    Exclude<GetAttributesValues<'api::main-page.main-page'>['blocks'], undefined>[0],
    { __component: 'main.news-block' }
>

export const mapNewsBlockServerData = ({
    block,
    news,
}: {
    block: TBackendBlockData
    news: GetAttributesValues<'api::news-item.news-item'>[]
}): TNewsBlockData => {
    return {
        sectionId: block.sectionId || '',
        title: block.title || '',
        description: block.description,
        allNewsLinkText: block.allNewsLinkText || 'All news',
        news: news.map((newsItem) => ({
            title: newsItem.title || '',
            href: `/news/${newsItem.slug}` || '/',
            image: mapImageMediaFile(newsItem.previewImage) || { src: '' },
            date: newsItem.published,
        })),
    }
}
