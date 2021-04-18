
import { IRepository } from '@hades/shared/domain/persistence/repository';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { OAuthApplication } from './application.aggregate';
import { ApplicationId } from './value-objects';

export abstract class IApplicationRepository implements IRepository<OAuthApplication>
{
    abstract readonly repository: any;

    // paginate records
    abstract paginate(queryStatement: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<Pagination<OAuthApplication>>;

    // create a single record
    abstract create(application: OAuthApplication): Promise<void>;

    // create a single or multiple records
    abstract insert(applications: OAuthApplication[], options?: object): Promise<void>;

    // find a single record
    abstract find(query: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<OAuthApplication | null>;

    // find a single record by id
    abstract findById(id: ApplicationId, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<OAuthApplication | null>;

    // get multiple records
    abstract get(query: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<OAuthApplication[]>;

    // update record
    abstract update(application: OAuthApplication, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>;

    // delete record
    abstract deleteById(id: ApplicationId, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>;

    // delete records
    abstract delete(query: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>;
}