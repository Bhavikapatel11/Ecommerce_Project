export interface SignUp{
    name: string,
    email: string,
    password: string
}

export interface Login{
    email: string,
    password: string
}

export interface Product{
    name: string,
    price: number,
    color: string,
    category: string,
    description: string,
    url: string,
    id: number,
    quantity: undefined | number,
    productId: undefined | number
}

export interface Cart{
    name: string,
    price: number,
    color: string,
    category: string,
    description: string,
    url: string,
    id: number | undefined,
    quantity: undefined | number,
    userId: number,
    productId: number
}

export interface Pricesummary{
    price: number,
    tax: number,
    delivery: number,
    discount: number,
    total: number
}

export interface Order{
    email: string,
    address: string,
    contact: string,
    totalprice: number,
    paymentValue: string,
    userId: string,
    id: number | undefined
}