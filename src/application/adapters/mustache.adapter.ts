import { Injectable } from "@nestjs/common";
import * as mustache from 'mustache'
import * as fs from 'fs'
import * as path from 'path'

@Injectable()
export class MustacheAdapter {
    render(template: string, context: any) {
        return mustache.render(template, context)
    }

    compile(filePath: string, context: any): string {
        const template = fs.readFileSync(filePath, 'utf-8')
        return this.render(template, context)
    }
}