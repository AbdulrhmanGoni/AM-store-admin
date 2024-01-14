import ProductsDisplayer from "../components/ProductsDisplayer";
import { useTheme } from "@mui/material/styles";
import ReactDom from "react-dom/client"
import { useNavigate } from "react-router-dom"


export default function useProductsDisplayer() {

    const navigate = useNavigate();
    const theme = useTheme();

    function display(productId: string) {
        const container = document.createElement("div");
        container.id = "product-displayer-container";
        const app = document.querySelector("#app");
        app?.appendChild(container);
        const root = ReactDom.createRoot(container)
        const toRender = <ProductsDisplayer
            productId={productId}
            theme={theme}
            close={() => { close(); root.unmount() }}
            navigate={() => { navigate(`/products/edit-product/${productId}`) }}
        />
        root.render(toRender);
    }

    function close() {
        const container = document.querySelector("#product-displayer-container")
        container?.remove()
    }

    return { display, close }
}
