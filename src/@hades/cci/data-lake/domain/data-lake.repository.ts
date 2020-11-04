
import { IRepository } from '@hades/shared/domain/persistence/repository';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { CciDataLake } from './data-lake.aggregate';
import { DataLakeId } from './value-objects';

export abstract class IDataLakeRepository implements IRepository<CciDataLake>
{
    abstract readonly repository: any;

    // paginate records
    abstract async paginate(queryStatement: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<Pagination<CciDataLake>>;

    // create a single record
    abstract async create(dataLake: CciDataLake): Promise<void>;

    // create a single or multiple records
    abstract async insert(dataLakes: CciDataLake[], options?: object): Promise<void>;

    // find a single record
    abstract async find(query: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<CciDataLake | null>;

    // find a single record by id
    abstract async findById(id: DataLakeId, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<CciDataLake | null>;

    // get multiple records
    abstract async get(query: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<CciDataLake[]>;

    // update record
    abstract async update(dataLake: CciDataLake, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>;

    // delete record
    abstract async deleteById(id: DataLakeId, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>;

    // delete records
    abstract async delete(query: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>;
}