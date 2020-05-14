import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder, InsertResult } from 'typeorm';

import { Command, QueryStatementInput, Operator } from './../../../../shared/domain/persistence/sql-statement-input';
import { ILangRepository } from './../../domain/lang.repository';
import { LangId } from './../../domain/value-objects/lang-id';
import { Lang } from './../../domain/lang';

@Injectable()
export class TypeOrmLangRepository implements ILangRepository
{
    constructor(
        @InjectRepository(Lang)
        public readonly repository: Repository<Lang>
    ) {}

    builder(): SelectQueryBuilder<Lang>
    {
        return this.repository.createQueryBuilder(this.repository.metadata.tableName)
    }

    async save(lang: Lang): Promise<Lang>
    {
        const langEntity =  await this.repository.save(lang);

        // TODO, TypeOrm Error: https://github.com/typeorm/typeorm/issues/5719
        // Cuando das de alta un modelo llama 3 veces al transfor y te crea una anidación incorrecta
        if (typeof langEntity.id.value === 'object') langEntity.id.value = langEntity.id.value['value'];

       return langEntity;
    }

    async insert(lang: Lang[]): Promise<InsertResult>
    {
        return await this.repository.insert(lang);
    }

    async find(query: QueryStatementInput[] = []): Promise<Lang> 
    {
        return await this.builder().getOne();
    }

    async get(): Promise<Lang[]> 
    {
        return await this.builder().getMany();
    }

    async update(lang: Lang): Promise<Lang> 
    {
        await this.repository.update(lang.id.value, lang);

        return await this.find([
            {
                command: Command.WHERE,
                operator: Operator.EQUALS,
                column: this.repository.metadata.tableName + '.id',
                value: lang.id.value
            }
        ]);
    }

    async delete(id: LangId): Promise<Lang> 
    {
        const lang = await this.find([
            {
                command: Command.WHERE,
                operator: Operator.EQUALS,
                column: this.repository.metadata.tableName + '.id',
                value: id.value
            }
        ]);

        await this.builder()
            .delete()
            .where(this.repository.metadata.tableName + '.id = :id', { id: id })
            .execute();

        return lang;
    }
}