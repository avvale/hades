import { ApiProperty } from '@nestjs/swagger';

export class CreateSystemSnapshotObjectDto 
{   
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'q'
    })
    name: string;
}
