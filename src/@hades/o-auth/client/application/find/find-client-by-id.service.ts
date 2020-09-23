import { Injectable } from '@nestjs/common';
import { IClientRepository } from './../../domain/client.repository';
import { OAuthClient } from './../../domain/client.aggregate';
import { ClientId } from './../../domain/value-objects';

@Injectable()
export class FindClientByIdService
{
    constructor(
        private readonly repository: IClientRepository
    ) {}

    public async main(id: ClientId): Promise<OAuthClient>
    {        
        return await this.repository.findById(id);
    }
}