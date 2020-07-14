import { Injectable, ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
import { Utils } from '@hades/shared/domain/lib/utils';
import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { QueryStatementInput, Command } from '@hades/shared/domain/persistence/sql-statement-input';
import { ILangRepository } from './../../domain/lang.repository';
import { 
    LangId, 
    LangName, 
    LangImage, 
    LangIso6392, 
    LangIso6393, 
    LangIetf, 
    LangSort, 
    LangIsActive, 
    LangCreatedAt, 
    LangUpdatedAt, 
    LangDeletedAt
    
} from '@hades/admin/lang/domain/value-objects';
import { AdminLang } from './../../domain/lang.aggregate';
import { langs } from './../seeds/lang.seed';

@Injectable()
export class MockLangRepository implements ILangRepository
{
    public readonly repository: any;
    public readonly entityName: string = 'AdminLang';
    public collectionSource: AdminLang[];
    
    constructor() 
    {
        this.createSourceMockData();
    }

    get collectionResponse(): any[]
    { 
        return this.collectionSource.map(lang => lang.toDTO());
    }

    public reset() 
    {
        this.createSourceMockData();
    }

    private createSourceMockData(): void
    {
        this.collectionSource = [];
        const now = Utils.nowTimestamp();

        for (const itemCollection of <any[]>langs)
        {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;
            
            this.collectionSource.push(AdminLang.register(
                    new LangId(itemCollection.id),
                    new LangName(itemCollection.name),
                    new LangImage(itemCollection.image),
                    new LangIso6392(itemCollection.iso6392),
                    new LangIso6393(itemCollection.iso6393),
                    new LangIetf(itemCollection.ietf),
                    new LangSort(itemCollection.sort),
                    new LangIsActive(itemCollection.isActive),
                    new LangCreatedAt(itemCollection.createdAt),
                    new LangUpdatedAt(itemCollection.updatedAt),
                    new LangDeletedAt(itemCollection.deletedAt),
                     
                ));
        }
    }

    async paginate(queryStatements: QueryStatementInput[] = [], constraint: QueryStatementInput[] = []): Promise<Pagination<AdminLang>>
    {
        let offset  = 0;
        let limit   = this.collectionSource.length;
        for (const queryStatement of queryStatements)
        {
            if (queryStatement.command === Command.OFFSET)  offset = queryStatement.value;
            if (queryStatement.command === Command.LIMIT)   limit = queryStatement.value;
        }
        return { 
            total   : this.collectionSource.length, 
            count   : this.collectionSource.length, 
            rows    : this.collectionSource.slice(offset,limit)
        };
    }
    
    async create(lang: AdminLang): Promise<void>
    {
        if (this.collectionSource.find(item => item.id.value === lang.id.value)) throw new ConflictException(`Error to create ${this.entityName}, the id ${lang.id.value} already exist in database`);

        // create deletedAt null 
        lang.deletedAt = new LangDeletedAt(null);

        this.collectionSource.push(lang);
    }

    async insert(lang: AdminLang[]): Promise<void>
    {
    }

    async find(queryStatements: QueryStatementInput[] = []): Promise<AdminLang> 
    {
        const response = this.collectionSource.filter(entity => {
            let result = true;
            for (const queryStatement of queryStatements)
            {
                result = entity[queryStatement.column].value === queryStatement.value
            }
            return result;
        });

        const entity = response[0];

        if (!entity) throw new NotFoundException(`${this.entityName} not found`);

        return entity;
    }

    async findById(id: UuidValueObject): Promise<AdminLang>
    {
        const entity = this.collectionSource.find(lang => lang.id.value === id.value);

        if (!entity) throw new NotFoundException(`${this.entityName} not found`);

        return entity;
    }

    async get(queryStatements: QueryStatementInput[] = []): Promise<AdminLang[]> 
    {
        return this.collectionSource;
    }

    async update(entity: AdminLang): Promise<void> 
    { 
        // check that entity exist
        await this.findById(entity.id);

        this.collectionSource.map(lang => {
            if (lang.id.value === entity.id.value) return entity;
            return lang;
        });
    }

    async deleteById(id: UuidValueObject): Promise<void> 
    {
        // check that entity exist
        await this.findById(id);

        this.collectionSource.filter(lang => lang.id.value !== id.value);
    }

    async delete(queryStatements: QueryStatementInput[] = []): Promise<void> 
    {
        if (!Array.isArray(queryStatements) || queryStatements.length === 0) throw new BadRequestException(`To delete multiple records, you must define a query statement`);
    }
}