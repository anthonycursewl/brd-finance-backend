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
                issuedAt: invoice.issuedAt,
                category_id: invoice.category_id,
                type: invoice.type,
                type_amount: invoice.type_amount,
                is_paid: invoice.is_paid,
                description: invoice.description,
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
            createdInvoice.items.map(item => ({ id: item.id, invoicedId: item.invoiceId, product: item.product, quantity: item.quantity, unitPrice: item.unitPrice.toNumber() })),
            createdInvoice.issuedAt,
            createdInvoice.category_id,
            createdInvoice.type,
            createdInvoice.type_amount.toNumber(),
            createdInvoice.is_paid,
            createdInvoice.description
         )
    }

    async findById(id: string): Promise<any | null> {
        const invoice = await this.prisma.invoices.findUnique({ 
            where: { id }, 
            select: { id: true, to: true, issuedAt: true, type: true, type_amount: true, 
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

    findByCategory(id: string): Promise<any | null> {
        return this.prisma.invoices.findMany({ where: { category_id: id }, select: { to: true, issuedAt: true, type: true, type_amount: true, description: true, is_paid: true, items: { select: { product: true, quantity: true, unitPrice: true }}, users: { select: { name: true, email: true } } }});
    }
}