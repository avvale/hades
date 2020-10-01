
import { IRepository } from '@hades/shared/domain/persistence/repository';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { CciChannel } from './channel.aggregate';
import { ChannelId } from './value-objects';

export abstract class IChannelRepository implements IRepository<CciChannel>
{
    abstract readonly repository: any;

    // paginate records
    abstract async paginate(queryStatement: QueryStatement, constraint: QueryStatement): Promise<Pagination<CciChannel>>;

    // create a single record
    abstract async create(channel: CciChannel): Promise<void>;

    // create a single or multiple records
    abstract async insert(channels: CciChannel[], options?: object): Promise<void>;

    // find a single record
    abstract async find(query: QueryStatement): Promise<CciChannel | null>;

    // find a single record by id
    abstract async findById(id: ChannelId): Promise<CciChannel | null>;

    // get multiple records
    abstract async get(query: QueryStatement): Promise<CciChannel[]>;

    // update record
    abstract async update(channel: CciChannel): Promise<void>;
  
    // delete record
    abstract async deleteById(id: ChannelId): Promise<void>;

    // delete records
    abstract async delete(query: QueryStatement): Promise<void>;
}