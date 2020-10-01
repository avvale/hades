// controllers
import { CreateChannelOverviewController } from './controllers/create-channel-overview.controller';
import { CreateChannelsOverviewController } from './controllers/create-channels-overview.controller';
import { PaginateChannelsOverviewController } from './controllers/paginate-channels-overview.controller';
import { GetChannelsOverviewController } from './controllers/get-channels-overview.controller';
import { FindChannelOverviewByIdController } from './controllers/find-channel-overview-by-id.controller';
import { FindChannelOverviewController } from './controllers/find-channel-overview.controller';
import { UpdateChannelOverviewController } from './controllers/update-channel-overview.controller';
import { DeleteChannelOverviewByIdController } from './controllers/delete-channel-overview-by-id.controller';
import { DeleteChannelsOverviewController } from './controllers/delete-channels-overview.controller';

// resolvers
import { CreateChannelOverviewResolver } from './resolvers/create-channel-overview.resolver';
import { CreateChannelsOverviewResolver } from './resolvers/create-channels-overview.resolver';
import { PaginateChannelsOverviewResolver } from './resolvers/paginate-channels-overview.resolver';
import { GetChannelsOverviewResolver } from './resolvers/get-channels-overview.resolver';
import { FindChannelOverviewResolver } from './resolvers/find-channel-overview.resolver';
import { FindChannelOverviewByIdResolver } from './resolvers/find-channel-overview-by-id.resolver';
import { UpdateChannelOverviewResolver } from './resolvers/update-channel-overview.resolver';
import { DeleteChannelOverviewByIdResolver } from './resolvers/delete-channel-overview-by-id.resolver';
import { DeleteChannelsOverviewResolver } from './resolvers/delete-channels-overview.resolver';

export const CciChannelOverviewControllers = [
    CreateChannelOverviewController,
    CreateChannelsOverviewController,
    PaginateChannelsOverviewController,
    GetChannelsOverviewController,
    FindChannelOverviewByIdController,
    FindChannelOverviewController,
    UpdateChannelOverviewController,
    DeleteChannelOverviewByIdController,
    DeleteChannelsOverviewController,
];

export const CciChannelOverviewResolvers = [
    CreateChannelOverviewResolver,
    CreateChannelsOverviewResolver,
    PaginateChannelsOverviewResolver,
    GetChannelsOverviewResolver,
    FindChannelOverviewResolver,
    FindChannelOverviewByIdResolver,
    UpdateChannelOverviewResolver,
    DeleteChannelOverviewByIdResolver,
    DeleteChannelsOverviewResolver,
];