import { Injectable } from '@nestjs/common';
import { IResourceRepository } from './../../domain/resource.repository';
import { AdminResource } from './../../domain/resource.aggregate';
import { ResourceId } from './../../domain/value-objects';

@Injectable()
export class FindResourceByIdService
{
    constructor(
        private readonly repository: IResourceRepository
    ) {}

    public async main(id: ResourceId): Promise<AdminResource>
    {        
        return await this.repository.findById(id);
    }
}