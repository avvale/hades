import { Injectable } from '@nestjs/common';
import { IDataLakeRepository } from './../../domain/data-lake.repository';
import { CciDataLake } from './../../domain/data-lake.aggregate';
import { DataLakeId } from './../../domain/value-objects';

@Injectable()
export class FindDataLakeByIdService
{
    constructor(
        private readonly repository: IDataLakeRepository
    ) {}

    public async main(id: DataLakeId): Promise<CciDataLake>
    {        
        return await this.repository.findById(id);
    }
}