
import { IRepository } from '@hades/shared/domain/persistence/repository';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata, ObjectLiteral } from '@hades/shared/domain/lib/hades.types';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { AdminCountry } from './country.aggregate';
import { CountryId } from './value-objects';

export abstract class ICountryI18nRepository implements IRepository<AdminCountry>
{
    abstract readonly repository: any;

    // paginate records
    abstract paginate(queryStatement: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<Pagination<AdminCountry>>;

    // create a single record
    abstract create(country: AdminCountry, dataFactory?: (aggregate: AdminCountry) => ObjectLiteral): Promise<void>;

    // create a single or multiple records
    abstract insert(countries: AdminCountry[], options?: object, dataFactory?: (aggregate: AdminCountry) => ObjectLiteral): Promise<void>;

    // find a single record
    abstract find(query: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<AdminCountry | null>;

    // find a single record by id
    abstract findById(id: CountryId, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<AdminCountry | null>;

    // get multiple records
    abstract get(query: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<AdminCountry[]>;

    // update record
    abstract update(country: AdminCountry, constraint?: QueryStatement, cQMetadata?: CQMetadata, dataFactory?: (aggregate: AdminCountry) => ObjectLiteral): Promise<void>;

    // delete record
    abstract deleteById(id: CountryId, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>;

    // delete records
    abstract delete(query: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>;
}