import Image from 'next/image'
import NextLink from 'next/link'

import styles from './index.module.scss'

export const Header = () => (
    <header className={styles.header}>
        <NextLink href="/" className={styles.logo}>
            <Image className={styles.image} fill src="/images/logo/logoDesktop.svg" alt={''} />
        </NextLink>
    </header>
)
