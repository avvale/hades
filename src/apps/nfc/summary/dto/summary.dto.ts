import { ApiProperty } from '@nestjs/swagger';

export class SummaryDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '47ab947e-e34c-4a41-8c1f-553b00b5e074'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tagId [input here api field description]',
        example     : 'd9ccf76c-1368-4705-94cb-c26a91976043'
    })
    tagId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'df4da993-53ab-4140-9aea-693b81839dcb'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'accessAt [input here api field description]',
        example     : '2020-08-03 13:22:44'
    })
    accessAt: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'counter [input here api field description]',
        example     : 7512023698
    })
    counter: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-08-02 19:30:28'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-08-03 03:11:27'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-08-03 18:19:01'
    })
    deletedAt: string;
    
    
}
