import { Injectable } from '@nestjs/common';
import { ISystemRepository } from './../../domain/system.repository';
import { BplusItSappiSystem } from './../../domain/system.aggregate';
import { SystemId } from './../../domain/value-objects';

@Injectable()
export class FindSystemByIdService
{
    constructor(
        private readonly repository: ISystemRepository
    ) {}

    public async main(id: SystemId): Promise<BplusItSappiSystem>
    {        
        return await this.repository.findById(id);
    }
}