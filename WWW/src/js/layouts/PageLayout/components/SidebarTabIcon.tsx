import * as React from 'react'
import { Badge } from '../../../components'
import classNames from 'classnames/bind'
import styles from '../../../../assets/scss/layout/_layout.scss'

const cx = classNames.bind(styles)

interface SidebarTabIconProps {
    children: any
    icon: any
    iconCount: number
    iconCountColor: string
}

interface SidebarTabIconState {
    hover: boolean
}

function SidebarTabIcon({ icon, iconCount, iconCountColor, children }: SidebarTabIconProps) {
    const [hover, setHover] = React.useState(false)

    return (
        <div
            className={cx({
                'sidebar-tab-icon__icon-box': true,
                'sidebar-tab-icon__icon-box-hover': hover,
            })}
            id="icon-box"
            onMouseEnter={() => {
                setHover(true)
            }}
            onMouseLeave={() => {
                setHover(false)
            }}
        >
            <div className={cx('sidebar-tab-icon__icon-box-icon')}>
                {icon}
                {typeof iconCount !== 'undefined' && (
                    <Badge color={iconCountColor} className={cx('sidebar-tab-icon__icon-badge')} size="sm">
                        {iconCount}
                    </Badge>
                )}
            </div>
            <div className={cx('sidebar-tab-icon__icon-box-caption')}>{children}</div>
        </div>
    )
}

export { SidebarTabIcon }
