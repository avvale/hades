import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ContactResponse } from './../../domain/contact.response';
import { FindContactQuery } from './find-contact.query';
import { FindContactService } from './find-contact.service';

@QueryHandler(FindContactQuery)
export class FindContactQueryHandler implements IQueryHandler<FindContactQuery>
{
    constructor(
        private readonly findContactService: FindContactService
    ) { }

    async execute(query: FindContactQuery): Promise<ContactResponse>
    {
        const contact = await this.findContactService.main(query.queryStatements);

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
                contact.createdAt.value,
                contact.updatedAt.value,
                contact.deletedAt.value,
                
            );
    }
}