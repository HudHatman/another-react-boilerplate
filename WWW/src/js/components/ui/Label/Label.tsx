import * as React from 'react'
import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'
import { FaAngleDown as ArrowIcon } from 'react-icons/fa'
import { AppContext } from '../../../../index'
import styles from '../../../../assets/scss/components/_label.scss'

const cx = classNames.bind(styles)

interface LabelProps {
    children: any
    color?: string
    className?: string
    rounded?: boolean
    roundless?: boolean
    block?: boolean
    href?: string
    iconOnly?: boolean
    striped?: boolean
    outline?: boolean
    arrow?: boolean
    size?: string
    disableContext?: boolean
    style?: object
    onClick?: Function
}

function Label({
    color = 'default',
    children,
    style = {},
    className,
    onClick,
    rounded,
    roundless,
    block,
    href,
    iconOnly,
    striped,
    outline,
    arrow,
    size,
    ...props
}: LabelProps) {
    const renderClassName = ({ cardSize, dropdownSize, accordionSize } = {}) => {
        return cx('component-label', {
            [className]: className,
            [`component-label--color-${color}`]: color,
            [`component-label--rounded`]: rounded,
            [`component-label--roundless`]: roundless,
            [`component-label--block`]: block,
            [`component-label--link`]: href,
            [`component-label--icon-only`]: iconOnly,
            [`component-label--striped`]: striped,
            [`component-label--outline`]: outline,
            [`component-label--arrow`]: arrow,
            [`component-label--pointer`]: !!onClick,
            [`component-label--size-${dropdownSize || cardSize || accordionSize || size}`]: dropdownSize || cardSize || accordionSize || size,
        })
    }

    const { disableContext } = props

    return (
        <AppContext.Consumer>
            {({ cardSize, dropdownSize, accordionSize } = {}) => {
                if (href) {
                    return (
                        <Link
                            to={href}
                            className={renderClassName(
                                disableContext
                                    ? {}
                                    : {
                                          cardSize,
                                          dropdownSize,
                                          accordionSize,
                                      },
                            )}
                            {...props}
                        >
                            {children}
                        </Link>
                    )
                }

                return (
                    <div
                        className={renderClassName(disableContext ? {} : { cardSize, dropdownSize, accordionSize })}
                        style={style}
                        onClick={onClick}
                        {...props}
                    >
                        {children}
                        {arrow && <ArrowIcon />}
                    </div>
                )
            }}
        </AppContext.Consumer>
    )
}

export { Label }
export default { Label }
