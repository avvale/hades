// controllers
import { CreateTagController } from './controllers/create-tag.controller';
import { InsertTagsController } from './controllers/insert-tags.controller';
import { PaginateTagsController } from './controllers/paginate-tags.controller';
import { GetTagsController } from './controllers/get-tags.controller';
import { FindTagByIdController } from './controllers/find-tag-by-id.controller';
import { FindTagController } from './controllers/find-tag.controller';
import { UpdateTagController } from './controllers/update-tag.controller';
import { DeleteTagByIdController } from './controllers/delete-tag-by-id.controller';
import { DeleteTagsController } from './controllers/delete-tags.controller';

// resolvers
import { CreateTagResolver } from './resolvers/create-tag.resolver';
import { InsertTagsResolver } from './resolvers/insert-tags.resolver';
import { PaginateTagsResolver } from './resolvers/paginate-tags.resolver';
import { GetTagsResolver } from './resolvers/get-tags.resolver';
import { FindTagResolver } from './resolvers/find-tag.resolver';
import { FindTagByIdResolver } from './resolvers/find-tag-by-id.resolver';
import { UpdateTagResolver } from './resolvers/update-tag.resolver';
import { DeleteTagByIdResolver } from './resolvers/delete-tag-by-id.resolver';
import { DeleteTagsResolver } from './resolvers/delete-tags.resolver';

export const NfcTagControllers = [
    CreateTagController,
    InsertTagsController,
    PaginateTagsController,
    GetTagsController,
    FindTagByIdController,
    FindTagController,
    UpdateTagController,
    DeleteTagByIdController,
    DeleteTagsController,
];

export const NfcTagResolvers = [
    CreateTagResolver,
    InsertTagsResolver,
    PaginateTagsResolver,
    GetTagsResolver,
    FindTagResolver,
    FindTagByIdResolver,
    UpdateTagResolver,
    DeleteTagByIdResolver,
    DeleteTagsResolver,
];