
import { IRepository } from '@hades/shared/domain/persistence/repository';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { AdminAttachment } from './attachment.aggregate';
import { AttachmentId } from './value-objects';

export abstract class IAttachmentRepository implements IRepository<AdminAttachment>
{
    abstract readonly repository: any;

    // paginate records
    abstract paginate(queryStatement: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<Pagination<AdminAttachment>>;

    // create a single record
    abstract create(attachment: AdminAttachment): Promise<void>;

    // create a single or multiple records
    abstract insert(attachments: AdminAttachment[], options?: object): Promise<void>;

    // find a single record
    abstract find(query: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<AdminAttachment | null>;

    // find a single record by id
    abstract findById(id: AttachmentId, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<AdminAttachment | null>;

    // get multiple records
    abstract get(query: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<AdminAttachment[]>;

    // update record
    abstract update(attachment: AdminAttachment, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>;

    // delete record
    abstract deleteById(id: AttachmentId, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>;

    // delete records
    abstract delete(query: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>;
}