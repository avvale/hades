import { Injectable, ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { Utils } from '@hades/shared/domain/lib/utils';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { QueryStatementInput, Command } from '@hades/shared/domain/persistence/sql-statement-input';
import { IJobRepository } from './../../domain/job.repository';
import { 
    JobId, 
    JobTenantId, 
    JobSystemId, 
    JobSystemName, 
    JobExecutionId, 
    JobExecutionType, 
    JobExecutionExecutedAt, 
    JobExecutionMonitoringStartAt, 
    JobExecutionMonitoringEndAt, 
    JobCancelled, 
    JobCompleted, 
    JobError, 
    JobCreatedAt, 
    JobUpdatedAt, 
    JobDeletedAt
    
} from '@hades/bplus-it-sappi/job/domain/value-objects';
import { BplusItSappiJob } from './../../domain/job.entity';
import { jobs } from './../seeds/job.seed';

@Injectable()
export class MockJobRepository implements IJobRepository
{
    public readonly repository: any;
    public readonly entityName: string = 'BplusItSappiJob';
    public collectionSource: BplusItSappiJob[];
    
    constructor() 
    {
        this.createSourceMockData();
    }

    get collectionResponse(): any[]
    { 
        return this.collectionSource.map(job => job.toDTO());
    }

    public reset() 
    {
        this.createSourceMockData();
    }

    private createSourceMockData(): void
    {
        this.collectionSource = [];
        const now = Utils.nowTimestamp();

        for (const itemCollection of <any[]>jobs)
        {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;
            
            this.collectionSource.push(BplusItSappiJob.register(
                    new JobId(itemCollection.id),
                    new JobTenantId(itemCollection.tenantId),
                    new JobSystemId(itemCollection.systemId),
                    new JobSystemName(itemCollection.systemName),
                    new JobExecutionId(itemCollection.executionId),
                    new JobExecutionType(itemCollection.executionType),
                    new JobExecutionExecutedAt(itemCollection.executionExecutedAt),
                    new JobExecutionMonitoringStartAt(itemCollection.executionMonitoringStartAt),
                    new JobExecutionMonitoringEndAt(itemCollection.executionMonitoringEndAt),
                    new JobCancelled(itemCollection.cancelled),
                    new JobCompleted(itemCollection.completed),
                    new JobError(itemCollection.error),
                    new JobCreatedAt(itemCollection.createdAt),
                    new JobUpdatedAt(itemCollection.updatedAt),
                    new JobDeletedAt(itemCollection.deletedAt),
                     
                ));
        }
    }

    async paginate(queryStatements: QueryStatementInput[] = [], constraint: QueryStatementInput[] = []): Promise<Pagination<BplusItSappiJob>>
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
    
    async create(job: BplusItSappiJob): Promise<void>
    {
        if (this.collectionSource.find(item => item.id.value === job.id.value)) throw new ConflictException(`Error to create ${this.entityName}, the id ${job.id.value} already exist in database`);

        // create deletedAt null 
        job.deletedAt = new JobDeletedAt(null);

        this.collectionSource.push(job);
    }

    async insert(job: BplusItSappiJob[]): Promise<void>
    {
    }

    async find(queryStatements: QueryStatementInput[] = []): Promise<BplusItSappiJob> 
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

    async findById(id: UuidValueObject): Promise<BplusItSappiJob>
    {
        const entity = this.collectionSource.find(job => job.id.value === id.value);

        if (!entity) throw new NotFoundException(`${this.entityName} not found`);

        return entity;
    }

    async get(queryStatements: QueryStatementInput[] = []): Promise<BplusItSappiJob[]> 
    {
        return this.collectionSource;
    }

    async update(entity: BplusItSappiJob): Promise<void> 
    { 
        // check that entity exist
        await this.findById(entity.id);

        this.collectionSource.map(job => {
            if (job.id.value === entity.id.value) return entity;
            return job;
        });
    }

    async deleteById(id: UuidValueObject): Promise<void> 
    {
        // check that entity exist
        await this.findById(id);

        this.collectionSource.filter(job => job.id.value !== id.value);
    }

    async delete(queryStatements: QueryStatementInput[] = []): Promise<void> 
    {
        if (!Array.isArray(queryStatements) || queryStatements.length === 0) throw new BadRequestException(`To delete multiple records, you must define a query statement`);
    }
}