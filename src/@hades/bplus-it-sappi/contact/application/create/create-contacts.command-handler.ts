import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateContactsCommand } from './create-contacts.command';
import { CreateContactsService } from './create-contacts.service';
import { 
    ContactId, 
    ContactTenantId, 
    ContactTenantCode, 
    ContactSystemId, 
    ContactSystemName, 
    ContactRoleId, 
    ContactRoleName, 
    ContactName, 
    ContactSurname, 
    ContactEmail, 
    ContactMobile, 
    ContactArea, 
    ContactHasConsentEmail, 
    ContactHasConsentMobile, 
    ContactIsActive
    
} from './../../domain/value-objects';

@CommandHandler(CreateContactsCommand)
export class CreateContactsCommandHandler implements ICommandHandler<CreateContactsCommand>
{
    constructor(
        private readonly createContactsService: CreateContactsService
    ) { }

    async execute(command: CreateContactsCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createContactsService.main(
            command.contacts
                .map(contact => { 
                    return {
                        id: new ContactId(contact.id),
                        tenantId: new ContactTenantId(contact.tenantId),
                        tenantCode: new ContactTenantCode(contact.tenantCode),
                        systemId: new ContactSystemId(contact.systemId),
                        systemName: new ContactSystemName(contact.systemName),
                        roleId: new ContactRoleId(contact.roleId),
                        roleName: new ContactRoleName(contact.roleName),
                        name: new ContactName(contact.name),
                        surname: new ContactSurname(contact.surname),
                        email: new ContactEmail(contact.email),
                        mobile: new ContactMobile(contact.mobile),
                        area: new ContactArea(contact.area),
                        hasConsentEmail: new ContactHasConsentEmail(contact.hasConsentEmail),
                        hasConsentMobile: new ContactHasConsentMobile(contact.hasConsentMobile),
                        isActive: new ContactIsActive(contact.isActive),
                        
                    }
                })
        );
    }
}