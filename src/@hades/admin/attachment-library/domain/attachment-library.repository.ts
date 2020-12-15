
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
    abstract async paginate(queryStatement: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<Pagination<AdminAttachmentLibrary>>;

    // create a single record
    abstract async create(attachmentLibrary: AdminAttachmentLibrary): Promise<void>;

    // create a single or multiple records
    abstract async insert(attachmentLibrary: AdminAttachmentLibrary[], options?: object): Promise<void>;

    // find a single record
    abstract async find(query: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<AdminAttachmentLibrary | null>;

    // find a single record by id
    abstract async findById(id: AttachmentLibraryId, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<AdminAttachmentLibrary | null>;

    // get multiple records
    abstract async get(query: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<AdminAttachmentLibrary[]>;

    // update record
    abstract async update(attachmentLibrary: AdminAttachmentLibrary, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>;

    // delete record
    abstract async deleteById(id: AttachmentLibraryId, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>;

    // delete records
    abstract async delete(query: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>;
}