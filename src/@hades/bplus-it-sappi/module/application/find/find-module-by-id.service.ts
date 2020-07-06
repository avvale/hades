import { Injectable } from '@nestjs/common';
import { IModuleRepository } from './../../domain/module.repository';
import { BplusItSappiModule } from './../../domain/module.aggregate';
import { ModuleId } from './../../domain/value-objects';

@Injectable()
export class FindModuleByIdService
{
    constructor(
        private readonly repository: IModuleRepository
    ) {}

    public async main(id: ModuleId): Promise<BplusItSappiModule>
    {        
        return await this.repository.findById(id);
    }
}