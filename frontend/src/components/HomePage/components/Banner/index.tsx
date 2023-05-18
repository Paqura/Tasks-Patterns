import React from 'react'

import { Button } from '@/components/ui/Button'
import { PageSection } from '@/components/ui/PageSection'
import { Heading } from '@/components/ui/typography/Heading'
import { Text } from '@/components/ui/typography/Text'
import { TypographyTheme } from '@/components/ui/typography/TypographyTheme'
import { TVideo } from '@/types'
import { scrollToContacts } from '@/utils/scrollToSection'

import styles from './index.module.scss'

export type TBannerData = {
    video?: TVideo
    title: string
    subtitle?: string
}

type TProps = {
    data: TBannerData
}

export const Banner: React.FC<TProps> = ({ data }) => {
    const { video, title, subtitle } = data
    return (
        <div className={styles.banner}>
            {video && (
                <video
                    className={styles.videoBg}
                    muted={true}
                    loop={true}
                    autoPlay={true}
                    playsInline={true}
                    preload="metadata"
                    src={video.src}
                />
            )}
            <PageSection className={styles.textContent}>
                <TypographyTheme theme="light">
                    <Heading level={2}>{title}</Heading>
                    {subtitle && (
                        <Text className={styles.description} type="pL">
                            {subtitle}
                        </Text>
                    )}
                    <Button className={styles.contactBtn} onClick={scrollToContacts}>
                        Contact us
                    </Button>
                </TypographyTheme>
            </PageSection>
        </div>
    )
}
