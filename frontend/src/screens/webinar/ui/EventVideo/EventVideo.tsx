import styles from './index.module.scss'

export type TEventVideoProps = {
    videoId: string
}

export const EventVideo = (props: TEventVideoProps) => {
    return (
        <div className={styles.wrapper}>
            <iframe
                className={styles.video}
                src={`https://www.youtube.com/embed/${props.videoId}`}
                allow={
                    'accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                }
                allowFullScreen
            ></iframe>
        </div>
    )
}
