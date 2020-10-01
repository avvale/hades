import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindContactByIdQuery } from '@hades/cci/contact/application/find/find-contact-by-id.query';
import { CciContact } from './../../../../graphql';

@Resolver()
export class FindContactByIdResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('cciFindContactById')
    async main(@Args('id') id: string): Promise<CciContact>
    {
        return await this.queryBus.ask(new FindContactByIdQuery(id));
    }
}