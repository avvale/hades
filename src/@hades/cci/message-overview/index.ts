// ignored file
// commands
import { CreateMessageOverviewCommandHandler } from './application/create/create-message-overview.command-handler';
import { CreateMessagesOverviewCommandHandler } from './application/create/create-messages-overview.command-handler';
import { UpdateMessageOverviewCommandHandler } from './application/update/update-message-overview.command-handler';
import { DeleteMessageOverviewByIdCommandHandler } from './application/delete/delete-message-overview-by-id.command-handler';
import { DeleteMessagesOverviewCommandHandler } from './application/delete/delete-messages-overview.command-handler';

// queries
import { PaginateMessagesOverviewQueryHandler } from './application/paginate/paginate-messages-overview.query-handler';
import { GetMessagesOverviewQueryHandler } from './application/get/get-messages-overview.query-handler';
import { FindMessageOverviewQueryHandler } from './application/find/find-message-overview.query-handler';
import { FindMessageOverviewByIdQueryHandler } from './application/find/find-message-overview-by-id.query-handler';
import { GetDashboardMessagesOverviewQueryHandler } from './application/get/get-dashboard-messages-overview.query-handler';

// events
import { CreatedMessageOverviewEventHandler } from './application/events/created-message-overview.event-handler';
import { CreatedMessagesOverviewEventHandler } from './application/events/created-messages-overview.event-handler';
import { UpdatedMessageOverviewEventHandler } from './application/events/updated-message-overview.event-handler';
import { DeletedMessageOverviewEventHandler } from './application/events/deleted-message-overview.event-handler';
import { DeletedMessagesOverviewEventHandler } from './application/events/deleted-messages-overview.event-handler';

// services
import { CreateMessageOverviewService } from './application/create/create-message-overview.service';
import { CreateMessagesOverviewService } from './application/create/create-messages-overview.service';
import { PaginateMessagesOverviewService } from './application/paginate/paginate-messages-overview.service';
import { GetMessagesOverviewService } from './application/get/get-messages-overview.service';
import { FindMessageOverviewService } from './application/find/find-message-overview.service';
import { FindMessageOverviewByIdService } from './application/find/find-message-overview-by-id.service';
import { UpdateMessageOverviewService } from './application/update/update-message-overview.service';
import { DeleteMessageOverviewByIdService } from './application/delete/delete-message-overview-by-id.service';
import { DeleteMessagesOverviewService } from './application/delete/delete-messages-overview.service';
import { GetDashboardMessagesOverviewService } from './application/get/get-dashboard-messages-overview.service';

// models
export { CciMessageOverviewModel } from './infrastructure/sequelize/sequelize-message-overview.model';

// repository
export { IMessageOverviewRepository } from './domain/message-overview.repository';
export { SequelizeMessageOverviewRepository } from './infrastructure/sequelize/sequelize-message-overview.repository';

// sagas
export { MessageOverviewSagas } from './application/sagas/message-overview.sagas';

export const CciMessageOverviewHandlers = [
    // commands
    CreateMessageOverviewCommandHandler,
    CreateMessagesOverviewCommandHandler,
    UpdateMessageOverviewCommandHandler,
    DeleteMessageOverviewByIdCommandHandler,
    DeleteMessagesOverviewCommandHandler,

    // queries
    PaginateMessagesOverviewQueryHandler,
    GetMessagesOverviewQueryHandler,
    GetDashboardMessagesOverviewQueryHandler,
    FindMessageOverviewQueryHandler,
    FindMessageOverviewByIdQueryHandler,

    // events
    CreatedMessageOverviewEventHandler,
    CreatedMessagesOverviewEventHandler,
    UpdatedMessageOverviewEventHandler,
    DeletedMessageOverviewEventHandler,
    DeletedMessagesOverviewEventHandler,
];

export const CciMessageOverviewServices = [
    CreateMessageOverviewService,
    CreateMessagesOverviewService,
    PaginateMessagesOverviewService,
    GetMessagesOverviewService,
    GetDashboardMessagesOverviewService,
    FindMessageOverviewService,
    FindMessageOverviewByIdService,
    UpdateMessageOverviewService,
    DeleteMessageOverviewByIdService,
    DeleteMessagesOverviewService,
];