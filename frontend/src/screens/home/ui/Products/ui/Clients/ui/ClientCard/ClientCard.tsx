import Image from 'next/image'

import { Text } from '@/shared/ui/common/typography/Text'
import { TImage } from '@/types'

import styles from './index.module.scss'

type TClientCardProps = {
    logo: TImage
    name: string
}

export const ClientCard = ({ name, logo }: TClientCardProps) => {
    return (
        <div className={styles.card}>
            <Text type="postscript">{name}</Text>
            <div className={styles.logo}>
                <Image src={logo.src} alt="" width={logo.width} height={logo.height} />
            </div>
        </div>
    )
}
