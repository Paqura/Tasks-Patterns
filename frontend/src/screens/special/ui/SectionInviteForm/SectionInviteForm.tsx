import Image from 'next/image'
import { ComponentProps } from 'react'

import { InviteForm, TInviteFormData } from '@/screens/special/ui/InviteForm'
import { SectionThemed } from '@/screens/special/ui/SectionThemed'
import { FormSuccess } from '@/shared/ui/project/FormSuccess'
import { TImage } from '@/types'

import styles from './index.module.scss'

export type TBlockInviteForm = {
    type: 'inviteForm'

    backgroundImage: TImage | null
} & TInviteFormData

type TSectionInviteFormProps = {
    data: TBlockInviteForm
    isCompleted: boolean
    onSubmit: ComponentProps<typeof InviteForm>['onSubmit']
}

export const SectionInviteForm = ({ data, onSubmit, isCompleted }: TSectionInviteFormProps) => {
    const { backgroundImage, ...formData } = data

    return (
        <SectionThemed id="inviteForm" theme="light">
            {isCompleted ? (
                <FormSuccess
                    title={formData.successMessageTitle}
                    description={formData.successMessageDescription}
                />
            ) : (
                <InviteForm onSubmit={onSubmit} data={formData} />
            )}

            {backgroundImage && (
                <Image
                    className={styles.blockImage}
                    alt=""
                    src={backgroundImage.src}
                    fill
                    unoptimized
                />
            )}
        </SectionThemed>
    )
}