export default function clearForm(formId: string) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const form: any = document.getElementById(formId);
    for (let i = 0; i < form.elements.length; i++) {
        if (form.elements[i] && form.elements[i].type !== "submit") {
            form.elements[i].value = "";
        }
    }
}