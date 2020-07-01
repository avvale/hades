// commands
import { CreateChannelOverviewCommandHandler } from './application/create/create-channel-overview.command-handler';
import { InsertChannelsOverviewCommandHandler } from './application/insert/insert-channels-overview.command-handler';
import { UpdateChannelOverviewCommandHandler } from './application/update/update-channel-overview.command-handler';
import { DeleteChannelOverviewByIdCommandHandler } from './application/delete/delete-channel-overview-by-id.command-handler';
import { DeleteChannelsOverviewCommandHandler } from './application/delete/delete-channels-overview.command-handler';

// queries
import { PaginateChannelsOverviewQueryHandler } from './application/paginate/paginate-channels-overview.query-handler';
import { GetChannelsOverviewQueryHandler } from './application/get/get-channels-overview.query-handler';
import { FindChannelOverviewQueryHandler } from './application/find/find-channel-overview.query-handler';
import { FindChannelOverviewByIdQueryHandler } from './application/find/find-channel-overview-by-id.query-handler';

// events
import { CreatedChannelOverviewEventHandler } from './application/events/created-channel-overview.event-handler';
import { UpdatedChannelOverviewEventHandler } from './application/events/updated-channel-overview.event-handler';
import { DeletedChannelOverviewEventHandler } from './application/events/deleted-channel-overview.event-handler';

// services
import { CreateChannelOverviewService } from './application/create/create-channel-overview.service';
import { InsertChannelsOverviewService } from './application/insert/insert-channels-overview.service';
import { PaginateChannelsOverviewService } from './application/paginate/paginate-channels-overview.service';
import { GetChannelsOverviewService } from './application/get/get-channels-overview.service';
import { FindChannelOverviewService } from './application/find/find-channel-overview.service';
import { FindChannelOverviewByIdService } from './application/find/find-channel-overview-by-id.service';
import { UpdateChannelOverviewService } from './application/update/update-channel-overview.service';
import { DeleteChannelOverviewByIdService } from './application/delete/delete-channel-overview-by-id.service';
import { DeleteChannelsOverviewService } from './application/delete/delete-channels-overview.service';

// models
export { BplusItSappiChannelOverviewModel } from './infrastructure/sequelize/sequelize-channel-overview.model';


// repository
export { IChannelOverviewRepository } from './domain/channel-overview.repository';
export { SequelizeChannelOverviewRepository } from './infrastructure/sequelize/sequelize-channel-overview.repository';

// sagas
export { ChannelOverviewSagas } from './application/sagas/channel-overview.sagas';

export const BplusItSappiChannelOverviewHandlers = [
    // commands
    CreateChannelOverviewCommandHandler,
    InsertChannelsOverviewCommandHandler,
    UpdateChannelOverviewCommandHandler,
    DeleteChannelOverviewByIdCommandHandler,
    DeleteChannelsOverviewCommandHandler,

    // queries
    PaginateChannelsOverviewQueryHandler,
    GetChannelsOverviewQueryHandler,
    FindChannelOverviewQueryHandler,
    FindChannelOverviewByIdQueryHandler,

    // events
    CreatedChannelOverviewEventHandler,
    UpdatedChannelOverviewEventHandler,
    DeletedChannelOverviewEventHandler,
];

export const BplusItSappiChannelOverviewServices = [
    CreateChannelOverviewService,
    InsertChannelsOverviewService,
    PaginateChannelsOverviewService,
    GetChannelsOverviewService,
    FindChannelOverviewService,
    FindChannelOverviewByIdService,
    UpdateChannelOverviewService,
    DeleteChannelOverviewByIdService,
    DeleteChannelsOverviewService,
];