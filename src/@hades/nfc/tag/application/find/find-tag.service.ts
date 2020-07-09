import { Injectable } from '@nestjs/common';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { ITagRepository } from './../../domain/tag.repository';
import { NfcTag } from './../../domain/tag.aggregate';

@Injectable()
export class FindTagService
{
    constructor(
        private readonly repository: ITagRepository
    ) {}

    public async main(queryStatements: QueryStatementInput[]): Promise<NfcTag>
    {        
        return await this.repository.find(queryStatements);
    }
}