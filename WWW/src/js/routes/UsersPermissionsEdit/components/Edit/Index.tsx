import * as React from 'react'
import { Card, LoadingOverlay } from '../../../../components'
import { EditFormContainer } from './EditFormContainer'
import { FormContainer } from '../../../../containers'
import { SetIsLoading } from '../../../../../types.d'
import AlertNoPermissions from '../../../../components/common/AlertNoPermissions'

interface EditProps {
    isLoading: boolean
    setIsLoading: SetIsLoading
    config: Object
}

interface EditState {}

export class EditSettings extends React.Component<EditProps, EditState> {
    render() {
        const { config, isLoading, setIsLoading } = this.props
        return (
            <FormContainer>
                {({ addToastNotification, canByPermission }) => (
                    <>
                        {canByPermission('permissions.edit') && (
                            <Card header={<h1>Settings</h1>} color={'primary'}>
                                <EditFormContainer initialValues={config} addToastNotification={addToastNotification} setIsLoading={setIsLoading} />
                                {isLoading && <LoadingOverlay />}
                            </Card>
                        )}
                        {!canByPermission('permissions.edit') && <AlertNoPermissions />}
                    </>
                )}
            </FormContainer>
        )
    }
}

export default { EditSettings }
