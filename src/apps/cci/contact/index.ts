// controllers
import { CciCreateContactController } from './controllers/cci-create-contact.controller';
import { CciCreateContactsController } from './controllers/cci-create-contacts.controller';
import { CciPaginateContactsController } from './controllers/cci-paginate-contacts.controller';
import { CciGetContactsController } from './controllers/cci-get-contacts.controller';
import { CciFindContactByIdController } from './controllers/cci-find-contact-by-id.controller';
import { CciFindContactController } from './controllers/cci-find-contact.controller';
import { CciUpdateContactController } from './controllers/cci-update-contact.controller';
import { CciDeleteContactByIdController } from './controllers/cci-delete-contact-by-id.controller';
import { CciDeleteContactsController } from './controllers/cci-delete-contacts.controller';

// resolvers
import { CciCreateContactResolver } from './resolvers/cci-create-contact.resolver';
import { CciCreateContactsResolver } from './resolvers/cci-create-contacts.resolver';
import { CciPaginateContactsResolver } from './resolvers/cci-paginate-contacts.resolver';
import { CciGetContactsResolver } from './resolvers/cci-get-contacts.resolver';
import { CciFindContactByIdResolver } from './resolvers/cci-find-contact-by-id.resolver';
import { CciFindContactResolver } from './resolvers/cci-find-contact.resolver';
import { CciUpdateContactResolver } from './resolvers/cci-update-contact.resolver';
import { CciDeleteContactByIdResolver } from './resolvers/cci-delete-contact-by-id.resolver';
import { CciDeleteContactsResolver } from './resolvers/cci-delete-contacts.resolver';

export const CciContactControllers = [
    CciCreateContactController,
    CciCreateContactsController,
    CciPaginateContactsController,
    CciGetContactsController,
    CciFindContactByIdController,
    CciFindContactController,
    CciUpdateContactController,
    CciDeleteContactByIdController,
    CciDeleteContactsController,
];

export const CciContactResolvers = [
    CciCreateContactResolver,
    CciCreateContactsResolver,
    CciPaginateContactsResolver,
    CciGetContactsResolver,
    CciFindContactByIdResolver,
    CciFindContactResolver,
    CciUpdateContactResolver,
    CciDeleteContactByIdResolver,
    CciDeleteContactsResolver,
];