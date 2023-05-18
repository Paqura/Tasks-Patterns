import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

import { TFileData } from 'src/components/AnaliticalArticle/types'

import { PageSectionCard } from '@/components/ui/PageSectionCard'
import { Heading } from '@/components/ui/typography/Heading'
import { Text } from '@/components/ui/typography/Text'

import styles from './index.module.scss'

import downloadSimple from '/public/images/common/download-simple.svg'

export default function HelpfulFiles(props: { files: TFileData[]; title: string }) {
    return (
        <div>
            <Heading level={2}>Helpful files</Heading>
            <Heading className={styles.description} level={3}>
                {props.title}
            </Heading>
            <div className={styles.attachmentsWrap}>
                {props.files.map((attach, ind: number) => {
                    return (
                        <PageSectionCard key={ind} className={styles.attachment}>
                            <Link href={attach.url}>
                                <Text type="pM">{attach.title}</Text>
                                <Image
                                    className={styles.icon}
                                    src={downloadSimple}
                                    alt="download icon"
                                />
                            </Link>
                        </PageSectionCard>
                    )
                })}
            </div>
        </div>
    )
}
