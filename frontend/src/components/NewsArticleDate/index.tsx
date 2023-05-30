import { Text } from '@/components/ui/typography/Text'
import { formatDate } from '@/utils/date'

import styles from './index.module.scss'

type TNewsArticleDateProps = {
    date?: Date
}
export default function NewsArticleDate(props: TNewsArticleDateProps) {
    return (
        <Text className={styles.date} type="pM">
            {props.date && formatDate(props.date)}
        </Text>
    )
}
