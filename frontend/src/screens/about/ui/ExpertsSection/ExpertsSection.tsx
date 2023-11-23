import { CardsSlider } from '@/shared/ui/common/CardsSlider'
import { Heading } from '@/shared/ui/common/typography/Heading'
import { Text } from '@/shared/ui/common/typography/Text'
import { PageSection } from '@/shared/ui/project/PageSection'

import styles from './index.module.scss'
import { EmployeeCard, TEmployeeCardData } from './ui/EmployeeCard'
import { LoadMore } from './ui/LoadMore'

export type TExpertsSectionData = {
    isVisible: boolean
    title: string
    description: string
    isManagersBlockVisible: boolean
    managersBlockTitle: string
    managersList: TEmployeeCardData[]
    isExpertsBlockVisible: boolean
    expertsBlockTitle: string
    expertsList: TEmployeeCardData[]
}

type TExpertsSectionProps = {
    data: TExpertsSectionData
}

export const ExpertsSection = ({ data }: TExpertsSectionProps) => {
    const {
        isVisible,
        title,
        description,
        isManagersBlockVisible,
        managersBlockTitle,
        managersList,
        isExpertsBlockVisible,
        expertsBlockTitle,
        expertsList,
    } = data

    if (!isVisible) {
        return null
    }

    return (
        <PageSection.Card mode={'dark'}>
            <div className={styles.sectionHeading}>
                <Heading level={1} className={styles.sectionTitle}>
                    {title}
                </Heading>

                <Text type="pL" className={styles.sectionDescription}>
                    {description}
                </Text>
            </div>

            {isManagersBlockVisible && (
                <div className={styles.employeesBlock}>
                    <Heading level={2} className={styles.employeesBlockTitle}>
                        {managersBlockTitle}
                    </Heading>

                    <LoadMore
                        items={managersList}
                        overlayExtraClassName={styles.managersListOverlay}
                        render={(itemsToRender) => (
                            <CardsSlider
                                hideControls
                                scrollAreaClassName={styles.employeeCardsList}
                            >
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
            )}

            {isExpertsBlockVisible && (
                <div className={styles.employeesBlock}>
                    <Heading level={2} className={styles.employeesBlockTitle}>
                        {expertsBlockTitle}
                    </Heading>

                    <LoadMore
                        items={expertsList}
                        overlayExtraClassName={styles.expertsListOverlay}
                        render={(itemsToRender) => (
                            <CardsSlider
                                hideControls
                                scrollAreaClassName={styles.employeeCardsList}
                            >
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
            )}
        </PageSection.Card>
    )
}
