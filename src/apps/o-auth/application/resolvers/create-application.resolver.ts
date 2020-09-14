import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { OAuthCreateApplicationInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { CreateApplicationCommand } from '@hades/o-auth/application/application/create/create-application.command';
import { FindApplicationByIdQuery } from '@hades/o-auth/application/application/find/find-application-by-id.query';

@Resolver()
export class CreateApplicationResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('oAuthCreateApplication')
    async main(@Args('payload') payload: OAuthCreateApplicationInput)
    {
        await this.commandBus.dispatch(new CreateApplicationCommand(
            payload.id,
            payload.name,
            payload.code,
            payload.secret,
            payload.isMaster,
            
        ));
        
        return await this.queryBus.ask(new FindApplicationByIdQuery(payload.id));
    }
}