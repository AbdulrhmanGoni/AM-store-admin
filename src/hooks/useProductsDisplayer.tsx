import ProductsDisplayer from "@/components/ProductsDisplayer";
import { useTheme } from "@mui/material/styles";
import ReactDom from "react-dom/client"


export default function useProductsDisplayer() {

    const { palette } = useTheme();
    
    function display(id: string) {
        const container = document.createElement("div");
        container.id = "product-displayer-container";
        const app = document.querySelector("#app");
        app?.appendChild(container);
        ReactDom.createRoot(container).render(<ProductsDisplayer id={id} close={close} palette={palette} />);
    }

    function close() {
        const none = document.createElement("div");
        const app = document.querySelector("#app");
        app?.removeChild(document.querySelector("#product-displayer-container") ?? none)
    }


    return { display, close }
}
