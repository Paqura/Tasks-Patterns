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
    bannerImage: TImage | null
}

export const Banner: React.FC<TProps> = ({ title, subtitle, bannerImage }) => {
    return (
        <div className={styles.container}>
            <div className={styles.logoWrapper}>
                {bannerImage && (
                    <Image
                        className={styles.logo}
                        src={bannerImage.src}
                        width={bannerImage.width}
                        height={bannerImage.height}
                        alt={bannerImage.alt || ''}
                        priority
                    />
                )}
            </div>
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
                            Order pilot now
                        </Button>
                    </TypographyTheme>
                </div>
            </PageSection>
        </div>
    )
}
