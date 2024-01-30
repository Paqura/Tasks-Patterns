import cn from 'classnames'
import { PropsWithChildren } from 'react'

import { TThemeMode } from '@/screens/special'
import { PageSection } from '@/shared/ui/project/PageSection'

import styles from './index.module.scss'

type TSectionThemedProps = {
    id: string
    theme: TThemeMode
}

export const SectionThemed = ({ id, theme, children }: PropsWithChildren<TSectionThemedProps>) => {
    const mode = theme === 'light' || theme === 'dark' ? theme : 'light'

    return (
        <PageSection.Card
            mode={mode}
            sectionId={id}
            classes={{
                root: cn(styles.card, {
                    [styles.transparentLight]: theme === 'transparent-light',
                    [styles.transparentDark]: theme === 'transparent-dark',
                }),
            }}
        >
            {children}
        </PageSection.Card>
    )
}
