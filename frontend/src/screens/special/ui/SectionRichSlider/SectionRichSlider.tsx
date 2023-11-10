import cn from 'classnames'

import { TThemeMode } from '@/screens/special'
import { MarkdownContent } from '@/shared/ui/project/MarkdownContent'

import styles from './index.module.scss'

export type TBlockRichSlider = {
    type: 'richSlider'
    theme: TThemeMode
    slides: string[]
}

type TSectionRichSliderProps = {
    id: string
    data: TBlockRichSlider
}

export const SectionRichSlider = ({ id, data }: TSectionRichSliderProps) => {
    const { theme, slides } = data

    const themeClassNames = {
        [styles.dark]: theme === 'dark',
        [styles.light]: theme === 'light',
        [styles.transparentLight]: theme === 'transparent-light',
        [styles.transparentDark]: theme === 'transparent-dark',
    }

    return (
        <section id={id} className={cn(styles.root, themeClassNames)}>
            <div className={styles.list}>
                {slides.map((slide, idx) => (
                    <div key={idx} className={styles.slide}>
                        <MarkdownContent className={cn(styles.markdownDark, themeClassNames)}>
                            {slide}
                        </MarkdownContent>
                    </div>
                ))}
            </div>
        </section>
    )
}
