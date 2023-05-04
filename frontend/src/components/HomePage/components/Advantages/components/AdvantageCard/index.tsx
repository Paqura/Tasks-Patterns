import Image from 'next/image'
import React from 'react'

import { Heading } from '@/components/ui/typography/Heading'
import { Text } from '@/components/ui/typography/Text'
import SolutionsIcon from '~public/images/advantages/comprehensive-solutions.svg'
import CustomerServiceIcon from '~public/images/advantages/customer-service.svg'
import TechologyIcon from '~public/images/advantages/cutting-edge-technology.svg'
import ExpertiseIcon from '~public/images/advantages/expertise.svg'
import TrackRecordIcon from '~public/images/advantages/proven-track-record.svg'

import styles from './index.module.scss'

type TCardType = 'expertise' | 'customer-service' | 'track-record' | 'techology' | 'solutions'

type TProps = {
    title: string
    description: string
    type: TCardType
}

export const AdvantageCard: React.FC<TProps> = ({ type, title, description }) => {
    const iconsByType: { [key in TCardType]: string } = {
        expertise: ExpertiseIcon,
        'customer-service': CustomerServiceIcon,
        'track-record': TrackRecordIcon,
        techology: TechologyIcon,
        solutions: SolutionsIcon,
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
