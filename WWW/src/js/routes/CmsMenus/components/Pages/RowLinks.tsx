import * as React from 'react'
import { Button, Table } from '../../../../components'
import { AddIcon, LinkIcon } from '../../../../components/icons'
import styles from '../../../../../assets/scss/routes/cms.scss'
import classNames from 'classnames/bind'
import { ModalManager } from '../../../../components/ui/Modal'
import { RouteManager } from '../../../../containers'
import SimpleModelCell from '../../../../components/common/SimpleModelCell'
import ModalDeleteMenuLink from '../../../../components/common/ModalDeleteMenuLink'
import { AddLinkFormContainer } from '../../containers/AddLinkFormContainer'
import Manager from '../../../Cms/components/Manager'

const cx = classNames.bind(styles)

export class RowLinks extends React.Component<null, {}> {
    state: {}
    constructor(props) {
        super(props)
        this.state = { addForm: false }
    }
    render() {
        const { links, setIsLoading, fetchMenus, deleteNode, menu } = this.props

        return (
            <RouteManager>
                {({ navigate }) => (
                    <ModalManager>
                        {({ registerModal, openModal, closeModal }) => (
                            <Table.Tr>
                                <Table.Td xs={12}>
                                    <div>
                                        {links.map((link) => {
                                            registerModal(
                                                `menu-remove-link-${link.id}-delete`,
                                                <ModalDeleteMenuLink
                                                    setIsLoading={setIsLoading}
                                                    closeModal={() => closeModal(`menu-remove-link-${link.id}-delete`)}
                                                    deleteNode={deleteNode}
                                                    fetchMenus={fetchMenus}
                                                    menu={menu}
                                                    link={link}
                                                />,
                                            )

                                            return (
                                                <SimpleModelCell
                                                    block
                                                    color={'primary'}
                                                    outline
                                                    size={'lg'}
                                                    actions={[
                                                        {
                                                            name: 'edit',
                                                            onClick: () => {
                                                                navigate(`/cms/menus/edit?id=${menu.id}`)
                                                            },
                                                        },
                                                        {
                                                            name: 'delete',
                                                            onClick: () => {
                                                                openModal(`menu-remove-link-${link.id}-delete`)
                                                            },
                                                        },
                                                    ]}
                                                >
                                                    <span>
                                                        <LinkIcon /> {link.link.link_name}
                                                    </span>
                                                </SimpleModelCell>
                                            )
                                        })}
                                        {!this.state.addForm && (
                                            <Button
                                                icon={<AddIcon />}
                                                color={'success'}
                                                type={'submit'}
                                                block
                                                onClick={() => {
                                                    this.setState({ addForm: true })
                                                }}
                                            >
                                                Add
                                            </Button>
                                        )}
                                        {this.state.addForm && (
                                            <Manager id={1}>
                                                {({ setIsLoading, isLoading, fetchMenus, addNewMenuLink }) => {
                                                    return (
                                                        <AddLinkFormContainer
                                                            onSubmit={(values) => {
                                                                setIsLoading(true)
                                                                addNewMenuLink(menu, values).then(() => {
                                                                    fetchMenus().then(() => {
                                                                        this.setState({ addForm: false }, () => {
                                                                            setIsLoading(false)
                                                                        })
                                                                    })
                                                                })
                                                            }}
                                                            initialValues={{
                                                                target: null,
                                                                link: {
                                                                    link_name: '',
                                                                    link_url: '',
                                                                    category_id: 0,
                                                                    document_id: 0,
                                                                    link_target: '_self',
                                                                },
                                                            }}
                                                        />
                                                    )
                                                }}
                                            </Manager>
                                        )}
                                    </div>
                                </Table.Td>
                            </Table.Tr>
                        )}
                    </ModalManager>
                )}
            </RouteManager>
        )
    }
}

export default RowLinks
