import * as React from 'react'
import { ModalContext } from './Wrapper'

interface ModalManagerProps {
    children: any
}

class ModalManager extends React.Component<ModalManagerProps, null> {
    state = {
        openedModal: '',
    }
    modals = {}

    registerModal(name, modal, show) {
        this.modals[name] = modal
        if (show) {
            this.state.openedModal = modal;
        }
    }

    openModal(name) {
        const { openedModal } = this.state
        if (!this.modals[name]) {
            console.error(`Modal ${name} not registered.`)
        }
        if (!!this.modals[name] && openedModal !== name) {
            this.setState({ openedModal: name })
        }
    }

    closeModal(name) {
        const { openedModal } = this.state

        if (openedModal === name) {
            this.setState({ openedModal: '' })
        }
    }

    render() {
        const { children } = this.props

        const renderProps = {
            registerModal: this.registerModal.bind(this),
            openModal: this.openModal.bind(this),
            closeModal: this.closeModal.bind(this),
        }

        return (
            <ModalContext.Consumer>
                {({ openModal, closeModal }) => {
                    renderProps.openModal = (name) => {
                        this.openModal(name)
                        openModal(name, this.modals[name])
                    }
                    renderProps.closeModal = (name) => {
                        this.closeModal(name)
                        closeModal(name)
                    }
                    return <>{children(renderProps)}</>
                }}
            </ModalContext.Consumer>
        )
    }
}

export { ModalManager }
export default {
    ModalManager,
}
