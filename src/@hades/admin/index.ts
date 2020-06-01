// commands
import { CreateLangCommandHandler } from './lang/application/create/create-lang.command-handler';
import { UpdateLangCommandHandler } from './lang/application/update/update-lang.command-handler';
import { DeleteLangCommandHandler } from './lang/application/delete/delete-lang.command-handler';

// queries
import { GetLangsQueryHandler } from './lang/application/get/get-langs.query-handler';
import { FindLangQueryHandler } from './lang/application/find/find-lang.query-handler';
import { FindLangByIdQueryHandler } from './lang/application/find/find-lang-by-id.query-handler';

// events
import { CreatedLangEventHandler } from './lang/application/events/created-lang.event-handler';
import { UpdatedLangEventHandler } from './lang/application/events/updated-lang.event-handler';
import { DeletedLangEventHandler } from './lang/application/events/deleted-lang.event-handler';

// services
import { CreateLangService } from './lang/application/create/create-lang.service';
import { GetLangsService } from './lang/application/get/get-langs.service';
import { FindLangService } from './lang/application/find/find-lang.service';
import { FindLangByIdService } from './lang/application/find/find-lang-by-id.service';
import { UpdateLangService } from './lang/application/update/update-lang.service';
import { DeleteLangService } from './lang/application/delete/delete-lang.service';

// schemas
import { LangSchema } from './lang/infrastructure/type-orm/type-orm-lang.schema';

// repository
import { ILangRepository } from './lang/domain/lang.repository';
import { TypeOrmLangRepository } from './lang/infrastructure/type-orm/type-orm-lang.repository';

// sagas
import { LangSagas } from './lang/application/sagas/lang.sagas';

export const AdminHandlers = [
    // commands
    CreateLangCommandHandler,
    UpdateLangCommandHandler,
    DeleteLangCommandHandler,

    // queries
    GetLangsQueryHandler,
    FindLangQueryHandler,
    FindLangByIdQueryHandler,

    // events
    CreatedLangEventHandler,
    UpdatedLangEventHandler,
    DeletedLangEventHandler
];
export const AdminServices = [
    CreateLangService,
    GetLangsService,
    FindLangService,
    FindLangByIdService,
    UpdateLangService,
    DeleteLangService
];
export const AdminSchemas = [
    LangSchema
];
export const AdminRepositories = [
    {
        provide: ILangRepository,
        useClass: TypeOrmLangRepository
    }
];
export const AdminSagas = [
    LangSagas
];
