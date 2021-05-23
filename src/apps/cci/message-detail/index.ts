// controllers
import { CciCreateMessageDetailController } from './controllers/cci-create-message-detail.controller';
import { CciCreateMessagesDetailController } from './controllers/cci-create-messages-detail.controller';
import { CciPaginateMessagesDetailController } from './controllers/cci-paginate-messages-detail.controller';
import { CciGetMessagesDetailController } from './controllers/cci-get-messages-detail.controller';
import { CciFindMessageDetailByIdController } from './controllers/cci-find-message-detail-by-id.controller';
import { CciFindMessageDetailController } from './controllers/cci-find-message-detail.controller';
import { CciUpdateMessageDetailController } from './controllers/cci-update-message-detail.controller';
import { CciDeleteMessageDetailByIdController } from './controllers/cci-delete-message-detail-by-id.controller';
import { CciDeleteMessagesDetailController } from './controllers/cci-delete-messages-detail.controller';

// resolvers
import { CciCreateMessageDetailResolver } from './resolvers/cci-create-message-detail.resolver';
import { CciCreateMessagesDetailResolver } from './resolvers/cci-create-messages-detail.resolver';
import { CciPaginateMessagesDetailResolver } from './resolvers/cci-paginate-messages-detail.resolver';
import { CciGetMessagesDetailResolver } from './resolvers/cci-get-messages-detail.resolver';
import { CciFindMessageDetailByIdResolver } from './resolvers/cci-find-message-detail-by-id.resolver';
import { CciFindMessageDetailResolver } from './resolvers/cci-find-message-detail.resolver';
import { CciUpdateMessageDetailResolver } from './resolvers/cci-update-message-detail.resolver';
import { CciDeleteMessageDetailByIdResolver } from './resolvers/cci-delete-message-detail-by-id.resolver';
import { CciDeleteMessagesDetailResolver } from './resolvers/cci-delete-messages-detail.resolver';

export const CciMessageDetailControllers = [
    CciCreateMessageDetailController,
    CciCreateMessagesDetailController,
    CciPaginateMessagesDetailController,
    CciGetMessagesDetailController,
    CciFindMessageDetailByIdController,
    CciFindMessageDetailController,
    CciUpdateMessageDetailController,
    CciDeleteMessageDetailByIdController,
    CciDeleteMessagesDetailController,
];

export const CciMessageDetailResolvers = [
    CciCreateMessageDetailResolver,
    CciCreateMessagesDetailResolver,
    CciPaginateMessagesDetailResolver,
    CciGetMessagesDetailResolver,
    CciFindMessageDetailByIdResolver,
    CciFindMessageDetailResolver,
    CciUpdateMessageDetailResolver,
    CciDeleteMessageDetailByIdResolver,
    CciDeleteMessagesDetailResolver,
];