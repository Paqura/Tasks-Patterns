import cn from 'classnames'
import NextLink from 'next/link'

import { Text } from '@/shared/ui/common/typography/Text'

import styles from './index.module.scss'
import { getPaginationParams } from './lib/params'

export type TPaginationData = {
    page: number
    pageCount: number
}

export type TPaginationProps = TPaginationData

export const Pagination = ({ page, pageCount }: TPaginationProps) => {
    const showPagination = pageCount > 1

    const { showLeftDots, showRightDots, leftNumbers, rightNumbers } = getPaginationParams(
        page,
        pageCount,
    )

    if (!showPagination) {
        return null
    }

    return (
        <div className={styles.pagination}>
            <div className={styles.content}>
                {showLeftDots && (
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

                {leftNumbers.map((i) => (
                    <NextLink key={i} href={`?page=${i}`} className={styles.item}>
                        <Text type="pM" className={styles.itemText}>
                            {i}
                        </Text>
                    </NextLink>
                ))}

                <Text type="pM" className={cn(styles.item, styles.itemTextActive)}>
                    {page}
                </Text>

                {rightNumbers.map((i) => (
                    <NextLink key={i} href={`?page=${i}`} className={styles.item}>
                        <Text type="pM" className={styles.itemText}>
                            {i}
                        </Text>
                    </NextLink>
                ))}

                {showRightDots && (
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
    )
}
