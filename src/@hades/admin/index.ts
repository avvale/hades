// commands
import { CreateLangCommandHandler } from './lang/application/create/create-lang.command-handler';

// queries
import { FindLangQueryHandler } from './lang/application/find/find-lang.query-handler';
import { FindLangByIdQueryHandler } from './lang/application/find/find-lang-id.query-handler';

// events
import { CreatedLangEventHandler } from './lang/application/events/created-lang.event-handler';
import { UpdatedLangEventHandler } from './lang/application/events/updated-lang.event-handler';
import { DeletedLangEventHandler } from './lang/application/events/deleted-lang.event-handler';

// services
import { CreatorLangService } from './lang/application/create/creator-lang.service';
import { FinderLangService } from './lang/application/find/finder-lang.service';

// models
import { Lang } from './lang/domain/lang';

// repository
import { ILangRepository } from './lang/domain/lang.repository';
import { TypeOrmLangRepository } from './lang/infrastructure/type-orm/type-orm-lang.repository';

// sagas
import { LangSagas } from './lang/application/sagas/lang.sagas';

export const AdminHandlers = [
    // commands
    CreateLangCommandHandler,

    // queries
    FindLangQueryHandler,
    FindLangByIdQueryHandler,

    // events
    CreatedLangEventHandler,
    UpdatedLangEventHandler,
    DeletedLangEventHandler
];
export const AdminServices = [
    CreatorLangService,
    FinderLangService
];
export const AdminEntities = [
    Lang
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
