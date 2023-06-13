import Link from 'next/link'

import { PageSectionCard } from '@/components/ui/PageSectionCard'
import { Heading } from '@/components/ui/typography/Heading'
import { Text } from '@/components/ui/typography/Text'

import styles from './index.module.scss'

export type TSearchResultItem = {
    title: string
    description: string
    href: string
}

export type TSearchResultsListData = {
    searchQuery: string
    searchResults: TSearchResultItem[]
    noResultsBlockTitle: string
    noResultsBlockDescription: string
}

type TSearchResultsListProps = {
    hasNoResults: boolean
    data: TSearchResultsListData
}

export const SearchResultsList: React.FC<TSearchResultsListProps> = ({ hasNoResults, data }) => {
    const { searchQuery, searchResults, noResultsBlockTitle, noResultsBlockDescription } = data

    return (
        <PageSectionCard mode="light" contentClassName={styles.section}>
            <div className={styles.list}>
                {hasNoResults ? (
                    <div className={styles.noResultsBlock}>
                        <Heading level={3} className={styles.noResultsBlockTitle}>
                            {`${noResultsBlockTitle} &quot${searchQuery}&quot`}
                        </Heading>

                        <Text type="pL" className={styles.noResultsBlockDescription}>
                            {noResultsBlockDescription}
                        </Text>
                    </div>
                ) : (
                    searchResults.map(({ title, description, href }, index) => (
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
                    ))
                )}
            </div>
        </PageSectionCard>
    )
}
