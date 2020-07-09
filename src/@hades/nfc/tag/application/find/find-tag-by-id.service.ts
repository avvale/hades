import { Injectable } from '@nestjs/common';
import { ITagRepository } from './../../domain/tag.repository';
import { NfcTag } from './../../domain/tag.aggregate';
import { TagId } from './../../domain/value-objects';

@Injectable()
export class FindTagByIdService
{
    constructor(
        private readonly repository: ITagRepository
    ) {}

    public async main(id: TagId): Promise<NfcTag>
    {        
        return await this.repository.findById(id);
    }
}