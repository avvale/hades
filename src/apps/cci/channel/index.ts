// controllers
import { CciCreateChannelController } from './controllers/cci-create-channel.controller';
import { CciCreateChannelsController } from './controllers/cci-create-channels.controller';
import { CciPaginateChannelsController } from './controllers/cci-paginate-channels.controller';
import { CciGetChannelsController } from './controllers/cci-get-channels.controller';
import { CciFindChannelByIdController } from './controllers/cci-find-channel-by-id.controller';
import { CciFindChannelController } from './controllers/cci-find-channel.controller';
import { CciUpdateChannelController } from './controllers/cci-update-channel.controller';
import { CciDeleteChannelByIdController } from './controllers/cci-delete-channel-by-id.controller';
import { CciDeleteChannelsController } from './controllers/cci-delete-channels.controller';

// resolvers
import { CciCreateChannelResolver } from './resolvers/cci-create-channel.resolver';
import { CciCreateChannelsResolver } from './resolvers/cci-create-channels.resolver';
import { CciPaginateChannelsResolver } from './resolvers/cci-paginate-channels.resolver';
import { CciGetChannelsResolver } from './resolvers/cci-get-channels.resolver';
import { CciFindChannelByIdResolver } from './resolvers/cci-find-channel-by-id.resolver';
import { CciFindChannelResolver } from './resolvers/cci-find-channel.resolver';
import { CciUpdateChannelResolver } from './resolvers/cci-update-channel.resolver';
import { CciDeleteChannelByIdResolver } from './resolvers/cci-delete-channel-by-id.resolver';
import { CciDeleteChannelsResolver } from './resolvers/cci-delete-channels.resolver';

export const CciChannelControllers = [
    CciCreateChannelController,
    CciCreateChannelsController,
    CciPaginateChannelsController,
    CciGetChannelsController,
    CciFindChannelByIdController,
    CciFindChannelController,
    CciUpdateChannelController,
    CciDeleteChannelByIdController,
    CciDeleteChannelsController,
];

export const CciChannelResolvers = [
    CciCreateChannelResolver,
    CciCreateChannelsResolver,
    CciPaginateChannelsResolver,
    CciGetChannelsResolver,
    CciFindChannelByIdResolver,
    CciFindChannelResolver,
    CciUpdateChannelResolver,
    CciDeleteChannelByIdResolver,
    CciDeleteChannelsResolver,
];