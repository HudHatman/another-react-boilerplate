import * as React from 'react'
import classNames from 'classnames/bind'
import { IoIosClose as CloseIcon } from 'react-icons/io'
import _ from 'lodash'
import { LoadingOverlay } from '../LoadingOverlay'
import styles1 from '../../../../assets/scss/components/_alert.scss'
import styles2 from '../../../../assets/scss/_animations.scss'
import { useState } from 'react'

const cx = classNames.bind({ ...styles1, ...styles2 })

const animationDuration = 700

interface AlertProps {
    children: any
    color?: string
    className?: string
    outline?: boolean
    closeIcon?: boolean
    onClickClose?(controller: object): any
    withIcon?: any
    withIconArrow?: boolean
    iconHighlighted?: boolean
    rounded?: boolean
    background?: boolean
    size?: string
    alignCenter?: boolean
}

interface AlertState {
    animationStarted: boolean
    remove: boolean
    isLoading: boolean
}

function Alert(props: AlertProps) {
    const {
        children,
        color = 'default',
        className,
        outline,
        closeIcon,
        onClickClose,
        withIcon,
        iconHighlighted,
        withIconArrow,
        rounded,
        background,
        size = 'md',
        alignCenter,
        ..._props
    } = props
    const [animationStarted, setAnimationStarted] = useState(false)
    const [remove, setRemove] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const close = () => {
        setIsLoading(false)
        setAnimationStarted(true)
        setTimeout(() => {
            setRemove(true)
        }, animationDuration)
    }

    if (remove) return null

    return (
        <div
            className={cx('component-alert', {
                [className]: className,
                [`component-alert--color-${color}`]: color,
                [`component-alert--outline`]: outline,
                [`component-alert--close-icon`]: closeIcon,
                [`component-alert--with-icon`]: withIcon,
                [`component-alert--with-icon-arrow`]: withIconArrow,
                [`component-alert--icon-highlighted`]: iconHighlighted,
                [`component-alert--rounded`]: rounded,
                [`component-alert--background`]: background,
                ['animation--fade-out-top']: animationStarted,
                [`component-alert--size-${size}`]: size,
                [`component-alert--align-center`]: alignCenter,
            })}
            {...props}
        >
            {withIcon && (
                <div className={cx('component-alert__icon-container--outer')}>
                    <div className={cx('component-alert__icon-container--inner')}>{withIcon}</div>
                </div>
            )}
            <div className={cx('component-alert__content--outer')}>
                <div className={cx('component-alert__content--inner')}>{children}</div>
            </div>
            {closeIcon && (
                <div
                    className={cx('component-alert__close-icon')}
                    onClick={() => {
                        if (_.isFunction(onClickClose)) {
                            onClickClose({
                                close,
                                setIsLoading,
                            })
                        } else {
                            close()
                        }
                    }}
                >
                    <CloseIcon className={cx('component--alert__close-icon__icon')} />
                </div>
            )}
            {isLoading && <LoadingOverlay size="xs" />}
        </div>
    )
}

export { Alert }
export default { Alert }
