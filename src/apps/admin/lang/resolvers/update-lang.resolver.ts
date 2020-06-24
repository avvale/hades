import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { AdminUpdateLangInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus.service';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { UpdateLangCommand } from '@hades/admin/lang/application/update/update-lang.command';
import { FindLangByIdQuery } from '@hades/admin/lang/application/find/find-lang-by-id.query';

@Resolver()
export class UpdateLangResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('adminUpdateLang')
    async main(@Args('payload') payload: AdminUpdateLangInput)
    {
        await this.commandBus.dispatch(new UpdateLangCommand(
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