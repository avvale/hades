// controllers
import { CreateAccountController } from './controllers/create-account.controller';
import { CreateAccountsController } from './controllers/create-accounts.controller';
import { PaginateAccountsController } from './controllers/paginate-accounts.controller';
import { GetAccountsController } from './controllers/get-accounts.controller';
import { FindAccountByIdController } from './controllers/find-account-by-id.controller';
import { FindAccountController } from './controllers/find-account.controller';
import { UpdateAccountController } from './controllers/update-account.controller';
import { DeleteAccountByIdController } from './controllers/delete-account-by-id.controller';
import { DeleteAccountsController } from './controllers/delete-accounts.controller';

// resolvers
import { CreateAccountResolver } from './resolvers/create-account.resolver';
import { CreateAccountsResolver } from './resolvers/create-accounts.resolver';
import { PaginateAccountsResolver } from './resolvers/paginate-accounts.resolver';
import { GetAccountsResolver } from './resolvers/get-accounts.resolver';
import { FindAccountResolver } from './resolvers/find-account.resolver';
import { FindAccountByIdResolver } from './resolvers/find-account-by-id.resolver';
import { UpdateAccountResolver } from './resolvers/update-account.resolver';
import { DeleteAccountByIdResolver } from './resolvers/delete-account-by-id.resolver';
import { DeleteAccountsResolver } from './resolvers/delete-accounts.resolver';

export const IamAccountControllers = [
    CreateAccountController,
    CreateAccountsController,
    PaginateAccountsController,
    GetAccountsController,
    FindAccountByIdController,
    FindAccountController,
    UpdateAccountController,
    DeleteAccountByIdController,
    DeleteAccountsController,
];

export const IamAccountResolvers = [
    CreateAccountResolver,
    CreateAccountsResolver,
    PaginateAccountsResolver,
    GetAccountsResolver,
    FindAccountResolver,
    FindAccountByIdResolver,
    UpdateAccountResolver,
    DeleteAccountByIdResolver,
    DeleteAccountsResolver,
];