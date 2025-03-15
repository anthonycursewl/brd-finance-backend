import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InvoiceRepositoryAdapter } from "src/infrastructure/persistence/repositories/invoice.repository.impl";
import { Invoice } from "src/domain/models/invoice.model";

@Injectable()
export class InvoiceService {
    constructor(private readonly invoiceRepository: InvoiceRepositoryAdapter) {}

    async save(invoice: Invoice): Promise<Invoice | null> {
        const invc = await this.invoiceRepository.save(invoice);
        if (!invc) throw new Error('BRD | Invoice not created!');
        return invc;
    }

    async findById(id: string): Promise<Invoice | null> {
        try {
            const invoice = await this.invoiceRepository.findById(id);
            if (!invoice) throw new NotFoundException('BRD | Invoice not found!');
            return invoice;
        } catch (error) {
            throw new InternalServerErrorException('BRD | Error finding invoice!');
        }
    }

    async findByCategory(id: string): Promise<any | null> {
        return await this.invoiceRepository.findByCategory(id);
    }
}