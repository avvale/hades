// commands
import { CreateMessageDetailCommandHandler } from './application/create/create-message-detail.command-handler';
import { InsertMessagesDetailCommandHandler } from './application/insert/insert-messages-detail.command-handler';
import { UpdateMessageDetailCommandHandler } from './application/update/update-message-detail.command-handler';
import { DeleteMessageDetailByIdCommandHandler } from './application/delete/delete-message-detail-by-id.command-handler';
import { DeleteMessagesDetailCommandHandler } from './application/delete/delete-messages-detail.command-handler';

// queries
import { PaginateMessagesDetailQueryHandler } from './application/paginate/paginate-messages-detail.query-handler';
import { GetMessagesDetailQueryHandler } from './application/get/get-messages-detail.query-handler';
import { FindMessageDetailQueryHandler } from './application/find/find-message-detail.query-handler';
import { FindMessageDetailByIdQueryHandler } from './application/find/find-message-detail-by-id.query-handler';

// events
import { CreatedMessageDetailEventHandler } from './application/events/created-message-detail.event-handler';
import { UpdatedMessageDetailEventHandler } from './application/events/updated-message-detail.event-handler';
import { DeletedMessageDetailEventHandler } from './application/events/deleted-message-detail.event-handler';

// services
import { CreateMessageDetailService } from './application/create/create-message-detail.service';
import { InsertMessagesDetailService } from './application/insert/insert-messages-detail.service';
import { PaginateMessagesDetailService } from './application/paginate/paginate-messages-detail.service';
import { GetMessagesDetailService } from './application/get/get-messages-detail.service';
import { FindMessageDetailService } from './application/find/find-message-detail.service';
import { FindMessageDetailByIdService } from './application/find/find-message-detail-by-id.service';
import { UpdateMessageDetailService } from './application/update/update-message-detail.service';
import { DeleteMessageDetailByIdService } from './application/delete/delete-message-detail-by-id.service';
import { DeleteMessagesDetailService } from './application/delete/delete-messages-detail.service';

// models
export { BplusItSappiMessageDetailModel } from './infrastructure/sequelize/sequelize-message-detail.model';


// repository
export { IMessageDetailRepository } from './domain/message-detail.repository';
export { SequelizeMessageDetailRepository } from './infrastructure/sequelize/sequelize-message-detail.repository';

// sagas
export { MessageDetailSagas } from './application/sagas/message-detail.sagas';

export const BplusItSappiMessageDetailHandlers = [
    // commands
    CreateMessageDetailCommandHandler,
    InsertMessagesDetailCommandHandler,
    UpdateMessageDetailCommandHandler,
    DeleteMessageDetailByIdCommandHandler,
    DeleteMessagesDetailCommandHandler,

    // queries
    PaginateMessagesDetailQueryHandler,
    GetMessagesDetailQueryHandler,
    FindMessageDetailQueryHandler,
    FindMessageDetailByIdQueryHandler,

    // events
    CreatedMessageDetailEventHandler,
    UpdatedMessageDetailEventHandler,
    DeletedMessageDetailEventHandler,
];

export const BplusItSappiMessageDetailServices = [
    CreateMessageDetailService,
    InsertMessagesDetailService,
    PaginateMessagesDetailService,
    GetMessagesDetailService,
    FindMessageDetailService,
    FindMessageDetailByIdService,
    UpdateMessageDetailService,
    DeleteMessageDetailByIdService,
    DeleteMessagesDetailService,
];