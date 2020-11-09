import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { IClientRepository } from './../../domain/client.repository';
import { OAuthClient } from './../../domain/client.aggregate';
import { ClientId } from './../../domain/value-objects';

@Injectable()
export class FindClientByIdService
{
    constructor(
        private readonly repository: IClientRepository,
    ) {}

    public async main(id: ClientId, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<OAuthClient>
    {
        return await this.repository.findById(id, constraint, cQMetadata);
    }
}