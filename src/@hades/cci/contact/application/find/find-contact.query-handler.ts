import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ContactResponse } from './../../domain/contact.response';
import { ContactMapper } from './../../domain/contact.mapper';
import { FindContactQuery } from './find-contact.query';
import { FindContactService } from './find-contact.service';

@QueryHandler(FindContactQuery)
export class FindContactQueryHandler implements IQueryHandler<FindContactQuery>
{
    private readonly mapper: ContactMapper = new ContactMapper();

    constructor(
        private readonly findContactService: FindContactService,
    ) {}

    async execute(query: FindContactQuery): Promise<ContactResponse>
    {
        const contact = await this.findContactService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(contact);
    }
}