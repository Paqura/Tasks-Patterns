import cn from 'classnames'
import { PropsWithChildren, ReactNode, useRef } from 'react'

import styles from './index.module.scss'
import { Popover } from './ui/Popover'

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
    const containerRef = useRef<HTMLDivElement>(null)
    const dropdownRef = useRef<HTMLDivElement>(null)

    return (
        <div className={cn(styles.dropdown, classes?.root)} ref={containerRef}>
            {children}
            <Popover
                visible={open}
                anchor={containerRef}
                childContent={dropdownRef}
                directions={['bottom-right', 'bottom-left']}
                offset={dropdownOffset}
                isPortal={openInPortal}
            >
                <div className={cn(styles.dropdownList, classes?.list)} ref={dropdownRef}>
                    {options.map((option, idx) => {
                        return (
                            <div
                                key={idx}
                                className={styles.option}
                                onClick={() => onSelect?.(option.value)}
                            >
                                {renderOption ? renderOption(option) : option.label}
                            </div>
                        )
                    })}
                </div>
            </Popover>
        </div>
    )
}
