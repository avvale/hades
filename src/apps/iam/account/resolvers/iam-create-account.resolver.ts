// ignored file
import { Resolver, Args, Mutation, Context } from '@nestjs/graphql';
import { Timezone } from './../../../shared/decorators/timezone.decorator';

// authorization
import { UseGuards } from '@nestjs/common';
import { Permissions } from '@hades/iam/shared/domain/modules/auth/decorators/permissions.decorator';
import { AuthenticationJwtGuard } from '@hades/iam/shared/domain/modules/auth/guards/authentication-jwt.guard';
import { AuthorizationGuard } from '@hades/iam/shared/domain/modules/auth/guards/authorization.guard';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { CreateAccountCommand } from '@hades/iam/account/application/create/create-account.command';
import { FindAccountByIdQuery } from '@hades/iam/account/application/find/find-account-by-id.query';
import { IamAccountType, IamCreateAccountInput } from './../../../../graphql';

// custom
import { JwtService } from '@nestjs/jwt';
import { CreateUserCommand } from '@hades/iam/user/application/create/create-user.command';
import { FindAccessTokenByIdQuery } from '@hades/o-auth/access-token/application/find/find-access-token-by-id.query';
import { FindClientQuery } from '@hades/o-auth/client/application/find/find-client.query';
import { Jwt } from '@hades/shared/domain/lib/hades.types';
import { GetRolesQuery } from '@hades/iam/role/application/get/get-roles.query';
import { Utils as AccountsUtils } from '@hades/iam/account/domain/lib/utils';
import { Utils } from '@hades/shared/domain/lib/utils';

@Resolver()
@Permissions('iam.account.create')
@UseGuards(AuthenticationJwtGuard, AuthorizationGuard)
export class IamCreateAccountResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
        private readonly jwtService: JwtService,
    ) {}

    @Mutation('iamCreateAccount')
    async main(
        @Args('payload') payload: IamCreateAccountInput,
        @Context() context,
        @Timezone() timezone?: string,
    )
    {
        // get token from Headers
        const jwt = <Jwt>this.jwtService.decode(context.req.headers.authorization.replace('Bearer ', ''));

        // get access token from database
        const accessToken = await this.queryBus.ask(new FindAccessTokenByIdQuery(jwt.jit));

        // TODO, como crear una cuenta asociada a otro client??? podría llegar a interesar??
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
            {
                id: payload.id,
                type: payload.type,
                email: payload.email,
                isActive: payload.isActive,
                clientId: accessToken.clientId,
                dApplicationCodes: client.applications.map(application => application.code),
                dPermissions: AccountsUtils.createPermissions(roles),
                data: payload.data,
                roleIds: payload.roleIds,
                tenantIds: payload.tenantIds,
            }
        ));

        if (payload.type === IamAccountType.USER)
        {
            await this.commandBus.dispatch(new CreateUserCommand(
                {
                    id: Utils.uuid(),
                    accountId: payload.id,
                    name: payload.user.name,
                    surname: payload.user.surname,
                    avatar: payload.user.avatar,
                    mobile: payload.user.mobile,
                    langId: payload.user.langId,
                    username: payload.user.username,
                    password: payload.user.password,
                    rememberToken: payload.user.rememberToken,
                    data: payload.user.data,
                }, { timezone }
            ));
        }

        return await this.queryBus.ask(new FindAccountByIdQuery(payload.id, {}, { timezone }));
    }
}