import { Resolver, Args, Mutation } from '@nestjs/graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindApplicationByIdQuery } from '@hades/o-auth/application/application/find/find-application-by-id.query';
import { DeleteApplicationByIdCommand } from '@hades/o-auth/application/application/delete/delete-application-by-id.command';

@Resolver()
export class DeleteApplicationByIdResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('oAuthDeleteApplicationById')
    async main(@Args('id') id: string)
    {
        const application = await this.queryBus.ask(new FindApplicationByIdQuery(id));

        await this.commandBus.dispatch(new DeleteApplicationByIdCommand(id));

        return application;
    }
}