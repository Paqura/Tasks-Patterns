import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import cn from 'classnames'
import { Fragment, PropsWithChildren, ReactNode } from 'react'

import styles from './index.module.scss'

type TDropdownProps<TValueType> = {
    open: boolean
    openInPortal?: boolean
    dropdownOffset?: number

    options: TDropdownItem<TValueType>[]
    renderOption?: (option: TDropdownItem<TValueType>) => ReactNode
    onSelect?: (value: TValueType) => void

    classes?: TClasses<'root' | 'list'>
}

export type TDropdownItem<TValueType> = {
    value: TValueType
    label: string
}

export const Dropdown = <TValueType,>({
    classes,
    onSelect,
    options,
    renderOption,
    children,
    open,
    dropdownOffset = 0,
    openInPortal,
}: PropsWithChildren<TDropdownProps<TValueType>>) => {
    const ContentWrapper = openInPortal ? DropdownMenu.Portal : Fragment

    return (
        <DropdownMenu.Root open={open} modal={false}>
            <DropdownMenu.Trigger asChild>{children}</DropdownMenu.Trigger>

            <ContentWrapper>
                <DropdownMenu.DropdownMenuContent
                    sideOffset={dropdownOffset}
                    side="bottom"
                    align="end"
                    className={cn(styles.list, classes?.list)}
                >
                    {options.map((option, idx) => {
                        return (
                            <DropdownMenu.Item
                                key={idx}
                                className={styles.option}
                                onClick={() => onSelect?.(option.value)}
                            >
                                {renderOption ? renderOption(option) : option.label}
                            </DropdownMenu.Item>
                        )
                    })}
                </DropdownMenu.DropdownMenuContent>
            </ContentWrapper>
        </DropdownMenu.Root>
    )
}
