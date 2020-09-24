import { Resolver, Args, Mutation, Context } from '@nestjs/graphql';
import { OAuthCreateCredentialInput } from '../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { CreateCredentialCommand } from '@hades/o-auth/credential/application/create/create-credential.command';
import { FindApplicationByAuthorizationHeaderQuery } from '@hades/o-auth/application/application/find/find-application-by-authorization-header.query';

@Resolver()
export class CreateCredentialResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('oAuthCreateCredential')
    async main(@Args('payload') payload: OAuthCreateCredentialInput, @Context() context)
    {
        // consulto las cuentas para obtener el usuario bajo user y password
        
        // get application and clients with header authorization basic authentication
        const application = await this.queryBus.ask(new FindApplicationByAuthorizationHeaderQuery(context.req.headers.authorization))

        // compruebo que el usuario tiene un client para esta aplicación


        // si está todo correcto creo una credencial 

        await this.commandBus.dispatch(new CreateCredentialCommand(
            payload.grantType,
            payload.username,
            payload.password,
            // payload.clientIds,
            payload.accessTokenId,
            payload.refreshToken,
            payload.clientSecret,
            payload.redirect
        ));
        return true;
    }
}