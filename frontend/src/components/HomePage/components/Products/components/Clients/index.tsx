import React from 'react'

import {
    PageSectionCardGrid,
    PageSectionCardGridLeftColumn,
    PageSectionCardGridRightColumn,
} from '@/components/ui/PageSectionCardGrid'
import { Heading } from '@/components/ui/typography/Heading'
import { Text } from '@/components/ui/typography/Text'
import { TImage } from '@/types'

import { ClientCard } from './components/ClientCard'
import styles from './index.module.scss'

const title = 'Our Clients'
const descriptionText =
    'Our technology and services are used by&nbsp;more than 2,300 organisations worldwide, including&nbsp;80% of&nbsp;the Expert 400.'

export type TClient = {
    logo: TImage
    name: string
}
type TProps = {
    clients: TClient[]
}

export const Clients: React.FC<TProps> = ({ clients }) => {
    return (
        <PageSectionCardGrid>
            <PageSectionCardGridLeftColumn className={styles.textColumn}>
                <Heading level={2} className={styles.title}>
                    {title}
                </Heading>
                <Text type="pM" className={styles.description}>
                    {descriptionText}
                </Text>
            </PageSectionCardGridLeftColumn>
            <PageSectionCardGridRightColumn className={styles.listColumn}>
                <div className={styles.list}>
                    {clients.map((client, index) => (
                        <ClientCard key={index + '1'} logo={client.logo} name={client.name} />
                    ))}
                </div>
            </PageSectionCardGridRightColumn>
        </PageSectionCardGrid>
    )
}
