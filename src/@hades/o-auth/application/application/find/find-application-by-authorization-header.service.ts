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
        
        const [basic, encode] = authorizationHeader.value.split(' ');
        
        const decode = Buffer.from(encode, 'base64').toString();
        
        if ((decode.match(/:/g) || []).length !== 1) throw new BadRequestException(`Authorization header has not a valid value, current decode value is: ${decode}`);

        const [code, secret] = decode.split(':')

        return await this.repository.find({ 
            where: { 
                code: code,
                secret: secret
            },
            include: ['clients']
        });
    }
}