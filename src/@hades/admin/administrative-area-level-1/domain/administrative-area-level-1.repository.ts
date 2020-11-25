
import { IRepository } from '@hades/shared/domain/persistence/repository';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { AdminAdministrativeAreaLevel1 } from './administrative-area-level-1.aggregate';
import { AdministrativeAreaLevel1Id } from './value-objects';

export abstract class IAdministrativeAreaLevel1Repository implements IRepository<AdminAdministrativeAreaLevel1>
{
    abstract readonly repository: any;

    // paginate records
    abstract async paginate(queryStatement: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<Pagination<AdminAdministrativeAreaLevel1>>;

    // create a single record
    abstract async create(administrativeAreaLevel1: AdminAdministrativeAreaLevel1): Promise<void>;

    // create a single or multiple records
    abstract async insert(administrativeAreasLevel1: AdminAdministrativeAreaLevel1[], options?: object): Promise<void>;

    // find a single record
    abstract async find(query: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<AdminAdministrativeAreaLevel1 | null>;

    // find a single record by id
    abstract async findById(id: AdministrativeAreaLevel1Id, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<AdminAdministrativeAreaLevel1 | null>;

    // get multiple records
    abstract async get(query: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<AdminAdministrativeAreaLevel1[]>;

    // update record
    abstract async update(administrativeAreaLevel1: AdminAdministrativeAreaLevel1, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>;

    // delete record
    abstract async deleteById(id: AdministrativeAreaLevel1Id, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>;

    // delete records
    abstract async delete(query: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>;
}