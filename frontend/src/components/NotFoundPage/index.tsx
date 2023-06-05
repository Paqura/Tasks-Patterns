import { Error, TErrorData } from '@/components/Error'
import { THeaderData } from '@/components/Header'
import { PageLayout, TSeo } from '@/components/PageLayout'

import styles from './index.module.scss'

export type TNotFoundPageData = {
    seo: TSeo
    headerData: THeaderData
    errorData: TErrorData
}

type TNotFoundPageProps = TNotFoundPageData

export const NotFoundPage: React.FC<TNotFoundPageProps> = (props) => {
    return (
        <PageLayout
            seo={props.seo}
            headerData={props.headerData}
            className={styles.page}
            footerClassName={styles.footer}
        >
            <Error data={props.errorData} />
        </PageLayout>
    )
}
