interface productData {
    title: string;
    price: number,
    series: string,
    category: string,
    files?: (FormDataEntryValue | null)[],
    images: string[],
    amount: number,
    description: string,
    sold?: number,
    earnings?: number,
    _id?: string
}
interface UserData {
    userName: string;
    userEmail: string,
    _id: string,
    avatar?: string
}
interface AdminData {
    adminName: string;
    adminEmail: string,
    _id: string,
    avatar?: string
}
interface submetEvent {
    preventDefault: () => void,
    currentTarget: HTMLFormElement | undefined
}


export type {
    productData,
    submetEvent,
    AdminData,
    UserData,
}