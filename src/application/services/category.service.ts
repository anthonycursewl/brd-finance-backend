import { Injectable } from "@nestjs/common";
import { CategoryRepositoryAdapter } from "src/infrastructure/persistence/repositories/category.repository.impl";

// Model
import { Category } from "src/domain/models/category.model";

@Injectable()
export class CategoryService {
    constructor(private readonly categoryRepository: CategoryRepositoryAdapter) {}

    async save(category: Category): Promise<Category | null> {
        const cat = await this.categoryRepository.save(category);
        if (cat === null) throw new Error('BRD | Category not created!');
        return new Category(cat.id, cat.name, cat.description, cat.icon, cat.user_id, cat.is_deleted, cat.created_at);
    }

    async findById(id: string): Promise<Category | null> {
        const cat = await this.categoryRepository.findById(id);
        if (cat === null) throw new Error('BRD | Category not found!');
        return new Category(cat.id, cat.name, cat.description, cat.icon, cat.user_id, cat.is_deleted, cat.created_at);
    }
}