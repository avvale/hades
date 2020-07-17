import { ApiProperty } from '@nestjs/swagger';

export class CreateDataLakeDto 
{   
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '38079f4c-5b05-4836-94fe-0db6e01d388b'
    })
    id: string;
    
    @ApiProperty({
        type        : Object,
        description : 'data [input here api field description]',
        example     : { "foo" : "bar" }
    })
    data: any;
    
}
