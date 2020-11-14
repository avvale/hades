// commands
import { CreateAttachmentFamilyCommandHandler } from './application/create/create-attachment-family.command-handler';
import { CreateAttachmentFamiliesCommandHandler } from './application/create/create-attachment-families.command-handler';
import { UpdateAttachmentFamilyCommandHandler } from './application/update/update-attachment-family.command-handler';
import { DeleteAttachmentFamilyByIdCommandHandler } from './application/delete/delete-attachment-family-by-id.command-handler';
import { DeleteAttachmentFamiliesCommandHandler } from './application/delete/delete-attachment-families.command-handler';

// queries
import { PaginateAttachmentFamiliesQueryHandler } from './application/paginate/paginate-attachment-families.query-handler';
import { GetAttachmentFamiliesQueryHandler } from './application/get/get-attachment-families.query-handler';
import { FindAttachmentFamilyQueryHandler } from './application/find/find-attachment-family.query-handler';
import { FindAttachmentFamilyByIdQueryHandler } from './application/find/find-attachment-family-by-id.query-handler';

// events
import { CreatedAttachmentFamilyEventHandler } from './application/events/created-attachment-family.event-handler';
import { CreatedAttachmentFamiliesEventHandler } from './application/events/created-attachment-families.event-handler';
import { UpdatedAttachmentFamilyEventHandler } from './application/events/updated-attachment-family.event-handler';
import { DeletedAttachmentFamilyEventHandler } from './application/events/deleted-attachment-family.event-handler';
import { DeletedAttachmentFamiliesEventHandler } from './application/events/deleted-attachment-families.event-handler';

// services
import { CreateAttachmentFamilyService } from './application/create/create-attachment-family.service';
import { CreateAttachmentFamiliesService } from './application/create/create-attachment-families.service';
import { PaginateAttachmentFamiliesService } from './application/paginate/paginate-attachment-families.service';
import { GetAttachmentFamiliesService } from './application/get/get-attachment-families.service';
import { FindAttachmentFamilyService } from './application/find/find-attachment-family.service';
import { FindAttachmentFamilyByIdService } from './application/find/find-attachment-family-by-id.service';
import { UpdateAttachmentFamilyService } from './application/update/update-attachment-family.service';
import { DeleteAttachmentFamilyByIdService } from './application/delete/delete-attachment-family-by-id.service';
import { DeleteAttachmentFamiliesService } from './application/delete/delete-attachment-families.service';

// models
export { AdminAttachmentFamilyModel } from './infrastructure/sequelize/sequelize-attachment-family.model';

// repository
export { IAttachmentFamilyRepository } from './domain/attachment-family.repository';
export { SequelizeAttachmentFamilyRepository } from './infrastructure/sequelize/sequelize-attachment-family.repository';

// sagas
export { AttachmentFamilySagas } from './application/sagas/attachment-family.sagas';

export const AdminAttachmentFamilyHandlers = [
    // commands
    CreateAttachmentFamilyCommandHandler,
    CreateAttachmentFamiliesCommandHandler,
    UpdateAttachmentFamilyCommandHandler,
    DeleteAttachmentFamilyByIdCommandHandler,
    DeleteAttachmentFamiliesCommandHandler,

    // queries
    PaginateAttachmentFamiliesQueryHandler,
    GetAttachmentFamiliesQueryHandler,
    FindAttachmentFamilyQueryHandler,
    FindAttachmentFamilyByIdQueryHandler,

    // events
    CreatedAttachmentFamilyEventHandler,
    CreatedAttachmentFamiliesEventHandler,
    UpdatedAttachmentFamilyEventHandler,
    DeletedAttachmentFamilyEventHandler,
    DeletedAttachmentFamiliesEventHandler,
];

export const AdminAttachmentFamilyServices = [
    CreateAttachmentFamilyService,
    CreateAttachmentFamiliesService,
    PaginateAttachmentFamiliesService,
    GetAttachmentFamiliesService,
    FindAttachmentFamilyService,
    FindAttachmentFamilyByIdService,
    UpdateAttachmentFamilyService,
    DeleteAttachmentFamilyByIdService,
    DeleteAttachmentFamiliesService,
];