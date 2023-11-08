import cn from 'classnames'
import { PropsWithChildren } from 'react'

import { TThemeMode } from '@/components/SpecialPage'
import { PageSectionCard } from '@/components/ui/PageSectionCard'

import styles from './index.module.scss'

type TSectionThemedProps = {
    id: string
    theme: TThemeMode
}

export const SectionThemed = ({ id, theme, children }: PropsWithChildren<TSectionThemedProps>) => {
    const mode = theme === 'light' || theme === 'dark' ? theme : 'light'

    return (
        <PageSectionCard
            mode={mode}
            sectionId={id}
            sectionClassName={cn(styles.card, {
                [styles.transparentLight]: theme === 'transparent-light',
                [styles.transparentDark]: theme === 'transparent-dark',
            })}
        >
            {children}
        </PageSectionCard>
    )
}
