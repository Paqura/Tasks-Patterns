import { GetAttributesValues } from '@admin/general-schemas'

import { TNewsBlockData } from '@/screens/home/ui/News'
import { mapImageMediaFile } from '@/shared/lib/serverDataMappers/media'

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
            image: mapImageMediaFile(newsItem.previewImage),
            date: newsItem.published,
        })),
    }
}
