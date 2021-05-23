
import { IRepository } from '@hades/shared/domain/persistence/repository';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { AdminAdministrativeAreaLevel2 } from './administrative-area-level-2.aggregate';
import { AdministrativeAreaLevel2Id } from './value-objects';

export abstract class IAdministrativeAreaLevel2Repository implements IRepository<AdminAdministrativeAreaLevel2>
{
    abstract readonly repository: any;

    // paginate records
    abstract paginate(queryStatement: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<Pagination<AdminAdministrativeAreaLevel2>>;

    // create a single record
    abstract create(administrativeAreaLevel2: AdminAdministrativeAreaLevel2): Promise<void>;

    // create a single or multiple records
    abstract insert(administrativeAreasLevel2: AdminAdministrativeAreaLevel2[], options?: object): Promise<void>;

    // find a single record
    abstract find(query: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<AdminAdministrativeAreaLevel2 | null>;

    // find a single record by id
    abstract findById(id: AdministrativeAreaLevel2Id, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<AdminAdministrativeAreaLevel2 | null>;

    // get multiple records
    abstract get(query: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<AdminAdministrativeAreaLevel2[]>;

    // update record
    abstract update(administrativeAreaLevel2: AdminAdministrativeAreaLevel2, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>;

    // delete record
    abstract deleteById(id: AdministrativeAreaLevel2Id, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>;

    // delete records
    abstract delete(query: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>;
}