import { Injectable } from '@nestjs/common';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { IActionRepository } from './../../domain/action.repository';
import { NfcAction } from './../../domain/action.aggregate';

@Injectable()
export class GetActionsService
{
    constructor(
        private readonly repository: IActionRepository
    ) {}

    public async main(queryStatements: QueryStatementInput[]): Promise<NfcAction[]>
    {        
        return await this.repository.get(queryStatements);
    }
}