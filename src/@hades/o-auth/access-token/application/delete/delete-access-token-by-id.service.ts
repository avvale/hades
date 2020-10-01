import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { AccessTokenId } from './../../domain/value-objects';
import { IAccessTokenRepository } from './../../domain/access-token.repository';

@Injectable()
export class DeleteAccessTokenByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IAccessTokenRepository
    ) {}

    public async main(id: AccessTokenId): Promise<void>
    {
        // get object to delete
        const accessToken = await this.repository.findById(id);

        await this.repository.deleteById(id);

        // insert EventBus in object, to be able to apply and commit events
        const accessTokenRegister = this.publisher.mergeObjectContext(accessToken);
        
        accessTokenRegister.deleted(accessToken); // apply event to model events
        accessTokenRegister.commit(); // commit all events of model
    }
}