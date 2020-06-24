import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { AdminCreateLangInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus.service';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { CreateLangCommand } from '@hades/admin/lang/application/create/create-lang.command';
import { FindLangByIdQuery } from '@hades/admin/lang/application/find/find-lang-by-id.query';

@Resolver()
export class CreateLangResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('adminCreateLang')
    async main(@Args('payload') payload: AdminCreateLangInput)
    {
        await this.commandBus.dispatch(new CreateLangCommand(
            payload.id,
            payload.name,
            payload.image,
            payload.iso6392,
            payload.iso6393,
            payload.ietf,
            payload.sort,
            payload.isActive,
            
        ));
        
        return await this.queryBus.ask(new FindLangByIdQuery(payload.id));
    }
}