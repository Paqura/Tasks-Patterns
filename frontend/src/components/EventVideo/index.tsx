import React from 'react'

import styles from './index.module.scss'

import { TEventVideoData } from 'src/utils/serverDataMappers/event-article'

export type TEventForm = {
    eventVideoData: TEventVideoData
}

export default function EventVideo(props: TEventForm) {
    return (
        <div className={styles.wrapper}>
            <iframe
                className={styles.video}
                src={`https://www.youtube.com/embed/${props.eventVideoData.id}`}
                allow={
                    'accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                }
                allowFullScreen
            ></iframe>
        </div>
    )
}
