import { Injectable } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';

// @hades
import { Utils } from '@hades/shared/domain/lib/utils';
import { Jwt } from '@hades/shared/domain/lib/hades.types';
import { accounts } from "@hades/iam/account/infrastructure/seeds/account.seed";

@Injectable()
export class TestingJwtService
{
    constructor(
        private readonly jwtService: JwtService,
    ) {}

    getJwt(): string
    {
        const accessTokenPayload: Jwt = {
            jit: '859b3f64-6c8e-40c5-949d-5eabb501443e',
            aci: accounts[0].id,
            iss: 'Hades Testing OAuth',
            iat: parseInt(Utils.now().format('X')),
            nbf: parseInt(Utils.now().format('X')),
            exp: parseInt(Utils.now().add(600, 'seconds').format('X'))
        };

        return this.jwtService.sign(accessTokenPayload);
    }
}