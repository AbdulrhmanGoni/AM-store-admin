import {
    AddBusiness,
    AnalyticsOutlined,
    DiscountOutlined,
    Email, Groups, Inbox, Store
} from "@mui/icons-material";
import Icon from "./SvgIcon";
import { productsIcon } from "./svgIconsAsString";


export interface LinkProps {
    target: string,
    icon: any,
    text: string,
    nestedLinks?: LinkProps[]
}

const drawerLinks: LinkProps[] = [
    {
        target: "/",
        text: "Dashboard",
        icon: <AnalyticsOutlined />
    },
    {
        target: "/products",
        text: "Products",
        icon: <Icon svgElementAsString={productsIcon} width={22} color="white"/>,
        nestedLinks: [
            {
                target: "products-management",
                text: " Products Management",
                icon: <Store />
            },
            {
                target: "add-products",
                text: "Add Products",
                icon: <AddBusiness />
            }
        ]
    },
    {
        target: "/discounts",
        text: "Discounts",
        icon: <DiscountOutlined />
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