import cn from 'classnames'
import { useRouter } from 'next/router'
import { useState } from 'react'

import { useHeaderContext } from '@/widgets/Header/lib/context'

import styles from './index.module.scss'

import { Button } from '../Button'
import { Close } from '../icons/Close'
import { Search } from '../icons/Search'

type TSearchFormProps = {
    placeholder: string
    onToggle?: (state: boolean) => void
}

export const SearchForm = ({ placeholder, onToggle }: TSearchFormProps) => {
    const router = useRouter()
    const { resetActiveControl, isMobile } = useHeaderContext()

    const [searchValue, setSearchValue] = useState<string>('')
    const buttonSize = isMobile ? 'l' : 'm'

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value)
    }

    const handleSearchClear = () => {
        if (searchValue === '') {
            resetActiveControl()
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
        resetActiveControl()

        if (onToggle) {
            onToggle(false)
        }
    }

    return (
        <form
            className={cn(styles.searchBlock, {
                [styles.searchBlockMobile]: isMobile,
            })}
            onSubmit={handleSearchSubmit}
        >
            <div className={styles.searchIconWrapper}>
                <Search />
            </div>

            <input
                type="text"
                autoFocus
                value={searchValue}
                placeholder={placeholder}
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
    )
}
