import ProductsDisplayer from "../components/ProductsDisplayer";
import { useTheme } from "@mui/material/styles";
import ReactDom from "react-dom/client"


export default function useProductsDisplayer() {

    const { palette: { background, text } } = useTheme();

    function display(id: string) {
        const container = document.createElement("div");
        container.id = "product-displayer-container";
        const app = document.querySelector("#app");
        app?.appendChild(container);
        const toRender = <ProductsDisplayer id={id} close={close} bgColor={background.paper} textColor={text.primary} />
        ReactDom.createRoot(container).render(toRender);
    }

    function close() {
        const none = document.createElement("div");
        const app = document.querySelector("#app");
        app?.removeChild(document.querySelector("#product-displayer-container") ?? none)
    }

    return { display, close }
}
