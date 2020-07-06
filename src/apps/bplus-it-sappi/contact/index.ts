// controllers
import { CreateContactController } from './controllers/create-contact.controller';
import { InsertContactsController } from './controllers/insert-contacts.controller';
import { PaginateContactsController } from './controllers/paginate-contacts.controller';
import { GetContactsController } from './controllers/get-contacts.controller';
import { FindContactByIdController } from './controllers/find-contact-by-id.controller';
import { FindContactController } from './controllers/find-contact.controller';
import { UpdateContactController } from './controllers/update-contact.controller';
import { DeleteContactByIdController } from './controllers/delete-contact-by-id.controller';
import { DeleteContactsController } from './controllers/delete-contacts.controller';

// resolvers
import { CreateContactResolver } from './resolvers/create-contact.resolver';
import { InsertContactsResolver } from './resolvers/insert-contacts.resolver';
import { PaginateContactsResolver } from './resolvers/paginate-contacts.resolver';
import { GetContactsResolver } from './resolvers/get-contacts.resolver';
import { FindContactResolver } from './resolvers/find-contact.resolver';
import { FindContactByIdResolver } from './resolvers/find-contact-by-id.resolver';
import { UpdateContactResolver } from './resolvers/update-contact.resolver';
import { DeleteContactByIdResolver } from './resolvers/delete-contact-by-id.resolver';
import { DeleteContactsResolver } from './resolvers/delete-contacts.resolver';

export const BplusItSappiContactControllers = [
    CreateContactController,
    InsertContactsController,
    PaginateContactsController,
    GetContactsController,
    FindContactByIdController,
    FindContactController,
    UpdateContactController,
    DeleteContactByIdController,
    DeleteContactsController,
];

export const BplusItSappiContactResolvers = [
    CreateContactResolver,
    InsertContactsResolver,
    PaginateContactsResolver,
    GetContactsResolver,
    FindContactResolver,
    FindContactByIdResolver,
    UpdateContactResolver,
    DeleteContactByIdResolver,
    DeleteContactsResolver,
];