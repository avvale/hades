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
export class UpdateAccountService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IAccountRepository
    ) {}

    public async main(
        id: AccountId,
        type?: AccountType,
        name?: AccountName,
        isActive?: AccountIsActive,
        clientId?: AccountClientId,
        applicationCodes?: AccountApplicationCodes,
        permissions?: AccountPermissions,
        data?: AccountData,
        roleIds?: AccountRoleIds,
        tenantIds?: AccountTenantIds,
        
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
            null,
            new AccountUpdatedAt(Utils.nowTimestamp()),
            null
        );
        
        // update
        await this.repository.update(account);        
            
        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const accountRegister = this.publisher.mergeObjectContext(
            account
        );
        
        accountRegister.updated(account); // apply event to model events
        accountRegister.commit(); // commit all events of model
    }
}