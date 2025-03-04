import { Body, Controller, Get, Injectable, Param, Post, Delete } from "@nestjs/common";
import { CategoryService } from "src/application/services/category.service";
import { Category } from "src/domain/models/category.model";

@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) { }

    @Post('save')
    async saveCategory(@Body() category: Category) {
        return await this.categoryService.save(category);
    }

    @Get('/find/:id')
    async findCategory(@Param('id') id: string) {
        return await this.categoryService.findById(id);
    }

    @Get('/find/all/:id')
    async findAllCategory(@Param('id') id: string) {
        return await this.categoryService.findAllByUserId(id);
    }

    @Delete('/delete/:id')
    async deleteCategory(@Param('id') id: string) {
        return this.categoryService.delete(id)
    }

}