import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { IMessageOverviewRepository } from './../../domain/message-overview.repository';
import { CciMessageOverview } from './../../domain/message-overview.aggregate';
import { MessageOverviewId } from './../../domain/value-objects';

@Injectable()
export class FindMessageOverviewByIdService
{
    constructor(
        private readonly repository: IMessageOverviewRepository,
    ) {}

    public async main(id: MessageOverviewId, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<CciMessageOverview>
    {
        return await this.repository.findById(id, constraint, cQMetadata);
    }
}