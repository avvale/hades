import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { BplusItSappiCreateContactInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus.service';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { CreateContactCommand } from '@hades/bplus-it-sappi/contact/application/create/create-contact.command';
import { FindContactByIdQuery } from '@hades/bplus-it-sappi/contact/application/find/find-contact-by-id.query';

@Resolver()
export class CreateContactResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('bplusItSappiCreateContact')
    async main(@Args('payload') payload: BplusItSappiCreateContactInput)
    {
        await this.commandBus.dispatch(new CreateContactCommand(
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
            payload.flowsId,
            
        ));
        
        return await this.queryBus.ask(new FindContactByIdQuery(payload.id));
    }
}