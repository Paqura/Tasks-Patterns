import cn from 'classnames'
import debounce from 'lodash/debounce'
import { useEffect, useRef, useState } from 'react'

import { Button } from '@/components/ui//Button'
import { useTypographyTheme } from '@/components/ui/typography/TypographyTheme'

import styles from './index.module.scss'

type TProps = {
    className?: string
    cuttedClassName?: string
    cutterClassName?: string
}

export const LoadMore: React.FC<React.PropsWithChildren<TProps>> = ({
    children,
    className,
    cuttedClassName,
    cutterClassName,
}) => {
    const theme = useTypographyTheme()
    const [isCutted, setIsCutted] = useState<boolean>(true)
    const [showCutter, setShowCutter] = useState<boolean>(false)
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleResize = () => {
            if (containerRef.current) {
                setShowCutter(containerRef.current.scrollHeight > containerRef.current.clientHeight)
            }
        }

        const handleResizeDebounce = debounce(handleResize, 500, {
            leading: false,
        })

        handleResize()
        window.addEventListener('resize', handleResizeDebounce)

        return () => {
            window.removeEventListener('resize', handleResizeDebounce)
        }
    }, [])

    return (
        <div
            className={cn(styles.wrapper, className, {
                [styles[`theme_${theme}`]]: !!theme,
                [styles.opened]: !isCutted,
                [cuttedClassName || '']: cuttedClassName && isCutted,
            })}
            ref={containerRef}
        >
            {children}
            {showCutter && isCutted && (
                <div className={cn(styles.cutter, cutterClassName)}>
                    <Button className={styles.button} size="s" onClick={() => setIsCutted(false)}>
                        Load more
                    </Button>
                </div>
            )}
        </div>
    )
}
