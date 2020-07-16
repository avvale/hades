import { ApiProperty } from '@nestjs/swagger';

export class UpdateDataLakeDto 
{   
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '2dbc6726-4e3a-40f7-84a1-4b5334d35fb1'
    })
    id: string;
    
    @ApiProperty({
        type        : Object,
        description : 'data [input here api field description]',
        example     : { "foo" : "bar" }
    })
    data: any;
    
}
