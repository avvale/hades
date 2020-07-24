
import { IRepository } from '@hades/shared/domain/persistence/repository';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { BplusItSappiDataLake } from './data-lake.aggregate';
import { DataLakeId } from './value-objects';

export abstract class IDataLakeRepository implements IRepository<BplusItSappiDataLake>
{
    abstract readonly repository: any;

    // paginate records
    abstract async paginate(queryStatements: QueryStatementInput[], constraints: QueryStatementInput[]): Promise<Pagination<BplusItSappiDataLake>>;

    // create a single record
    abstract async create(dataLake: BplusItSappiDataLake): Promise<void>;

    // create a single or multiple records
    abstract async insert(dataLakes: BplusItSappiDataLake[]): Promise<void>;

    // find a single record
    abstract async find(query: QueryStatementInput[]): Promise<BplusItSappiDataLake | null>;

    // find a single record by id
    abstract async findById(id: DataLakeId): Promise<BplusItSappiDataLake | null>;

    // get multiple records
    abstract async get(query: QueryStatementInput[]): Promise<BplusItSappiDataLake[]>;

    // update record
    abstract async update(dataLake: BplusItSappiDataLake): Promise<void>;
  
    // delete record
    abstract async deleteById(id: DataLakeId): Promise<void>;

    // delete records
    abstract async delete(query: QueryStatementInput[]): Promise<void>;
}