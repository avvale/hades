import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { AdminCreateModuleInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus.service';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { InsertModulesCommand } from '@hades/admin/module/application/insert/insert-modules.command';

@Resolver()
export class InsertModulesResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('adminInsertModules')
    async main(@Args('payload') payload: AdminCreateModuleInput[])
    {
        await this.commandBus.dispatch(new InsertModulesCommand(payload));
        return true;
    }
}