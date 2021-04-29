import { Injectable } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';

// @hades
import { Utils } from '@hades/shared/domain/lib/utils';
import { Jwt } from '@hades/shared/domain/lib/hades.types';
import { accounts } from "@hades/iam/account/infrastructure/seeds/account.seed";
import { accessTokens } from "@hades/o-auth/access-token/infrastructure/seeds/access-token.seed";

@Injectable()
export class TestingJwtService
{
    constructor(
        private readonly jwtService: JwtService,
    ) {}

    getJwt(): string
    {
        const accessTokenPayload: Jwt = {
            jit: accessTokens[0].id,
            aci: accounts[0].id,
            iss: 'Hades Testing OAuth',
            iat: parseInt(Utils.now().format('X')),
            nbf: parseInt(Utils.now().format('X')),
            exp: parseInt(Utils.now().add(600, 'seconds').format('X'))
        };

        return this.jwtService.sign(accessTokenPayload);
    }
}