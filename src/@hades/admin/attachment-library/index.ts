// commands
import { CreateAttachmentLibraryCommandHandler } from './application/create/create-attachment-library.command-handler';
import { CreateAttachmentLibraryCommandHandler } from './application/create/create-attachment-library.command-handler';
import { UpdateAttachmentLibraryCommandHandler } from './application/update/update-attachment-library.command-handler';
import { DeleteAttachmentLibraryByIdCommandHandler } from './application/delete/delete-attachment-library-by-id.command-handler';
import { DeleteAttachmentLibraryCommandHandler } from './application/delete/delete-attachment-library.command-handler';

// queries
import { PaginateAttachmentLibraryQueryHandler } from './application/paginate/paginate-attachment-library.query-handler';
import { GetAttachmentLibraryQueryHandler } from './application/get/get-attachment-library.query-handler';
import { FindAttachmentLibraryQueryHandler } from './application/find/find-attachment-library.query-handler';
import { FindAttachmentLibraryByIdQueryHandler } from './application/find/find-attachment-library-by-id.query-handler';

// events
import { CreatedAttachmentLibraryEventHandler } from './application/events/created-attachment-library.event-handler';
import { CreatedAttachmentLibraryEventHandler } from './application/events/created-attachment-library.event-handler';
import { UpdatedAttachmentLibraryEventHandler } from './application/events/updated-attachment-library.event-handler';
import { DeletedAttachmentLibraryEventHandler } from './application/events/deleted-attachment-library.event-handler';
import { DeletedAttachmentLibraryEventHandler } from './application/events/deleted-attachment-library.event-handler';

// services
import { CreateAttachmentLibraryService } from './application/create/create-attachment-library.service';
import { CreateAttachmentLibraryService } from './application/create/create-attachment-library.service';
import { PaginateAttachmentLibraryService } from './application/paginate/paginate-attachment-library.service';
import { GetAttachmentLibraryService } from './application/get/get-attachment-library.service';
import { FindAttachmentLibraryService } from './application/find/find-attachment-library.service';
import { FindAttachmentLibraryByIdService } from './application/find/find-attachment-library-by-id.service';
import { UpdateAttachmentLibraryService } from './application/update/update-attachment-library.service';
import { DeleteAttachmentLibraryByIdService } from './application/delete/delete-attachment-library-by-id.service';
import { DeleteAttachmentLibraryService } from './application/delete/delete-attachment-library.service';

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
    CreateAttachmentLibraryCommandHandler,
    UpdateAttachmentLibraryCommandHandler,
    DeleteAttachmentLibraryByIdCommandHandler,
    DeleteAttachmentLibraryCommandHandler,

    // queries
    PaginateAttachmentLibraryQueryHandler,
    GetAttachmentLibraryQueryHandler,
    FindAttachmentLibraryQueryHandler,
    FindAttachmentLibraryByIdQueryHandler,

    // events
    CreatedAttachmentLibraryEventHandler,
    CreatedAttachmentLibraryEventHandler,
    UpdatedAttachmentLibraryEventHandler,
    DeletedAttachmentLibraryEventHandler,
    DeletedAttachmentLibraryEventHandler,
];

export const AdminAttachmentLibraryServices = [
    CreateAttachmentLibraryService,
    CreateAttachmentLibraryService,
    PaginateAttachmentLibraryService,
    GetAttachmentLibraryService,
    FindAttachmentLibraryService,
    FindAttachmentLibraryByIdService,
    UpdateAttachmentLibraryService,
    DeleteAttachmentLibraryByIdService,
    DeleteAttachmentLibraryService,
];