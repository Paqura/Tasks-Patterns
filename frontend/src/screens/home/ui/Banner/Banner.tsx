import { CONTACTS_SECTION_ID } from '@/shared/lib/constants'
import { Button } from '@/shared/ui/common/Button'
import { Heading } from '@/shared/ui/common/typography/Heading'
import { Text } from '@/shared/ui/common/typography/Text'
import { TypographyTheme } from '@/shared/ui/common/typography/TypographyTheme'
import { PageSection } from '@/shared/ui/project/PageSection'
import { TVideo } from '@/types'

import styles from './index.module.scss'

export type TBannerData = {
    video?: TVideo
    title: string
    subtitle?: string
    contactButtonText: string
}

type TBannerProps = {
    data: TBannerData
}

export const Banner = ({ data }: TBannerProps) => {
    const { video, title, subtitle, contactButtonText } = data

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

                    <Button className={styles.contactBtn} link={`#${CONTACTS_SECTION_ID}`}>
                        {contactButtonText}
                    </Button>
                </TypographyTheme>
            </PageSection>
        </div>
    )
}
