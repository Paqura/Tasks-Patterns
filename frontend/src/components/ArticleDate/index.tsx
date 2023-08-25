import { Text } from '@/components/ui/typography/Text'
import { formatDate } from '@/utils/date'
import { useLocale } from '@/utils/translate'

import styles from './index.module.scss'

type TNewsArticleDateProps = {
    date?: Date | string
}
export const ArticleDate: React.FC<TNewsArticleDateProps> = (props) => {
    const locale = useLocale()
    return (
        <Text className={styles.date} type="pM">
            {props.date && formatDate(props.date, locale)}
        </Text>
    )
}
