import { Resolver, Args, Mutation, ResolveField, Parent, Int } from '@nestjs/graphql';
import { AdminLangInput } from '../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus.service';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { CreateLangCommand } from '@hades/admin/lang/application/create/create-lang.command';
import { FindLangQuery } from '@hades/admin/lang/application/find/find-lang.query';

@Resolver()
export class CreateLangResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('adminCreateLang')
    async main(@Args('payload') payload: AdminLangInput)
    {
        this.commandBus.dispatch(new CreateLangCommand(
            payload.id, 
            payload.name,
            payload.image,
            payload.iso6392,
            payload.iso6393,
            payload.ietf,
            payload.sort,
            payload.isActive
        ));

        return await this.queryBus.ask(new FindLangQuery());
    }
}