import { Injectable } from '@nestjs/common';
import { IApplicationRepository } from './../../domain/application.repository';
import { OAuthApplication } from './../../domain/application.aggregate';
import { ApplicationId } from './../../domain/value-objects';

@Injectable()
export class FindApplicationByIdService
{
    constructor(
        private readonly repository: IApplicationRepository
    ) {}

    public async main(id: ApplicationId): Promise<OAuthApplication>
    {        
        return await this.repository.findById(id);
    }
}