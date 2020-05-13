import { Resolver, Args, Mutation, ResolveField, Parent, Int } from '@nestjs/graphql';
import { AdminLangInput } from '../../../../graphql';

// @hades
import { ICommandBus } from '../../../../@hades/shared/domain/bus/command-bus.service';
import { CreateLangCommand } from '../../../../@hades/admin/lang/application/create/create-lang.command';

@Resolver()
export class AdminCreateLangResolver
{
    constructor(
        private readonly commandBus: ICommandBus
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
    }
}