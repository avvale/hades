import { Injectable } from '@nestjs/common';
import { IMessageOverviewRepository } from './../../domain/message-overview.repository';
import { CciMessageOverview } from './../../domain/message-overview.aggregate';
import { MessageOverviewId } from './../../domain/value-objects';

@Injectable()
export class FindMessageOverviewByIdService
{
    constructor(
        private readonly repository: IMessageOverviewRepository
    ) {}

    public async main(id: MessageOverviewId): Promise<CciMessageOverview>
    {        
        return await this.repository.findById(id);
    }
}