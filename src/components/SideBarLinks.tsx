import {
    AddBusiness,
    AnalyticsOutlined,
    AnalyticsSharp,
    EditAttributes,
    Email, Groups, Inbox, Store
} from "@mui/icons-material";
import Icon from "./SvgIcon";
import { productsIcon } from "./svgIconsAsString";


export interface LinkProps {
    target: string,
    icon: JSX.Element,
    text: string,
    nestedLinks?: LinkProps[]
}

const drawerLinks: LinkProps[] = [
    {
        target: "/",
        text: "Sales Analytics",
        icon: <AnalyticsOutlined />
    },
    {
        target: "/products",
        text: "Products",
        icon: <Icon svgElementAsString={productsIcon} width={22} />,
        nestedLinks: [
            {
                target: "products-management",
                text: " Products Management",
                icon: <Store />
            },
            {
                target: "statistics-page",
                text: "Statistics",
                icon: <AnalyticsSharp />
            },
            {
                target: "add-products",
                text: "Add Products",
                icon: <AddBusiness />
            },
            {
                target: "edit-product",
                text: "Edit Product",
                icon: <EditAttributes />
            },
        ]
    },
    {
        target: "/orders",
        text: "Orders",
        icon: <Inbox />
    },
    {
        target: "/users",
        text: "Users",
        icon: <Groups />
    },
    {
        target: "/emails",
        text: "Emails",
        icon: <Email />
    }
]

export default drawerLinks