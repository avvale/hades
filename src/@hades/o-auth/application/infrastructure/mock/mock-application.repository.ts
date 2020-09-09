import { Injectable, ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { Utils } from '@hades/shared/domain/lib/utils';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { QueryStatementInput, Command } from '@hades/shared/domain/persistence/sql-statement-input';
import { IApplicationRepository } from './../../domain/application.repository';
import { 
    ApplicationId, 
    ApplicationCode, 
    ApplicationSecret, 
    ApplicationName, 
    ApplicationCreatedAt, 
    ApplicationUpdatedAt, 
    ApplicationDeletedAt
    
} from '@hades/o-auth/application/domain/value-objects';
import { OAuthApplication } from './../../domain/application.aggregate';
import { applications } from './../seeds/application.seed';

@Injectable()
export class MockApplicationRepository implements IApplicationRepository
{
    public readonly repository: any;
    public readonly aggregateName: string = 'OAuthApplication';
    public collectionSource: OAuthApplication[];
    
    constructor() 
    {
        this.createSourceMockData();
    }

    get collectionResponse(): any[]
    { 
        return this.collectionSource.map(application => application.toDTO());
    }

    public reset() 
    {
        this.createSourceMockData();
    }

    private createSourceMockData(): void
    {
        this.collectionSource = [];
        const now = Utils.nowTimestamp();

        for (const itemCollection of <any[]>applications)
        {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;
            
            this.collectionSource.push(OAuthApplication.register(
                    new ApplicationId(itemCollection.id),
                    new ApplicationCode(itemCollection.code),
                    new ApplicationSecret(itemCollection.secret),
                    new ApplicationName(itemCollection.name),
                    new ApplicationCreatedAt(itemCollection.createdAt),
                    new ApplicationUpdatedAt(itemCollection.updatedAt),
                    new ApplicationDeletedAt(itemCollection.deletedAt),
                     
                ));
        }
    }

    async paginate(queryStatements: QueryStatementInput[] = [], constraint: QueryStatementInput[] = []): Promise<Pagination<OAuthApplication>>
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
    
    async create(application: OAuthApplication): Promise<void>
    {
        if (this.collectionSource.find(item => item.id.value === application.id.value)) throw new ConflictException(`Error to create ${this.aggregateName}, the id ${application.id.value} already exist in database`);

        // create deletedAt null 
        application.deletedAt = new ApplicationDeletedAt(null);

        this.collectionSource.push(application);
    }

    async insert(application: OAuthApplication[]): Promise<void>
    {
    }

    async find(queryStatements: QueryStatementInput[] = []): Promise<OAuthApplication> 
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

    async findById(id: UuidValueObject): Promise<OAuthApplication>
    {
        const aggregate = this.collectionSource.find(application => application.id.value === id.value);

        if (!aggregate) throw new NotFoundException(`${this.aggregateName} not found`);

        return aggregate;
    }

    async get(queryStatements: QueryStatementInput[] = []): Promise<OAuthApplication[]> 
    {
        return this.collectionSource;
    }

    async update(aggregate: OAuthApplication): Promise<void> 
    { 
        // check that aggregate exist
        await this.findById(aggregate.id);

        this.collectionSource.map(application => {
            if (application.id.value === aggregate.id.value) return aggregate;
            return application;
        });
    }

    async deleteById(id: UuidValueObject): Promise<void> 
    {
        // check that aggregate exist
        await this.findById(id);

        this.collectionSource.filter(application => application.id.value !== id.value);
    }

    async delete(queryStatements: QueryStatementInput[] = []): Promise<void> 
    {
        if (!Array.isArray(queryStatements) || queryStatements.length === 0) throw new BadRequestException(`To delete multiple records, you must define a query statement`);
    }
}