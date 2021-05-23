// controllers
import { CciCreateMessageOverviewController } from './controllers/cci-create-message-overview.controller';
import { CciCreateMessagesOverviewController } from './controllers/cci-create-messages-overview.controller';
import { CciPaginateMessagesOverviewController } from './controllers/cci-paginate-messages-overview.controller';
import { CciGetMessagesOverviewController } from './controllers/cci-get-messages-overview.controller';
import { CciFindMessageOverviewByIdController } from './controllers/cci-find-message-overview-by-id.controller';
import { CciFindMessageOverviewController } from './controllers/cci-find-message-overview.controller';
import { CciUpdateMessageOverviewController } from './controllers/cci-update-message-overview.controller';
import { CciDeleteMessageOverviewByIdController } from './controllers/cci-delete-message-overview-by-id.controller';
import { CciDeleteMessagesOverviewController } from './controllers/cci-delete-messages-overview.controller';

// resolvers
import { CciCreateMessageOverviewResolver } from './resolvers/cci-create-message-overview.resolver';
import { CciCreateMessagesOverviewResolver } from './resolvers/cci-create-messages-overview.resolver';
import { CciPaginateMessagesOverviewResolver } from './resolvers/cci-paginate-messages-overview.resolver';
import { CciGetMessagesOverviewResolver } from './resolvers/cci-get-messages-overview.resolver';
import { CciFindMessageOverviewByIdResolver } from './resolvers/cci-find-message-overview-by-id.resolver';
import { CciFindMessageOverviewResolver } from './resolvers/cci-find-message-overview.resolver';
import { CciUpdateMessageOverviewResolver } from './resolvers/cci-update-message-overview.resolver';
import { CciDeleteMessageOverviewByIdResolver } from './resolvers/cci-delete-message-overview-by-id.resolver';
import { CciDeleteMessagesOverviewResolver } from './resolvers/cci-delete-messages-overview.resolver';

export const CciMessageOverviewControllers = [
    CciCreateMessageOverviewController,
    CciCreateMessagesOverviewController,
    CciPaginateMessagesOverviewController,
    CciGetMessagesOverviewController,
    CciFindMessageOverviewByIdController,
    CciFindMessageOverviewController,
    CciUpdateMessageOverviewController,
    CciDeleteMessageOverviewByIdController,
    CciDeleteMessagesOverviewController,
];

export const CciMessageOverviewResolvers = [
    CciCreateMessageOverviewResolver,
    CciCreateMessagesOverviewResolver,
    CciPaginateMessagesOverviewResolver,
    CciGetMessagesOverviewResolver,
    CciFindMessageOverviewByIdResolver,
    CciFindMessageOverviewResolver,
    CciUpdateMessageOverviewResolver,
    CciDeleteMessageOverviewByIdResolver,
    CciDeleteMessagesOverviewResolver,
];