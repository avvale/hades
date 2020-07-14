import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindTagByIdQuery } from '@hades/nfc/tag/application/find/find-tag-by-id.query';
import { NfcTag } from './../../../../graphql';

@Resolver()
export class FindTagByIdResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('nfcFindTagById')
    async main(@Args('id') id: string): Promise<NfcTag>
    {
        return await this.queryBus.ask(new FindTagByIdQuery(id));
    }
}