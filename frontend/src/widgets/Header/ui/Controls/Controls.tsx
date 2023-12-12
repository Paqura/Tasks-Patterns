import cn from 'classnames'
import { useRouter } from 'next/router'

import { TLocale, defaultLocale, locales } from '@/services/translation'
import { useHeaderContext } from '@/widgets/Header/lib/context'

import styles from './index.module.scss'
import { Button } from './ui/Button'
import { Search } from './ui/icons/Search'
import { LocaleDropdown } from './ui/LocaleDropdown'
import { SearchForm } from './ui/SearchForm'

const getLocaleDropdownOptions = (routerLocales: string[] | undefined) =>
    (Object.keys(locales) as TLocale[])
        .filter((l) => (routerLocales || [defaultLocale]).includes(l))
        .map((locale) => ({
            label: locales[locale].name,
            value: locale,
        }))

type TControlsProps = {
    searchInputPlaceholder: string
    onToggle?: (isOpen: boolean) => void
}

export const Controls = ({ searchInputPlaceholder, onToggle }: TControlsProps) => {
    const router = useRouter()
    const { isMobile, activeControl, toggleActiveControl } = useHeaderContext()

    const buttonSize = isMobile ? 'l' : 'm'

    const hasExtraPadding = isMobile && activeControl !== 'search'
    const showButtons = !(isMobile && activeControl === 'search')

    const localeDropdownOptions = getLocaleDropdownOptions(router.locales)

    return (
        <>
            {showButtons && (
                <div
                    className={cn(styles.list, {
                        [styles.mobileMode]: isMobile,
                        [styles.hasExtraPadding]: hasExtraPadding,
                    })}
                >
                    {localeDropdownOptions.length > 1 && (
                        <LocaleDropdown options={localeDropdownOptions} />
                    )}

                    <Button
                        isActive={activeControl === 'search'}
                        size={buttonSize}
                        onClick={() => toggleActiveControl('search')}
                    >
                        <Search />
                    </Button>
                </div>
            )}

            {activeControl === 'search' && (
                <SearchForm placeholder={searchInputPlaceholder} onToggle={onToggle} />
            )}
        </>
    )
}
