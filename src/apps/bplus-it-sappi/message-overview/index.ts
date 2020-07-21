// controllers
import { CreateMessageOverviewController } from './controllers/create-message-overview.controller';
import { CreateMessagesOverviewController } from './controllers/create-messages-overview.controller';
import { PaginateMessagesOverviewController } from './controllers/paginate-messages-overview.controller';
import { GetMessagesOverviewController } from './controllers/get-messages-overview.controller';
import { FindMessageOverviewByIdController } from './controllers/find-message-overview-by-id.controller';
import { FindMessageOverviewController } from './controllers/find-message-overview.controller';
import { UpdateMessageOverviewController } from './controllers/update-message-overview.controller';
import { DeleteMessageOverviewByIdController } from './controllers/delete-message-overview-by-id.controller';
import { DeleteMessagesOverviewController } from './controllers/delete-messages-overview.controller';

// resolvers
import { CreateMessageOverviewResolver } from './resolvers/create-message-overview.resolver';
import { CreateMessagesOverviewResolver } from './resolvers/create-messages-overview.resolver';
import { PaginateMessagesOverviewResolver } from './resolvers/paginate-messages-overview.resolver';
import { GetMessagesOverviewResolver } from './resolvers/get-messages-overview.resolver';
import { FindMessageOverviewResolver } from './resolvers/find-message-overview.resolver';
import { FindMessageOverviewByIdResolver } from './resolvers/find-message-overview-by-id.resolver';
import { UpdateMessageOverviewResolver } from './resolvers/update-message-overview.resolver';
import { DeleteMessageOverviewByIdResolver } from './resolvers/delete-message-overview-by-id.resolver';
import { DeleteMessagesOverviewResolver } from './resolvers/delete-messages-overview.resolver';

export const BplusItSappiMessageOverviewControllers = [
    CreateMessageOverviewController,
    CreateMessagesOverviewController,
    PaginateMessagesOverviewController,
    GetMessagesOverviewController,
    FindMessageOverviewByIdController,
    FindMessageOverviewController,
    UpdateMessageOverviewController,
    DeleteMessageOverviewByIdController,
    DeleteMessagesOverviewController,
];

export const BplusItSappiMessageOverviewResolvers = [
    CreateMessageOverviewResolver,
    CreateMessagesOverviewResolver,
    PaginateMessagesOverviewResolver,
    GetMessagesOverviewResolver,
    FindMessageOverviewResolver,
    FindMessageOverviewByIdResolver,
    UpdateMessageOverviewResolver,
    DeleteMessageOverviewByIdResolver,
    DeleteMessagesOverviewResolver,
];