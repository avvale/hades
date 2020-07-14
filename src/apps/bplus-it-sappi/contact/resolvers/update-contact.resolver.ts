import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { BplusItSappiUpdateContactInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { UpdateContactCommand } from '@hades/bplus-it-sappi/contact/application/update/update-contact.command';
import { FindContactByIdQuery } from '@hades/bplus-it-sappi/contact/application/find/find-contact-by-id.query';

@Resolver()
export class UpdateContactResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('bplusItSappiUpdateContact')
    async main(@Args('payload') payload: BplusItSappiUpdateContactInput)
    {
        await this.commandBus.dispatch(new UpdateContactCommand(
            payload.id,
            payload.tenantId,
            payload.systemId,
            payload.systemName,
            payload.roleId,
            payload.roleName,
            payload.name,
            payload.surname,
            payload.email,
            payload.mobile,
            payload.area,
            payload.hasConsentEmail,
            payload.hasConsentMobile,
            payload.isActive,
            
        ));
        
        return await this.queryBus.ask(new FindContactByIdQuery(payload.id));
    }
}