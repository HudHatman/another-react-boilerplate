import * as React from 'react'
import classNames from 'classnames/bind'
import { AppContext } from '../../../../index'
import styles from '../../../../assets/scss/components/_accordion.scss'

const cx = classNames.bind(styles)

interface AccordionItemProps {
    children: any
    name: string
}

function Item({ children, name }: AccordionItemProps) {
    return (
        <AppContext.Consumer>
            {({ registerItem, isOpened, open, close, size, type, closeIcon }) => {
                registerItem(name)

                return (
                    <AppContext.Provider
                        value={{
                            isOpened,
                            name,
                            open,
                            close,
                            size,
                            type,
                            closeIcon,
                        }}
                    >
                        <div className={cx('component-accordion__item')}>{children}</div>
                    </AppContext.Provider>
                )
            }}
        </AppContext.Consumer>
    )
}

export { Item }
