import React from 'react'

import styles from './index.module.scss'

import { Button } from 'src/components/ui/Button'
import { Heading } from 'src/components/ui/typography/Heading'
import { Text } from 'src/components/ui/typography/Text'
import { TEventCalendarData } from 'src/utils/serverDataMappers/event-article'

export type TEventCalendar = {
    eventCalendarData: TEventCalendarData
}

export default function EventCalendar(props: TEventCalendar) {
    return (
        <div className={styles.calendar}>
            <Heading level={3} className={styles.title}>
                {props.eventCalendarData.title}
            </Heading>
            <Text className={styles.description} type={'pM'}>
                {props.eventCalendarData.description}
            </Text>
            <Button
                size={'m'}
                link={props.eventCalendarData.calendar}
                className={styles.button}
                download
            >
                {props.eventCalendarData.button}
            </Button>
        </div>
    )
}
