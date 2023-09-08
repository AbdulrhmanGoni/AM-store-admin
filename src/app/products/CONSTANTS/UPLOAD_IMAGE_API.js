const api_key = process.env.UPLOAD_IMAGE_API_KEY;
const upload_image_api = process.env.UPLOAD_IMAGE_API_HOST_NAME;
const UPLOAD_IMAGE_API = `${upload_image_api}?key=${api_key}`;

export default UPLOAD_IMAGE_API