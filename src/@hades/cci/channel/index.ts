// commands
import { CreateChannelCommandHandler } from './application/create/create-channel.command-handler';
import { CreateChannelsCommandHandler } from './application/create/create-channels.command-handler';
import { UpdateChannelCommandHandler } from './application/update/update-channel.command-handler';
import { DeleteChannelByIdCommandHandler } from './application/delete/delete-channel-by-id.command-handler';
import { DeleteChannelsCommandHandler } from './application/delete/delete-channels.command-handler';

// queries
import { PaginateChannelsQueryHandler } from './application/paginate/paginate-channels.query-handler';
import { GetChannelsQueryHandler } from './application/get/get-channels.query-handler';
import { FindChannelQueryHandler } from './application/find/find-channel.query-handler';
import { FindChannelByIdQueryHandler } from './application/find/find-channel-by-id.query-handler';

// events
import { CreatedChannelEventHandler } from './application/events/created-channel.event-handler';
import { CreatedChannelsEventHandler } from './application/events/created-channels.event-handler';
import { UpdatedChannelEventHandler } from './application/events/updated-channel.event-handler';
import { DeletedChannelEventHandler } from './application/events/deleted-channel.event-handler';
import { DeletedChannelsEventHandler } from './application/events/deleted-channels.event-handler';

// services
import { CreateChannelService } from './application/create/create-channel.service';
import { CreateChannelsService } from './application/create/create-channels.service';
import { PaginateChannelsService } from './application/paginate/paginate-channels.service';
import { GetChannelsService } from './application/get/get-channels.service';
import { FindChannelService } from './application/find/find-channel.service';
import { FindChannelByIdService } from './application/find/find-channel-by-id.service';
import { UpdateChannelService } from './application/update/update-channel.service';
import { DeleteChannelByIdService } from './application/delete/delete-channel-by-id.service';
import { DeleteChannelsService } from './application/delete/delete-channels.service';

// models
export { CciChannelModel } from './infrastructure/sequelize/sequelize-channel.model';

// repository
export { IChannelRepository } from './domain/channel.repository';
export { SequelizeChannelRepository } from './infrastructure/sequelize/sequelize-channel.repository';

// sagas
export { ChannelSagas } from './application/sagas/channel.sagas';

export const CciChannelHandlers = [
    // commands
    CreateChannelCommandHandler,
    CreateChannelsCommandHandler,
    UpdateChannelCommandHandler,
    DeleteChannelByIdCommandHandler,
    DeleteChannelsCommandHandler,

    // queries
    PaginateChannelsQueryHandler,
    GetChannelsQueryHandler,
    FindChannelQueryHandler,
    FindChannelByIdQueryHandler,

    // events
    CreatedChannelEventHandler,
    CreatedChannelsEventHandler,
    UpdatedChannelEventHandler,
    DeletedChannelEventHandler,
    DeletedChannelsEventHandler,
];

export const CciChannelServices = [
    CreateChannelService,
    CreateChannelsService,
    PaginateChannelsService,
    GetChannelsService,
    FindChannelService,
    FindChannelByIdService,
    UpdateChannelService,
    DeleteChannelByIdService,
    DeleteChannelsService,
];