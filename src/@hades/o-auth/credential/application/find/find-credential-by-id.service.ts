import { Injectable } from '@nestjs/common';
import { OAuthCredential } from './../../domain/credential.aggregate';

@Injectable()
export class FindCredentialByIdService
{
    constructor(
       // private readonly repository: ICredentialRepository
    ) {}

    public async main(id: string) // CredentialId): Promise<OAuthCredential>
    {        
        // return await this.repository.findById(id);
    }
}