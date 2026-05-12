import * as React from 'react'
import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'
import { FaAngleDown as ArrowIcon } from 'react-icons/fa'
import { AppContext } from '../../../../index'
import styles from '../../../../assets/scss/components/_badge.scss'

const cx = classNames.bind(styles)

interface BadgeProps {
    children: any
    color?: string
    className?: string
    outline?: boolean
    href?: string
    size?: string
    arrow?: boolean
    disableContext?: boolean
    rounded?: boolean
    roundless?: boolean
    right?: boolean
}

function Badge({ children, color = 'default', className, href, size = 'md', arrow, rounded, disableContext, ...props }: BadgeProps) {
    const renderClassName = ({ cardSize, dropdownSize, accordionSize } = {}) => {
        const { outline, roundless } = props

        return cx('component-badge', {
            [className]: className,
            [`component-badge--color-${color}`]: color,
            [`component-badge--outline`]: outline,
            [`component-badge--link`]: href,
            [`component-badge--arrow`]: arrow,
            [`component-badge--rounded`]: rounded,
            [`component-badge--roundless`]: roundless,
            [`component-badge--size-${dropdownSize || cardSize || accordionSize || size}`]: dropdownSize || cardSize || accordionSize || size,
        })
    }

    return (
        <AppContext.Consumer>
            {({ cardSize, dropdownSize, accordionSize } = {}) => {
                if (href) {
                    return (
                        <Link
                            className={renderClassName(
                                disableContext
                                    ? {}
                                    : {
                                          cardSize,
                                          dropdownSize,
                                          accordionSize,
                                      },
                            )}
                            to={href}
                        >
                            {children}
                            {arrow && <ArrowIcon className={cx('component-badge__arrow-icon')} />}
                        </Link>
                    )
                }

                return (
                    <div className={renderClassName(disableContext ? {} : { cardSize, dropdownSize, accordionSize })} {...props}>
                        {children}
                        {arrow && <ArrowIcon className={cx('component-badge__arrow-icon')} />}
                    </div>
                )
            }}
        </AppContext.Consumer>
    )
}

export { Badge }
export default { Badge }
