import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateContactCommand } from './create-contact.command';
import { CreateContactService } from './create-contact.service';
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

@CommandHandler(CreateContactCommand)
export class CreateContactCommandHandler implements ICommandHandler<CreateContactCommand>
{
    constructor(
        private readonly createContactService: CreateContactService
    ) { }

    async execute(command: CreateContactCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createContactService.main(
            new ContactId(command.id),
            new ContactTenantId(command.tenantId),
            new ContactSystemId(command.systemId),
            new ContactSystemName(command.systemName),
            new ContactRoleId(command.roleId),
            new ContactRoleName(command.roleName),
            new ContactName(command.name),
            new ContactSurname(command.surname),
            new ContactEmail(command.email),
            new ContactMobile(command.mobile),
            new ContactArea(command.area),
            new ContactHasConsentEmail(command.hasConsentEmail),
            new ContactHasConsentMobile(command.hasConsentMobile),
            new ContactIsActive(command.isActive),
            
        );
    }
}