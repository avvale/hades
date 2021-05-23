// ignored file
// commands
import { CreateChannelOverviewCommandHandler } from './application/create/create-channel-overview.command-handler';
import { CreateChannelsOverviewCommandHandler } from './application/create/create-channels-overview.command-handler';
import { UpdateChannelOverviewCommandHandler } from './application/update/update-channel-overview.command-handler';
import { DeleteChannelOverviewByIdCommandHandler } from './application/delete/delete-channel-overview-by-id.command-handler';
import { DeleteChannelsOverviewCommandHandler } from './application/delete/delete-channels-overview.command-handler';

// queries
import { PaginateChannelsOverviewQueryHandler } from './application/paginate/paginate-channels-overview.query-handler';
import { GetChannelsOverviewQueryHandler } from './application/get/get-channels-overview.query-handler';
import { FindChannelOverviewQueryHandler } from './application/find/find-channel-overview.query-handler';
import { FindChannelOverviewByIdQueryHandler } from './application/find/find-channel-overview-by-id.query-handler';
import { GetDashboardChannelsOverviewQueryHandler } from './application/get/get-dashboard-channels-overview.query-handler';

// events
import { CreatedChannelOverviewEventHandler } from './application/events/created-channel-overview.event-handler';
import { CreatedChannelsOverviewEventHandler } from './application/events/created-channels-overview.event-handler';
import { UpdatedChannelOverviewEventHandler } from './application/events/updated-channel-overview.event-handler';
import { DeletedChannelOverviewEventHandler } from './application/events/deleted-channel-overview.event-handler';
import { DeletedChannelsOverviewEventHandler } from './application/events/deleted-channels-overview.event-handler';

// services
import { CreateChannelOverviewService } from './application/create/create-channel-overview.service';
import { CreateChannelsOverviewService } from './application/create/create-channels-overview.service';
import { PaginateChannelsOverviewService } from './application/paginate/paginate-channels-overview.service';
import { GetChannelsOverviewService } from './application/get/get-channels-overview.service';
import { FindChannelOverviewService } from './application/find/find-channel-overview.service';
import { FindChannelOverviewByIdService } from './application/find/find-channel-overview-by-id.service';
import { UpdateChannelOverviewService } from './application/update/update-channel-overview.service';
import { DeleteChannelOverviewByIdService } from './application/delete/delete-channel-overview-by-id.service';
import { DeleteChannelsOverviewService } from './application/delete/delete-channels-overview.service';
import { GetDashboardChannelsOverviewService } from './application/get/get-dashboard-channels-overview.service';

// models
export { CciChannelOverviewModel } from './infrastructure/sequelize/sequelize-channel-overview.model';

// repository
export { IChannelOverviewRepository } from './domain/channel-overview.repository';
export { SequelizeChannelOverviewRepository } from './infrastructure/sequelize/sequelize-channel-overview.repository';

// sagas
export { ChannelOverviewSagas } from './application/sagas/channel-overview.sagas';

export const CciChannelOverviewHandlers = [
    // commands
    CreateChannelOverviewCommandHandler,
    CreateChannelsOverviewCommandHandler,
    UpdateChannelOverviewCommandHandler,
    DeleteChannelOverviewByIdCommandHandler,
    DeleteChannelsOverviewCommandHandler,

    // queries
    PaginateChannelsOverviewQueryHandler,
    GetChannelsOverviewQueryHandler,
    GetDashboardChannelsOverviewQueryHandler,
    FindChannelOverviewQueryHandler,
    FindChannelOverviewByIdQueryHandler,

    // events
    CreatedChannelOverviewEventHandler,
    CreatedChannelsOverviewEventHandler,
    UpdatedChannelOverviewEventHandler,
    DeletedChannelOverviewEventHandler,
    DeletedChannelsOverviewEventHandler,
];

export const CciChannelOverviewServices = [
    CreateChannelOverviewService,
    CreateChannelsOverviewService,
    PaginateChannelsOverviewService,
    GetChannelsOverviewService,
    GetDashboardChannelsOverviewService,
    FindChannelOverviewService,
    FindChannelOverviewByIdService,
    UpdateChannelOverviewService,
    DeleteChannelOverviewByIdService,
    DeleteChannelsOverviewService,
];