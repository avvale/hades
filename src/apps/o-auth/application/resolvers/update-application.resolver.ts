import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { OAuthUpdateApplicationInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { UpdateApplicationCommand } from '@hades/o-auth/application/application/update/update-application.command';
import { FindApplicationByIdQuery } from '@hades/o-auth/application/application/find/find-application-by-id.query';

@Resolver()
export class UpdateApplicationResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('oAuthUpdateApplication')
    async main(@Args('payload') payload: OAuthUpdateApplicationInput)
    {
        await this.commandBus.dispatch(new UpdateApplicationCommand(
            payload.id,
            payload.name,
            payload.code,
            payload.secret,
            payload.isMaster,
            
        ));
        
        return await this.queryBus.ask(new FindApplicationByIdQuery(payload.id));
    }
}