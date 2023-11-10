import Link from 'next/link'

import { Text } from '@/shared/ui/common/typography/Text'

import styles from './index.module.scss'

export type TAttachmentProps = {
    title: string
    src: string
}

export const Attachment = ({ title, src }: TAttachmentProps) => {
    return (
        <Link href={src} className={styles.attachment} target="_blank" download={true}>
            <Text type="pM" className={styles.name}>
                {title}
            </Text>
        </Link>
    )
}
