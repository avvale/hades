import { ApiProperty } from '@nestjs/swagger';

export class CreateSystemSnapshotDto 
{   
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'q'
    })
    name: string;
}
