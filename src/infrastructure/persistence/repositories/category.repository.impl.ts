import { Category } from "src/domain/models/category.model";
import { CategoryRepository } from "src/domain/repositories/category.repository";
import { PrismaService } from "src/infrastructure/prisma/prisma.service";

export class CategoryRepositoryAdapter implements CategoryRepository {
    constructor(private readonly prisma: PrismaService) {}

    save(category: Category): Promise<Category | null> {
        return this.prisma.categories.create({ data: category });
    }

    findById(id: string): Promise<Category | null> {
        return this.prisma.categories.findUnique({ where: { id }});
    }

}