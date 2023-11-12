import axios from "axios";
import UPLOAD_IMAGE_API, { UPLOAD_PRESET } from "../CONSTANTS/UPLOAD_IMAGE_API";
import useNotifications from "./useNotifications";
import { useTheme } from "@mui/material";

export default function useProductImagesUploader() {

    const { message } = useNotifications();
    const { palette: { mode: theme } } = useTheme();

    async function uploadImages(files?: (FormDataEntryValue | null)[]) {
        if (files) {
            const uploadedImagesList: string[] = [];
            for (let i = 0; i < files.length; i++) {
                if (files[i] instanceof File) {
                    const theFile = files[i] as File
                    const payload = new FormData();
                    payload.append("file", theFile);
                    payload.append("upload_preset", UPLOAD_PRESET);
                    await axios.post(UPLOAD_IMAGE_API, payload)
                        .then((res) => res.data)
                        .then((data) => {
                            const imageUrl = data.url ?? data.secure_url;
                            imageUrl && uploadedImagesList.push(imageUrl);
                        })
                        .catch((err) => {
                            console.log(err)
                            message(`Uploading the image '${theFile.name}' failed!`, "error", { theme })
                        })
                } else if (typeof files[i] === "string") {
                    uploadedImagesList.push(files[i] as string)
                }
            }
            return uploadedImagesList.length ? uploadedImagesList : undefined
        } else return
    }

    return { uploadImages }
}