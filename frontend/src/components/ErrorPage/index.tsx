import { Error, TErrorData } from '@/components/Error'
import { PageLayout } from '@/components/PageLayout'

import styles from './index.module.scss'

export type TNotFoundPageData = {
    errorData: TErrorData
}

type TNotFoundPageProps = TNotFoundPageData

export const ErrorPage: React.FC<TNotFoundPageProps> = (props) => {
    return (
        <PageLayout className={styles.page} footerClassName={styles.footer}>
            <Error data={props.errorData} />
        </PageLayout>
    )
}
