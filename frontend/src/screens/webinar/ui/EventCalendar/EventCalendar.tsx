import { TEventConfigData } from '@/shared/lib/serverDataMappers/event-article'
import { Button } from '@/shared/ui/common/Button'
import { Heading } from '@/shared/ui/common/typography/Heading'
import { Text } from '@/shared/ui/common/typography/Text'

import styles from './index.module.scss'

export type TEventCalendarProps = {
    eventConfigData: TEventConfigData
    calendar: string
}

export const EventCalendar = (props: TEventCalendarProps) => {
    return (
        <div className={styles.calendar}>
            <Heading level={3} className={styles.title}>
                {props.eventConfigData.calendarTitle}
            </Heading>
            <Text className={styles.description} type={'pM'}>
                {props.eventConfigData.calendarDescription}
            </Text>
            <Button size={'m'} link={props.calendar} className={styles.button} download>
                {props.eventConfigData.calendarButton}
            </Button>
        </div>
    )
}
