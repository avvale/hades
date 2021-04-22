
import { IRepository } from '@hades/shared/domain/persistence/repository';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { AdminAdministrativeAreaLevel3 } from './administrative-area-level-3.aggregate';
import { AdministrativeAreaLevel3Id } from './value-objects';

export abstract class IAdministrativeAreaLevel3Repository implements IRepository<AdminAdministrativeAreaLevel3>
{
    abstract readonly repository: any;

    // paginate records
    abstract paginate(queryStatement: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<Pagination<AdminAdministrativeAreaLevel3>>;

    // create a single record
    abstract create(administrativeAreaLevel3: AdminAdministrativeAreaLevel3): Promise<void>;

    // create a single or multiple records
    abstract insert(administrativeAreasLevel3: AdminAdministrativeAreaLevel3[], options?: object): Promise<void>;

    // find a single record
    abstract find(query: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<AdminAdministrativeAreaLevel3 | null>;

    // find a single record by id
    abstract findById(id: AdministrativeAreaLevel3Id, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<AdminAdministrativeAreaLevel3 | null>;

    // get multiple records
    abstract get(query: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<AdminAdministrativeAreaLevel3[]>;

    // update record
    abstract update(administrativeAreaLevel3: AdminAdministrativeAreaLevel3, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>;

    // delete record
    abstract deleteById(id: AdministrativeAreaLevel3Id, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>;

    // delete records
    abstract delete(query: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>;
}