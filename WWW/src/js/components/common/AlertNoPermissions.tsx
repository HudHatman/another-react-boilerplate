import * as React from 'react'
import { Alert } from '../ui/Alert'
import { AccessDisabledIcon } from '../icons'

export class AlertNoPermissions extends React.Component<null, null> {
    render() {
        return (
            <Alert color={'danger'} withIcon={<AccessDisabledIcon />} iconHighlighted>
                You have no permissions to see this action.
            </Alert>
        )
    }
}

export default AlertNoPermissions
