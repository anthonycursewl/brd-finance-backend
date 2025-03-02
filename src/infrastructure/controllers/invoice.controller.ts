import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { InvoiceService } from "src/application/services/invoice.service";

// Models
import { Invoice } from "src/domain/models/invoice.model";

@Controller('invoice')
export class InvoiceController {
    constructor(private readonly invoiceService: InvoiceService) {}

    @Post('/save')
    async save(@Body() invoice: Invoice) {
        return await this.invoiceService.save(invoice);
    }

    @Get('/find/:id')
    async findById(@Param('id') id: string) {
        return await this.invoiceService.findById(id);
    }
}