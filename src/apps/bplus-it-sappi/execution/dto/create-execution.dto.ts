import { ApiProperty } from '@nestjs/swagger';

export class CreateExecutionDto 
{   
    
        @ApiProperty({
            type        : String,
            description : 'id [input here api field description]',
            example     : '7247849f-add6-4b3c-8661-bf74e3180938'
        })
        id: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'tenantId [input here api field description]',
            example     : 'e20adb1a-14d9-4970-b94d-893932753a5e'
        })
        tenantId: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'systemId [input here api field description]',
            example     : 'e81c5663-752b-42af-a7d0-2e70c479f0ca'
        })
        systemId: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'type [input here api field description]',
            example     : 'DETAIL',
            enum        : ['SUMMARY','DETAIL']
        })
        type: string;
        
    
    
        @ApiProperty({
            type        : String,
            description : 'monitoringStartAt [input here api field description]',
            example     : '2020-07-21 02:25:20'
        })
        monitoringStartAt: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'monitoringEndAt [input here api field description]',
            example     : '2020-07-21 11:46:20'
        })
        monitoringEndAt: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'executedAt [input here api field description]',
            example     : '2020-07-21 23:08:43'
        })
        executedAt: string;
    
    
}
