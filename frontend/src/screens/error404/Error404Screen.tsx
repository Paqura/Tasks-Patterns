import { Error, TErrorData } from '@/shared/ui/project/Error'
import { PageLayout, TSeo } from '@/shared/ui/project/PageLayout'
import { TFooterData } from '@/widgets/Footer'
import { THeaderData } from '@/widgets/Header'

import styles from './index.module.scss'

export type TError404ScreenData = {
    seo: TSeo
    headerData: THeaderData
    footerData: TFooterData
    errorData: TErrorData
}

export type TError404ScreenProps = TError404ScreenData

export const Error404Screen = (props: TError404ScreenProps) => {
    return (
        <PageLayout
            seo={props.seo}
            headerData={props.headerData}
            footerData={props.footerData}
            className={styles.page}
            footerClassName={styles.footer}
        >
            <Error data={props.errorData} />
        </PageLayout>
    )
}
