import { Card } from './ui/Card'
import { Checkbox } from './form/Checkbox'
import { Badge } from './ui/Badge'
import { Button } from './ui/Button'
import { IconBox } from './ui/IconBox'
import { LoadingOverlay } from './ui/LoadingOverlay'
import { Header } from './ui/Header'
import { Select } from './form/Select'
import { TextField } from './form/TextField'
import { Row } from './ui/Row'
import { Col } from './ui/Col'
import { Section } from './ui/Section'
import { FormField } from './form/FormField'
import { TextArea } from './form/TextArea'
import { Alert } from './ui/Alert'
import { ButtonGroup } from './ui/ButtonGroup'
import { Label } from './ui/Label'
import { Radio } from './form/Radio'
import {
    Actions as PageHeaderActions,
    Breadcrumbs as PageHeaderBreadcrumbs,
    BreadcrumbsItem as PageHeaderBreadcrumbsItem,
    Container as PageHeaderContainer,
    Title as PageHeaderTitle,
} from './ui/PageHeader'
import { Breadcrumbs } from './ui/Breadcrumbs'
import { Copyright } from './common/Copyright'
import { Container as PopoverContainer, Content as PopoverContent, Trigger as PopoverTrigger } from './ui/Popover'
import { Container as TabContainer, Content as TabContent, Tab, Trigger as TabTrigger } from './ui/Tabs'
import { DropdownContainer, DropdownItem, DropdownMenu, DropdownTrigger } from './ui/Dropdown'
import { Container as TypographyContainer, Header as TypographyHeader } from './ui/Typography'
import { Progress } from './ui/Progress'
import {
    Container as AccordionContainer,
    Item as AccordionItem,
    ItemContent as AccordionItemContent,
    ItemHeader as AccordionItemHeader,
} from './ui/Accordion'
import {
    ExpandManager,
    Table as TableContainer,
    TBody as TBodyComponent,
    Td as TdComponent,
    TFoot as TFootComponent,
    Th as ThComponent,
    THead as THeadComponent,
    Tr as TrComponent,
} from './ui/Table'
import { Container as ListContainer, Image as ListImage, Item as ListItem, ItemContent as ListItemContent } from './ui/List'
import { Tooltip } from './ui/Tooltip'
import { ModalBody, ModalContainer, ModalFooter, ModalHeader, ModalManager, ModalWrapper } from './ui/Modal'

const Tabs = {
    Container: TabContainer,
    Content: TabContent,
    Trigger: TabTrigger,
    Tab,
}

const Dropdown = {
    Container: DropdownContainer,
    Trigger: DropdownTrigger,
    Menu: DropdownMenu,
    Item: DropdownItem,
}

const Popover = {
    Container: PopoverContainer,
    Trigger: PopoverTrigger,
    Content: PopoverContent,
}

const PageHeader = {
    Container: PageHeaderContainer,
    Title: PageHeaderTitle,
    Breadcrumbs: PageHeaderBreadcrumbs,
    BreadcrumbsItem: PageHeaderBreadcrumbsItem,
    Actions: PageHeaderActions,
}

const Typography = {
    Container: TypographyContainer,
    Header: TypographyHeader,
}

const Accordion = {
    Container: AccordionContainer,
    Item: AccordionItem,
    ItemHeader: AccordionItemHeader,
    ItemContent: AccordionItemContent,
}

const Table = {
    Container: TableContainer,
    Th: ThComponent,
    THead: THeadComponent,
    TBody: TBodyComponent,
    Td: TdComponent,
    Tr: TrComponent,
    TFoot: TFootComponent,
    ExpandManager,
}

const List = {
    Container: ListContainer,
    Item: ListItem,
    Image: ListImage,
    ItemContent: ListItemContent,
}

const Modal = {
    Container: ModalContainer,
    Body: ModalBody,
    Header: ModalHeader,
    Footer: ModalFooter,
    Manager: ModalManager,
    Wrapper: ModalWrapper,
}

export {
    LoadingOverlay,
    Button,
    Select,
    Checkbox,
    Card,
    IconBox,
    Header,
    TextField,
    Row,
    Col,
    Section,
    FormField,
    TextArea,
    Alert,
    Tabs,
    Label,
    Badge,
    Radio,
    Modal,
    Dropdown,
    ButtonGroup,
    Popover,
    Copyright,
    PageHeader,
    Breadcrumbs,
    Typography,
    Progress,
    Accordion,
    Table,
    List,
    Tooltip,
}

export default {
    TextField,
    LoadingOverlay,
    Button,
    Select,
    Checkbox,
    Card,
    IconBox,
    Header,
    Row,
    Col,
    Section,
    FormField,
    TextArea,
    Alert,
    Tabs,
    Label,
    Badge,
    Radio,
    Modal,
    Dropdown,
    ButtonGroup,
    Popover,
    Copyright,
    PageHeader,
    Breadcrumbs,
    Typography,
    Progress,
    Accordion,
    Table,
    List,
    Tooltip,
}
