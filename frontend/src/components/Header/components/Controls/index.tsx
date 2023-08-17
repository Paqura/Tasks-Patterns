import cn from 'classnames'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

import { Button } from '@/components/Header/components/Controls/components/Button'
import { Close } from '@/components/Header/components/Controls/components/icons/Close'
// import { Question } from '@/components/Header/components/Controls/components/icons/Question'
import { Search } from '@/components/Header/components/Controls/components/icons/Search'
import { Dropdown } from '@/components/ui/Dropdown'
import { TLocale, defaultLocale, locales } from '@/utils/i18n'
import { useLocale } from '@/utils/translate'

import styles from './index.module.scss'

type TControlType = 'language' | 'search' | 'help'

type TControlsProps = {
    searchInputPlaceholder: string
    isMobileMode: boolean
    onToggle?: (isOpen: boolean) => void
}

/*

 Функционал к кнопке help будет добавлен позже
 В противном случае их можно удалить

*/

export const Controls: React.FC<TControlsProps> = ({
    searchInputPlaceholder,
    isMobileMode,
    onToggle,
}) => {
    const router = useRouter()
    const currentLocale = useLocale()

    const [activeControl, setActiveControl] = useState<TControlType | null>(null)
    const [searchValue, setSearchValue] = useState<string>('')

    const handleControlClick = (pressedControl: TControlType) => {
        if (activeControl === pressedControl) {
            setActiveControl(null)
        } else {
            setActiveControl(pressedControl)
        }
    }

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value)
    }

    const handleSearchClear = () => {
        if (searchValue === '') {
            setActiveControl(null)
        } else {
            setSearchValue('')
        }
    }

    const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const trimmedSearchValue = searchValue.trim()

        if (trimmedSearchValue.length === 0) {
            return
        }

        const searchQuery = encodeURI(trimmedSearchValue)

        router.push({ pathname: '/search', query: { q: searchQuery } })

        setSearchValue('')
        setActiveControl(null)

        if (onToggle) {
            onToggle(false)
        }
    }

    const hasExtraPadding = isMobileMode && activeControl !== 'search'
    const showButtons = !(isMobileMode && activeControl === 'search')
    const buttonSize = isMobileMode ? 'l' : 'm'

    const localeDropdownOptions = (Object.keys(locales) as TLocale[])
        .filter((l) => (router.locales || [defaultLocale]).includes(l))
        .map((locale) => ({
            label: locales[locale].name,
            value: locale,
        }))

    return (
        <div
            className={cn(styles.controls, {
                [styles.mobileMode]: isMobileMode,
                [styles.hasExtraPadding]: hasExtraPadding,
            })}
        >
            {showButtons && (
                <>
                    {localeDropdownOptions.length > 1 && (
                        <Dropdown
                            options={localeDropdownOptions}
                            renderOption={(item) => (
                                <a href={`/${item.value}${router.asPath}`}>{item.label}</a>
                            )}
                            isOpened={activeControl === 'language'}
                            className={styles.buttonWrapper}
                            popoverClassName={cn(styles.popover, {
                                [styles.popover_mobile]: isMobileMode,
                            })}
                            dropdownOffset={isMobileMode ? 8 : 0}
                        >
                            <Button
                                isActive={activeControl === 'language'}
                                size={buttonSize}
                                onClick={() => handleControlClick('language')}
                            >
                                <span className={styles.languageValue}>
                                    {locales[currentLocale].abbr}
                                </span>
                            </Button>
                        </Dropdown>
                    )}

                    <Button
                        isActive={activeControl === 'search'}
                        size={buttonSize}
                        onClick={() => handleControlClick('search')}
                    >
                        <Search />
                    </Button>

                    {/* <Button
                        isActive={activeControl === 'help'}
                        size={buttonSize}
                        onClick={() => handleControlClick('help')}
                    >
                        <Question />
                    </Button> */}
                </>
            )}

            {activeControl === 'search' && (
                <form className={styles.searchBlock} onSubmit={handleSearchSubmit}>
                    <div className={styles.searchIconWrapper}>
                        <Search />
                    </div>

                    <input
                        type="text"
                        autoFocus
                        value={searchValue}
                        placeholder={searchInputPlaceholder}
                        className={styles.searchInput}
                        onChange={handleSearchChange}
                    />

                    <Button
                        className={styles.searchButtonClose}
                        size={buttonSize}
                        hasBorder={false}
                        onClick={handleSearchClear}
                    >
                        <Close />
                    </Button>
                </form>
            )}
        </div>
    )
}
