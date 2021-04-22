
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
    abstract paginate(queryStatement: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<Pagination<AdminAttachmentFamily>>;

    // create a single record
    abstract create(attachmentFamily: AdminAttachmentFamily): Promise<void>;

    // create a single or multiple records
    abstract insert(attachmentFamilies: AdminAttachmentFamily[], options?: object): Promise<void>;

    // find a single record
    abstract find(query: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<AdminAttachmentFamily | null>;

    // find a single record by id
    abstract findById(id: AttachmentFamilyId, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<AdminAttachmentFamily | null>;

    // get multiple records
    abstract get(query: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<AdminAttachmentFamily[]>;

    // update record
    abstract update(attachmentFamily: AdminAttachmentFamily, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>;

    // delete record
    abstract deleteById(id: AttachmentFamilyId, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>;

    // delete records
    abstract delete(query: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>;
}