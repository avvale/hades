import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ContactResponse } from './../../domain/contact.response';
import { ContactMapper } from './../../domain/contact.mapper';
import { GetContactsQuery } from './get-contacts.query';
import { GetContactsService } from './get-contacts.service';

@QueryHandler(GetContactsQuery)
export class GetContactsQueryHandler implements IQueryHandler<GetContactsQuery>
{
    private readonly mapper: ContactMapper = new ContactMapper();

    constructor(
        private readonly getContactsService: GetContactsService
    ) { }

    async execute(query: GetContactsQuery): Promise<ContactResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.getContactsService.main(query.queryStatement));
    }
}