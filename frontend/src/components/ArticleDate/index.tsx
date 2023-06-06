import { Text } from '@/components/ui/typography/Text'
import { formatDate } from '@/utils/date'

import styles from './index.module.scss'

type TNewsArticleDateProps = {
    date?: Date
}
export const ArticleDate: React.FC<TNewsArticleDateProps> = (props) => {
    return (
        <Text className={styles.date} type="pM">
            {props.date && formatDate(props.date)}
        </Text>
    )
}
