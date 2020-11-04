import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ContactResponse } from './../../domain/contact.response';
import { ContactMapper } from './../../domain/contact.mapper';
import { ContactId } from './../../domain/value-objects';
import { FindContactByIdQuery } from './find-contact-by-id.query';
import { FindContactByIdService } from './find-contact-by-id.service';

@QueryHandler(FindContactByIdQuery)
export class FindContactByIdQueryHandler implements IQueryHandler<FindContactByIdQuery>
{
    private readonly mapper: ContactMapper = new ContactMapper();

    constructor(
        private readonly findContactByIdService: FindContactByIdService,
    ) {}

    async execute(query: FindContactByIdQuery): Promise<ContactResponse>
    {
        const contact = await this.findContactByIdService.main(
            new ContactId(query.id),
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(contact);
    }
}