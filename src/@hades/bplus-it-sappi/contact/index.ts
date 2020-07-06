// commands
import { CreateContactCommandHandler } from './application/create/create-contact.command-handler';
import { InsertContactsCommandHandler } from './application/insert/insert-contacts.command-handler';
import { UpdateContactCommandHandler } from './application/update/update-contact.command-handler';
import { DeleteContactByIdCommandHandler } from './application/delete/delete-contact-by-id.command-handler';
import { DeleteContactsCommandHandler } from './application/delete/delete-contacts.command-handler';

// queries
import { PaginateContactsQueryHandler } from './application/paginate/paginate-contacts.query-handler';
import { GetContactsQueryHandler } from './application/get/get-contacts.query-handler';
import { FindContactQueryHandler } from './application/find/find-contact.query-handler';
import { FindContactByIdQueryHandler } from './application/find/find-contact-by-id.query-handler';

// events
import { CreatedContactEventHandler } from './application/events/created-contact.event-handler';
import { UpdatedContactEventHandler } from './application/events/updated-contact.event-handler';
import { DeletedContactEventHandler } from './application/events/deleted-contact.event-handler';

// services
import { CreateContactService } from './application/create/create-contact.service';
import { InsertContactsService } from './application/insert/insert-contacts.service';
import { PaginateContactsService } from './application/paginate/paginate-contacts.service';
import { GetContactsService } from './application/get/get-contacts.service';
import { FindContactService } from './application/find/find-contact.service';
import { FindContactByIdService } from './application/find/find-contact-by-id.service';
import { UpdateContactService } from './application/update/update-contact.service';
import { DeleteContactByIdService } from './application/delete/delete-contact-by-id.service';
import { DeleteContactsService } from './application/delete/delete-contacts.service';

// models
export { BplusItSappiContactModel } from './infrastructure/sequelize/sequelize-contact.model';


// repository
export { IContactRepository } from './domain/contact.repository';
export { SequelizeContactRepository } from './infrastructure/sequelize/sequelize-contact.repository';

// sagas
export { ContactSagas } from './application/sagas/contact.sagas';

export const BplusItSappiContactHandlers = [
    // commands
    CreateContactCommandHandler,
    InsertContactsCommandHandler,
    UpdateContactCommandHandler,
    DeleteContactByIdCommandHandler,
    DeleteContactsCommandHandler,

    // queries
    PaginateContactsQueryHandler,
    GetContactsQueryHandler,
    FindContactQueryHandler,
    FindContactByIdQueryHandler,

    // events
    CreatedContactEventHandler,
    UpdatedContactEventHandler,
    DeletedContactEventHandler,
];

export const BplusItSappiContactServices = [
    CreateContactService,
    InsertContactsService,
    PaginateContactsService,
    GetContactsService,
    FindContactService,
    FindContactByIdService,
    UpdateContactService,
    DeleteContactByIdService,
    DeleteContactsService,
];