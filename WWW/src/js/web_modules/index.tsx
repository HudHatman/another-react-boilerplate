import * as React from 'react'
import { createRoot } from 'react-dom/client'
import { ModalManager } from './components/Modal'
import Modal from './components/Modal'

const container = document.getElementById('web-module-root-modal')
const root = createRoot(container!) // createRoot(container!) if you use TypeScript

const AutoModal = ({close}) => {
    return (
        <Modal.Container visible={true} color={'danger'} close={close}>
            <Modal.Body>test</Modal.Body>
        </Modal.Container>
    )
}
const App = ({ children }) => {
    return (
        <ModalManager>
            {({ registerModal, closeModal }) => {
                const modalName = 'on-page-show-modal'
                registerModal(modalName, <AutoModal close={closeModal} />)
                return <p>Modal Registered</p>
            }}
        </ModalManager>
    )
}
const renderComponent = (Component) => {
    root.render(
        <div id="react-content">
            {/*<Provider store={store}>*/}
            <Component />
            {/*</Provider>*/}
        </div>,
    )
}

renderComponent(App)
