import cn from 'classnames'
import React, { PropsWithChildren, useRef } from 'react'

import { Popover } from './components/Popover'
import styles from './index.module.scss'

type TDropdownProps<TValueType> = {
    className?: string
    popoverClassName?: string
    renderOption?: (option: TDropdownItem<TValueType>) => React.ReactNode
    options: TDropdownItem<TValueType>[]
    onSelect?: (value: TValueType) => void
    isOpened: boolean
    dropdownOffset?: number
    openInProtal?: boolean
}

export type TDropdownItem<TValueType> = {
    value: TValueType
    label: string
}

export function Dropdown<TValueType>({
    className,
    popoverClassName,
    onSelect,
    options,
    renderOption,
    children,
    isOpened,
    dropdownOffset = 0,
    openInProtal,
}: PropsWithChildren<TDropdownProps<TValueType>>) {
    const containerRef = useRef<HTMLDivElement>(null)
    const dropdownRef = useRef<HTMLDivElement>(null)

    return (
        <div className={cn(styles.dropdown, className)} ref={containerRef}>
            {children}
            <Popover
                visible={isOpened}
                anchor={containerRef}
                childContent={dropdownRef}
                directions={['bottom-right', 'bottom-left']}
                offset={dropdownOffset}
                isPortal={openInProtal}
            >
                <div className={cn(styles.dropdownList, popoverClassName)} ref={dropdownRef}>
                    {options.map((option, index) => {
                        return (
                            <div
                                key={index}
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
