import * as React from 'react'
import { useState } from 'react'
import classNames from 'classnames/bind'
import { AppContext } from '../../../../index'
import styles from '../../../../assets/scss/components/_accordion.scss'
import { ItemContent } from './ItemContent'
import { ItemHeader } from './ItemHeader'
import { Item } from './Item'

const cx = classNames.bind(styles)

interface AccordionContainerProps {
    children: any
    color?: string
    rounded?: boolean
    size?: string
    separated?: boolean
    type?: string
    closeIcon?: boolean
    outline: boolean
}

function Container(props: AccordionContainerProps) {
    const { children, color, rounded, size, separated, type = 'boxed', closeIcon } = props
    const [registered, setRegistered] = useState({})
    const [opened, setOpened] = useState('')

    const registerItem = ({ name }) => {
        const r = { ...registered, [name]: true }
        setRegistered(r)
    }

    const open = (name: string) => {
        setOpened(name)
    }

    const close = () => {
        setOpened('')
    }

    const isOpened = (name: string) => {
        return opened === name
    }

    return (
        <AppContext.Provider
            value={{
                registerItem: registerItem,
                isOpened: isOpened,
                open: open,
                close: close,
                size,
                type,
                closeIcon,
            }}
        >
            <div
                className={cx('component-accordion', {
                    [`component-accordion--color-${color}`]: color,
                    [`component-accordion--size-${size}`]: size,
                    [`component-accordion--rounded`]: rounded,
                    [`component-accordion--separated`]: separated,
                    [`component-accordion--type-${type}`]: type,
                    [`component-accordion--no-close-icon`]: !closeIcon,
                })}
            >
                {children}
            </div>
        </AppContext.Provider>
    )
}

export { Container, Item, ItemHeader, ItemContent }
