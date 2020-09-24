import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { Utils } from '@hades/shared/domain/lib/utils';
import { 
    AccountId,
    AccountType,
    AccountName,
    AccountIsActive,
    AccountClientId,
    AccountApplicationCodes,
    AccountPermissions,
    AccountData,
    AccountRoleIds,
    AccountTenantIds,
    AccountCreatedAt,
    AccountUpdatedAt,
    AccountDeletedAt
    
} from './../../domain/value-objects';
import { IAccountRepository } from './../../domain/account.repository';
import { IamAccount } from './../../domain/account.aggregate';
import { AddAccountsContextEvent } from './../events/add-accounts-context.event';

@Injectable()
export class CreateAccountsService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IAccountRepository
    ) {}

    public async main(
        accounts: {
            id: AccountId,
            type: AccountType,
            name: AccountName,
            isActive: AccountIsActive,
            clientId: AccountClientId,
            applicationCodes: AccountApplicationCodes,
            permissions: AccountPermissions,
            data: AccountData,
            roleIds: AccountRoleIds,
            tenantIds: AccountTenantIds,
            
        } []
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const aggregateAccounts = accounts.map(account => IamAccount.register(
            account.id,
            account.type,
            account.name,
            account.isActive,
            account.clientId,
            account.applicationCodes,
            account.permissions,
            account.data,
            account.roleIds,
            account.tenantIds,
            new AccountCreatedAt(Utils.nowTimestamp()),
            new AccountUpdatedAt(Utils.nowTimestamp()),
            null
        ));
        
        // insert
        await this.repository.insert(aggregateAccounts);

        // create AddAccountsContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const accountsRegistered = this.publisher.mergeObjectContext(new AddAccountsContextEvent(aggregateAccounts));
 
        accountsRegistered.created(); // apply event to model events
        accountsRegistered.commit(); // commit all events of model
    }
}