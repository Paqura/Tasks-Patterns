import cn from 'classnames'
import React, { useState } from 'react'

import { Button } from '@/components/Header/components/Controls/components/Button'
import { Close } from '@/components/Header/components/Controls/components/icons/Close'
// import { Question } from '@/components/Header/components/Controls/components/icons/Question'
import { Search } from '@/components/Header/components/Controls/components/icons/Search'

import styles from './index.module.scss'

type TControlType = 'language' | 'search' | 'help'

type TControlsProps = {
    isMobileMode: boolean
}

const searchInputPlaceholder = 'Поиск на ptsecurity.com'

/*

 Функционал к кнопкам language и help будет добавлен позже
 В противном случае их можно удалить

*/

export const Controls: React.FC<TControlsProps> = ({ isMobileMode }) => {
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

        // eslint-disable-next-line no-console
        console.log('Search for:', searchValue)
    }

    const hasExtraPadding = isMobileMode && activeControl !== 'search'
    const showButtons = !(isMobileMode && activeControl === 'search')
    const buttonSize = isMobileMode ? 'l' : 'm'

    return (
        <div
            className={cn(styles.controls, {
                [styles.mobileMode]: isMobileMode,
                [styles.hasExtraPadding]: hasExtraPadding,
            })}
        >
            {showButtons && (
                <>
                    {/* <Button
                        isActive={activeControl === 'language'}
                        size={buttonSize}
                        onClick={() => handleControlClick('language')}
                    >
                        <span className={styles.languageValue}>En</span>
                    </Button> */}

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
