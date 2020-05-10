import { CreateLangCommandHandler } from './lang/application/create/create-lang.command-handler';
import { FindLangsQueryHandler } from './lang/application/find/find-langs.query-handler';
import { LangCreatedEventHandler } from './lang/application/events/lang-created.event-handler';

import { LangCreatorService } from './lang/application/create/lang-creator.service';
import { LangFinderService } from './lang/application/find/lang-finder.service';

import { LangSagas } from './lang/application/sagas/lang.sagas';

import { Lang } from './lang/domain/lang';

import { ILangRepository } from './lang/domain/lang.repository';
import { TypeOrmLangRepository } from './lang/infrastructure/type-orm/type-orm-lang.repository';

export const AdminHandlers = [
    CreateLangCommandHandler,
    FindLangsQueryHandler,
    LangCreatedEventHandler
];
export const AdminServices = [
    LangCreatorService,
    LangFinderService
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
