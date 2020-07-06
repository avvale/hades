import { Injectable } from '@nestjs/common';
import { IContactRepository } from './../../domain/contact.repository';
import { BplusItSappiContact } from './../../domain/contact.aggregate';
import { ContactId } from './../../domain/value-objects';

@Injectable()
export class FindContactByIdService
{
    constructor(
        private readonly repository: IContactRepository
    ) {}

    public async main(id: ContactId): Promise<BplusItSappiContact>
    {        
        return await this.repository.findById(id);
    }
}