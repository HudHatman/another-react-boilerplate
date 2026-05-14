import * as React from 'react'
import { IoIosNotificationsOutline } from 'react-icons/io'
import { FaInfoCircle } from 'react-icons/fa'
import { TiWarning } from 'react-icons/ti'
import { CgDanger } from 'react-icons/cg'
import { AiTwotoneLike } from 'react-icons/ai'
import classNames from 'classnames/bind'
import styles from '../../../../assets/scss/layout/_layout.scss'
import { connect } from 'react-redux'
import { actions as notificationsActions, selectors as notificationsSelectors } from '../../../reducers/notifications'
import { bindActionCreators } from 'redux'
import { Badge } from '../../../components'
import { Link } from 'react-router-dom'
import { Scrollbars } from 'react-custom-scrollbars'

const cx = classNames.bind(styles)

interface Notification {
    [index: number]: {
        type: string
        text: string
        href: string
        title: string
    }
}

interface SidebarHeaderNotificationsProps {
    notifications: Notification
    unread: number
    resetUnread(): any
}

interface SidebarHeaderNotificationsState {
    expanded: boolean
}

function BaseSidebarHeaderNotifications({ notifications, unread, resetUnread }: SidebarHeaderNotificationsProps) {
    const getIcon = (type) => {
        switch (type) {
            case 'default':
                return <IoIosNotificationsOutline />

            case 'primary':
                return <IoIosNotificationsOutline />

            case 'secondary':
                return <IoIosNotificationsOutline />

            case 'info':
                return <FaInfoCircle />

            case 'warning':
                return <TiWarning />

            case 'danger':
                return <CgDanger />

            case 'success':
                return <AiTwotoneLike />
        }
    }

    const [expanded, setExpanded] = React.useState(false)
    return (
        <span className={cx('layout__header__bar__right__element', 'layout__header__bar__right__element--notifications')}>
            <div className={cx('layout__header__bar__right__element--notifications__button')}>
                <IoIosNotificationsOutline
                    onClick={() => {
                        setExpanded(!expanded)
                        resetUnread()
                    }}
                />
                {unread > 0 && (
                    <Badge size={'sm'} color={'warning'} rounded>
                        {unread}
                    </Badge>
                )}
            </div>
            {expanded && notifications.length > 0 && (
                <div className={cx('layout__header__bar__right__element--notifications__expanded')}>
                    <Scrollbars style={{ height: '400px' }}>
                        <ul>
                            {notifications.map(({ type, text, href, title, id, date }) => {
                                return (
                                    <li
                                        className={cx({
                                            'layout__header__bar__right__element--notifications__expanded__item': true,
                                            [`layout__header__bar__right__element--notifications__expanded__item--color-${type}`]: true,
                                        })}
                                        key={`${id}`}
                                    >
                                        <Link to={href}>
                                            <span className={cx('layout__header__bar__right__element--notifications__expanded__item__icon')}>
                                                {getIcon(type)}
                                            </span>
                                            <span className={cx('layout__header__bar__right__element--notifications__expanded__item__content')}>
                                                <span
                                                    className={cx(
                                                        'layout__header__bar__right__element--notifications__expanded__item__content__title',
                                                    )}
                                                >
                                                    {title}
                                                </span>
                                                <span
                                                    className={cx(
                                                        'layout__header__bar__right__element--notifications__expanded__item__content__text',
                                                    )}
                                                >
                                                    <p>{text}</p>
                                                    <p>
                                                        <small>{date}</small>
                                                    </p>
                                                </span>
                                            </span>
                                        </Link>
                                    </li>
                                )
                            })}
                        </ul>
                    </Scrollbars>
                    <div className={cx('layout__header__bar__right__element--notifications__expanded__view-all')}>
                        <Link to={'/notifications'}>View all notifications</Link>
                    </div>
                </div>
            )}
        </span>
    )
}

const SidebarHeaderNotifications = connect(
    (state) => ({
        notifications: notificationsSelectors.getAllToastNotifications(state),
        unread: notificationsSelectors.getUnreadNotifications(state),
    }),
    (dispatch) => {
        return bindActionCreators({ resetUnread: notificationsActions.resetUnreadNotifications }, dispatch)
    },
)(BaseSidebarHeaderNotifications)

export { SidebarHeaderNotifications }
