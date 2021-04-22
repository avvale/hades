
import { IRepository } from '@hades/shared/domain/persistence/repository';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { AdminAttachmentLibrary } from './attachment-library.aggregate';
import { AttachmentLibraryId } from './value-objects';

export abstract class IAttachmentLibraryRepository implements IRepository<AdminAttachmentLibrary>
{
    abstract readonly repository: any;

    // paginate records
    abstract paginate(queryStatement: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<Pagination<AdminAttachmentLibrary>>;

    // create a single record
    abstract create(attachmentLibrary: AdminAttachmentLibrary): Promise<void>;

    // create a single or multiple records
    abstract insert(attachmentLibraries: AdminAttachmentLibrary[], options?: object): Promise<void>;

    // find a single record
    abstract find(query: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<AdminAttachmentLibrary | null>;

    // find a single record by id
    abstract findById(id: AttachmentLibraryId, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<AdminAttachmentLibrary | null>;

    // get multiple records
    abstract get(query: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<AdminAttachmentLibrary[]>;

    // update record
    abstract update(attachmentLibrary: AdminAttachmentLibrary, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>;

    // delete record
    abstract deleteById(id: AttachmentLibraryId, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>;

    // delete records
    abstract delete(query: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>;
}