import { Injectable } from '@nestjs/common';
import { IRoleRepository } from './../../domain/role.repository';
import { IamRole } from './../../domain/role.aggregate';
import { RoleId } from './../../domain/value-objects';

@Injectable()
export class FindRoleByIdService
{
    constructor(
        private readonly repository: IRoleRepository
    ) {}

    public async main(id: RoleId): Promise<IamRole>
    {
        return await this.repository.findById(id);
    }
}