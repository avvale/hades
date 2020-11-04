import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { ISystemRepository } from './../../domain/system.repository';
import { CciSystem } from './../../domain/system.aggregate';

@Injectable()
export class FindSystemService
{
    constructor(
        private readonly repository: ISystemRepository,
    ) {}

    public async main(queryStatement?: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<CciSystem>
    {
        return await this.repository.find(queryStatement, constraint, cQMetadata);
    }
}