import { Error, TErrorData } from '@/shared/ui/project/Error'
import { PageLayout } from '@/shared/ui/project/PageLayout'

import styles from './index.module.scss'

export type TError500SCreenData = {
    errorData: TErrorData
}

export type TError500SCreenProps = TError500SCreenData

export const Error500Screen = (props: TError500SCreenProps) => {
    return (
        <PageLayout className={styles.page} footerClassName={styles.footer}>
            <Error data={props.errorData} />
        </PageLayout>
    )
}
