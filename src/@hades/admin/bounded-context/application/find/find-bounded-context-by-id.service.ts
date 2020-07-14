import { Injectable } from '@nestjs/common';
import { IBoundedContextRepository } from './../../domain/bounded-context.repository';
import { AdminBoundedContext } from './../../domain/bounded-context.aggregate';
import { BoundedContextId } from './../../domain/value-objects';

@Injectable()
export class FindBoundedContextByIdService
{
    constructor(
        private readonly repository: IBoundedContextRepository
    ) {}

    public async main(id: BoundedContextId): Promise<AdminBoundedContext>
    {        
        return await this.repository.findById(id);
    }
}