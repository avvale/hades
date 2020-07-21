import { ApiProperty } from '@nestjs/swagger';

export class CreateDataLakeDto 
{   
    
        @ApiProperty({
            type        : String,
            description : 'id [input here api field description]',
            example     : 'e9392915-c9f6-4303-bfcb-9a56077e4778'
        })
        id: string;
    
    
    
        @ApiProperty({
            type        : Object,
            description : 'data [input here api field description]',
            example     : { "foo" : "bar" }
        })
        data: any;
    
    
}
