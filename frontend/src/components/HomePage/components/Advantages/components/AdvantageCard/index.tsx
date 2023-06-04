import Image from 'next/image'
import React from 'react'

import { Heading } from '@/components/ui/typography/Heading'
import { Text } from '@/components/ui/typography/Text'

import styles from './index.module.scss'

import solutionsIcon from 'public/images/advantages/comprehensive-solutions.svg'
import customerServiceIcon from 'public/images/advantages/customer-service.svg'
import techologyIcon from 'public/images/advantages/cutting-edge-technology.svg'
import expertiseIcon from 'public/images/advantages/expertise.svg'
import trackRecordIcon from 'public/images/advantages/proven-track-record.svg'

type TCardType = 'expertise' | 'customer-service' | 'track-record' | 'techology' | 'solutions'

export type TAdvantageCard = {
    title: string
    description: string
}

type TProps = {
    data: TAdvantageCard
    type: TCardType
}

export const AdvantageCard: React.FC<TProps> = ({ type, data }) => {
    const { title, description } = data

    const iconsByType: { [key in TCardType]: string } = {
        expertise: expertiseIcon,
        'customer-service': customerServiceIcon,
        'track-record': trackRecordIcon,
        techology: techologyIcon,
        solutions: solutionsIcon,
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
