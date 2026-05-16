import * as React from 'react'
//import configureStore from './js/store/configure-store'
import { createRoot } from 'react-dom/client'
import { ModalManager } from '../components/ui/Modal'
import { Modal } from '../components'

const container = document.getElementById('web-module-root-modal')
const root = createRoot(container!) // createRoot(container!) if you use TypeScript
console.log(container);
//export const store = configureStore({})
//export const AppContext = React.createContext({})
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
            {({ registerModal, openModal, closeModal }) => {
                const modalName = 'on-page-show-modal'
                registerModal(modalName, <AutoModal close={closeModal} />)
                openModal(modalName);
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
