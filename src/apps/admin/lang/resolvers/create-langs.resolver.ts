import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { AdminCreateLangInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { CreateLangsCommand } from '@hades/admin/lang/application/create/create-langs.command';

@Resolver()
export class CreateLangsResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('adminCreateLangs')
    async main(@Args('payload') payload: AdminCreateLangInput[])
    {
        await this.commandBus.dispatch(new CreateLangsCommand(payload));
        return true;
    }
}