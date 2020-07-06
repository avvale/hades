import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ContactResponse } from './../../domain/contact.response';
import { ContactId } from './../../domain/value-objects';
import { FindContactByIdQuery } from './find-contact-by-id.query';
import { FindContactByIdService } from './find-contact-by-id.service';

@QueryHandler(FindContactByIdQuery)
export class FindContactByIdQueryHandler implements IQueryHandler<FindContactByIdQuery>
{
    constructor(
        private readonly findContactByIdService: FindContactByIdService
    ) { }

    async execute(query: FindContactByIdQuery): Promise<ContactResponse>
    {
        const contact = await this.findContactByIdService.main(new ContactId(query.id));

        return new ContactResponse(
                contact.id.value,
                contact.tenantId.value,
                contact.systemId.value,
                contact.systemName.value,
                contact.roleId.value,
                contact.roleName.value,
                contact.name.value,
                contact.surname.value,
                contact.email.value,
                contact.mobile.value,
                contact.area.value,
                contact.hasConsentEmail.value,
                contact.hasConsentMobile.value,
                contact.isActive.value,
                contact.flowsId.value,
                contact.createdAt.value,
                contact.updatedAt.value,
                contact.deletedAt.value,
                
            );
    }
}