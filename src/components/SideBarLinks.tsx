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
    path: string,
    icon: JSX.Element,
    text: string,
    nestedLinks?: LinkProps[]
}

const drawerLinks: LinkProps[] = [
    {
        path: "/",
        text: "Sales Analytics",
        icon: <AnalyticsOutlined />
    },
    {
        path: "/products",
        text: "Products",
        icon: <Icon svgElementAsString={productsIcon} width={22} />,
        nestedLinks: [
            {
                path: "products-management",
                text: " Products Management",
                icon: <Store />
            },
            {
                path: "products-statistics",
                text: "Products Statistics",
                icon: <AnalyticsSharp />
            },
            {
                path: "add-products",
                text: "Add Products",
                icon: <AddBusiness />
            },
            {
                path: "edit-product",
                text: "Edit Product",
                icon: <EditAttributes />
            },
        ]
    },
    {
        path: "/orders",
        text: "Orders",
        icon: <Inbox />
    },
    {
        path: "/users",
        text: "Users",
        icon: <Groups />
    },
    {
        path: "/emails",
        text: "Emails",
        icon: <Email />
    }
]

export default drawerLinks