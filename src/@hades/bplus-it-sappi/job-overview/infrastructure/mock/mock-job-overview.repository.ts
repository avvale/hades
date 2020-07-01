import { Injectable, ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { Utils } from '@hades/shared/domain/lib/utils';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { QueryStatementInput, Command } from '@hades/shared/domain/persistence/sql-statement-input';
import { IJobOverviewRepository } from './../../domain/job-overview.repository';
import { 
    JobOverviewId, 
    JobOverviewTenantId, 
    JobOverviewSystemId, 
    JobOverviewSystemName, 
    JobOverviewExecutionId, 
    JobOverviewExecutionType, 
    JobOverviewExecutionExecutedAt, 
    JobOverviewExecutionMonitoringStartAt, 
    JobOverviewExecutionMonitoringEndAt, 
    JobOverviewCancelled, 
    JobOverviewCompleted, 
    JobOverviewError, 
    JobOverviewCreatedAt, 
    JobOverviewUpdatedAt, 
    JobOverviewDeletedAt
    
} from '@hades/bplus-it-sappi/job-overview/domain/value-objects';
import { BplusItSappiJobOverview } from './../../domain/job-overview.entity';
import { jobsOverview } from './../seeds/job-overview.seed';

@Injectable()
export class MockJobOverviewRepository implements IJobOverviewRepository
{
    public readonly repository: any;
    public readonly entityName: string = 'BplusItSappiJobOverview';
    public collectionSource: BplusItSappiJobOverview[];
    
    constructor() 
    {
        this.createSourceMockData();
    }

    get collectionResponse(): any[]
    { 
        return this.collectionSource.map(jobOverview => jobOverview.toDTO());
    }

    public reset() 
    {
        this.createSourceMockData();
    }

    private createSourceMockData(): void
    {
        this.collectionSource = [];
        const now = Utils.nowTimestamp();

        for (const itemCollection of <any[]>jobsOverview)
        {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;
            
            this.collectionSource.push(BplusItSappiJobOverview.register(
                    new JobOverviewId(itemCollection.id),
                    new JobOverviewTenantId(itemCollection.tenantId),
                    new JobOverviewSystemId(itemCollection.systemId),
                    new JobOverviewSystemName(itemCollection.systemName),
                    new JobOverviewExecutionId(itemCollection.executionId),
                    new JobOverviewExecutionType(itemCollection.executionType),
                    new JobOverviewExecutionExecutedAt(itemCollection.executionExecutedAt),
                    new JobOverviewExecutionMonitoringStartAt(itemCollection.executionMonitoringStartAt),
                    new JobOverviewExecutionMonitoringEndAt(itemCollection.executionMonitoringEndAt),
                    new JobOverviewCancelled(itemCollection.cancelled),
                    new JobOverviewCompleted(itemCollection.completed),
                    new JobOverviewError(itemCollection.error),
                    new JobOverviewCreatedAt(itemCollection.createdAt),
                    new JobOverviewUpdatedAt(itemCollection.updatedAt),
                    new JobOverviewDeletedAt(itemCollection.deletedAt),
                     
                ));
        }
    }

    async paginate(queryStatements: QueryStatementInput[] = [], constraint: QueryStatementInput[] = []): Promise<Pagination<BplusItSappiJobOverview>>
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
    
    async create(jobOverview: BplusItSappiJobOverview): Promise<void>
    {
        if (this.collectionSource.find(item => item.id.value === jobOverview.id.value)) throw new ConflictException(`Error to create ${this.entityName}, the id ${jobOverview.id.value} already exist in database`);

        // create deletedAt null 
        jobOverview.deletedAt = new JobOverviewDeletedAt(null);

        this.collectionSource.push(jobOverview);
    }

    async insert(jobOverview: BplusItSappiJobOverview[]): Promise<void>
    {
    }

    async find(queryStatements: QueryStatementInput[] = []): Promise<BplusItSappiJobOverview> 
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

    async findById(id: UuidValueObject): Promise<BplusItSappiJobOverview>
    {
        const entity = this.collectionSource.find(jobOverview => jobOverview.id.value === id.value);

        if (!entity) throw new NotFoundException(`${this.entityName} not found`);

        return entity;
    }

    async get(queryStatements: QueryStatementInput[] = []): Promise<BplusItSappiJobOverview[]> 
    {
        return this.collectionSource;
    }

    async update(entity: BplusItSappiJobOverview): Promise<void> 
    { 
        // check that entity exist
        await this.findById(entity.id);

        this.collectionSource.map(jobOverview => {
            if (jobOverview.id.value === entity.id.value) return entity;
            return jobOverview;
        });
    }

    async deleteById(id: UuidValueObject): Promise<void> 
    {
        // check that entity exist
        await this.findById(id);

        this.collectionSource.filter(jobOverview => jobOverview.id.value !== id.value);
    }

    async delete(queryStatements: QueryStatementInput[] = []): Promise<void> 
    {
        if (!Array.isArray(queryStatements) || queryStatements.length === 0) throw new BadRequestException(`To delete multiple records, you must define a query statement`);
    }
}