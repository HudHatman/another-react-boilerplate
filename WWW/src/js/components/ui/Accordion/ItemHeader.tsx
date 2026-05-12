import * as React from 'react'
import classNames from 'classnames/bind'
import { AppContext } from '../../../../index'
import styles from '../../../../assets/scss/components/_accordion.scss'
import { FaAngleDown as ArrowIconDown, FaAngleUp as ArrowIconUp } from 'react-icons/fa'

const cx = classNames.bind(styles)

function ItemHeader({children: any}) {
    return (
        <AppContext.Consumer>
            {({ open, name, isOpened, close, size, type, closeIcon }) => {
                return (
                    <AppContext.Provider value={{ accordionSize: size }}>
                        <div
                            className={cx('component-accordion__item__header')}
                            onClick={(e) => {
                                e.preventDefault()
                                if (!isOpened(name)) {
                                    open(name)
                                } else {
                                    close()
                                }
                            }}
                        >
                            {type === 'minimal' && isOpened(name) && closeIcon && (
                                <ArrowIconUp className={cx('component-accordion__item__header__arrow-icon')} />
                            )}
                            {type === 'minimal' && !isOpened(name) && closeIcon && (
                                <ArrowIconDown className={cx('component-accordion__item__header__arrow-icon')} />
                            )}
                            <div className={cx('component-accordion__item__header__content')}>{children}</div>

                            {type === 'boxed' && isOpened(name) && closeIcon && (
                                <ArrowIconUp className={cx('component-accordion__item__header__arrow-icon')} />
                            )}
                            {type === 'boxed' && !isOpened(name) && closeIcon && (
                                <ArrowIconDown className={cx('component-accordion__item__header__arrow-icon')} />
                            )}
                        </div>
                    </AppContext.Provider>
                )
            }}
        </AppContext.Consumer>
    )
}

export { ItemHeader }
