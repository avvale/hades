import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateContactCommand } from './update-contact.command';
import { UpdateContactService } from './update-contact.service';
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

@CommandHandler(UpdateContactCommand)
export class UpdateContactCommandHandler implements ICommandHandler<UpdateContactCommand>
{
    constructor(
        private readonly updateContactService: UpdateContactService
    ) { }

    async execute(command: UpdateContactCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateContactService.main(
            new ContactId(command.id),
            new ContactTenantId(command.tenantId, { undefinable: true }),
            new ContactSystemId(command.systemId, { undefinable: true }),
            new ContactSystemName(command.systemName, { undefinable: true }),
            new ContactRoleId(command.roleId),
            new ContactRoleName(command.roleName),
            new ContactName(command.name, { undefinable: true }),
            new ContactSurname(command.surname),
            new ContactEmail(command.email, { undefinable: true }),
            new ContactMobile(command.mobile),
            new ContactArea(command.area),
            new ContactHasConsentEmail(command.hasConsentEmail, { undefinable: true }),
            new ContactHasConsentMobile(command.hasConsentMobile, { undefinable: true }),
            new ContactIsActive(command.isActive, { undefinable: true }),
            
        )
    }
}