import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { FindContactByIdQuery } from '@hades/bplus-it-sappi/contact/application/find/find-contact-by-id.query';
import { BplusItSappiContact } from './../../../../graphql';

@Resolver()
export class FindContactByIdResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('bplusItSappiFindContactById')
    async main(@Args('id') id: string): Promise<BplusItSappiContact>
    {
        return await this.queryBus.ask(new FindContactByIdQuery(id));
    }
}