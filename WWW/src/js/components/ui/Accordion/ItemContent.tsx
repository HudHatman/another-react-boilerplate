import * as React from 'react'
import classNames from 'classnames/bind'
import { AppContext } from '../../../../index'
import styles from '../../../../assets/scss/components/_accordion.scss'

const cx = classNames.bind(styles)

function ItemContent({ children: any }) {
    return (
        <AppContext.Consumer>
            {({ isOpened, name }) => {
                if (isOpened(name)) {
                    return <div className={cx('component-accordion__item__item-content')}>{children}</div>
                }

                return null
            }}
        </AppContext.Consumer>
    )
}

export { ItemContent }
