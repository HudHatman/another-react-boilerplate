import * as React from 'react'
import classNames from 'classnames/bind'
import styles from '../../../../assets/scss/layout/_layout.scss'

const cx = classNames.bind(styles)

interface ContainerHeaderProps {
    children: any
}

function ContainerHeader({ children }: ContainerHeaderProps) {
    return <div className={cx('layout__container__content__header')}>{children}</div>
}

export { ContainerHeader }
