interface productData {
    title: string;
    price: number,
    series: string,
    category: string,
    files: (FormDataEntryValue | null)[],
    images: string[],
    amount: number,
    description: string
}
interface productFullType extends productData {
    _id: string,
    sold: number,
    earnings: number,
    discount?: number,
    rating?: { reviews: number, ratingAverage: number }
}
interface UserData {
    userName: string;
    userEmail: string,
    _id: string,
    avatar: string
}
interface AdminData {
    adminName: string;
    adminEmail: string,
    _id: string,
    avatar: string
}

export type {
    productData,
    productFullType,
    AdminData,
    UserData,
}