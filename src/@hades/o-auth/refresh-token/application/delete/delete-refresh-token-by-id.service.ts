import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { RefreshTokenId } from './../../domain/value-objects';
import { IRefreshTokenRepository } from './../../domain/refresh-token.repository';

@Injectable()
export class DeleteRefreshTokenByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IRefreshTokenRepository,
    ) {}

    public async main(id: RefreshTokenId, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>
    {
        // get object to delete
        const refreshToken = await this.repository.findById(id, constraint, cQMetadata);

        await this.repository.deleteById(id, constraint, cQMetadata);

        // insert EventBus in object, to be able to apply and commit events
        const refreshTokenRegister = this.publisher.mergeObjectContext(refreshToken);

        refreshTokenRegister.deleted(refreshToken); // apply event to model events
        refreshTokenRegister.commit(); // commit all events of model
    }
}