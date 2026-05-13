import * as React from 'react'
import { LoadingOverlay } from '../../index'

interface HeaderProps {
    children: any
    isLoading: boolean
}

function Header({ children, isLoading }: HeaderProps) {
    return (
        <h3 className="page-header">
            <span className="page-header-caption">{children}</span>
            {isLoading && (
                <span className="page-header-loading-container">
                    <LoadingOverlay size="xs" noBackground />
                </span>
            )}
        </h3>
    )
}

export { Header }
export default { Header }
