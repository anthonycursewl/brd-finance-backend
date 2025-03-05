import { Injectable } from "@nestjs/common"
import { Category } from "src/domain/models/category.model"
import { CategoryRepository } from "src/domain/repositories/category.repository"
import { PrismaService } from "src/infrastructure/prisma/prisma.service"

@Injectable()
export class CategoryRepositoryAdapter implements CategoryRepository {
    constructor(private prisma: PrismaService) { }

    save(category: Category): Promise<Category | null> {
        console.log(`TODA LA DATA AQUI ${category}`)
        return this.prisma.categories.create({ data: category })
    }

    findById(id: string): Promise<Category | null> {
        return this.prisma.categories.findUnique({ where: { id: id } })
    }

    findAllByUserId(userId: string): Promise<Category[] | null> {
        return this.prisma.categories.findMany({ where: { user_id: userId, is_deleted: false }, 
        select: 
        { 
            id: true, 
            name: true, 
            description: true, 
            icon: true, 
            user_id: true, 
            created_at: true, 
            users: { select: 
                { 
                    invoices: { 
                        select: { id: true } 
                    } 
                }
            }
        }})
    }

    delete(id: string): Promise<{ is_deleted: boolean; }> {
        return this.prisma.categories.update({ where: { id: id }, data: { is_deleted: true } })
    }

}