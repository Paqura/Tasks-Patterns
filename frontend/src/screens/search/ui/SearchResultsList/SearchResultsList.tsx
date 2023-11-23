import Link from 'next/link'

import { Heading } from '@/shared/ui/common/typography/Heading'
import { Text } from '@/shared/ui/common/typography/Text'
import { PageSection } from '@/shared/ui/project/PageSection'

import styles from './index.module.scss'

export type TSearchResultItem = {
    title: string
    description: string
    href: string
    locale?: string
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

export const SearchResultsList = ({ hasNoResults, data }: TSearchResultsListProps) => {
    const { searchQuery, searchResults, noResultsBlockTitle, noResultsBlockDescription } = data

    return (
        <PageSection.Card mode="light" contentClassName={styles.section}>
            <div className={styles.list}>
                {hasNoResults ? (
                    <div className={styles.noResultsBlock}>
                        <Heading level={3} className={styles.noResultsBlockTitle} disableInjections>
                            {`${noResultsBlockTitle} "${searchQuery}"`}
                        </Heading>

                        <Text type="pL" className={styles.noResultsBlockDescription}>
                            {noResultsBlockDescription}
                        </Text>
                    </div>
                ) : (
                    searchResults.map(({ title, description, href, locale }, index) => (
                        <div key={index} className={styles.item}>
                            <Link href={href} locale={locale}>
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
        </PageSection.Card>
    )
}
