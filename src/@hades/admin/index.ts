import { CreateLangCommandHandler } from './lang/application/create/create-lang.command-handler';
import { FindLangQueryHandler } from './lang/application/find/find-lang.query-handler';
import { FindLangByIdQueryHandler } from './lang/application/find/find-lang-id.query-handler';
import { CreatedLangEventHandler } from './lang/application/events/created-lang.event-handler';

import { CreatorLangService } from './lang/application/create/creator-lang.service';
import { FinderLangService } from './lang/application/find/finder-lang.service';

import { LangSagas } from './lang/application/sagas/lang.sagas';

import { Lang } from './lang/domain/lang';

import { ILangRepository } from './lang/domain/lang.repository';
import { TypeOrmLangRepository } from './lang/infrastructure/type-orm/type-orm-lang.repository';

export const AdminHandlers = [
    CreateLangCommandHandler,
    FindLangQueryHandler,
    FindLangByIdQueryHandler,
    CreatedLangEventHandler
];
export const AdminServices = [
    CreatorLangService,
    FinderLangService
];
export const AdminEntities = [Lang];
export const AdminRepositories = [
    {
        provide: ILangRepository,
        useClass: TypeOrmLangRepository
    }
];
export const AdminSagas = [
    LangSagas
];
