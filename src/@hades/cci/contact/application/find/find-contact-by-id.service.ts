import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { IContactRepository } from './../../domain/contact.repository';
import { CciContact } from './../../domain/contact.aggregate';
import { ContactId } from './../../domain/value-objects';

@Injectable()
export class FindContactByIdService
{
    constructor(
        private readonly repository: IContactRepository,
    ) {}

    public async main(id: ContactId, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<CciContact>
    {
        return await this.repository.findById(id, constraint, cQMetadata);
    }
}