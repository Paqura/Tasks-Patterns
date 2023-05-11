import NextLink from 'next/link'
import React from 'react'

import styles from './index.module.scss'

interface ILogo {
    href?: string
}

export const Logo = ({ href }: ILogo) => {
    return href ? <NextLink href="/" className={styles.logo} /> : <div className={styles.logo} />
}
