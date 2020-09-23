import { Injectable } from '@nestjs/common';
import { IPermissionRepository } from './../../domain/permission.repository';
import { IamPermission } from './../../domain/permission.aggregate';
import { PermissionId } from './../../domain/value-objects';

@Injectable()
export class FindPermissionByIdService
{
    constructor(
        private readonly repository: IPermissionRepository
    ) {}

    public async main(id: PermissionId): Promise<IamPermission>
    {        
        return await this.repository.findById(id);
    }
}