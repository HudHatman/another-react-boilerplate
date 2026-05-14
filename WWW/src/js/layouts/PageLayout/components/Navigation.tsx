import * as React from 'react'
import classNames from 'classnames/bind'
import styles from '../../../../assets/scss/layout/_layout.scss'
import { navigation } from '../../../config/navigation'
import { NavigationItems } from './NavigationItems'

const cx = classNames.bind(styles)

function Navigation() {
    const [nested, setStateNested] = React.useState([])
    const setNested = (itemId, parentId) => {
        const n = [...nested]

        if (!n.includes(parentId)) {
            setStateNested([itemId])
        } else {
            setStateNested([...n, itemId])
        }
    }
    return (
        <div className={cx('layout__sidebar__content__navigation')}>
            <NavigationItems items={navigation} setNested={setNested} nestedIds={nested}></NavigationItems>
        </div>
    )
}

export { Navigation }
