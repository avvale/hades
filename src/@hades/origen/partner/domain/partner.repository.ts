
import { IRepository } from '@hades/shared/domain/persistence/repository';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { OrigenPartner } from './partner.aggregate';
import { PartnerId } from './value-objects';

export abstract class IPartnerRepository implements IRepository<OrigenPartner>
{
    abstract readonly repository: any;

    // paginate records
    abstract async paginate(queryStatement: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<Pagination<OrigenPartner>>;

    // create a single record
    abstract async create(partner: OrigenPartner): Promise<void>;

    // create a single or multiple records
    abstract async insert(partners: OrigenPartner[], options?: object): Promise<void>;

    // find a single record
    abstract async find(query: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<OrigenPartner | null>;

    // find a single record by id
    abstract async findById(id: PartnerId, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<OrigenPartner | null>;

    // get multiple records
    abstract async get(query: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<OrigenPartner[]>;

    // update record
    abstract async update(partner: OrigenPartner, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>;

    // delete record
    abstract async deleteById(id: PartnerId, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>;

    // delete records
    abstract async delete(query: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>;
}