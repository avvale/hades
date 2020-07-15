// controllers
import { CreateChannelDetailController } from './controllers/create-channel-detail.controller';
import { InsertChannelsDetailController } from './controllers/insert-channels-detail.controller';
import { PaginateChannelsDetailController } from './controllers/paginate-channels-detail.controller';
import { GetChannelsDetailController } from './controllers/get-channels-detail.controller';
import { FindChannelDetailByIdController } from './controllers/find-channel-detail-by-id.controller';
import { FindChannelDetailController } from './controllers/find-channel-detail.controller';
import { UpdateChannelDetailController } from './controllers/update-channel-detail.controller';
import { DeleteChannelDetailByIdController } from './controllers/delete-channel-detail-by-id.controller';
import { DeleteChannelsDetailController } from './controllers/delete-channels-detail.controller';

// resolvers
import { CreateChannelDetailResolver } from './resolvers/create-channel-detail.resolver';
import { InsertChannelsDetailResolver } from './resolvers/insert-channels-detail.resolver';
import { PaginateChannelsDetailResolver } from './resolvers/paginate-channels-detail.resolver';
import { GetChannelsDetailResolver } from './resolvers/get-channels-detail.resolver';
import { FindChannelDetailResolver } from './resolvers/find-channel-detail.resolver';
import { FindChannelDetailByIdResolver } from './resolvers/find-channel-detail-by-id.resolver';
import { UpdateChannelDetailResolver } from './resolvers/update-channel-detail.resolver';
import { DeleteChannelDetailByIdResolver } from './resolvers/delete-channel-detail-by-id.resolver';
import { DeleteChannelsDetailResolver } from './resolvers/delete-channels-detail.resolver';

export const BplusItSappiChannelDetailControllers = [
    CreateChannelDetailController,
    InsertChannelsDetailController,
    PaginateChannelsDetailController,
    GetChannelsDetailController,
    FindChannelDetailByIdController,
    FindChannelDetailController,
    UpdateChannelDetailController,
    DeleteChannelDetailByIdController,
    DeleteChannelsDetailController,
];

export const BplusItSappiChannelDetailResolvers = [
    CreateChannelDetailResolver,
    InsertChannelsDetailResolver,
    PaginateChannelsDetailResolver,
    GetChannelsDetailResolver,
    FindChannelDetailResolver,
    FindChannelDetailByIdResolver,
    UpdateChannelDetailResolver,
    DeleteChannelDetailByIdResolver,
    DeleteChannelsDetailResolver,
];