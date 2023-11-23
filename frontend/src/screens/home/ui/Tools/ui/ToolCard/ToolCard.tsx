import Image from 'next/image'

import { Heading } from '@/shared/ui/common/typography/Heading'
import { Text } from '@/shared/ui/common/typography/Text'

import styles from './index.module.scss'

import assessmentIcon from 'public/images/tools/assessment.svg'
import complianceIcon from 'public/images/tools/compliance.svg'
import monitoringIcon from 'public/images/tools/monitoring.svg'
import trainingIcon from 'public/images/tools/training.svg'

type TCardType = 'assessment' | 'compliance' | 'monitoring' | 'training'

export type TToolCard = {
    title: string
    description: string
}

type TToolCardProps = {
    data: TToolCard
    type: TCardType
}

export const ToolCard = ({ type, data }: TToolCardProps) => {
    const { title, description } = data

    const iconsByType: { [key in TCardType]: string } = {
        assessment: assessmentIcon,
        compliance: complianceIcon,
        monitoring: monitoringIcon,
        training: trainingIcon,
    }

    const Icon = iconsByType[type]

    return (
        <div className={styles.card}>
            {Icon && (
                <div className={styles.icon}>
                    <Image src={Icon} alt="" />
                </div>
            )}

            <Heading className={styles.title} level={3}>
                {title}
            </Heading>

            <Text className={styles.description} type="pM">
                {description}
            </Text>
        </div>
    )
}
