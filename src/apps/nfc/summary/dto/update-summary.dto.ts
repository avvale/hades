import { ApiProperty } from '@nestjs/swagger';

export class UpdateSummaryDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '4a588db1-5149-466c-85aa-e52a60d6e35b'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tagId [input here api field description]',
        example     : '4e16d9fd-085d-49a1-9974-0783d41f9f11'
    })
    tagId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'e2f886d9-7cbd-4c9d-99b0-070d84bdc09c'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'accessAt [input here api field description]',
        example     : '2020-07-29 08:26:26'
    })
    accessAt: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'counter [input here api field description]',
        example     : 9000906705
    })
    counter: number;
    
    
}
