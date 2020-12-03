// commands
import { CreatePartnerCommandHandler } from './application/create/create-partner.command-handler';
import { CreatePartnersCommandHandler } from './application/create/create-partners.command-handler';
import { UpdatePartnerCommandHandler } from './application/update/update-partner.command-handler';
import { DeletePartnerByIdCommandHandler } from './application/delete/delete-partner-by-id.command-handler';
import { DeletePartnersCommandHandler } from './application/delete/delete-partners.command-handler';

// queries
import { PaginatePartnersQueryHandler } from './application/paginate/paginate-partners.query-handler';
import { GetPartnersQueryHandler } from './application/get/get-partners.query-handler';
import { FindPartnerQueryHandler } from './application/find/find-partner.query-handler';
import { FindPartnerByIdQueryHandler } from './application/find/find-partner-by-id.query-handler';

// events
import { CreatedPartnerEventHandler } from './application/events/created-partner.event-handler';
import { CreatedPartnersEventHandler } from './application/events/created-partners.event-handler';
import { UpdatedPartnerEventHandler } from './application/events/updated-partner.event-handler';
import { DeletedPartnerEventHandler } from './application/events/deleted-partner.event-handler';
import { DeletedPartnersEventHandler } from './application/events/deleted-partners.event-handler';

// services
import { CreatePartnerService } from './application/create/create-partner.service';
import { CreatePartnersService } from './application/create/create-partners.service';
import { PaginatePartnersService } from './application/paginate/paginate-partners.service';
import { GetPartnersService } from './application/get/get-partners.service';
import { FindPartnerService } from './application/find/find-partner.service';
import { FindPartnerByIdService } from './application/find/find-partner-by-id.service';
import { UpdatePartnerService } from './application/update/update-partner.service';
import { DeletePartnerByIdService } from './application/delete/delete-partner-by-id.service';
import { DeletePartnersService } from './application/delete/delete-partners.service';

// models
export { OrigenPartnerModel } from './infrastructure/sequelize/sequelize-partner.model';

// repository
export { IPartnerRepository } from './domain/partner.repository';
export { SequelizePartnerRepository } from './infrastructure/sequelize/sequelize-partner.repository';

// sagas
export { PartnerSagas } from './application/sagas/partner.sagas';

export const OrigenPartnerHandlers = [
    // commands
    CreatePartnerCommandHandler,
    CreatePartnersCommandHandler,
    UpdatePartnerCommandHandler,
    DeletePartnerByIdCommandHandler,
    DeletePartnersCommandHandler,

    // queries
    PaginatePartnersQueryHandler,
    GetPartnersQueryHandler,
    FindPartnerQueryHandler,
    FindPartnerByIdQueryHandler,

    // events
    CreatedPartnerEventHandler,
    CreatedPartnersEventHandler,
    UpdatedPartnerEventHandler,
    DeletedPartnerEventHandler,
    DeletedPartnersEventHandler,
];

export const OrigenPartnerServices = [
    CreatePartnerService,
    CreatePartnersService,
    PaginatePartnersService,
    GetPartnersService,
    FindPartnerService,
    FindPartnerByIdService,
    UpdatePartnerService,
    DeletePartnerByIdService,
    DeletePartnersService,
];