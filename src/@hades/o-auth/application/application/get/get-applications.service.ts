import { Injectable } from '@nestjs/common';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { IApplicationRepository } from './../../domain/application.repository';
import { OAuthApplication } from './../../domain/application.aggregate';

@Injectable()
export class GetApplicationsService
{
    constructor(
        private readonly repository: IApplicationRepository
    ) {}

    public async main(queryStatements: QueryStatementInput[]): Promise<OAuthApplication[]>
    {        
        return await this.repository.get(queryStatements);
    }
}