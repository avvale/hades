import { Injectable } from '@nestjs/common';
import { IUserRepository } from './../../domain/user.repository';
import { IamUser } from './../../domain/user.aggregate';
import { UserId } from './../../domain/value-objects';

@Injectable()
export class FindUserByIdService
{
    constructor(
        private readonly repository: IUserRepository
    ) {}

    public async main(id: UserId): Promise<IamUser>
    {        
        return await this.repository.findById(id);
    }
}