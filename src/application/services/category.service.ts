
import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CategoryRepositoryAdapter } from "src/infrastructure/persistence/repositories/category.repository.impl";

// Model
import { Category } from "src/domain/models/category.model";

@Injectable()
export class CategoryService {
    constructor(private readonly categoryRepository: CategoryRepositoryAdapter) {}

    async save(category: Category): Promise<Category | null> {
        if (category === null) throw new BadRequestException('BRD | Category not created!');
        try {
            const cat = await this.categoryRepository.save(category);
            if (cat === null) throw new Error('BRD | Category not created!');
            return new Category(cat.id, cat.name, cat.description, cat.icon, cat.user_id, cat.created_at);
        } catch (error) {
            console.log(error);
            throw new Error('BRD | Category not created!');
        }
    }

    async findById(id: string): Promise<Category | null> {
        const cat = await this.categoryRepository.findById(id);
        if (cat === null) throw new NotFoundException('BRD | Category not found!');
        return new Category(cat.id, cat.name, cat.description, cat.icon, cat.user_id, cat.created_at);
    }

    async findAllByUserId(id: string): Promise<Category[] | null> {
        const cats = await this.categoryRepository.findAllByUserId(id);
        if (cats === null) throw new NotFoundException('BRD | Categories not found!');
        return cats.map(cat => new Category(cat.id, cat.name, cat.description, cat.icon, cat.user_id, cat.created_at));
    }

    delete(id: string): Promise<{ is_deleted: boolean; }> {
        return this.categoryRepository.delete(id)
    }
}