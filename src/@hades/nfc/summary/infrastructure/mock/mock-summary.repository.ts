import { Injectable, ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { Utils } from '@hades/shared/domain/lib/utils';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { QueryStatementInput, Command } from '@hades/shared/domain/persistence/sql-statement-input';
import { ISummaryRepository } from './../../domain/summary.repository';
import { 
    SummaryId, 
    SummaryTagId, 
    SummaryTenantId, 
    SummaryAccessAt, 
    SummaryCounter, 
    SummaryCreatedAt, 
    SummaryUpdatedAt, 
    SummaryDeletedAt
    
} from '@hades/nfc/summary/domain/value-objects';
import { NfcSummary } from './../../domain/summary.aggregate';
import { summaries } from './../seeds/summary.seed';

@Injectable()
export class MockSummaryRepository implements ISummaryRepository
{
    public readonly repository: any;
    public readonly aggregateName: string = 'NfcSummary';
    public collectionSource: NfcSummary[];
    
    constructor() 
    {
        this.createSourceMockData();
    }

    get collectionResponse(): any[]
    { 
        return this.collectionSource.map(summary => summary.toDTO());
    }

    public reset() 
    {
        this.createSourceMockData();
    }

    private createSourceMockData(): void
    {
        this.collectionSource = [];
        const now = Utils.nowTimestamp();

        for (const itemCollection of <any[]>summaries)
        {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;
            
            this.collectionSource.push(NfcSummary.register(
                    new SummaryId(itemCollection.id),
                    new SummaryTagId(itemCollection.tagId),
                    new SummaryTenantId(itemCollection.tenantId),
                    new SummaryAccessAt(itemCollection.accessAt),
                    new SummaryCounter(itemCollection.counter),
                    new SummaryCreatedAt(itemCollection.createdAt),
                    new SummaryUpdatedAt(itemCollection.updatedAt),
                    new SummaryDeletedAt(itemCollection.deletedAt),
                     
                ));
        }
    }

    async paginate(queryStatements: QueryStatementInput[] = [], constraint: QueryStatementInput[] = []): Promise<Pagination<NfcSummary>>
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
    
    async create(summary: NfcSummary): Promise<void>
    {
        if (this.collectionSource.find(item => item.id.value === summary.id.value)) throw new ConflictException(`Error to create ${this.aggregateName}, the id ${summary.id.value} already exist in database`);

        // create deletedAt null 
        summary.deletedAt = new SummaryDeletedAt(null);

        this.collectionSource.push(summary);
    }

    async insert(summary: NfcSummary[]): Promise<void>
    {
    }

    async find(queryStatements: QueryStatementInput[] = []): Promise<NfcSummary> 
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

    async findById(id: UuidValueObject): Promise<NfcSummary>
    {
        const aggregate = this.collectionSource.find(summary => summary.id.value === id.value);

        if (!aggregate) throw new NotFoundException(`${this.aggregateName} not found`);

        return aggregate;
    }

    async get(queryStatements: QueryStatementInput[] = []): Promise<NfcSummary[]> 
    {
        return this.collectionSource;
    }

    async update(aggregate: NfcSummary): Promise<void> 
    { 
        // check that aggregate exist
        await this.findById(aggregate.id);

        this.collectionSource.map(summary => {
            if (summary.id.value === aggregate.id.value) return aggregate;
            return summary;
        });
    }

    async deleteById(id: UuidValueObject): Promise<void> 
    {
        // check that aggregate exist
        await this.findById(id);

        this.collectionSource.filter(summary => summary.id.value !== id.value);
    }

    async delete(queryStatements: QueryStatementInput[] = []): Promise<void> 
    {
        if (!Array.isArray(queryStatements) || queryStatements.length === 0) throw new BadRequestException(`To delete multiple records, you must define a query statement`);
    }
}