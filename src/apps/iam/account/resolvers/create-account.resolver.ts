import { Resolver, Args, Mutation, Context } from '@nestjs/graphql';
import { IamAccountType, IamCreateAccountInput } from './../../../../graphql';
import { JwtService } from '@nestjs/jwt';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { CreateAccountCommand } from '@hades/iam/account/application/create/create-account.command';
import { CreateUserCommand } from '@hades/iam/user/application/create/create-user.command';
import { FindAccountByIdQuery } from '@hades/iam/account/application/find/find-account-by-id.query';
import { FindAccessTokenByIdQuery } from '@hades/o-auth/access-token/application/find/find-access-token-by-id.query';
import { FindClientQuery } from '@hades/o-auth/client/application/find/find-client.query';
import { Jwt } from '@hades/shared/domain/lib/hades.types';
import { GetRolesQuery } from '@hades/iam/role/application/get/get-roles.query';
import { Utils as AccountsUtils } from '@hades/iam/account/domain/lib/utils';
import { Utils } from '@hades/shared/domain/lib/utils';

@Resolver()
export class CreateAccountResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
        private readonly jwtService: JwtService
    ) {}

    @Mutation('iamCreateAccount')
    async main(@Args('payload') payload: IamCreateAccountInput, @Context() context)
    {
        // get token from Headers
        const jwt = <Jwt>this.jwtService.decode(context.req.headers.authorization.replace('Bearer ', ''));

        // get access token from database
        const accessToken = await this.queryBus.ask(new FindAccessTokenByIdQuery(jwt.jit));

        // get client to get applications related
        const client = await this.queryBus.ask(new FindClientQuery({
                where: {
                    id: accessToken.clientId
                },
                include: ['applications']
            }));

        const roles = await this.queryBus.ask(new GetRolesQuery({ 
                where: {
                    id: payload.roleIds
                },
                include: ['permissions']
            }));

        await this.commandBus.dispatch(new CreateAccountCommand(
            payload.id,
            payload.type,
            payload.email,
            payload.isActive,
            accessToken.clientId,
            client.applications.map(application => application.code),
            AccountsUtils.createPermissions(roles),
            payload.data,
            payload.roleIds,
            payload.tenantIds,
            
        ));

        if (payload.type === IamAccountType.USER)
        {
            await this.commandBus.dispatch(new CreateUserCommand(
                Utils.uuid(),
                payload.id,
                payload.user.name,
                payload.user.surname,
                payload.user.avatar,
                payload.user.mobile,
                payload.user.langId,
                payload.user.username,
                payload.user.password,
                payload.user.rememberToken,
                payload.user.data,
            ));
            
        }
        
        return await this.queryBus.ask(new FindAccountByIdQuery(payload.id));
    }
}