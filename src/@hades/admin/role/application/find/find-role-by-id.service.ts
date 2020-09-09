import { Injectable } from '@nestjs/common';
import { IRoleRepository } from './../../domain/role.repository';
import { AdminRole } from './../../domain/role.aggregate';
import { RoleId } from './../../domain/value-objects';

@Injectable()
export class FindRoleByIdService
{
    constructor(
        private readonly repository: IRoleRepository
    ) {}

    public async main(id: RoleId): Promise<AdminRole>
    {        
        return await this.repository.findById(id);
    }
}