import cn from 'classnames'

import { CardsSlider } from '@/components/ui/CardsSlider'
import { LoadMore } from '@/components/ui/LoadMore'
import { PageSectionCard } from '@/components/ui/PageSectionCard'
import { Heading } from '@/components/ui/typography/Heading'
import { Text } from '@/components/ui/typography/Text'

import { EmployeeCard, TEmployeeCardData } from './components/EmployeeCard'
import styles from './index.module.scss'

export type TExpertsSectionData = {
    title: string
    description: string
    managersBlockTitle: string
    managersList: TEmployeeCardData[]
    expertsBlockTitle: string
    expertsList: TEmployeeCardData[]
}

type TExpertsSectionProps = {
    data: TExpertsSectionData
}

export const ExpertsSection: React.FC<TExpertsSectionProps> = ({ data }) => {
    const { title, description, managersBlockTitle, managersList, expertsBlockTitle, expertsList } =
        data

    return (
        <PageSectionCard mode={'dark'}>
            <div className={styles.sectionHeading}>
                <Heading level={1} className={styles.sectionTitle}>
                    {title}
                </Heading>

                <Text type="pL" className={styles.sectionDescription}>
                    {description}
                </Text>
            </div>

            <div className={styles.employeesBlock}>
                <Heading level={2} className={styles.employeesBlockTitle}>
                    {managersBlockTitle}
                </Heading>

                <LoadMore
                    cuttedClassName={styles.loadMoreBlockCutted}
                    cutterClassName={styles.loadMoreBlockCutter}
                >
                    <CardsSlider hideControls scrollAreaClassName={styles.employeeCardsList}>
                        {managersList.map(({ photo, name, roles }, index) => (
                            <EmployeeCard
                                key={index}
                                data={{
                                    photo,
                                    name,
                                    roles,
                                }}
                            />
                        ))}
                    </CardsSlider>
                </LoadMore>
            </div>

            <div className={styles.employeesBlock}>
                <Heading level={2} className={styles.employeesBlockTitle}>
                    {expertsBlockTitle}
                </Heading>

                <LoadMore
                    cuttedClassName={cn(
                        styles.loadMoreBlockCutted,
                        styles.loadMoreBlockCuttedLastBlock
                    )}
                    cutterClassName={styles.loadMoreBlockCutter}
                >
                    <CardsSlider hideControls scrollAreaClassName={styles.employeeCardsList}>
                        {expertsList.map(({ photo, name, roles }, index) => (
                            <EmployeeCard
                                key={index}
                                data={{
                                    photo,
                                    name,
                                    roles,
                                }}
                            />
                        ))}
                    </CardsSlider>
                </LoadMore>
            </div>
        </PageSectionCard>
    )
}
