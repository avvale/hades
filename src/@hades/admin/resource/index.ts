// commands
import { CreateResourceCommandHandler } from './application/create/create-resource.command-handler';
import { InsertResourcesCommandHandler } from './application/insert/insert-resources.command-handler';
import { UpdateResourceCommandHandler } from './application/update/update-resource.command-handler';
import { DeleteResourceByIdCommandHandler } from './application/delete/delete-resource-by-id.command-handler';
import { DeleteResourcesCommandHandler } from './application/delete/delete-resources.command-handler';

// queries
import { PaginateResourcesQueryHandler } from './application/paginate/paginate-resources.query-handler';
import { GetResourcesQueryHandler } from './application/get/get-resources.query-handler';
import { FindResourceQueryHandler } from './application/find/find-resource.query-handler';
import { FindResourceByIdQueryHandler } from './application/find/find-resource-by-id.query-handler';

// events
import { CreatedResourceEventHandler } from './application/events/created-resource.event-handler';
import { UpdatedResourceEventHandler } from './application/events/updated-resource.event-handler';
import { DeletedResourceEventHandler } from './application/events/deleted-resource.event-handler';

// services
import { CreateResourceService } from './application/create/create-resource.service';
import { InsertResourcesService } from './application/insert/insert-resources.service';
import { PaginateResourcesService } from './application/paginate/paginate-resources.service';
import { GetResourcesService } from './application/get/get-resources.service';
import { FindResourceService } from './application/find/find-resource.service';
import { FindResourceByIdService } from './application/find/find-resource-by-id.service';
import { UpdateResourceService } from './application/update/update-resource.service';
import { DeleteResourceByIdService } from './application/delete/delete-resource-by-id.service';
import { DeleteResourcesService } from './application/delete/delete-resources.service';

// models
export { AdminResourceModel } from './infrastructure/sequelize/sequelize-resource.model';


// repository
export { IResourceRepository } from './domain/resource.repository';
export { SequelizeResourceRepository } from './infrastructure/sequelize/sequelize-resource.repository';

// sagas
export { ResourceSagas } from './application/sagas/resource.sagas';

export const AdminResourceHandlers = [
    // commands
    CreateResourceCommandHandler,
    InsertResourcesCommandHandler,
    UpdateResourceCommandHandler,
    DeleteResourceByIdCommandHandler,
    DeleteResourcesCommandHandler,

    // queries
    PaginateResourcesQueryHandler,
    GetResourcesQueryHandler,
    FindResourceQueryHandler,
    FindResourceByIdQueryHandler,

    // events
    CreatedResourceEventHandler,
    UpdatedResourceEventHandler,
    DeletedResourceEventHandler,
];

export const AdminResourceServices = [
    CreateResourceService,
    InsertResourcesService,
    PaginateResourcesService,
    GetResourcesService,
    FindResourceService,
    FindResourceByIdService,
    UpdateResourceService,
    DeleteResourceByIdService,
    DeleteResourcesService,
];