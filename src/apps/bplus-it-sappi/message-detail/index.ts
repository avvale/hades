// controllers
import { CreateMessageDetailController } from './controllers/create-message-detail.controller';
import { CreateMessagesDetailController } from './controllers/create-messages-detail.controller';
import { PaginateMessagesDetailController } from './controllers/paginate-messages-detail.controller';
import { GetMessagesDetailController } from './controllers/get-messages-detail.controller';
import { FindMessageDetailByIdController } from './controllers/find-message-detail-by-id.controller';
import { FindMessageDetailController } from './controllers/find-message-detail.controller';
import { UpdateMessageDetailController } from './controllers/update-message-detail.controller';
import { DeleteMessageDetailByIdController } from './controllers/delete-message-detail-by-id.controller';
import { DeleteMessagesDetailController } from './controllers/delete-messages-detail.controller';

// resolvers
import { CreateMessageDetailResolver } from './resolvers/create-message-detail.resolver';
import { CreateMessagesDetailResolver } from './resolvers/create-messages-detail.resolver';
import { PaginateMessagesDetailResolver } from './resolvers/paginate-messages-detail.resolver';
import { GetMessagesDetailResolver } from './resolvers/get-messages-detail.resolver';
import { FindMessageDetailResolver } from './resolvers/find-message-detail.resolver';
import { FindMessageDetailByIdResolver } from './resolvers/find-message-detail-by-id.resolver';
import { UpdateMessageDetailResolver } from './resolvers/update-message-detail.resolver';
import { DeleteMessageDetailByIdResolver } from './resolvers/delete-message-detail-by-id.resolver';
import { DeleteMessagesDetailResolver } from './resolvers/delete-messages-detail.resolver';

export const BplusItSappiMessageDetailControllers = [
    CreateMessageDetailController,
    CreateMessagesDetailController,
    PaginateMessagesDetailController,
    GetMessagesDetailController,
    FindMessageDetailByIdController,
    FindMessageDetailController,
    UpdateMessageDetailController,
    DeleteMessageDetailByIdController,
    DeleteMessagesDetailController,
];

export const BplusItSappiMessageDetailResolvers = [
    CreateMessageDetailResolver,
    CreateMessagesDetailResolver,
    PaginateMessagesDetailResolver,
    GetMessagesDetailResolver,
    FindMessageDetailResolver,
    FindMessageDetailByIdResolver,
    UpdateMessageDetailResolver,
    DeleteMessageDetailByIdResolver,
    DeleteMessagesDetailResolver,
];