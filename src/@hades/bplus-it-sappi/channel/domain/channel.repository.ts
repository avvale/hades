
import { IRepository } from '@hades/shared/domain/persistence/repository';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { BplusItSappiChannel } from './channel.aggregate';
import { ChannelId } from './value-objects';

export abstract class IChannelRepository implements IRepository<BplusItSappiChannel>
{
    abstract readonly repository: any;

    // paginate records
    abstract async paginate(queryStatements: QueryStatementInput[], constraints: QueryStatementInput[]): Promise<Pagination<BplusItSappiChannel>>;

    // create a single record
    abstract async create(channel: BplusItSappiChannel): Promise<void>;

    // create a single or multiple records
    abstract async insert(channels: BplusItSappiChannel[], options?: object): Promise<void>;

    // find a single record
    abstract async find(query: QueryStatementInput[]): Promise<BplusItSappiChannel | null>;

    // find a single record by id
    abstract async findById(id: ChannelId): Promise<BplusItSappiChannel | null>;

    // get multiple records
    abstract async get(query: QueryStatementInput[]): Promise<BplusItSappiChannel[]>;

    // update record
    abstract async update(channel: BplusItSappiChannel): Promise<void>;
  
    // delete record
    abstract async deleteById(id: ChannelId): Promise<void>;

    // delete records
    abstract async delete(query: QueryStatementInput[]): Promise<void>;
}