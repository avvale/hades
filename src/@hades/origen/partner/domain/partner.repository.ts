
import { IRepository } from '@hades/shared/domain/persistence/repository';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { OriginPartner } from './partner.aggregate';
import { PartnerId } from './value-objects';

export abstract class IPartnerRepository implements IRepository<OriginPartner>
{
    abstract readonly repository: any;

    // paginate records
    abstract async paginate(queryStatement: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<Pagination<OriginPartner>>;

    // create a single record
    abstract async create(partner: OriginPartner): Promise<void>;

    // create a single or multiple records
    abstract async insert(partners: OriginPartner[], options?: object): Promise<void>;

    // find a single record
    abstract async find(query: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<OriginPartner | null>;

    // find a single record by id
    abstract async findById(id: PartnerId, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<OriginPartner | null>;

    // get multiple records
    abstract async get(query: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<OriginPartner[]>;

    // update record
    abstract async update(partner: OriginPartner, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>;

    // delete record
    abstract async deleteById(id: PartnerId, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>;

    // delete records
    abstract async delete(query: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>;
}