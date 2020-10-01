import { Injectable } from '@nestjs/common';
import { IModuleRepository } from './../../domain/module.repository';
import { CciModule } from './../../domain/module.aggregate';
import { ModuleId } from './../../domain/value-objects';

@Injectable()
export class FindModuleByIdService
{
    constructor(
        private readonly repository: IModuleRepository
    ) {}

    public async main(id: ModuleId): Promise<CciModule>
    {        
        return await this.repository.findById(id);
    }
}