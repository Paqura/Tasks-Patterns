import cn from 'classnames'
import { useRouter } from 'next/router'

import { TLocale, locales, useLocale } from '@/services/translation'
import { Dropdown, TDropdownItem } from '@/shared/ui/common/Dropdown'
import { useHeaderContext } from '@/widgets/Header/lib/context'

import styles from './index.module.scss'

import { Button } from '../Button'

const SIDE_OFFSET = {
    mobile: 8,
    otherwise: 14,
}

type TLocaleDropdownProps = {
    options: TDropdownItem<TLocale>[]
}

export const LocaleDropdown = ({ options }: TLocaleDropdownProps) => {
    const router = useRouter()
    const currentLocale = useLocale()
    const { isMobile, activeControl, toggleActiveControl } = useHeaderContext()

    const buttonSize = isMobile ? 'l' : 'm'

    return (
        <Dropdown
            options={options}
            renderOption={(item) => <a href={`/${item.value}${router.asPath}`}>{item.label}</a>}
            open={activeControl === 'language'}
            classes={{
                list: cn(styles.popover, {
                    [styles.popover_mobile]: isMobile,
                }),
            }}
            placement={{
                sideOffset: isMobile ? SIDE_OFFSET.mobile : SIDE_OFFSET.otherwise,
            }}
            openInPortal={!isMobile}
        >
            <Button
                isActive={activeControl === 'language'}
                size={buttonSize}
                onClick={() => toggleActiveControl('language')}
            >
                <span className={styles.languageValue}>{locales[currentLocale].abbr}</span>
            </Button>
        </Dropdown>
    )
}
