import { Injectable } from "@nestjs/common";
import { Decimal } from "@prisma/client/runtime/library";
import { Invoice } from "src/domain/models/invoice.model";
import { InvoiceRepository } from "src/domain/repositories/invoice.repositories";
import { PrismaService } from "src/infrastructure/prisma/prisma.service";

@Injectable()
export class InvoiceRepositoryAdapter implements InvoiceRepository {
    constructor(private readonly prisma: PrismaService) {}

    async save(invoice: Invoice): Promise<Invoice | null> {
        const createdInvoice = await this.prisma.invoices.create({ data: 
            {
                id: invoice.id,
                to: invoice.to,
                from: invoice.from,
                amount: invoice.amount,
                issuedAt: invoice.issuedAt,
                items: { 
                    createMany: { 
                        data: invoice.items
                    }  
                }
            },
            include: {
                items: true,
            }
         })

         return new Invoice(
            createdInvoice.id,
            createdInvoice.to,
            createdInvoice.from,
            createdInvoice.amount.toNumber(),
            createdInvoice.items.map(item => ({ id: item.id, InvoicedId: item.invoiceId, product: item.product, quantity: item.quantity, unitPrice: item.unitPrice.toNumber() })),
            createdInvoice.issuedAt
         )
    }

    async findById(id: string): Promise<any | null> {
        const invoice = await this.prisma.invoices.findUnique({ 
            where: { id }, 
            select: { id: true, to: true, amount: true, issuedAt: true, 
            items: { select: { product: true, quantity: true, unitPrice: true }}, 
            users: {
                select: {
                    name: true,
                    email: true
                }
            }
        }});

        return invoice ? invoice : null;
    }
}