import Image from 'next/image'
import React from 'react'

import styles from './index.module.scss'

import errorIcon from 'public/images/common/error.svg'

export const InputError: React.FC<React.PropsWithChildren> = ({ children }) => {
    return (
        <span className={styles.message}>
            <Image
                className={styles.icon}
                unoptimized
                width={16}
                height={16}
                src={errorIcon}
                alt=""
            />
            {children}
        </span>
    )
}
