export default function clearForm(formId: string) {
    const form: any = document.getElementById(formId);
    for (let i = 0; i < form.elements.length; i++) {
        if (form.elements[i].type !== "submit") {
            form.elements[i].value = "";
        }
    }
}