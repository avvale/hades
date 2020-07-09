import { Injectable } from '@nestjs/common';
import { IActionRepository } from './../../domain/action.repository';
import { NfcAction } from './../../domain/action.aggregate';
import { ActionId } from './../../domain/value-objects';

@Injectable()
export class FindActionByIdService
{
    constructor(
        private readonly repository: IActionRepository
    ) {}

    public async main(id: ActionId): Promise<NfcAction>
    {        
        return await this.repository.findById(id);
    }
}