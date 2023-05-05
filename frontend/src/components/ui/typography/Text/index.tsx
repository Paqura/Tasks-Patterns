import cn from 'classnames'
import React from 'react'

import { TTextType } from '@/components/ui/typography/types'
import { useTypographyTheme } from '@/components/ui/typography/TypographyTheme'
import { sanitizeText } from '@/utils/sanitaze'

import styles from './index.module.scss'

type TTextProps = React.HTMLAttributes<HTMLHeadingElement> & {
    type: TTextType
    className?: string
}

export const Text = (props: TTextProps) => {
    const { type, className, children } = props

    const theme = useTypographyTheme()

    const classNames = cn(className, styles.base, styles[`type_${type}`], {
        [styles[`theme_${theme}__type_${type}`]]: !!theme,
    })

    const sanitazedContent = React.Children.map(children, (child) => {
        const isStringContent = typeof child === 'string'

        if (isStringContent) {
            return React.createElement('span', {
                dangerouslySetInnerHTML: { __html: sanitizeText(child) },
            })
        }
        return child
    })

    return <p className={classNames}>{sanitazedContent}</p>
}
