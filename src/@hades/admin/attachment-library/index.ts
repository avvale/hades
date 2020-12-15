// commands
import { CreateAttachmentLibraryCommandHandler } from './application/create/create-attachment-library.command-handler';
import { CreateAttachmentLibrariesCommandHandler } from './application/create/create-attachment-libraries.command-handler';
import { UpdateAttachmentLibraryCommandHandler } from './application/update/update-attachment-library.command-handler';
import { DeleteAttachmentLibraryByIdCommandHandler } from './application/delete/delete-attachment-library-by-id.command-handler';
import { DeleteAttachmentLibrariesCommandHandler } from './application/delete/delete-attachment-libraries.command-handler';

// queries
import { PaginateAttachmentLibrariesQueryHandler } from './application/paginate/paginate-attachment-libraries.query-handler';
import { GetAttachmentLibrariesQueryHandler } from './application/get/get-attachment-libraries.query-handler';
import { FindAttachmentLibraryQueryHandler } from './application/find/find-attachment-library.query-handler';
import { FindAttachmentLibraryByIdQueryHandler } from './application/find/find-attachment-library-by-id.query-handler';

// events
import { CreatedAttachmentLibraryEventHandler } from './application/events/created-attachment-library.event-handler';
import { CreatedAttachmentLibrariesEventHandler } from './application/events/created-attachment-libraries.event-handler';
import { UpdatedAttachmentLibraryEventHandler } from './application/events/updated-attachment-library.event-handler';
import { DeletedAttachmentLibraryEventHandler } from './application/events/deleted-attachment-library.event-handler';
import { DeletedAttachmentLibrariesEventHandler } from './application/events/deleted-attachment-libraries.event-handler';

// services
import { CreateAttachmentLibraryService } from './application/create/create-attachment-library.service';
import { CreateAttachmentLibrariesService } from './application/create/create-attachment-libraries.service';
import { PaginateAttachmentLibrariesService } from './application/paginate/paginate-attachment-libraries.service';
import { GetAttachmentLibrariesService } from './application/get/get-attachment-libraries.service';
import { FindAttachmentLibraryService } from './application/find/find-attachment-library.service';
import { FindAttachmentLibraryByIdService } from './application/find/find-attachment-library-by-id.service';
import { UpdateAttachmentLibraryService } from './application/update/update-attachment-library.service';
import { DeleteAttachmentLibraryByIdService } from './application/delete/delete-attachment-library-by-id.service';
import { DeleteAttachmentLibrariesService } from './application/delete/delete-attachment-libraries.service';

// models
export { AdminAttachmentLibraryModel } from './infrastructure/sequelize/sequelize-attachment-library.model';

// repository
export { IAttachmentLibraryRepository } from './domain/attachment-library.repository';
export { SequelizeAttachmentLibraryRepository } from './infrastructure/sequelize/sequelize-attachment-library.repository';

// sagas
export { AttachmentLibrarySagas } from './application/sagas/attachment-library.sagas';

export const AdminAttachmentLibraryHandlers = [
    // commands
    CreateAttachmentLibraryCommandHandler,
    CreateAttachmentLibrariesCommandHandler,
    UpdateAttachmentLibraryCommandHandler,
    DeleteAttachmentLibraryByIdCommandHandler,
    DeleteAttachmentLibrariesCommandHandler,

    // queries
    PaginateAttachmentLibrariesQueryHandler,
    GetAttachmentLibrariesQueryHandler,
    FindAttachmentLibraryQueryHandler,
    FindAttachmentLibraryByIdQueryHandler,

    // events
    CreatedAttachmentLibraryEventHandler,
    CreatedAttachmentLibrariesEventHandler,
    UpdatedAttachmentLibraryEventHandler,
    DeletedAttachmentLibraryEventHandler,
    DeletedAttachmentLibrariesEventHandler,
];

export const AdminAttachmentLibraryServices = [
    CreateAttachmentLibraryService,
    CreateAttachmentLibrariesService,
    PaginateAttachmentLibrariesService,
    GetAttachmentLibrariesService,
    FindAttachmentLibraryService,
    FindAttachmentLibraryByIdService,
    UpdateAttachmentLibraryService,
    DeleteAttachmentLibraryByIdService,
    DeleteAttachmentLibrariesService,
];