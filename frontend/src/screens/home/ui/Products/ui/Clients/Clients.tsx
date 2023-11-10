import chunk from 'lodash/chunk'
import { CSSProperties } from 'react'

import { useIsDesktopSmall } from '@/shared/lib/hooks'
import { AutoCarousel } from '@/shared/ui/common/AutoCarousel'
import { Heading } from '@/shared/ui/common/typography/Heading'
import { Text } from '@/shared/ui/common/typography/Text'
import { TImage } from '@/types'

import styles from './index.module.scss'
import { ClientCard } from './ui/ClientCard'

const SLIDES_BY = {
    desktopSmall: 4,
    desktopWide: 6,
}

export type TClient = {
    logo: TImage
    name: string
}

export type TClientsData = {
    title: string
    description?: string
    clientsList: TClient[]
}

type TClientsProps = { data: TClientsData }

export const Clients = ({ data }: TClientsProps) => {
    const { clientsList: clients, title, description } = data

    const isDesktopSmall = useIsDesktopSmall()

    const clientsPerSlide = isDesktopSmall ? SLIDES_BY.desktopSmall : SLIDES_BY.desktopWide
    const clientsListChunks = chunk(clients, clientsPerSlide)

    const listStyle: CSSProperties = {
        gridTemplateColumns: `repeat(${clientsPerSlide / 2}, 1fr)`,
    }

    return (
        <div className={styles.block}>
            <div className={styles.textColumn}>
                <Heading level={2} className={styles.title}>
                    {title}
                </Heading>

                {description && (
                    <Text type="pM" className={styles.description}>
                        {description}
                    </Text>
                )}
            </div>

            <div className={styles.listColumn}>
                <AutoCarousel>
                    {clientsListChunks.map((chunk, idx) => (
                        <div key={idx} className={styles.listItem} style={listStyle}>
                            {chunk.map((client, chunkIdx) => (
                                <ClientCard key={chunkIdx} logo={client.logo} name={client.name} />
                            ))}
                        </div>
                    ))}
                </AutoCarousel>
            </div>
        </div>
    )
}
