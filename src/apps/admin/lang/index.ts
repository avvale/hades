// controllers
import { CreateLangController } from './controllers/create-lang.controller';
import { InsertLangsController } from './controllers/insert-langs.controller';
import { PaginateLangsController } from './controllers/paginate-langs.controller';
import { GetLangsController } from './controllers/get-langs.controller';
import { FindLangByIdController } from './controllers/find-lang-by-id.controller';
import { FindLangController } from './controllers/find-lang.controller';
import { UpdateLangController } from './controllers/update-lang.controller';
import { DeleteLangByIdController } from './controllers/delete-lang-by-id.controller';
import { DeleteLangsController } from './controllers/delete-langs.controller';

// resolvers
import { CreateLangResolver } from './resolvers/create-lang.resolver';
import { InsertLangsResolver } from './resolvers/insert-langs.resolver';
import { PaginateLangsResolver } from './resolvers/paginate-langs.resolver';
import { GetLangsResolver } from './resolvers/get-langs.resolver';
import { FindLangResolver } from './resolvers/find-lang.resolver';
import { FindLangByIdResolver } from './resolvers/find-lang-by-id.resolver';
import { UpdateLangResolver } from './resolvers/update-lang.resolver';
import { DeleteLangByIdResolver } from './resolvers/delete-lang-by-id.resolver';
import { DeleteLangsResolver } from './resolvers/delete-langs.resolver';

export const AdminLangControllers = [
    CreateLangController,
    InsertLangsController,
    PaginateLangsController,
    GetLangsController,
    FindLangByIdController,
    FindLangController,
    UpdateLangController,
    DeleteLangByIdController,
    DeleteLangsController,
];

export const AdminLangResolvers = [
    CreateLangResolver,
    InsertLangsResolver,
    PaginateLangsResolver,
    GetLangsResolver,
    FindLangResolver,
    FindLangByIdResolver,
    UpdateLangResolver,
    DeleteLangByIdResolver,
    DeleteLangsResolver,
];