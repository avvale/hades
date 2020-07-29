import { ApiProperty } from '@nestjs/swagger';

export class SummaryDto 
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
        example     : '2020-07-29 10:57:21'
    })
    accessAt: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'counter [input here api field description]',
        example     : 6692794782
    })
    counter: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-28 17:29:22'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-29 01:34:26'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-28 17:40:15'
    })
    deletedAt: string;
    
    
}
