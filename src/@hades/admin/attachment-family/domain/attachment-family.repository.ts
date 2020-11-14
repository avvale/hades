
import { IRepository } from '@hades/shared/domain/persistence/repository';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { AdminAttachmentFamily } from './attachment-family.aggregate';
import { AttachmentFamilyId } from './value-objects';

export abstract class IAttachmentFamilyRepository implements IRepository<AdminAttachmentFamily>
{
    abstract readonly repository: any;

    // paginate records
    abstract async paginate(queryStatement: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<Pagination<AdminAttachmentFamily>>;

    // create a single record
    abstract async create(attachmentFamily: AdminAttachmentFamily): Promise<void>;

    // create a single or multiple records
    abstract async insert(attachmentFamilies: AdminAttachmentFamily[], options?: object): Promise<void>;

    // find a single record
    abstract async find(query: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<AdminAttachmentFamily | null>;

    // find a single record by id
    abstract async findById(id: AttachmentFamilyId, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<AdminAttachmentFamily | null>;

    // get multiple records
    abstract async get(query: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<AdminAttachmentFamily[]>;

    // update record
    abstract async update(attachmentFamily: AdminAttachmentFamily, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>;

    // delete record
    abstract async deleteById(id: AttachmentFamilyId, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>;

    // delete records
    abstract async delete(query: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>;
}