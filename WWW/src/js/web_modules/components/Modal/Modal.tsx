import * as React from 'react'
import { createPortal } from 'react-dom'
import classNames from 'classnames/bind'
import { FaWindowClose as CloseIcon } from 'react-icons/fa'
import _ from 'lodash'
import styles from '../../../../assets/scss/components/_modal.scss'

const cx = classNames.bind(styles)

interface ModalContainerProps {
    children: any
    className?: string
    animation?: string
    color?: string
    size?: string
    placement?: string
    visible?: boolean
}

class ModalContainer extends React.Component<ModalContainerProps, null> {
    render() {
        const { children, animation, color, size, placement, visible } = this.props

        if (!visible) return null

        return createPortal(
            <div
                className="modal-backdrop fade show modal-xl"
                style={{ display: 'block' }}
                id="mojPopup"
                tabIndex="-1"
                aria-labelledby="mojPopupLabel"
                aria-hidden="false"
                data-bs-backdrop="static"
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">{children}</div>
                </div>
            </div>,
            document.body,
        )
    }
}

interface ModalBodyProps {
    children: any
    close?(): any
}

class ModalBody extends React.Component<ModalBodyProps, null> {
    render() {
        const { children, close } = this.props

        return (
            <div className={'modal-body'}>
                {children}
            </div>
        )
    }
}

interface ModalHeaderProps {
    children: any
    closeIcon?: any
    close?(): any
}

class ModalHeader extends React.Component<ModalHeaderProps, null> {
    render() {
        const { children, closeIcon, close } = this.props

        return (
            <div className="modal-header">
                <h5 className="modal-title" id="mojPopupLabel">
                    {children}
                </h5>
                {closeIcon && (
                    <button
                        type="button"
                        className="btn-close"
                        onClick={() => {
                            close()
                        }}
                    ></button>
                )}
            </div>
        )
    }
}

interface ModalFooterProps {
    children: any
    close?(): any
}

class ModalFooter extends React.Component<ModalFooterProps, null> {
    render() {
        const { children, close } = this.props

        return (
            <div className="modal-header-footer d-flex justify-content-end p-3 border-top">
                <button type="button" className="btn btn-secondary me-2" data-bs-dismiss="modal">
                    Zamknij
                </button>
                <button type="button" className="btn btn-success">
                    Zapisz zmiany
                </button>
            </div>
        )
    }
}

export { ModalContainer, ModalBody, ModalHeader, ModalFooter }
export default {
    ModalContainer,
    ModalBody,
    ModalHeader,
    ModalFooter,
}
