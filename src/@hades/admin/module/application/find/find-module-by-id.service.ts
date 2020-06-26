import { Injectable } from '@nestjs/common';
import { IModuleRepository } from './../../domain/module.repository';
import { AdminModule } from './../../domain/module.entity';
import { ModuleId } from './../../domain/value-objects';

@Injectable()
export class FindModuleByIdService
{
    constructor(
        private readonly repository: IModuleRepository
    ) {}

    public async main(id: ModuleId): Promise<AdminModule>
    {        
        return await this.repository.findById(id);
    }
}