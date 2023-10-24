import ProductsDisplayer from "../components/ProductsDisplayer";
import { useTheme } from "@mui/material/styles";
import ReactDom from "react-dom/client"
import { useNavigate } from "react-router-dom"


export default function useProductsDisplayer() {

    const navigate = useNavigate();
    const { palette: { background, text } } = useTheme();

    function display(productId: string) {
        const container = document.createElement("div");
        container.id = "product-displayer-container";
        const app = document.querySelector("#app");
        app?.appendChild(container);
        const toRender = <ProductsDisplayer
            productId={productId}
            close={close}
            bgColor={background.paper}
            textColor={text.primary}
            navigate={() => { navigate(`/products/edit-product/${productId}`) }}
        />
        ReactDom.createRoot(container).render(toRender);
    }

    function close() {
        const container = document.querySelector("#product-displayer")
        container?.remove()
    }

    return { display, close }
}
