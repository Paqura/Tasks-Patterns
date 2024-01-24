import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import cn from 'classnames'
import { Fragment, PropsWithChildren, ReactNode } from 'react'

import styles from './index.module.scss'

type TSide = 'bottom' | 'top' | 'right' | 'left'
type TAlign = 'center' | 'end' | 'start'

type TPlacement = {
    sideOffset: number
    side: TSide
    align: TAlign
}

type TDropdownProps<TValueType> = {
    open: boolean
    openInPortal?: boolean

    placement?: Partial<TPlacement>

    options: TDropdownItem<TValueType>[]
    renderOption?: (option: TDropdownItem<TValueType>) => ReactNode
    onSelect?: (value: TValueType) => void

    classes?: TClasses<'root' | 'list' | 'option'>
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
    placement,
    openInPortal,
}: PropsWithChildren<TDropdownProps<TValueType>>) => {
    const ContentWrapper = openInPortal ? DropdownMenu.Portal : Fragment

    return (
        <DropdownMenu.Root open={open} modal={false}>
            <DropdownMenu.Trigger asChild>{children}</DropdownMenu.Trigger>

            <ContentWrapper>
                <DropdownMenu.DropdownMenuContent
                    sideOffset={placement?.sideOffset}
                    side={placement?.side ?? 'bottom'}
                    align={placement?.align ?? 'end'}
                    className={cn(styles.list, classes?.list)}
                >
                    {options.map((option, idx) => {
                        return (
                            <DropdownMenu.Item
                                key={idx}
                                className={cn(styles.option, classes?.option)}
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
