import { Repository } from 'typeorm';
import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { ICriteria } from '@hades/shared/domain/persistence/criteria';
import { mockData } from '@hades/shared/domain/persistence/mock-data';
import { Uuid } from '@hades/shared/domain/value-objects/uuid';
import { LangCreatedAt, LangUpdatedAt, LangDeletedAt, LangId, LangName, LangImage, LangIso6392, LangIso6393, LangIetf, LangIsActive, LangSort } from '@hades/admin/lang/domain/value-objects';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { ILangRepository } from './../../domain/lang.repository';
import { Lang } from './../../domain/lang.entity';
import { langs } from './../seeds/lang.seed';
import { Utils } from '@hades/shared/domain/lib/utils';

@Injectable()
export class MockLangRepository implements ILangRepository
{
    public readonly repository: Repository<Lang>;
    public readonly entityName: string = 'Lang';
    public collectionSource: Lang[];
    
    constructor() {
        this.createSourceMockData();
    }

    get collectionResponse(): any[]
    { 
        return this.collectionSource.map(lang => lang.toObject());
    }

    public reset() 
    {
        this.createSourceMockData();
    }

    private createSourceMockData(): void
    {
        this.collectionSource = [];
        const now = Utils.nowTimeStamp();

        for (const itemCollection of <any[]>langs)
        {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = now;
            
            this.collectionSource.push(Lang.register(
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
                    new LangDeletedAt(null),
                ));
        }
    }
    
    async save(lang: Lang): Promise<void>
    {
        if (this.collectionSource.find(item => item.id.value === lang.id.value)) throw new ConflictException(`Error to create ${this.entityName}, the id ${lang.id.value} already exist in database`);

        // create deletedAt null 
        lang.deletedAt = new LangDeletedAt(null);

        this.collectionSource.push(lang);
    }

    async insert(lang: Lang[]): Promise<void>
    {
    }

    async find(queryStatements: QueryStatementInput[] = []): Promise<Lang> 
    {
        const entity = this.collectionSource[0];

        if (!entity) throw new NotFoundException(`${this.entityName} not found`);

        return entity;
    }

    async findById(id: Uuid): Promise<Lang>
    {
        return this.collectionSource.find(item => item.id.value === id.value);   
    }

    async get(queryStatements: QueryStatementInput[] = []): Promise<Lang[]> 
    {
        return this.collectionSource;
    }

    async update(entity: Lang): Promise<void> 
    { 
        // check that entity exist
        await this.findById(entity['id']);
    }

    async delete(id: Uuid): Promise<void> 
    {
        // check that entity exist
        await this.findById(id);
    }
}