import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { AdminCreateLangInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { InsertLangsCommand } from '@hades/admin/lang/application/insert/insert-langs.command';

@Resolver()
export class InsertLangsResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('adminInsertLangs')
    async main(@Args('payload') payload: AdminCreateLangInput[])
    {
        await this.commandBus.dispatch(new InsertLangsCommand(payload));
        return true;
    }
}