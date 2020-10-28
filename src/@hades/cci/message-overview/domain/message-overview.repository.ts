
import { IRepository } from '@hades/shared/domain/persistence/repository';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { CciMessageOverview } from './message-overview.aggregate';
import { MessageOverviewId } from './value-objects';

export abstract class IMessageOverviewRepository implements IRepository<CciMessageOverview>
{
    abstract readonly repository: any;

    // paginate records
    abstract async paginate(queryStatement: QueryStatement, constraint: QueryStatement): Promise<Pagination<CciMessageOverview>>;

    // create a single record
    abstract async create(messageOverview: CciMessageOverview): Promise<void>;

    // create a single or multiple records
    abstract async insert(messagesOverview: CciMessageOverview[], options?: object): Promise<void>;

    // find a single record
    abstract async find(query: QueryStatement): Promise<CciMessageOverview | null>;

    // find a single record by id
    abstract async findById(id: MessageOverviewId): Promise<CciMessageOverview | null>;

    // get multiple records
    abstract async get(query: QueryStatement): Promise<CciMessageOverview[]>;

    // get multiple records
    abstract async getDashboardData(tenantIds: string[], systemIds: string[]): Promise<CciMessageOverview[]>;

    // update record
    abstract async update(messageOverview: CciMessageOverview): Promise<void>;

    // delete record
    abstract async deleteById(id: MessageOverviewId): Promise<void>;

    // delete records
    abstract async delete(query: QueryStatement): Promise<void>;
}