import * as React from 'react'
import { createRoot } from 'react-dom/client'
import { ModalManager, ModalBody, ModalContainer, ModalWrapper, ModalHeader } from './components/Modal'
import { useEffect } from 'react'

const container = document.getElementById('web-module-root-modal')
const root = createRoot(container!) // createRoot(container!) if you use TypeScript
export const AppContext = React.createContext({})

const App = ({ children }) => {
    let modals = [];
    const [currentModal, setCurrentModal] = React.useState(0)

    try {
        const dataString = container.getAttribute('data-modals')
        if (dataString) {
            modals = JSON.parse(dataString)
            console.log(modals)
        }
    } catch (e) {}

    return (
        <>
            {!!modals[currentModal]?.content && (
                <ModalContainer visible={true}>
                    <ModalHeader
                        closeIcon
                        close={() => {
                            setCurrentModal(currentModal + 1)
                        }}
                    />
                    <ModalBody>{modals[currentModal]?.content}</ModalBody>
                </ModalContainer>
            )}

            {children}
        </>
    )
}
const renderComponent = (Component) => {
    root.render(
        <AppContext.Provider value={{}}>
            <Component />
        </AppContext.Provider>,
    )
}

renderComponent(App)
