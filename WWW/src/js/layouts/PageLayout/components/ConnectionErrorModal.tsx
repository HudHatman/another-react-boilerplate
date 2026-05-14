import * as React from 'react'
import { Button, Modal } from '../../../components'
import classNames from 'classnames/bind'
import styles from '../../../../assets/scss/layout/_layout.scss'

const cx = classNames.bind(styles)

interface ConnectionErrorModalProps {
    visible: boolean
    message: string | null
    close: Function
}

function ConnectionErrorModal({ visible, message, close }: ConnectionErrorModalProps) {
    return (
        <Modal.Container visible={visible} color={'danger'}>
            <Modal.Header>Connection Error</Modal.Header>
            <Modal.Body>
                <div>
                    <p>{message}</p>

                    <Button color={'secondary'} block onClick={() => close()}>
                        <span>OK</span>
                    </Button>
                </div>
            </Modal.Body>
        </Modal.Container>
    )
}

export { ConnectionErrorModal }
