import cn from 'classnames'
import { useState } from 'react'

import { useIsMobile } from '@/shared/lib/hooks'
import { useTranslate } from '@/shared/lib/translate'
import { Button } from '@/shared/ui/common/Button'

import styles from './index.module.scss'

type TLoadMoreProps<T> = {
    items: T[]
    overlayExtraClassName?: string
    render: (items: T[]) => React.ReactNode
}

export function LoadMore<T>({ items, overlayExtraClassName, render }: TLoadMoreProps<T>) {
    const isMobile = useIsMobile()

    const [loadMore, setLoadMore] = useState<boolean>(false)
    const translate = useTranslate()

    const hasOverflow = !isMobile && items.length > 8
    const showOverlay = hasOverflow && !loadMore

    const itemsToRender = showOverlay ? items.slice(0, 12) : items

    return (
        <div className={styles.loadMore}>
            {render(itemsToRender)}

            {showOverlay && (
                <div className={cn(styles.overlay, overlayExtraClassName)}>
                    <Button
                        className={styles.button}
                        size="m"
                        withIcon={false}
                        onClick={() => setLoadMore(true)}
                    >
                        {translate('aboutUs.expertsLoadMoreBtn')}
                    </Button>
                </div>
            )}
        </div>
    )
}
