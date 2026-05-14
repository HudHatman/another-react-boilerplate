import * as React from 'react'
import { createRef, useEffect, useState } from 'react'
import classnames from 'classnames/bind'
import _ from 'lodash'
import { LoadingOverlay } from '../LoadingOverlay'
import { FaAngleDown as ArrowDownIcon, FaArrowRight as ArrowRightIcon } from 'react-icons/fa'
import { AppContext } from '../../../../index'
import { Link } from 'react-router-dom'
import styles from '../../../../assets/scss/components/_button.scss'

const cx = classnames.bind(styles)

interface ButtonProps {
    children?: any
    isLoading?: boolean
    onClick?(event: any, controller: object): any
    size?: string
    disabled?: boolean
    color?: string
    block?: boolean
    icon?: any
    iconOnly?: boolean
    rounded?: boolean
    outline?: boolean
    roundless?: boolean
    arrow?: boolean
    className?: string
    borderless?: boolean
    type?: 'button' | 'submit' | 'reset'
    navigationHref?: string
    onClickNavigation?(): any
    transparent?: boolean
    style?: object
    bordered?: boolean
    href?: string
    disableContext: any
    itemRef?: any
}

interface ButtonState {
    color: string
    isLoading: boolean
}

function Button({
    color,
    onClick,
    size = 'md',
    children,
    disabled,
    block,
    icon,
    iconOnly,
    rounded,
    outline,
    roundless,
    arrow,
    borderless,
    className,
    type = 'button',
    navigationHref,
    onClickNavigation = () => null,
    transparent,
    style,
    isLoading,
    href,
    disableContext,
    bordered,
    itemRef,
    ...rest
}: ButtonProps) {
    const [colorState, setColor] = useState('primary')
    const [isLoadingState, setIsLoading] = useState(false)
    const navigationRef = createRef()

    useEffect(() => {
        setColor(color || 'primary')
        setIsLoading(isLoading)
    }, [])

    useEffect(() => {
        setIsLoading(isLoading)
    }, [isLoading])

    useEffect(() => {
        setColor(color)
    }, [color])

    const handleClick = (event) => {
        const navigationElement = navigationRef?.current

        if (!navigationElement || (navigationElement && !navigationElement.contains(event.target))) {
            if (_.isFunction(onClick)) {
                const controller = {
                    setColor,
                    setIsLoading,
                }

                onClick(event, controller)
            }
        }

        return false
    }

    return (
        <AppContext.Consumer>
            {({
                cardSize,
                buttonGroupSize,
                buttonGroupColor,
                buttonGroupOutline,
                buttonGroupDisabled,
                buttonGroupBorderless,
                pageHeaderSize,
            } = {}) => {
                const classes = cx('component-button', className, {
                    'component-button--is-loading': isLoadingState,
                    'component-button--icon-only': iconOnly,
                    'component-button--with-icon': icon,
                    [`component-button--color-${buttonGroupColor || color}`]: buttonGroupColor || color,
                    [`component-button--size-${pageHeaderSize || cardSize || buttonGroupSize || size}`]:
                        pageHeaderSize || cardSize || buttonGroupSize || size,
                    'component-button--block': block,
                    'component-button--disabled': isLoadingState || buttonGroupDisabled || disabled,
                    'component-button--rounded': rounded,
                    'component-button--outline': buttonGroupOutline || outline,
                    'component-button--roundless': roundless,
                    'component-button--borderless': buttonGroupBorderless || borderless,
                    'component-button--has-navigation': navigationHref,
                    'component-button--transparent': transparent,
                    'component-button--bordered': bordered,
                })

                const isDisabled = isLoading || isLoadingState || buttonGroupDisabled || disabled

                return (
                    <div
                        ref={itemRef}
                        style={{
                            display: block ? 'flex' : 'inline-flex',
                        }}
                    >
                        <button {...rest} style={style} className={classes} onClick={handleClick} disabled={isDisabled} type={type}>
                            {icon}
                            {!iconOnly && <div>{children}</div>}
                            {arrow && <ArrowDownIcon className={cx('component-button__arrow-icon')} />}
                            {navigationHref && (
                                <Link
                                    to={navigationHref}
                                    className={cx('component-button__navigation')}
                                    ref={(e) => (navigationRef = e)}
                                    onClick={() => {
                                        onClickNavigation()
                                    }}
                                >
                                    <ArrowRightIcon />
                                </Link>
                            )}
                            {(isLoading || isLoadingState) && <LoadingOverlay size="xs" />}
                        </button>
                    </div>
                )
            }}
        </AppContext.Consumer>
    )
}

export default { Button }
export { Button }
