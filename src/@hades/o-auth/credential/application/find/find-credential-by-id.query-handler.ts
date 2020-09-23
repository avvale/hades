import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CredentialResponse } from './../../domain/credential.response';
import { CredentialMapper } from './../../domain/credential.mapper';
import { FindCredentialByIdQuery } from './find-credential-by-id.query';
import { FindCredentialByIdService } from './find-credential-by-id.service';

@QueryHandler(FindCredentialByIdQuery)
export class FindCredentialByIdQueryHandler implements IQueryHandler<FindCredentialByIdQuery>
{
    private readonly mapper: CredentialMapper = new CredentialMapper();

    constructor(
        private readonly findCredentialByIdService: FindCredentialByIdService
    ) { }

    async execute(query: FindCredentialByIdQuery): Promise<CredentialResponse>
    {
        // const credential = await this.findCredentialByIdService.main(new CredentialId(query.id));

        return // this.mapper.mapAggregateToResponse(credential);
    }
}