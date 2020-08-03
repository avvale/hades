import { ApiProperty } from '@nestjs/swagger';

export class CreateSummaryDto 
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
        example     : '2020-08-03 04:50:15'
    })
    accessAt: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'counter [input here api field description]',
        example     : 2842099503
    })
    counter: number;
    
    
}
