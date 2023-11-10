import Image from 'next/image'

import { CONTACTS_SECTION_ID } from '@/shared/lib/constants'
import { useTranslate } from '@/shared/lib/translate'
import { Button } from '@/shared/ui/common/Button'
import { Heading } from '@/shared/ui/common/typography/Heading'
import { Text } from '@/shared/ui/common/typography/Text'
import { TypographyTheme } from '@/shared/ui/common/typography/TypographyTheme'
import { PageSection } from '@/shared/ui/project/PageSection'
import { TImage } from '@/types'

import styles from './index.module.scss'

type TBannerProps = {
    title: string
    subtitle?: string
    bannerImage: TImage | null
}

export const Banner = ({ title, subtitle, bannerImage }: TBannerProps) => {
    const translate = useTranslate()
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
                            {translate('product.pilotRequestBtn')}
                        </Button>
                    </TypographyTheme>
                </div>
            </PageSection>
        </div>
    )
}
