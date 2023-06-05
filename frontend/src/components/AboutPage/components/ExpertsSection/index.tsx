import { CardsSlider } from '@/components/ui/CardsSlider'
import { PageSectionCard } from '@/components/ui/PageSectionCard'
import { Heading } from '@/components/ui/typography/Heading'
import { Text } from '@/components/ui/typography/Text'

import { EmployeeCard, TEmployeeCardData } from './components/EmployeeCard'
import { LoadMore } from './components/LoadMore'
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
                    items={managersList}
                    overlayExtraClassName={styles.managersListOverlay}
                    render={(itemsToRender) => (
                        <CardsSlider hideControls scrollAreaClassName={styles.employeeCardsList}>
                            {itemsToRender.map(({ photo, name, roles }, index) => (
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
                    )}
                />
            </div>

            <div className={styles.employeesBlock}>
                <Heading level={2} className={styles.employeesBlockTitle}>
                    {expertsBlockTitle}
                </Heading>

                <LoadMore
                    items={expertsList}
                    overlayExtraClassName={styles.expertsListOverlay}
                    render={(itemsToRender) => (
                        <CardsSlider hideControls scrollAreaClassName={styles.employeeCardsList}>
                            {itemsToRender.map(({ photo, name, roles }, index) => (
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
                    )}
                />
            </div>
        </PageSectionCard>
    )
}
