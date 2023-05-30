import DOMPurify from 'isomorphic-dompurify'
import { marked } from 'marked'

import { TNewsArticleData } from '@/utils/serverDataMappers/news-article'

import styles from './index.module.scss'

import HelpfulFiles from 'src/components/AnaliticalArticle/components/HelpfulFiles'

type TNewsArticleProps = TNewsArticleData
export default function NewsArticle(props: TNewsArticleProps) {
    return (
        <>
            <div className={styles.contentWrapper}>
                {props.articleText.map((item) => (
                    <div key={item.number} id={item.number.toString()} className={styles.content}>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(marked.parse(item.title)),
                            }}
                        />
                        <div
                            dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(marked.parse(item.value)),
                            }}
                        />
                    </div>
                ))}
            </div>

            <div className={styles.helpfulFilesWrap}>
                <div className={styles.helpfulFiles}>
                    <HelpfulFiles files={props.files} title={props.filesTitle} />
                </div>
            </div>
        </>
    )
}
