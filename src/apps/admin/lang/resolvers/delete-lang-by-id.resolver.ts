import { Resolver, Args, Mutation } from '@nestjs/graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindLangByIdQuery } from '@hades/admin/lang/application/find/find-lang-by-id.query';
import { DeleteLangByIdCommand } from '@hades/admin/lang/application/delete/delete-lang-by-id.command';

@Resolver()
export class DeleteLangByIdResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('adminDeleteLangById')
    async main(@Args('id') id: string)
    {
        const lang = await this.queryBus.ask(new FindLangByIdQuery(id));

        await this.commandBus.dispatch(new DeleteLangByIdCommand(id));

        return lang;
    }
}