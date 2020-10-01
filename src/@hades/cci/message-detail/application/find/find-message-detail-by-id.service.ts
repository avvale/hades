import { Injectable } from '@nestjs/common';
import { IMessageDetailRepository } from './../../domain/message-detail.repository';
import { CciMessageDetail } from './../../domain/message-detail.aggregate';
import { MessageDetailId } from './../../domain/value-objects';

@Injectable()
export class FindMessageDetailByIdService
{
    constructor(
        private readonly repository: IMessageDetailRepository
    ) {}

    public async main(id: MessageDetailId): Promise<CciMessageDetail>
    {        
        return await this.repository.findById(id);
    }
}