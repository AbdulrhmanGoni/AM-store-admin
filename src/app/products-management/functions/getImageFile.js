export default function getImageFile(event) {
    const imageFile = new FormData(event.currentTarget).get("image");
    const payload = new FormData();
    payload.append("image", imageFile);
    return payload;
}