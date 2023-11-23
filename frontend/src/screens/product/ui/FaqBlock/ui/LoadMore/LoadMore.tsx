import cn from 'classnames'
import debounce from 'lodash/debounce'
import { PropsWithChildren, useLayoutEffect, useRef, useState } from 'react'

import { Button } from '@/shared/ui/common/Button'
import { useTypographyTheme } from '@/shared/ui/common/typography/TypographyTheme'

import styles from './index.module.scss'

type TLoadMoreProps = {
    classes?: TClasses<'root' | 'cutOuter' | 'cutInner'>
    btnText: string
}

export const LoadMore = ({ children, classes, btnText }: PropsWithChildren<TLoadMoreProps>) => {
    const theme = useTypographyTheme()
    const [isCut, setIsCut] = useState<boolean>(true)
    const [showCutter, setShowCutter] = useState<boolean>(false)
    const containerRef = useRef<HTMLDivElement>(null)

    useLayoutEffect(() => {
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
            ref={containerRef}
            className={cn(
                styles.wrapper,
                classes?.root,
                {
                    [styles[`theme_${theme}`]]: !!theme,
                    [styles.opened]: !isCut,
                },
                [isCut && classes?.cutOuter],
            )}
        >
            {children}

            {showCutter && isCut && (
                <div className={cn(styles.cutter, classes?.cutInner)}>
                    <Button
                        className={styles.button}
                        size="m"
                        withIcon={false}
                        onClick={() => setIsCut(false)}
                    >
                        {btnText}
                    </Button>
                </div>
            )}
        </div>
    )
}
