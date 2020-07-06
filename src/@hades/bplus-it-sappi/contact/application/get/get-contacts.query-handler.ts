import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ContactResponse } from './../../domain/contact.response';
import { GetContactsQuery } from './get-contacts.query';
import { GetContactsService } from './get-contacts.service';

@QueryHandler(GetContactsQuery)
export class GetContactsQueryHandler implements IQueryHandler<GetContactsQuery>
{
    constructor(
        private readonly getContactsService: GetContactsService
    ) { }

    async execute(query: GetContactsQuery): Promise<ContactResponse[]>
    {
        return (await this.getContactsService.main(query.queryStatements)).map(contact => new ContactResponse(
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
                
            ));
    }
}