import * as React from 'react'
import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import { BlankPageLayout, PageLayout } from './layouts'

import { IndexView } from './routes/Index'
import { IndexView as LoginView } from './routes/Login'
import { CmsPagesView } from './routes/Cms'

import { UserIsAuthenticatedRoute } from './modules/auth'
import AddCategoryView from './routes/Cms/components/AddCategory'
import AddDocumentView from './routes/Cms/components/AddDocument'
import AddLinkView from './routes/Cms/components/AddLink'
import AddFilesView from './routes/Cms/components/AddFiles'
import { UsersView } from './routes/Users'
import { UserRolesView } from './routes/UserRoles'
import { UsersAccountActivated } from './routes/UsersAccountActivated'
import { MediaView } from './routes/Media'
import { UsersEditView } from './routes/UsersEdit'
import UsersAddView from './routes/UsersAdd/components/Index'
import { UserRolesEdit } from './routes/UserRolesEdit'
import { UsersPermissions } from './routes/UsersPermissions'
import { UsersPermissionsEditView } from './routes/UsersPermissionsEdit'
import { UsersPermissionsAddView } from './routes/UsersPermissionsAdd'
import { UserRolesAdd } from './routes/UserRolesAdd'
import { WebsocketsManager } from './containers'
import { EditCategoryView } from './routes/Cms/components/EditCategory'
import EditDocumentView from './routes/Cms/components/EditDocument'
import EditLinkView from './routes/Cms/components/EditLink'
import { LogsView } from './routes/Logs'
import { Container } from './containers/Config'
import { CmsSettingsView } from './routes/CmsSettings'
import { RegisterView } from './routes/Register'
import { SystemSettings } from './routes/SystemSettings'
import { CmsAddMenuView, CmsEditMenuView, CmsMenusView } from './routes/CmsMenus'

const App = () => (
    <Router>
        <WebsocketsManager>
            {() => (
                <Container>
                    <Routes>
                        <Route
                            path="/users/account_activated"
                            element={
                                <BlankPageLayout>
                                    <UsersAccountActivated />
                                </BlankPageLayout>
                            }
                        />

                        <Route
                            path="/login"
                            element={
                                <BlankPageLayout>
                                    <LoginView />
                                </BlankPageLayout>
                            }
                        />

                        <Route
                            path="/register"
                            element={
                                <BlankPageLayout>
                                    <RegisterView />
                                </BlankPageLayout>
                            }
                        />

                        <Route element={<PageLayout />}>
                            <Route
                                path="/cms/pages"
                                element={
                                    <UserIsAuthenticatedRoute permission={'cms.list'}>
                                        <CmsPagesView />
                                    </UserIsAuthenticatedRoute>
                                }
                            />

                            <Route
                                path="/cms/pages/add_category"
                                element={
                                    <UserIsAuthenticatedRoute permission={'cms.add_category'}>
                                        <AddCategoryView />
                                    </UserIsAuthenticatedRoute>
                                }
                            />

                            <Route
                                path="/cms/pages/edit_category"
                                element={
                                    <UserIsAuthenticatedRoute permission={'cms.edit_category'}>
                                        <EditCategoryView />
                                    </UserIsAuthenticatedRoute>
                                }
                            />

                            <Route
                                path="/cms/pages/add_link"
                                element={
                                    <UserIsAuthenticatedRoute permission={'cms.add_link'}>
                                        <AddLinkView />
                                    </UserIsAuthenticatedRoute>
                                }
                            />

                            <Route
                                path="/cms/pages/add_files"
                                element={
                                    <UserIsAuthenticatedRoute permission={'cms.add_file'}>
                                        <AddFilesView />
                                    </UserIsAuthenticatedRoute>
                                }
                            />

                            <Route
                                path="/cms/pages/edit_link"
                                element={
                                    <UserIsAuthenticatedRoute permission={'cms.edit_link'}>
                                        <EditLinkView />
                                    </UserIsAuthenticatedRoute>
                                }
                            />

                            <Route
                                path="/cms/pages/add_document"
                                element={
                                    <UserIsAuthenticatedRoute permission={'cms.add_document'}>
                                        <AddDocumentView />
                                    </UserIsAuthenticatedRoute>
                                }
                            />

                            <Route
                                path="/cms/pages/edit_document"
                                element={
                                    <UserIsAuthenticatedRoute permission={'cms.edit_document'}>
                                        <EditDocumentView />
                                    </UserIsAuthenticatedRoute>
                                }
                            />

                            <Route
                                path="/cms/settings"
                                element={
                                    <UserIsAuthenticatedRoute permission={'cms.settings'}>
                                        <CmsSettingsView />
                                    </UserIsAuthenticatedRoute>
                                }
                            />

                            <Route
                                path="/cms/menus"
                                element={
                                    <UserIsAuthenticatedRoute permission={'cms.menus'}>
                                        <CmsMenusView />
                                    </UserIsAuthenticatedRoute>
                                }
                            />

                            <Route
                                path="/cms/menus/add"
                                element={
                                    <UserIsAuthenticatedRoute permission={'cms.menus.add'}>
                                        <CmsAddMenuView />
                                    </UserIsAuthenticatedRoute>
                                }
                            />

                            <Route
                                path="/cms/menus/edit"
                                element={
                                    <UserIsAuthenticatedRoute permission={'cms.menus.edit'}>
                                        <CmsEditMenuView />
                                    </UserIsAuthenticatedRoute>
                                }
                            />

                            <Route
                                path="/users"
                                element={
                                    <UserIsAuthenticatedRoute permission={'users.list'}>
                                        <UsersView />
                                    </UserIsAuthenticatedRoute>
                                }
                            />

                            <Route
                                path="/users/edit"
                                element={
                                    <UserIsAuthenticatedRoute permission={'users.edit'}>
                                        <UsersEditView />
                                    </UserIsAuthenticatedRoute>
                                }
                            />

                            <Route
                                path="/users/add"
                                element={
                                    <UserIsAuthenticatedRoute permission={'users.add'}>
                                        <UsersAddView />
                                    </UserIsAuthenticatedRoute>
                                }
                            />

                            <Route
                                path="/logs"
                                element={
                                    <UserIsAuthenticatedRoute permission={'logs.list'}>
                                        <LogsView />
                                    </UserIsAuthenticatedRoute>
                                }
                            />

                            <Route
                                path="/roles"
                                element={
                                    <UserIsAuthenticatedRoute permission={'roles.list'}>
                                        <UserRolesView />
                                    </UserIsAuthenticatedRoute>
                                }
                            />

                            <Route
                                path="/roles/add"
                                element={
                                    <UserIsAuthenticatedRoute permission={'roles.add'}>
                                        <UserRolesAdd />
                                    </UserIsAuthenticatedRoute>
                                }
                            />

                            <Route
                                path="/roles/edit"
                                element={
                                    <UserIsAuthenticatedRoute permission={'roles.edit'}>
                                        <UserRolesEdit />
                                    </UserIsAuthenticatedRoute>
                                }
                            />

                            <Route
                                path="/permissions"
                                element={
                                    <UserIsAuthenticatedRoute permission={'permissions.list'}>
                                        <UsersPermissions />
                                    </UserIsAuthenticatedRoute>
                                }
                            />

                            <Route
                                path="/permissions/add"
                                element={
                                    <UserIsAuthenticatedRoute permission={'permissions.add'}>
                                        <UsersPermissionsAddView />
                                    </UserIsAuthenticatedRoute>
                                }
                            />

                            <Route
                                path="/permissions/edit"
                                element={
                                    <UserIsAuthenticatedRoute permission={'permissions.edit'}>
                                        <UsersPermissionsEditView />
                                    </UserIsAuthenticatedRoute>
                                }
                            />

                            <Route
                                path="/media"
                                element={
                                    <UserIsAuthenticatedRoute permission={'media.list'}>
                                        <MediaView />
                                    </UserIsAuthenticatedRoute>
                                }
                            />

                            <Route
                                path="/settings"
                                element={
                                    <UserIsAuthenticatedRoute permission={'system.edit_settings'}>
                                        <SystemSettings />
                                    </UserIsAuthenticatedRoute>
                                }
                            />

                            <Route
                                path="/"
                                element={
                                    <UserIsAuthenticatedRoute>
                                        <IndexView />
                                    </UserIsAuthenticatedRoute>
                                }
                            />
                        </Route>
                    </Routes>
                </Container>
            )}
        </WebsocketsManager>
    </Router>
)

export { App }
export default App
