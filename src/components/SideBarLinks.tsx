import {
    AddBusiness,
    AnalyticsOutlined,
    AnalyticsSharp,
    Discount, Inbox,
    EditAttributes,
    Feedback, Groups, Store,
    Settings
} from "@mui/icons-material";
import Icon from "./SvgIcon";
import { productsIcon } from "./svgIconsAsString";


export interface LinkProps {
    path: string,
    icon: JSX.Element,
    text: string,
    nestedLinks?: LinkProps[]
}

const sideBarLinks: LinkProps[] = [
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
                text: "Products Management",
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
            {
                path: "cobones-and-discounts",
                text: "Cobones & Discount",
                icon: <Discount />
            }
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
        path: "/users-feedbacks",
        text: "Users Feedbacks",
        icon: <Feedback />
    },
    {
        path: "/settings",
        text: "Settings",
        icon: <Settings />
    }
]

export default sideBarLinks