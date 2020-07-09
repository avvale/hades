import { Injectable } from '@nestjs/common';
import { ISessionRepository } from './../../domain/session.repository';
import { NfcSession } from './../../domain/session.aggregate';
import { SessionId } from './../../domain/value-objects';

@Injectable()
export class FindSessionByIdService
{
    constructor(
        private readonly repository: ISessionRepository
    ) {}

    public async main(id: SessionId): Promise<NfcSession>
    {        
        return await this.repository.findById(id);
    }
}