import * as React from 'react'
import { useEffect, useState } from 'react'
import classNames from 'classnames/bind'
import _ from 'lodash'
import { IoIosClose as CloseIcon } from 'react-icons/io'
import { FaWindowMaximize as MaximizeIcon, FaWindowMinimize as MinimizeIcon } from 'react-icons/fa'
import { Button } from '../Button'
import { AppContext } from '../../../../index'
import { LoadingOverlay } from '../LoadingOverlay'
import styles from '../../../../assets/scss/components/_card.scss'
import { LocalStorage } from '../../../modules/database'

const cx = classNames.bind(styles)

interface CardProps {
    children: any
    headerActions?: any
    header?: any
    color?: string
    withCloseIcon?: boolean
    onClickClose?(params): any
    className?: string
    withMinimizeIcon?: boolean
    size?: string
    isLoading?: boolean
    noBorderTop?: boolean
    footer?: any
    footerType?: string
    style?: object
    solidBackground?: boolean
    name?: string
}

function Card({
    children,
    header,
    headerActions,
    color = 'primary',
    withCloseIcon,
    onClickClose,
    className,
    withMinimizeIcon,
    size = 'md',
    isLoading,
    noBorderTop,
    footer,
    footerType,
    style,
    solidBackground,
    name,
}: CardProps) {
    const [closed, setClosed] = useState(false)
    const [minimized, setMinimized] = useState(false)

    useEffect(() => {
        if (name) {
            const save = LocalStorage.queryAll('CardMinimize', {
                query: { name },
            })[0]
            if (save) {
                setMinimized(save.minimized)
            }
        }
    }, [name])

    const close = () => {
        setClosed(true)
    }

    const maximize = () => {
        setMinimized(false)
        if (name) {
            LocalStorage.insertOrUpdate('CardMinimize', { name }, { name, minimized: false })
            LocalStorage.commit()
        }
    }

    const minimize = () => {
        setMinimized(true)

        if (name) {
            LocalStorage.insertOrUpdate('CardMinimize', { name }, { name, minimized: true })
            LocalStorage.commit()
        }
    }

    const renderButton = (props = {}) => {
        return <Button {...props} size={size} />
    }

    if (closed) {
        return null
    }

    return (
        <div
            className={cx('component-card', {
                [`component-card--color-${color}`]: color,
                [`component-card--with-close-icon`]: withCloseIcon,
                [`component-card--size-${size}`]: size,
                [`component-card--no-border-top`]: noBorderTop,
                [`component-card--solid-background`]: solidBackground,
                [className]: true,
            })}
            style={style}
        >
            {header && (
                <AppContext.Provider
                    value={{
                        cardSize: size,
                    }}
                >
                    <div className={cx('component-card__header')}>
                        {_.isFunction(header) && header()}
                        {!_.isFunction(header) && header}
                        <div className={cx('component-card__header__actions')}>
                            {_.isFunction(headerActions) &&
                                headerActions({
                                    maximize,
                                })}
                            {!_.isFunction(headerActions) && !_.isEmpty(headerActions) && headerActions}
                            {withMinimizeIcon &&
                                renderButton({
                                    href: '#',
                                    onClick: (e) => {
                                        e.preventDefault()
                                        if (minimized) {
                                            maximize()
                                        } else {
                                            minimize()
                                        }
                                    },
                                    iconOnly: true,
                                    outline: true,
                                    roundless: true,
                                    borderless: true,
                                    icon: minimized ? <MaximizeIcon /> : <MinimizeIcon />,
                                    color,
                                    className: 'component-card__header__actions__action-button',
                                    size,
                                })}
                            {withCloseIcon &&
                                renderButton({
                                    href: '#',
                                    onClick: (e) => {
                                        e.preventDefault()
                                        if (_.isFunction(onClickClose)) {
                                            onClickClose({
                                                close,
                                            })
                                        } else {
                                            close()
                                        }
                                    },
                                    iconOnly: true,
                                    outline: true,
                                    roundless: true,
                                    borderless: true,
                                    icon: <CloseIcon />,
                                    color,
                                    className: 'component-card__header__actions__action-button',
                                    size,
                                })}
                        </div>
                    </div>
                </AppContext.Provider>
            )}
            {!minimized && [
                <div className={cx('component-card__content')}>
                    <div>
                        {_.isFunction(children) && children()}
                        {!_.isFunction(children) && children}
                    </div>
                </div>,
                <div
                    className={cx('component-card__footer', {
                        [`component-card__footer--type-${footerType}`]: footerType,
                    })}
                >
                    {_.isFunction(footer) && footer()}
                    {!_.isFunction(footer) && footer}
                </div>,
            ]}
            {isLoading && <LoadingOverlay />}
        </div>
    )
}

export { Card }
export default { Card }
