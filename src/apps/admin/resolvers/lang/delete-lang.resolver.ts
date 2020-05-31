import { Resolver, Args, Mutation } from '@nestjs/graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus.service';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { FindLangByIdQuery } from '@hades/admin/lang/application/find/find-lang-by-id.query';
import { DeleteLangCommand } from '@hades/admin/lang/application/delete/delete-lang.command';

@Resolver()
export class DeleteLangResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('adminDeleteLang')
    async main(@Args('id') id: string)
    {
        const lang = await this.queryBus.ask(new FindLangByIdQuery(id));

        await this.commandBus.dispatch(new DeleteLangCommand(id));

        return lang;
    }
}