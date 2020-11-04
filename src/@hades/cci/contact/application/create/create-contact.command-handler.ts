import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateContactCommand } from './create-contact.command';
import { CreateContactService } from './create-contact.service';
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
    ContactIsActive,
    ContactCreatedAt,
    ContactUpdatedAt,
    ContactDeletedAt,
} from './../../domain/value-objects';

@CommandHandler(CreateContactCommand)
export class CreateContactCommandHandler implements ICommandHandler<CreateContactCommand>
{
    constructor(
        private readonly createContactService: CreateContactService,
    ) {}

    async execute(command: CreateContactCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createContactService.main(
            {
                id: new ContactId(command.payload.id),
                tenantId: new ContactTenantId(command.payload.tenantId),
                tenantCode: new ContactTenantCode(command.payload.tenantCode),
                systemId: new ContactSystemId(command.payload.systemId),
                systemName: new ContactSystemName(command.payload.systemName),
                roleId: new ContactRoleId(command.payload.roleId),
                roleName: new ContactRoleName(command.payload.roleName),
                name: new ContactName(command.payload.name),
                surname: new ContactSurname(command.payload.surname),
                email: new ContactEmail(command.payload.email),
                mobile: new ContactMobile(command.payload.mobile),
                area: new ContactArea(command.payload.area),
                hasConsentEmail: new ContactHasConsentEmail(command.payload.hasConsentEmail),
                hasConsentMobile: new ContactHasConsentMobile(command.payload.hasConsentMobile),
                isActive: new ContactIsActive(command.payload.isActive),
            }
        );
    }
}