import axios from "axios";
import UPLOAD_IMAGE_API, { UPLOAD_PRESET } from "../CONSTANTS/UPLOAD_IMAGE_API";
import useNotifications from "@/hooks/useNotifications";
import { useTheme } from "@mui/material";

export default function useProductImagesUploader() {

    const { message } = useNotifications();
    const { palette: { mode: theme } } = useTheme();

    async function uploadImages(files: (FormDataEntryValue | null)[]) {
        let uploadedImagesList: string[] = [];
        for (let i = 0; i < files.length; i++) {
            let theFile = files[i] as File
            const payload = new FormData();
            payload.append("file", theFile);
            payload.append("upload_preset", UPLOAD_PRESET);
            await axios.post(UPLOAD_IMAGE_API, payload)
                .then((res) => res.data)
                .then((data) => {
                    const imageUrl = data.url ?? data.secure_url;
                    imageUrl && uploadedImagesList.push(imageUrl);
                })
                .catch(() => {
                    message(`Uploading the image '${theFile.name}' failed!`, "error", { theme })
                })
        }
        return !!uploadedImagesList.length ? uploadedImagesList : false
    }
    return { uploadImages }
}