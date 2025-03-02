import { Category } from "../models/category.model"

export interface CategoryRepository {
    save(category: Category): Promise<Category | null>
    findById(id: string): Promise<Category | null>
}