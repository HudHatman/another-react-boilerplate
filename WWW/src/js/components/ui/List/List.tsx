import * as React from 'react'
import classNames from 'classnames/bind'
import styles from '../../../../assets/scss/components/_list.scss'

const cx = classNames.bind(styles)

interface ContainerProps {
    color: string
    size: string
    separated: boolean
    children: any
}

function Container({ children, color = 'default', size = 'md', separated }: ContainerProps) {
    return (
        <div
            className={cx('component-list', {
                [`component-list--color-${color}`]: color,
                [`component-list--size-${size}`]: size,
                [`component-list--separated`]: separated,
            })}
        >
            {children}
        </div>
    )
}

function Item({ children }) {
    return <div className={cx('component-list__item')}>{children}</div>
}

function ItemContent({ children }) {
    return <div className={cx('component-list__item__content')}>{children}</div>
}

interface ImageProps {
    image: string
    children: any
    url: string
}

function Image({ url }: ImageProps) {
    return (
        <div className={cx('component-list__item__image')}>
            <img src={url} alt="" />
        </div>
    )
}

export { Container, Item, Image, ItemContent }
export default { Container, Item, Image, ItemContent }
