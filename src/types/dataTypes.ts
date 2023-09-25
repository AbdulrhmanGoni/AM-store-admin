type user = {
    userName: string;
    userEmail: string,
    _id: string,
    avatar: string
}
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
    rate?: { raters: ratingProduct[], avrage: number },
    comments?: comment[],
    _id?: string
}
type ratingProduct = {
    raterId: string,
    raterData: string,
    rate: number,
}
type formDataImage = {
    name: string,
    raterData: string,
    rate: number,
}
type comment = {
    productId: string,
    commenterId: string,
    commenterData: user,
    targetId: string,
    targetData: user,
    text: string,
    likes: string[],
    dislikes: string[],
    replies: comment,
    createdAt: string,
    isNewComment: boolean,
    isNewReply: boolean
}
type paymentMethodCard = {
    theName: string,
    number: number,
    expired: string
}
type location = {
    theName: string,
    phone: number | string,
    country: string,
    city: string,
    street: string,
    moreDetails: string,
    type: string,
    id: string
}
type order = {
    userId: string,
    userData?: user,
    location: {
        locationsList: location[],
        selectedLocation: location | null | undefined
    },
    products: [],
    totalPrice: { before: number, after: number },
    paymentMethod: {
        cardsList: paymentMethodCard[],
        selectedMethod: paymentMethodCard | null | undefined
    },
    state: string,
    deliveryDate: string | string,
    deliveryPrice: { value: string | number },
    discountCobone: { name: string | undefined, value: number | undefined },
    _id: string,
    createdAt: string,
}


type submetEvent = {
    preventDefault: () => void,
    currentTarget: HTMLFormElement | undefined
}


export type {
    // user,
    productData,
    submetEvent,
    // order,
    // ratingProduct,
    // comment,
    // paymentMethodCard,
    // location
}