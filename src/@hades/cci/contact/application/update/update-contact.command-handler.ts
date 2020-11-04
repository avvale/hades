import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateContactCommand } from './update-contact.command';
import { UpdateContactService } from './update-contact.service';
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

@CommandHandler(UpdateContactCommand)
export class UpdateContactCommandHandler implements ICommandHandler<UpdateContactCommand>
{
    constructor(
        private readonly updateContactService: UpdateContactService,
    ) {}

    async execute(command: UpdateContactCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateContactService.main(
            {
                id: new ContactId(command.payload.id),
                tenantId: new ContactTenantId(command.payload.tenantId, { undefinable: true }),
                tenantCode: new ContactTenantCode(command.payload.tenantCode, { undefinable: true }),
                systemId: new ContactSystemId(command.payload.systemId, { undefinable: true }),
                systemName: new ContactSystemName(command.payload.systemName, { undefinable: true }),
                roleId: new ContactRoleId(command.payload.roleId),
                roleName: new ContactRoleName(command.payload.roleName),
                name: new ContactName(command.payload.name, { undefinable: true }),
                surname: new ContactSurname(command.payload.surname),
                email: new ContactEmail(command.payload.email, { undefinable: true }),
                mobile: new ContactMobile(command.payload.mobile),
                area: new ContactArea(command.payload.area),
                hasConsentEmail: new ContactHasConsentEmail(command.payload.hasConsentEmail, { undefinable: true }),
                hasConsentMobile: new ContactHasConsentMobile(command.payload.hasConsentMobile, { undefinable: true }),
                isActive: new ContactIsActive(command.payload.isActive, { undefinable: true }),
            },
            command.constraint,
            command.cQMetadata,
        )
    }
}