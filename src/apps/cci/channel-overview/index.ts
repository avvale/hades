// controllers
import { CciCreateChannelOverviewController } from './controllers/cci-create-channel-overview.controller';
import { CciCreateChannelsOverviewController } from './controllers/cci-create-channels-overview.controller';
import { CciPaginateChannelsOverviewController } from './controllers/cci-paginate-channels-overview.controller';
import { CciGetChannelsOverviewController } from './controllers/cci-get-channels-overview.controller';
import { CciFindChannelOverviewByIdController } from './controllers/cci-find-channel-overview-by-id.controller';
import { CciFindChannelOverviewController } from './controllers/cci-find-channel-overview.controller';
import { CciUpdateChannelOverviewController } from './controllers/cci-update-channel-overview.controller';
import { CciDeleteChannelOverviewByIdController } from './controllers/cci-delete-channel-overview-by-id.controller';
import { CciDeleteChannelsOverviewController } from './controllers/cci-delete-channels-overview.controller';

// resolvers
import { CciCreateChannelOverviewResolver } from './resolvers/cci-create-channel-overview.resolver';
import { CciCreateChannelsOverviewResolver } from './resolvers/cci-create-channels-overview.resolver';
import { CciPaginateChannelsOverviewResolver } from './resolvers/cci-paginate-channels-overview.resolver';
import { CciGetChannelsOverviewResolver } from './resolvers/cci-get-channels-overview.resolver';
import { CciFindChannelOverviewByIdResolver } from './resolvers/cci-find-channel-overview-by-id.resolver';
import { CciFindChannelOverviewResolver } from './resolvers/cci-find-channel-overview.resolver';
import { CciUpdateChannelOverviewResolver } from './resolvers/cci-update-channel-overview.resolver';
import { CciDeleteChannelOverviewByIdResolver } from './resolvers/cci-delete-channel-overview-by-id.resolver';
import { CciDeleteChannelsOverviewResolver } from './resolvers/cci-delete-channels-overview.resolver';

export const CciChannelOverviewControllers = [
    CciCreateChannelOverviewController,
    CciCreateChannelsOverviewController,
    CciPaginateChannelsOverviewController,
    CciGetChannelsOverviewController,
    CciFindChannelOverviewByIdController,
    CciFindChannelOverviewController,
    CciUpdateChannelOverviewController,
    CciDeleteChannelOverviewByIdController,
    CciDeleteChannelsOverviewController,
];

export const CciChannelOverviewResolvers = [
    CciCreateChannelOverviewResolver,
    CciCreateChannelsOverviewResolver,
    CciPaginateChannelsOverviewResolver,
    CciGetChannelsOverviewResolver,
    CciFindChannelOverviewByIdResolver,
    CciFindChannelOverviewResolver,
    CciUpdateChannelOverviewResolver,
    CciDeleteChannelOverviewByIdResolver,
    CciDeleteChannelsOverviewResolver,
];