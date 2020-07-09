import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { FindActionByIdQuery } from '@hades/nfc/action/application/find/find-action-by-id.query';
import { NfcAction } from './../../../../graphql';

@Resolver()
export class FindActionByIdResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('nfcFindActionById')
    async main(@Args('id') id: string): Promise<NfcAction>
    {
        return await this.queryBus.ask(new FindActionByIdQuery(id));
    }
}