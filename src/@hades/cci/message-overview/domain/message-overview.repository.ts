
import { IRepository } from '@hades/shared/domain/persistence/repository';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { CciMessageOverview } from './message-overview.aggregate';
import { MessageOverviewId } from './value-objects';

export abstract class IMessageOverviewRepository implements IRepository<CciMessageOverview>
{
    abstract readonly repository: any;

    // paginate records
    abstract async paginate(queryStatement: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<Pagination<CciMessageOverview>>;

    // create a single record
    abstract async create(messageOverview: CciMessageOverview): Promise<void>;

    // create a single or multiple records
    abstract async insert(messagesOverview: CciMessageOverview[], options?: object): Promise<void>;

    // find a single record
    abstract async find(query: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<CciMessageOverview | null>;

    // find a single record by id
    abstract async findById(id: MessageOverviewId, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<CciMessageOverview | null>;

    // get multiple records
    abstract async get(query: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<CciMessageOverview[]>;

    // get multiple records
    abstract async getDashboardData(tenantIds: string[], systemIds: string[], cQMetadata?: CQMetadata): Promise<CciMessageOverview[]>;

    // update record
    abstract async update(messageOverview: CciMessageOverview, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>;

    // delete record
    abstract async deleteById(id: MessageOverviewId, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>;

    // delete records
    abstract async delete(query: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>;
}