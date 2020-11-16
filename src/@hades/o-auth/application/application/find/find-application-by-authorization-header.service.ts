import { BadRequestException, Injectable } from '@nestjs/common';
import { IApplicationRepository } from './../../domain/application.repository';
import { OAuthApplication } from './../../domain/application.aggregate';
import { ApplicationAuthorizationHeader } from './../../domain/value-objects/application-authorization-header';

@Injectable()
export class FindApplicationByAuthorizationHeaderService
{
    constructor(
        private readonly repository: IApplicationRepository
    ) {}

    public async main(authorizationHeader: ApplicationAuthorizationHeader): Promise<OAuthApplication>
    {
        if (!authorizationHeader.value.startsWith('Basic ')) throw new BadRequestException(`Authorization header has not a valid value, current value is: ${authorizationHeader.value}`);

        // get code from basic authorization header encrypted in base64
        const [basic, encode] = authorizationHeader.value.split(' ');

        // decrypt code from base64 to string
        const decode = Buffer.from(encode, 'base64').toString();

        // check that code only have one :
        if ((decode.match(/:/g) || []).length !== 1) throw new BadRequestException(`Authorization header has not a valid value, current decode value is: ${decode}`);

        // separate code from secret
        const [code, secret] = decode.split(':');

        // get application with clients associated
        return await this.repository.find({
            where: {
                code: code,
                secret: secret
            },
            include: ['clients']
        });
    }
}