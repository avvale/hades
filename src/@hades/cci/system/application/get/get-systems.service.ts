import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { ISystemRepository } from './../../domain/system.repository';
import { CciSystem } from './../../domain/system.aggregate';

@Injectable()
export class GetSystemsService
{
    constructor(
        private readonly repository: ISystemRepository
    ) {}

    public async main(queryStatement?: QueryStatement): Promise<CciSystem[]>
    {        
        return await this.repository.get(queryStatement);
    }
}