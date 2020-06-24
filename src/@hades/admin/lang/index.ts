// commands
import { CreateLangCommandHandler } from './application/create/create-lang.command-handler';
import { InsertLangsCommandHandler } from './application/insert/insert-langs.command-handler';
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
import { UpdatedLangEventHandler } from './application/events/updated-lang.event-handler';
import { DeletedLangEventHandler } from './application/events/deleted-lang.event-handler';

// services
import { CreateLangService } from './application/create/create-lang.service';
import { InsertLangsService } from './application/insert/insert-langs.service';
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
    InsertLangsCommandHandler,
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
    UpdatedLangEventHandler,
    DeletedLangEventHandler,
];

export const AdminLangServices = [
    CreateLangService,
    InsertLangsService,
    PaginateLangsService,
    GetLangsService,
    FindLangService,
    FindLangByIdService,
    UpdateLangService,
    DeleteLangByIdService,
    DeleteLangsService,
];