// commands
import { CreateTagCommandHandler } from './application/create/create-tag.command-handler';
import { CreateTagsCommandHandler } from './application/create/create-tags.command-handler';
import { UpdateTagCommandHandler } from './application/update/update-tag.command-handler';
import { DeleteTagByIdCommandHandler } from './application/delete/delete-tag-by-id.command-handler';
import { DeleteTagsCommandHandler } from './application/delete/delete-tags.command-handler';

// queries
import { PaginateTagsQueryHandler } from './application/paginate/paginate-tags.query-handler';
import { GetTagsQueryHandler } from './application/get/get-tags.query-handler';
import { FindTagQueryHandler } from './application/find/find-tag.query-handler';
import { FindTagByIdQueryHandler } from './application/find/find-tag-by-id.query-handler';

// events
import { CreatedTagEventHandler } from './application/events/created-tag.event-handler';
import { CreatedTagsEventHandler } from './application/events/created-tags.event-handler';
import { UpdatedTagEventHandler } from './application/events/updated-tag.event-handler';
import { DeletedTagEventHandler } from './application/events/deleted-tag.event-handler';
import { DeletedTagsEventHandler } from './application/events/deleted-tags.event-handler';

// services
import { CreateTagService } from './application/create/create-tag.service';
import { CreateTagsService } from './application/create/create-tags.service';
import { PaginateTagsService } from './application/paginate/paginate-tags.service';
import { GetTagsService } from './application/get/get-tags.service';
import { FindTagService } from './application/find/find-tag.service';
import { FindTagByIdService } from './application/find/find-tag-by-id.service';
import { UpdateTagService } from './application/update/update-tag.service';
import { DeleteTagByIdService } from './application/delete/delete-tag-by-id.service';
import { DeleteTagsService } from './application/delete/delete-tags.service';

// models
export { NfcTagModel } from './infrastructure/sequelize/sequelize-tag.model';


// repository
export { ITagRepository } from './domain/tag.repository';
export { SequelizeTagRepository } from './infrastructure/sequelize/sequelize-tag.repository';

// sagas
export { TagSagas } from './application/sagas/tag.sagas';

export const NfcTagHandlers = [
    // commands
    CreateTagCommandHandler,
    CreateTagsCommandHandler,
    UpdateTagCommandHandler,
    DeleteTagByIdCommandHandler,
    DeleteTagsCommandHandler,

    // queries
    PaginateTagsQueryHandler,
    GetTagsQueryHandler,
    FindTagQueryHandler,
    FindTagByIdQueryHandler,

    // events
    CreatedTagEventHandler,
    CreatedTagsEventHandler,
    UpdatedTagEventHandler,
    DeletedTagEventHandler,
    DeletedTagsEventHandler,
];

export const NfcTagServices = [
    CreateTagService,
    CreateTagsService,
    PaginateTagsService,
    GetTagsService,
    FindTagService,
    FindTagByIdService,
    UpdateTagService,
    DeleteTagByIdService,
    DeleteTagsService,
];