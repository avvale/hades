// commands
import { CreateLangCommandHandler } from './application/create/create-lang.command-handler';
import { CreateLangsCommandHandler } from './application/create/create-langs.command-handler';
import { UpdateLangCommandHandler } from './application/update/update-lang.command-handler';
import { DeleteLangByIdCommandHandler } from './application/delete/delete-lang-by-id.command-handler';
import { DeleteLangsCommandHandler } from './application/delete/delete-langs.command-handler';

// queries
import { PaginateLangsQueryHandler } from './application/paginate/paginate-langs.query-handler';
import { GetLangsQueryHandler } from './application/get/get-langs.query-handler';
import { FindLangQueryHandler } from './application/find/find-lang.query-handler';
import { FindLangByIdQueryHandler } from './application/find/find-lang-by-id.query-handler';

// events
import { CreatedLangEventHandler } from './application/events/created-lang.event-handler';
import { CreatedLangsEventHandler } from './application/events/created-langs.event-handler';
import { UpdatedLangEventHandler } from './application/events/updated-lang.event-handler';
import { DeletedLangEventHandler } from './application/events/deleted-lang.event-handler';
import { DeletedLangsEventHandler } from './application/events/deleted-langs.event-handler';

// services
import { CreateLangService } from './application/create/create-lang.service';
import { CreateLangsService } from './application/create/create-langs.service';
import { PaginateLangsService } from './application/paginate/paginate-langs.service';
import { GetLangsService } from './application/get/get-langs.service';
import { FindLangService } from './application/find/find-lang.service';
import { FindLangByIdService } from './application/find/find-lang-by-id.service';
import { UpdateLangService } from './application/update/update-lang.service';
import { DeleteLangByIdService } from './application/delete/delete-lang-by-id.service';
import { DeleteLangsService } from './application/delete/delete-langs.service';

// models
export { AdminLangModel } from './infrastructure/sequelize/sequelize-lang.model';


// repository
export { ILangRepository } from './domain/lang.repository';
export { SequelizeLangRepository } from './infrastructure/sequelize/sequelize-lang.repository';

// sagas
export { LangSagas } from './application/sagas/lang.sagas';

export const AdminLangHandlers = [
    // commands
    CreateLangCommandHandler,
    CreateLangsCommandHandler,
    UpdateLangCommandHandler,
    DeleteLangByIdCommandHandler,
    DeleteLangsCommandHandler,

    // queries
    PaginateLangsQueryHandler,
    GetLangsQueryHandler,
    FindLangQueryHandler,
    FindLangByIdQueryHandler,

    // events
    CreatedLangEventHandler,
    CreatedLangsEventHandler,
    UpdatedLangEventHandler,
    DeletedLangEventHandler,
    DeletedLangsEventHandler,
];

export const AdminLangServices = [
    CreateLangService,
    CreateLangsService,
    PaginateLangsService,
    GetLangsService,
    FindLangService,
    FindLangByIdService,
    UpdateLangService,
    DeleteLangByIdService,
    DeleteLangsService,
];