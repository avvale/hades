import { Injectable, ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { Utils } from '@hades/shared/domain/lib/utils';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { QueryStatementInput, Command } from '@hades/shared/domain/persistence/sql-statement-input';
import { ITagRepository } from './../../domain/tag.repository';
import { 
    TagId, 
    TagCode, 
    TagTenantId, 
    TagTenantCode, 
    TagUrlBase, 
    TagParams, 
    TagOffset, 
    TagIsSessionRequired, 
    TagCreatedAt, 
    TagUpdatedAt, 
    TagDeletedAt
    
} from '@hades/nfc/tag/domain/value-objects';
import { NfcTag } from './../../domain/tag.aggregate';
import { tags } from './../seeds/tag.seed';

@Injectable()
export class MockTagRepository implements ITagRepository
{
    public readonly repository: any;
    public readonly aggregateName: string = 'NfcTag';
    public collectionSource: NfcTag[];
    
    constructor() 
    {
        this.createSourceMockData();
    }

    get collectionResponse(): any[]
    { 
        return this.collectionSource.map(tag => tag.toDTO());
    }

    public reset() 
    {
        this.createSourceMockData();
    }

    private createSourceMockData(): void
    {
        this.collectionSource = [];
        const now = Utils.nowTimestamp();

        for (const itemCollection of <any[]>tags)
        {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;
            
            this.collectionSource.push(NfcTag.register(
                    new TagId(itemCollection.id),
                    new TagCode(itemCollection.code),
                    new TagTenantId(itemCollection.tenantId),
                    new TagTenantCode(itemCollection.tenantCode),
                    new TagUrlBase(itemCollection.urlBase),
                    new TagParams(itemCollection.params),
                    new TagOffset(itemCollection.offset),
                    new TagIsSessionRequired(itemCollection.isSessionRequired),
                    new TagCreatedAt(itemCollection.createdAt),
                    new TagUpdatedAt(itemCollection.updatedAt),
                    new TagDeletedAt(itemCollection.deletedAt),
                     
                ));
        }
    }

    async paginate(queryStatements: QueryStatementInput[] = [], constraint: QueryStatementInput[] = []): Promise<Pagination<NfcTag>>
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
    
    async create(tag: NfcTag): Promise<void>
    {
        if (this.collectionSource.find(item => item.id.value === tag.id.value)) throw new ConflictException(`Error to create ${this.aggregateName}, the id ${tag.id.value} already exist in database`);

        // create deletedAt null 
        tag.deletedAt = new TagDeletedAt(null);

        this.collectionSource.push(tag);
    }

    async insert(tag: NfcTag[]): Promise<void>
    {
    }

    async find(queryStatements: QueryStatementInput[] = []): Promise<NfcTag> 
    {
        const response = this.collectionSource.filter(aggregate => {
            let result = true;
            for (const queryStatement of queryStatements)
            {
                result = aggregate[queryStatement.column].value === queryStatement.value
            }
            return result;
        });

        const aggregate = response[0];

        if (!aggregate) throw new NotFoundException(`${this.aggregateName} not found`);

        return aggregate;
    }

    async findById(id: UuidValueObject): Promise<NfcTag>
    {
        const aggregate = this.collectionSource.find(tag => tag.id.value === id.value);

        if (!aggregate) throw new NotFoundException(`${this.aggregateName} not found`);

        return aggregate;
    }

    async get(queryStatements: QueryStatementInput[] = []): Promise<NfcTag[]> 
    {
        return this.collectionSource;
    }

    async update(aggregate: NfcTag): Promise<void> 
    { 
        // check that aggregate exist
        await this.findById(aggregate.id);

        this.collectionSource.map(tag => {
            if (tag.id.value === aggregate.id.value) return aggregate;
            return tag;
        });
    }

    async deleteById(id: UuidValueObject): Promise<void> 
    {
        // check that aggregate exist
        await this.findById(id);

        this.collectionSource.filter(tag => tag.id.value !== id.value);
    }

    async delete(queryStatements: QueryStatementInput[] = []): Promise<void> 
    {
        if (!Array.isArray(queryStatements) || queryStatements.length === 0) throw new BadRequestException(`To delete multiple records, you must define a query statement`);
    }
}