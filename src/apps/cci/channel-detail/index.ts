// controllers
import { CciCreateChannelDetailController } from './controllers/cci-create-channel-detail.controller';
import { CciCreateChannelsDetailController } from './controllers/cci-create-channels-detail.controller';
import { CciPaginateChannelsDetailController } from './controllers/cci-paginate-channels-detail.controller';
import { CciGetChannelsDetailController } from './controllers/cci-get-channels-detail.controller';
import { CciFindChannelDetailByIdController } from './controllers/cci-find-channel-detail-by-id.controller';
import { CciFindChannelDetailController } from './controllers/cci-find-channel-detail.controller';
import { CciUpdateChannelDetailController } from './controllers/cci-update-channel-detail.controller';
import { CciDeleteChannelDetailByIdController } from './controllers/cci-delete-channel-detail-by-id.controller';
import { CciDeleteChannelsDetailController } from './controllers/cci-delete-channels-detail.controller';

// resolvers
import { CciCreateChannelDetailResolver } from './resolvers/cci-create-channel-detail.resolver';
import { CciCreateChannelsDetailResolver } from './resolvers/cci-create-channels-detail.resolver';
import { CciPaginateChannelsDetailResolver } from './resolvers/cci-paginate-channels-detail.resolver';
import { CciGetChannelsDetailResolver } from './resolvers/cci-get-channels-detail.resolver';
import { CciFindChannelDetailByIdResolver } from './resolvers/cci-find-channel-detail-by-id.resolver';
import { CciFindChannelDetailResolver } from './resolvers/cci-find-channel-detail.resolver';
import { CciUpdateChannelDetailResolver } from './resolvers/cci-update-channel-detail.resolver';
import { CciDeleteChannelDetailByIdResolver } from './resolvers/cci-delete-channel-detail-by-id.resolver';
import { CciDeleteChannelsDetailResolver } from './resolvers/cci-delete-channels-detail.resolver';

export const CciChannelDetailControllers = [
    CciCreateChannelDetailController,
    CciCreateChannelsDetailController,
    CciPaginateChannelsDetailController,
    CciGetChannelsDetailController,
    CciFindChannelDetailByIdController,
    CciFindChannelDetailController,
    CciUpdateChannelDetailController,
    CciDeleteChannelDetailByIdController,
    CciDeleteChannelsDetailController,
];

export const CciChannelDetailResolvers = [
    CciCreateChannelDetailResolver,
    CciCreateChannelsDetailResolver,
    CciPaginateChannelsDetailResolver,
    CciGetChannelsDetailResolver,
    CciFindChannelDetailByIdResolver,
    CciFindChannelDetailResolver,
    CciUpdateChannelDetailResolver,
    CciDeleteChannelDetailByIdResolver,
    CciDeleteChannelsDetailResolver,
];