import React from 'react'

import styles from './index.module.scss'

import { Button } from 'src/components/ui/Button'
import { Heading } from 'src/components/ui/typography/Heading'
import { Text } from 'src/components/ui/typography/Text'
import { TEventConfigData } from 'src/utils/serverDataMappers/event-article'

export type TEventCalendar = {
    eventConfigData: TEventConfigData
    calendar: string
}

export default function EventCalendar(props: TEventCalendar) {
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
