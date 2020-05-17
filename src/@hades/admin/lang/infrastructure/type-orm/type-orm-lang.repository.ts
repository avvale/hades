import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder, InsertResult } from 'typeorm';

import { Command, QueryStatementInput, Operator } from './../../../../shared/domain/persistence/sql-statement-input';
import { ILangRepository } from './../../domain/lang.repository';
import { ICriteria } from './../../../../shared/domain/persistence/criteria';
import { LangId } from './../../domain/value-objects/lang-id';
import { Lang } from './../../domain/lang';

@Injectable()
export class TypeOrmLangRepository implements ILangRepository
{
    constructor(
        @InjectRepository(Lang)
        public readonly repository: Repository<Lang>,
        private _criteriaService: ICriteria
    ) {}

    builder(): SelectQueryBuilder<Lang>
    {
        return this.repository.createQueryBuilder(this.repository.metadata.tableName)
    }

    async save(lang: Lang): Promise<void>
    {
        // check if exist same id
        if (await this.repository.findOne(<Object>lang.id)) throw new ConflictException(`The id ${lang.id.value} already exist in database`);
        
        try
        {
            await this.repository.save(lang);
        }
        catch (error) 
        {
            throw new ConflictException(error.message);
        }       
    }

    async insert(lang: Lang[]): Promise<void>
    {
        await this.repository.insert(lang);
    }

    async find(queryStatements: QueryStatementInput[] = []): Promise<Lang> 
    {
        const lang = await this
            ._criteriaService
            .implements(this.builder(), queryStatements)
            .getOne();

        if (!lang) throw new NotFoundException('Lang not found');

        return lang;
    }

    async findById(id: LangId): Promise<Lang>
    {
        return await this.find([
            {
                command: Command.WHERE,
                operator: Operator.EQUALS,
                column: this.repository.metadata.tableName + '.id',
                value: id.value
            }
        ]);       
    }

    async get(): Promise<Lang[]> 
    {
        return await this.builder().getMany();
    }

    async update(lang: Lang): Promise<void> 
    { 
        // check that lang exist
        await this.findById(lang.id);

        // clean properties object from undefined values
        for (const property in lang )
        {
            if (lang[property] === null || lang[property].value === undefined) delete lang[property];
        }

        await this.repository.update(<Object>lang.id, lang);
    }

    async delete(id: LangId): Promise<void> 
    {
        await this.builder()
            .delete()
            .where(this.repository.metadata.tableName + '.id = :id', { id: id.value })
            .execute();
    }
}