import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { CciCreateContactInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { CreateContactCommand } from '@hades/cci/contact/application/create/create-contact.command';
import { FindContactByIdQuery } from '@hades/cci/contact/application/find/find-contact-by-id.query';

@Resolver()
export class CreateContactResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('cciCreateContact')
    async main(@Args('payload') payload: CciCreateContactInput)
    {
        await this.commandBus.dispatch(new CreateContactCommand(
            payload.id,
            payload.tenantId,
            payload.tenantCode,
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