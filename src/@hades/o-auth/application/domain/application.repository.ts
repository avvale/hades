
import { IRepository } from '@hades/shared/domain/persistence/repository';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { OAuthApplication } from './application.aggregate';
import { ApplicationId } from './value-objects';

export abstract class IApplicationRepository implements IRepository<OAuthApplication>
{
    abstract readonly repository: any;

    // paginate records
    abstract async paginate(queryStatement: QueryStatement, constraint: QueryStatement): Promise<Pagination<OAuthApplication>>;

    // create a single record
    abstract async create(application: OAuthApplication): Promise<void>;

    // create a single or multiple records
    abstract async insert(applications: OAuthApplication[], options?: object): Promise<void>;

    // find a single record
    abstract async find(query: QueryStatement): Promise<OAuthApplication | null>;

    // find a single record by id
    abstract async findById(id: ApplicationId): Promise<OAuthApplication | null>;

    // get multiple records
    abstract async get(query: QueryStatement): Promise<OAuthApplication[]>;

    // update record
    abstract async update(application: OAuthApplication): Promise<void>;
  
    // delete record
    abstract async deleteById(id: ApplicationId): Promise<void>;

    // delete records
    abstract async delete(query: QueryStatement): Promise<void>;
}