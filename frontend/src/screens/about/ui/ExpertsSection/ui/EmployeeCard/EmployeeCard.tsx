import Image from 'next/image'

import { Text } from '@/shared/ui/common/typography/Text'
import { TImage } from '@/types'

import styles from './index.module.scss'

export type TEmployeeCardData = {
    photo: TImage
    name: string
    roles: string
}

type TEmployeeCardProps = {
    data: TEmployeeCardData
}

export const EmployeeCard = ({ data }: TEmployeeCardProps) => {
    const { photo, name, roles } = data

    return (
        <div className={styles.employeeCard}>
            <div className={styles.imageWrapper}>
                <Image
                    className={styles.image}
                    src={photo.src}
                    fill
                    sizes="500px"
                    alt={photo.alt || ''}
                />
            </div>

            <div className={styles.content}>
                <Text type="pHeadline" className={styles.title}>
                    {name}
                </Text>

                <Text type="postscript" className={styles.description}>
                    {roles}
                </Text>
            </div>
        </div>
    )
}
