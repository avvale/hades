import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InsertContactsCommand } from './insert-contacts.command';
import { InsertContactsService } from './insert-contacts.service';
import { 
    ContactId, 
    ContactTenantId, 
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

@CommandHandler(InsertContactsCommand)
export class InsertContactsCommandHandler implements ICommandHandler<InsertContactsCommand>
{
    constructor(
        private readonly insertContactsService: InsertContactsService
    ) { }

    async execute(command: InsertContactsCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.insertContactsService.main(
            command.contacts
                .map(contact => { 
                    return {
                        id: new ContactId(contact.id),
                        tenantId: new ContactTenantId(contact.tenantId),
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