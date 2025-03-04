import { Category } from "../models/category.model"

export interface CategoryRepository {
    save(category: Category): Promise<Category | null>
    findById(id: string): Promise<Category | null>
    findAllByUserId(userId: string): Promise<Category[] | null>
    delete(id: string): Promise<{ is_deleted: boolean }>
}