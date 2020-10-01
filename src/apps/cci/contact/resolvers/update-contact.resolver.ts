import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { CciUpdateContactInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { UpdateContactCommand } from '@hades/cci/contact/application/update/update-contact.command';
import { FindContactByIdQuery } from '@hades/cci/contact/application/find/find-contact-by-id.query';

@Resolver()
export class UpdateContactResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('cciUpdateContact')
    async main(@Args('payload') payload: CciUpdateContactInput)
    {
        await this.commandBus.dispatch(new UpdateContactCommand(
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