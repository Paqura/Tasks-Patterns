import Image from 'next/image'
import React from 'react'

import { Button } from '@/components/ui/Button'
import { PageSection } from '@/components/ui/PageSection'
import { Heading } from '@/components/ui/typography/Heading'
import { Text } from '@/components/ui/typography/Text'
import { TypographyTheme } from '@/components/ui/typography/TypographyTheme'
import { TImage } from '@/types'
import { CONTACTS_SECTION_ID } from '@/utils/constants'

import styles from './index.module.scss'

type TProps = {
    title: string
    subtitle?: string
    logo: TImage
    bannerImage: TImage
}

export const Banner: React.FC<TProps> = ({ title, subtitle, logo, bannerImage }) => {
    return (
        <PageSection className={styles.banner}>
            <div className={styles.textContent}>
                <TypographyTheme theme="dark">
                    <Heading level={2}>{title}</Heading>
                    {subtitle && (
                        <Text className={styles.description} type="pL">
                            {subtitle}
                        </Text>
                    )}
                    <Button className={styles.contactBtn} link={`#${CONTACTS_SECTION_ID}`}>
                        Contact us
                    </Button>
                </TypographyTheme>
            </div>
            <div className={styles.logoWrapper}>
                <Image
                    className={styles.smallLogo}
                    src={logo.src}
                    width={logo.width}
                    height={logo.height}
                    alt={logo.alt || ''}
                    priority
                />
                <Image
                    className={styles.bigLogo}
                    src={bannerImage.src}
                    width={logo.width}
                    height={logo.height}
                    alt={logo.alt || ''}
                    priority
                />
            </div>
        </PageSection>
    )
}
