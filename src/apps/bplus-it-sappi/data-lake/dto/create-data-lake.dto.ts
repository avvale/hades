import { ApiProperty } from '@nestjs/swagger';

export class CreateDataLakeDto 
{   
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '234ed110-b063-41f2-88b3-b91da0fae3e5'
    })
    id: string;
    
    @ApiProperty({
        type        : Object,
        description : 'data [input here api field description]',
        example     : { "foo" : "bar" }
    })
    data: any;
    
}
