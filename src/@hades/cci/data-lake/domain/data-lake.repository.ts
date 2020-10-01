
import { IRepository } from '@hades/shared/domain/persistence/repository';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { CciDataLake } from './data-lake.aggregate';
import { DataLakeId } from './value-objects';

export abstract class IDataLakeRepository implements IRepository<CciDataLake>
{
    abstract readonly repository: any;

    // paginate records
    abstract async paginate(queryStatement: QueryStatement, constraint: QueryStatement): Promise<Pagination<CciDataLake>>;

    // create a single record
    abstract async create(dataLake: CciDataLake): Promise<void>;

    // create a single or multiple records
    abstract async insert(dataLakes: CciDataLake[], options?: object): Promise<void>;

    // find a single record
    abstract async find(query: QueryStatement): Promise<CciDataLake | null>;

    // find a single record by id
    abstract async findById(id: DataLakeId): Promise<CciDataLake | null>;

    // get multiple records
    abstract async get(query: QueryStatement): Promise<CciDataLake[]>;

    // update record
    abstract async update(dataLake: CciDataLake): Promise<void>;
  
    // delete record
    abstract async deleteById(id: DataLakeId): Promise<void>;

    // delete records
    abstract async delete(query: QueryStatement): Promise<void>;
}