import cn from 'classnames'
import Image from 'next/image'

import { NavBlock } from '@/components/Footer/components/NavBlock'
import { Heading } from '@/components/ui/typography/Heading'
import { Text } from '@/components/ui/typography/Text'

import styles from './index.module.scss'

import logo from '/public/images/logo.svg'

const mockFooter = {
    products: [
        {
            name: 'MaxPatrol SIEM',
            link: '/',
        },
        {
            name: 'MaxPatrol VM',
            link: '/',
        },
        {
            name: 'PT Sandbox',
            link: '/',
        },
        {
            name: 'PT Blackbox',
            link: '/',
        },
        {
            name: 'PT ISIM',
            link: '/',
        },
        {
            name: 'PT Network Attack Discovery',
            link: '/',
        },
        {
            name: 'PT Application Inspector',
            link: '/',
        },
        {
            name: 'XSpider',
            link: '/',
        },
    ],
    company: [
        {
            name: 'Home',
            link: '/',
        },
        {
            name: 'About us',
            link: '/',
        },
    ],
    social: [
        {
            name: 'Telegram',
            link: '/',
        },
        {
            name: 'Habr',
            link: '/',
        },
        {
            name: 'Vkontakte',
            link: '/',
        },
    ],
}

const copyText = '©Positive Technologies 2023'
const headerTitle = 'Cyber security market leader'

type TProps = {
    className?: string
}

export const Footer: React.FC<TProps> = ({ className }) => {
    return (
        <footer className={cn(styles.wrapper, className)}>
            <div className={styles.info}>
                <div className={styles.head}>
                    <Text type="pM" className={styles.copyright}>
                        {copyText}
                    </Text>
                    <Heading level={2}>{headerTitle}</Heading>
                </div>
                <nav className={styles.nav}>
                    <NavBlock
                        title="products"
                        navItems={mockFooter.products}
                        className={cn(styles.nav_col, styles.products)}
                    />
                    <NavBlock
                        title="company"
                        navItems={mockFooter.company}
                        className={cn(styles.nav_col, styles.company)}
                    />
                    <NavBlock
                        title="social"
                        navItems={mockFooter.social}
                        className={cn(styles.nav_col, styles.social)}
                    />
                </nav>
            </div>
            <div className={styles.logo}>
                <Image src={logo} alt="Positive Technologies" />
            </div>
        </footer>
    )
}
