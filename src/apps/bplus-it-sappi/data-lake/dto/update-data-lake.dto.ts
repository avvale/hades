import { ApiProperty } from '@nestjs/swagger';

export class UpdateDataLakeDto 
{   
    
        @ApiProperty({
            type        : String,
            description : 'id [input here api field description]',
            example     : '55291cea-ae07-4101-9e8e-905effd32ae9'
        })
        id: string;
    
    
    
        @ApiProperty({
            type        : Object,
            description : 'data [input here api field description]',
            example     : { "foo" : "bar" }
        })
        data: any;
    
    
}
