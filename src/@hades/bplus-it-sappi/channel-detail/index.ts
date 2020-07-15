// commands
import { CreateChannelDetailCommandHandler } from './application/create/create-channel-detail.command-handler';
import { InsertChannelsDetailCommandHandler } from './application/insert/insert-channels-detail.command-handler';
import { UpdateChannelDetailCommandHandler } from './application/update/update-channel-detail.command-handler';
import { DeleteChannelDetailByIdCommandHandler } from './application/delete/delete-channel-detail-by-id.command-handler';
import { DeleteChannelsDetailCommandHandler } from './application/delete/delete-channels-detail.command-handler';

// queries
import { PaginateChannelsDetailQueryHandler } from './application/paginate/paginate-channels-detail.query-handler';
import { GetChannelsDetailQueryHandler } from './application/get/get-channels-detail.query-handler';
import { FindChannelDetailQueryHandler } from './application/find/find-channel-detail.query-handler';
import { FindChannelDetailByIdQueryHandler } from './application/find/find-channel-detail-by-id.query-handler';

// events
import { CreatedChannelDetailEventHandler } from './application/events/created-channel-detail.event-handler';
import { UpdatedChannelDetailEventHandler } from './application/events/updated-channel-detail.event-handler';
import { DeletedChannelDetailEventHandler } from './application/events/deleted-channel-detail.event-handler';

// services
import { CreateChannelDetailService } from './application/create/create-channel-detail.service';
import { InsertChannelsDetailService } from './application/insert/insert-channels-detail.service';
import { PaginateChannelsDetailService } from './application/paginate/paginate-channels-detail.service';
import { GetChannelsDetailService } from './application/get/get-channels-detail.service';
import { FindChannelDetailService } from './application/find/find-channel-detail.service';
import { FindChannelDetailByIdService } from './application/find/find-channel-detail-by-id.service';
import { UpdateChannelDetailService } from './application/update/update-channel-detail.service';
import { DeleteChannelDetailByIdService } from './application/delete/delete-channel-detail-by-id.service';
import { DeleteChannelsDetailService } from './application/delete/delete-channels-detail.service';

// models
export { BplusItSappiChannelDetailModel } from './infrastructure/sequelize/sequelize-channel-detail.model';


// repository
export { IChannelDetailRepository } from './domain/channel-detail.repository';
export { SequelizeChannelDetailRepository } from './infrastructure/sequelize/sequelize-channel-detail.repository';

// sagas
export { ChannelDetailSagas } from './application/sagas/channel-detail.sagas';

export const BplusItSappiChannelDetailHandlers = [
    // commands
    CreateChannelDetailCommandHandler,
    InsertChannelsDetailCommandHandler,
    UpdateChannelDetailCommandHandler,
    DeleteChannelDetailByIdCommandHandler,
    DeleteChannelsDetailCommandHandler,

    // queries
    PaginateChannelsDetailQueryHandler,
    GetChannelsDetailQueryHandler,
    FindChannelDetailQueryHandler,
    FindChannelDetailByIdQueryHandler,

    // events
    CreatedChannelDetailEventHandler,
    UpdatedChannelDetailEventHandler,
    DeletedChannelDetailEventHandler,
];

export const BplusItSappiChannelDetailServices = [
    CreateChannelDetailService,
    InsertChannelsDetailService,
    PaginateChannelsDetailService,
    GetChannelsDetailService,
    FindChannelDetailService,
    FindChannelDetailByIdService,
    UpdateChannelDetailService,
    DeleteChannelDetailByIdService,
    DeleteChannelsDetailService,
];