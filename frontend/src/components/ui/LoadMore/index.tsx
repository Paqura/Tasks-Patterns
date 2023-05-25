import cn from 'classnames'
import { useEffect, useRef, useState } from 'react'

import { Button } from '@/components/ui//Button'
import { useTypographyTheme } from '@/components/ui/typography/TypographyTheme'

import styles from './index.module.scss'

type TProps = {
    className?: string
    cuttedClassName?: string
}

export const LoadMore: React.FC<React.PropsWithChildren<TProps>> = ({
    children,
    className,
    cuttedClassName,
}) => {
    const theme = useTypographyTheme()
    const [isCutted, setIsCutted] = useState<boolean>(true)
    const [showCutter, setShowCutter] = useState<boolean>(false)
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (containerRef.current) {
            setShowCutter(containerRef.current.scrollHeight > containerRef.current.clientHeight)
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
                <div className={cn(styles.cutter)}>
                    <Button className={styles.button} size="s" onClick={() => setIsCutted(false)}>
                        Load more
                    </Button>
                </div>
            )}
        </div>
    )
}
