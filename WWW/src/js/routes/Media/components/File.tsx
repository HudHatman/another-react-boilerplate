import * as React from 'react'
import { useState } from 'react'
import styles from '../../../../assets/scss/components/_file.scss'
import classNames from 'classnames/bind'
import { apiURL } from '../../../helpers/api'
import { Button, Col, Modal, Row } from '../../../components'
import { AiOutlineDownload as DownloadIcon } from 'react-icons/ai'
import { DeleteIcon } from '../../../components/icons'
import { FileDetailsFormContainer } from './FileDetailsFormContainer'
import { NotificationsManager } from '../../../containers'

const cx = classNames.bind(styles)

interface FileProps {
    file: {
        id: string
        name: string
        width: string
        height: string
        extension: string
        mime: string
    }
    deleteFile: Function
    fetch: Function
    editFile: Function
    isLoading: boolean
    addToastNotification: Function
}

interface FileState {
    confirmDeleteModalVisible: boolean
    detailsModalVisible: boolean | number
}

export const FileView = ({
    file: { id, name, width, height, extension, mime },
    deleteFile,
    fetch,
    file,
    editFile,
    isLoading,
    addToastNotification,
}: FileProps) => {
    const [confirmDeleteModalVisible, setConfirmDeleteModalVisible] = useState(false)
    const [detailsModalVisible, setDetailsModalVisible] = useState(false)

    const isImage = (typeof width === 'number' && typeof height === 'number') || mime === 'image/svg+xml'

    return (
        <div
            className={cx('file', {
                ['file--type-image']: isImage,
            })}
        >
            {isImage && (
                <div className={cx('file__image')} onClick={() => setDetailsModalVisible(true)}>
                    <img src={apiURL(`files/preview/${id}/${name}?width=300&height=300`)} alt={''} />
                </div>
            )}
            {!isImage && (
                <div className={cx('file__extension')} onClick={() => setConfirmDeleteModalVisible(true)}>
                    <span>{extension}</span>
                </div>
            )}
            {!isImage && <div className={cx('file__name')}>{name}</div>}
            <div className={cx('file__overlay')}>
                <Button
                    iconOnly
                    icon={<DownloadIcon />}
                    onClick={() => {
                        window.location.href = apiURL(`files/download/${id}`)
                    }}
                ></Button>
                <Button
                    iconOnly
                    color={'danger'}
                    icon={<DeleteIcon />}
                    onClick={() => {
                        setConfirmDeleteModalVisible(true)
                    }}
                ></Button>
            </div>
            <Modal.Container color={'danger'} visible={confirmDeleteModalVisible}>
                <Modal.Header>Confirm delete</Modal.Header>
                <Modal.Body>Are you sure to delete this item?</Modal.Body>
                <Modal.Footer>
                    <Row>
                        <Col xs={6}>
                            <Button block color={'secondary'} onClick={() => this.setState({ confirmDeleteModalVisible: false })}>
                                <span>Cancel</span>
                            </Button>
                        </Col>
                        <Col xs={6}>
                            <Button
                                color={'danger'}
                                block
                                onClick={() => {
                                    deleteFile({ id }).then(() => {
                                        fetch()
                                        addToastNotification({
                                            type: 'success',
                                            title: 'Remove success.',
                                            text: `File ID: ${id} has been removed.`,
                                            href: '/media',
                                        })
                                    })
                                }}
                            >
                                <span>OK</span>
                            </Button>
                        </Col>
                    </Row>
                </Modal.Footer>
            </Modal.Container>
            <Modal.Container color={'primary'} size={'lg'} visible={detailsModalVisible}>
                <Modal.Header
                    closeIcon
                    close={() => {
                        setDetailsModalVisible(false)
                    }}
                >
                    File details
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col xs={8}>
                            {isImage && (
                                <div className={cx('file__details__image')}>
                                    <img src={apiURL(`files/preview/${id}/${name}`)} alt={''} />
                                </div>
                            )}
                        </Col>
                        <Col xs={4}>
                            <NotificationsManager>
                                {({ addToastNotification }) => (
                                    <FileDetailsFormContainer
                                        file={file}
                                        isLoading={isLoading}
                                        initialValues={{
                                            ...file,
                                            download_url: apiURL(`files/download/${id}`),
                                            preview_url: apiURL(`files/preview/${id}`),
                                        }}
                                        addToastNotification={addToastNotification}
                                        editFile={editFile}
                                        fetch={fetch}
                                    />
                                )}
                            </NotificationsManager>
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal.Container>
        </div>
    )
}

export default FileView
