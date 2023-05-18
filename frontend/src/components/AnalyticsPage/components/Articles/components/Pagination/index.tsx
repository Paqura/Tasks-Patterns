import cn from 'classnames'
import NextLink from 'next/link'

import { Text } from '@/components/ui/typography/Text'

import styles from './index.module.scss'

export type TPaginationData = {
    page: number
    pageCount: number
}

type TPaginationProps = TPaginationData

const getArrayWithNumbers = (from: number, to: number) =>
    Array.from({ length: to + 1 - from }, (_, i) => i + from)

export const Pagination: React.FC<TPaginationProps> = ({ page, pageCount }) => {
    const showPagination = pageCount > 1

    const isFirstPageFarAway = page - 1 > 3
    const isLastPageFarAway = pageCount - page > 3

    const westSide = isFirstPageFarAway ? [page - 1] : getArrayWithNumbers(1, page - 1)
    const eastSide = isLastPageFarAway ? [page + 1] : getArrayWithNumbers(page + 1, pageCount)

    return showPagination ? (
        <div className={styles.pagination}>
            <div className={styles.content}>
                {isFirstPageFarAway && (
                    <>
                        <NextLink href={`?page=${1}`} className={styles.item}>
                            <Text type="pM" className={styles.itemText}>
                                1
                            </Text>
                        </NextLink>
                        <Text type="pM" className={cn(styles.item, styles.itemDots)}>
                            ...
                        </Text>
                    </>
                )}

                {westSide.map((i) => (
                    <NextLink key={i} href={`?page=${i}`} className={styles.item}>
                        <Text type="pM" className={styles.itemText}>
                            {i}
                        </Text>
                    </NextLink>
                ))}

                <Text type="pM" className={cn(styles.item, styles.itemTextActive)}>
                    {page}
                </Text>

                {eastSide.map((i) => (
                    <NextLink key={i} href={`?page=${i}`} className={styles.item}>
                        <Text type="pM" className={styles.itemText}>
                            {i}
                        </Text>
                    </NextLink>
                ))}

                {isLastPageFarAway && (
                    <>
                        <Text type="pM" className={cn(styles.item, styles.itemDots)}>
                            ...
                        </Text>
                        <NextLink href={`?page=${pageCount}`} className={styles.item}>
                            <Text type="pM" className={styles.itemText}>
                                {pageCount}
                            </Text>
                        </NextLink>
                    </>
                )}
            </div>
        </div>
    ) : null
}
