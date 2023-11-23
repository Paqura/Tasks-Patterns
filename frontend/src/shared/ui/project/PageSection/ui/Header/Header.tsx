import { Heading } from '@/shared/ui/common/typography/Heading'
import { Text } from '@/shared/ui/common/typography/Text'
import { PageSection } from '@/shared/ui/project/PageSection'

import styles from './index.module.scss'

type THeaderProps = {
    title: string
    description?: string
    number?: number
}

export const Header = ({ title, description, number }: THeaderProps) => {
    return (
        <PageSection.Grid>
            {number && (
                <PageSection.LeftColumn>
                    <PageSection.CardNumber number={number} className={styles.number} />
                </PageSection.LeftColumn>
            )}

            <PageSection.RightColumn className={styles.text}>
                <Heading level={1}>{title}</Heading>
                {description && (
                    <Text className={styles.description} type="pL">
                        {description}
                    </Text>
                )}
            </PageSection.RightColumn>
        </PageSection.Grid>
    )
}
