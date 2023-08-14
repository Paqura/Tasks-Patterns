import cn from 'classnames'
import React, { useRef } from 'react'

import { Popover } from './components/Popover'
import styles from './index.module.scss'

interface IProps<TValueType> {
    className?: string
    popoverClassName?: string
    renderOption?: (option: TDropdownItem<TValueType>) => React.ReactNode
    options: TDropdownItem<TValueType>[]
    onSelect?: (value: TValueType) => void
    isOpened: boolean
    dropdownOffset?: number
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
}: React.PropsWithChildren<IProps<TValueType>>) {
    const containerRef = useRef<HTMLDivElement>(null)
    const dropdownRef = useRef<HTMLDivElement>(null)

    return (
        <div className={cn(styles.dropdown, className)} ref={containerRef}>
            {children}
            <Popover
                visible={isOpened}
                anchor={containerRef}
                childContent={dropdownRef}
                directions={['bottom-right', 'top-right']}
                offset={dropdownOffset}
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
