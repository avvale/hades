import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { IApplicationRepository } from './../../domain/application.repository';
import { OAuthApplication } from './../../domain/application.aggregate';
import { ApplicationId } from './../../domain/value-objects';

@Injectable()
export class FindApplicationByIdService
{
    constructor(
        private readonly repository: IApplicationRepository,
    ) {}

    public async main(id: ApplicationId, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<OAuthApplication>
    {
        return await this.repository.findById(id, constraint, cQMetadata);
    }
}