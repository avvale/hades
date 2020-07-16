import { ApiProperty } from '@nestjs/swagger';

export class CreateDataLakeDto 
{   
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'b525f7bc-9c10-4aa9-a7bd-953286fd7be4'
    })
    id: string;
    
    @ApiProperty({
        type        : Object,
        description : 'data [input here api field description]',
        example     : { "foo" : "bar" }
    })
    data: any;
    
}
