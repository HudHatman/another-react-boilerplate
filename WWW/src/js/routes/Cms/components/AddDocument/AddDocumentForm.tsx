import * as React from 'react'
import { Field } from 'redux-form'
import { Badge, Card, Col, FormField, LoadingOverlay, Row, Tabs } from '../../../../components'
import { generateUrl, isPublished } from '../../../../helpers/cms'
import { DocumentIcon } from '../../../../components/icons'
import { ButtonSave } from '../../../../components/common/ButtonSave'
import {
    BlockEditorKeyboardShortcuts,
    BlockEditorProvider,
    BlockList,
    BlockInspector,
    WritingFlow,
    BlockTools,
    ObserveTyping,
} from '@wordpress/block-editor'
import { Popover, SlotFillProvider } from '@wordpress/components'
import { useDispatch } from '@wordpress/data'
import { serialize } from '@wordpress/blocks'
import '@wordpress/format-library'
import { registerCoreBlocks } from '@wordpress/block-library'
import './loadGutenbergDependencies'
import { dispatch, select } from '@wordpress/data'

function setGlobals() {
    // set global djwp object
    window.djwp = {
        data: {
            select,
            dispatch,
        },
    }
}
// import './blocks';
registerCoreBlocks()
setGlobals()

const AddDocumentForm = ({
    handleSubmit,
    categories,
    currentNode,
    change,
    initialValues,
    formValues,
    isLoading,
    menus,
    ...rest
}) => {
    const _default = [
        {
            clientId: '4',
            isValid: true,
            name: 'core/paragraph',
            innerBlocks: [],
            attributes: {
                content: 'Start your article...',
                dropCap: false,
            },
        },
    ]
    const [blocks, setBlocks] = React.useState(_default)
    const dispatch = useDispatch()

    const onEditorLoaded = () => {
        if (initialValues?.document?.document_content_blocks) {
            setBlocks(JSON.parse(initialValues?.document?.document_content_blocks))
            dispatch('core/block-editor').resetBlocks(JSON.parse(initialValues?.document?.document_content_blocks))
        }
    }

    // useEffect to trigger the onEditorLoaded callback
    React.useEffect(() => {
        onEditorLoaded()
    }, [])

    return (
        <Row>
            <Col xs={12}>
                <Card
                    header={
                        <h1>
                            <DocumentIcon /> Add Document
                        </h1>
                    }
                    color={'success'}
                >
                    <form onSubmit={handleSubmit}>
                        <Tabs.Container color={'secondary'}>
                            <Tabs.Tab name="main">
                                <Tabs.Trigger>Main</Tabs.Trigger>
                                <Tabs.Content>
                                    {({ changeTab }) => (
                                        <Row>
                                            <Col xs={12} md={6}>
                                                <div>
                                                    <Field
                                                        name="parent_id"
                                                        label="Parent Category"
                                                        type="select"
                                                        component={FormField}
                                                        options={categories}
                                                    />
                                                    <Field
                                                        name="tree.tree_display_name"
                                                        label="Document Name"
                                                        placeholder={'Display Name'}
                                                        type="text"
                                                        component={FormField}
                                                    />
                                                    {!!initialValues?.tree?.tree_url_is_editable && (
                                                        <Field
                                                            name="document.document_url"
                                                            label="URL"
                                                            placeholder={'URL'}
                                                            type="text"
                                                            component={FormField}
                                                        />
                                                    )}
                                                </div>
                                            </Col>
                                            <Col xs={12} md={6}>
                                                <div>
                                                    <Card header={<h1>Content</h1>} color={'secondary'}>
                                                        <Field
                                                            name="document.document_name"
                                                            label="Display Name"
                                                            type="text"
                                                            placeholder={'Document Name'}
                                                            component={FormField}
                                                            onChange={(e, value) => {
                                                                change(
                                                                    'document.document_url',
                                                                    generateUrl(
                                                                        initialValues?.tree?.id
                                                                            ? currentNode.parent.category.category_url
                                                                            : currentNode.category.category_url,
                                                                        value,
                                                                    ),
                                                                )
                                                            }}
                                                        />
                                                        <Field
                                                            name="document.menu_category_id"
                                                            label="Display Menu"
                                                            placeholder={'Do not display Menu'}
                                                            type="select"
                                                            options={[
                                                                {
                                                                    label: 'Menus',
                                                                    children: menus.map(({ id, tree_display_name }) => {
                                                                        return {
                                                                            value: id,
                                                                            label: tree_display_name,
                                                                        }
                                                                    }),
                                                                },
                                                                {
                                                                    label: 'Display from Category',
                                                                    children: categories,
                                                                },
                                                            ]}
                                                            component={FormField}
                                                        />
                                                    </Card>
                                                    {!!initialValues?.tree?.tree_publishing_is_editable && (
                                                        <Card
                                                            header={
                                                                <h1>
                                                                    Publishing{' '}
                                                                    <Badge color={isPublished(formValues) ? 'success' : 'warning'}>
                                                                        {isPublished(formValues) ? 'Is published' : 'Is not Published'}
                                                                    </Badge>
                                                                </h1>
                                                            }
                                                            color={'secondary'}
                                                        >
                                                            <Field
                                                                name="tree.tree_is_published"
                                                                label="Is published?"
                                                                type="checkbox"
                                                                component={FormField}
                                                            />
                                                            <Field
                                                                name="tree.tree_published_from"
                                                                label="Published from"
                                                                type="text"
                                                                component={FormField}
                                                            />
                                                            <Field
                                                                name="tree.tree_published_to"
                                                                label="Published to"
                                                                type="text"
                                                                component={FormField}
                                                            />
                                                        </Card>
                                                    )}
                                                </div>
                                            </Col>
                                        </Row>
                                    )}
                                </Tabs.Content>
                            </Tabs.Tab>
                            <Tabs.Tab name="content">
                                <Tabs.Trigger>Content</Tabs.Trigger>
                                <Tabs.Content>
                                    <Field name="document.document_content" type="hidden" component={FormField} inputOnly />
                                    <Field name="document.document_content_blocks" type="hidden" component={FormField} inputOnly />
                                    <SlotFillProvider>
                                        <BlockEditorProvider
                                            value={blocks}
                                            onInput={(blocks) => {
                                                setBlocks(blocks)
                                                change('document.document_content', serialize(blocks))
                                                change('document.document_content_blocks', JSON.stringify(blocks))
                                            }}
                                        >
                                            <Row>
                                                <Col xs={9} md={9} lg={9}>
                                                    <div className="playground__content">
                                                        <BlockTools>
                                                            <div className="editor-styles-wrapper">
                                                                <BlockEditorKeyboardShortcuts />
                                                                <WritingFlow>
                                                                    <ObserveTyping>
                                                                        <BlockList />
                                                                    </ObserveTyping>
                                                                </WritingFlow>
                                                            </div>
                                                        </BlockTools>
                                                    </div>
                                                </Col>
                                                <Col xs={3} md={3} lg={3}>
                                                    <div className="playground__sidebar">
                                                        <BlockInspector />
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Popover.Slot />
                                        </BlockEditorProvider>
                                    </SlotFillProvider>
                                </Tabs.Content>
                            </Tabs.Tab>
                            <Tabs.Tab name="meta">
                                <Tabs.Trigger>Meta</Tabs.Trigger>
                                <Tabs.Content>
                                    {({ changeTab }) => (
                                        <>
                                            <Field
                                                name="document.document_meta_title"
                                                label="Title"
                                                type="text"
                                                placeholder={'Meta Title'}
                                                component={FormField}
                                            />
                                            <Field
                                                name="document.document_meta_description"
                                                label="Description"
                                                type="textarea"
                                                placeholder={'Meta Description'}
                                                component={FormField}
                                            />
                                            <Field
                                                name="document.document_meta_keywords"
                                                label="Keywords"
                                                type="textarea"
                                                placeholder={'Meta Keywords'}
                                                component={FormField}
                                            />
                                            <Field
                                                name="document.document_meta_robots"
                                                label="Robots"
                                                type="text"
                                                placeholder={'Meta Robots'}
                                                component={FormField}
                                            />
                                        </>
                                    )}
                                </Tabs.Content>
                            </Tabs.Tab>
                        </Tabs.Container>

                        <Row>
                            <Col xs={12}>
                                <ButtonSave />
                            </Col>
                        </Row>
                    </form>
                    {isLoading && <LoadingOverlay />}
                </Card>
            </Col>
        </Row>
    )
}

export { AddDocumentForm }
export default { AddDocumentForm }
