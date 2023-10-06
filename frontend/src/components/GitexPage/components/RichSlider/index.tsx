import cn from 'classnames'
import React from 'react'

import { TThemeMode } from '@/components/GitexPage'
import { MarkdownContent } from '@/components/ui/MarkdownContent'

import styles from './index.module.scss'

type TProps = {
    sectionId: string
    data: string[]
    theme: TThemeMode
}

export const RichSlider: React.FC<TProps> = ({ data, theme }) => {
    return (
        <div
            className={cn(styles.root, {
                [styles.dark]: theme === 'dark',
                [styles.light]: theme === 'light',
                [styles.transparentLight]: theme === 'transparent-light',
                [styles.transparentDark]: theme === 'transparent-dark',
            })}
        >
            <div className={styles.list}>
                {data.map((product, index) => (
                    <div key={index} className={styles.slide}>
                        <MarkdownContent
                            className={cn(styles.markdownDark, {
                                [styles.dark]: theme === 'dark',
                                [styles.light]: theme === 'light',
                                [styles.transparentLight]: theme === 'transparent-light',
                                [styles.transparentDark]: theme === 'transparent-dark',
                            })}
                        >
                            {product}
                        </MarkdownContent>
                    </div>
                ))}
            </div>
        </div>
    )
}
