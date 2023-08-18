import cn from 'classnames'
import { useState } from 'react'

import { Button } from '@/components/ui//Button'
import { useIsMobile } from '@/utils/hooks'
import { useTranslate } from '@/utils/translate'

import styles from './index.module.scss'

type TProps<T> = {
    items: T[]
    overlayExtraClassName?: string
    render: (items: T[]) => React.ReactNode
}

function LoadMore<T>({ items, overlayExtraClassName, render }: TProps<T>) {
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

export { LoadMore }
