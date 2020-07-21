import { ApiProperty } from '@nestjs/swagger';

export class CreateSummaryDto 
{   
    
        @ApiProperty({
            type        : String,
            description : 'id [input here api field description]',
            example     : 'aa40bb3f-c2a2-4196-a17c-4c77e54cc5c9'
        })
        id: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'tagId [input here api field description]',
            example     : 'ec1d4999-3670-4cb7-9ac2-990874b484ae'
        })
        tagId: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'tenantId [input here api field description]',
            example     : '8f5e233c-18e5-454b-8ea1-93a855544e21'
        })
        tenantId: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'accessAt [input here api field description]',
            example     : '2020-07-22 00:21:33'
        })
        accessAt: string;
    
    
    
        @ApiProperty({
            type        : Number,
            description : 'counter [input here api field description]',
            example     : 6647027751
        })
        counter: number;
    
    
}
