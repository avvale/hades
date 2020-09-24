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

@Injectable()
export class CreateAccountService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IAccountRepository
    ) {}

    public async main(
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
        
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const account = IamAccount.register(
            id,
            type,
            name,
            isActive,
            clientId,
            applicationCodes,
            permissions,
            data,
            roleIds,
            tenantIds,
            new AccountCreatedAt(Utils.nowTimestamp()),
            new AccountUpdatedAt(Utils.nowTimestamp()),
            null
        );
        
        // create
        await this.repository.create(account);

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const accountRegister = this.publisher.mergeObjectContext(
            account
        );
        
        accountRegister.created(account); // apply event to model events
        accountRegister.commit(); // commit all events of model
    }
}