import Link from 'next/link'

import { PageSectionCard } from '@/components/ui/PageSectionCard'
import { Text } from '@/components/ui/typography/Text'

import styles from './index.module.scss'

type TSearchResultItem = {
    title: string
    description: string
    href: string
}

export type TSearchResultsListData = {
    searchResults: TSearchResultItem[]
}

type TSearchResultsListProps = {
    data: TSearchResultsListData
}

export const SearchResultsList: React.FC<TSearchResultsListProps> = ({ data }) => {
    return (
        <PageSectionCard mode="light" className={styles.section}>
            <div className={styles.list}>
                {data.searchResults.map(({ title, description, href }, index) => (
                    <div key={index} className={styles.item}>
                        <Link href={href}>
                            <Text type="pL" className={styles.title}>
                                {title}
                            </Text>
                        </Link>

                        <Text type="pL" className={styles.description}>
                            {description}
                        </Text>
                    </div>
                ))}
            </div>
        </PageSectionCard>
    )
}
