import { Invoice } from "../models/invoice.model";

export interface InvoiceRepository {
    save(invoice: Invoice): Promise<Invoice | null>;
    findById(id: string): Promise<any | null>;
}