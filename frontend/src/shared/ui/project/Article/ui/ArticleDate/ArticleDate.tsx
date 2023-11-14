import { useLocale } from '@/services/translation'
import { formatDate } from '@/shared/lib/date'
import { Text } from '@/shared/ui/common/typography/Text'

import styles from './index.module.scss'

export type TArticleDateProps = {
    date?: Date | string
}

export const ArticleDate = ({ date }: TArticleDateProps) => {
    const locale = useLocale()

    return (
        <Text className={styles.date} type="pM">
            {date && formatDate(date, locale)}
        </Text>
    )
}
