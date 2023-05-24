import chunk from 'lodash/chunk'
import React from 'react'

import { AutoCarousel } from '@/components/ui/AutoCarousel'
import { Heading } from '@/components/ui/typography/Heading'
import { Text } from '@/components/ui/typography/Text'
import { TImage } from '@/types'
import { useIsDesktopSmall } from '@/utils/hooks'

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
    const isDesktopSmall = useIsDesktopSmall()
    const clientsPerSlide = isDesktopSmall ? 4 : 6
    const clientsListChunks = chunk(clients, clientsPerSlide)

    return (
        <div className={styles.block}>
            <div className={styles.textColumn}>
                <Heading level={2} className={styles.title}>
                    {title}
                </Heading>
                <Text type="pM" className={styles.description}>
                    {descriptionText}
                </Text>
            </div>
            <div className={styles.listColumn}>
                <AutoCarousel>
                    {clientsListChunks.map((chunk, index) => (
                        <div
                            className={styles.listItem}
                            key={index + '1'}
                            style={{
                                gridTemplateColumns: `repeat(${clientsPerSlide / 2}, 1fr)`,
                            }}
                        >
                            {chunk.map((client, index) => (
                                <ClientCard
                                    key={index + '1'}
                                    logo={client.logo}
                                    name={client.name}
                                />
                            ))}
                        </div>
                    ))}
                </AutoCarousel>
            </div>
        </div>
    )
}
