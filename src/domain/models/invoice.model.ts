
interface TypeItemInvoice {
    id: string,
    invoicedId: string,
    product: string,
    quantity: number,
    unitPrice: number
}

export class Invoice {
    constructor(
        public id: string, 
        public to: string, 
        public from: string, 
        public items: TypeItemInvoice[], 
        public issuedAt: Date,
        public category_id: string,
        public type: string,
        public type_amount: number,
        public is_paid: boolean,
        public description: string
    ) { }
}

/*
@Invoice

{
    "id": "703c11fea6e5",
    "to": "Snayder Mendonza",
    "from": "5bdb05ac8f88",
    "items": [
        {
            "id": "59632484",
            "InvoiceId": "703c11fea6e5",
            "product": "Arroz",
            "quantity": 1,
            "unitPrice": 100
        },
        {
            "id": "25986392",
            "InvoiceId": "703c11fea6e5",
            "product": "Arroz",
            "quantity": 1,
            "unitPrice": 100
        }
    ],
    "issuedAt": "2025-02-26T21:22:32.759Z"
}

*/