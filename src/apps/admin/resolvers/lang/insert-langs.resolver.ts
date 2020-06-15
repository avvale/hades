import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { AdminCreateLangInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus.service';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { InsertLangsCommand } from '@hades/admin/lang/application/insert/insert-langs.command';
import { FindLangByIdQuery } from '@hades/admin/lang/application/find/find-lang-by-id.query';

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
        
        // TODO crear consulta para obtener todos las entidades de ids recien enviados
        // return await this.queryBus.ask(new FindLangByIdQuery(payload.id));
        return [];
    }
}