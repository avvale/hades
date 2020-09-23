import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { OAuthCreateApplicationInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { CreateApplicationsCommand } from '@hades/o-auth/application/application/create/create-applications.command';

@Resolver()
export class CreateApplicationsResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('oAuthCreateApplications')
    async main(@Args('payload') payload: OAuthCreateApplicationInput[])
    {
        await this.commandBus.dispatch(new CreateApplicationsCommand(payload));
        return true;
    }
}