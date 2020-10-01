// controllers
import { CreateContactController } from './controllers/create-contact.controller';
import { CreateContactsController } from './controllers/create-contacts.controller';
import { PaginateContactsController } from './controllers/paginate-contacts.controller';
import { GetContactsController } from './controllers/get-contacts.controller';
import { FindContactByIdController } from './controllers/find-contact-by-id.controller';
import { FindContactController } from './controllers/find-contact.controller';
import { UpdateContactController } from './controllers/update-contact.controller';
import { DeleteContactByIdController } from './controllers/delete-contact-by-id.controller';
import { DeleteContactsController } from './controllers/delete-contacts.controller';

// resolvers
import { CreateContactResolver } from './resolvers/create-contact.resolver';
import { CreateContactsResolver } from './resolvers/create-contacts.resolver';
import { PaginateContactsResolver } from './resolvers/paginate-contacts.resolver';
import { GetContactsResolver } from './resolvers/get-contacts.resolver';
import { FindContactResolver } from './resolvers/find-contact.resolver';
import { FindContactByIdResolver } from './resolvers/find-contact-by-id.resolver';
import { UpdateContactResolver } from './resolvers/update-contact.resolver';
import { DeleteContactByIdResolver } from './resolvers/delete-contact-by-id.resolver';
import { DeleteContactsResolver } from './resolvers/delete-contacts.resolver';

export const CciContactControllers = [
    CreateContactController,
    CreateContactsController,
    PaginateContactsController,
    GetContactsController,
    FindContactByIdController,
    FindContactController,
    UpdateContactController,
    DeleteContactByIdController,
    DeleteContactsController,
];

export const CciContactResolvers = [
    CreateContactResolver,
    CreateContactsResolver,
    PaginateContactsResolver,
    GetContactsResolver,
    FindContactResolver,
    FindContactByIdResolver,
    UpdateContactResolver,
    DeleteContactByIdResolver,
    DeleteContactsResolver,
];