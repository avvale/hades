import { ApiProperty } from '@nestjs/swagger';

export class UpdateExecutionDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '07b7ad4a-04cb-4caf-9593-ba4dd04439ba'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'acc29feb-a6c9-4037-9cc0-f00e8abaaccb'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'tieyi5q7z4wq3fluhvgi3lapa5c3jmiv0ygehfpjumukrux0z0'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '6effd779-a8a2-4316-ad4b-288ff9a1600b'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'sx6pe1zi9qhv9mj3a6hj'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : '5zy9pisunc8n6bk8zg6t'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'type [input here api field description]',
        example     : 'DETAIL',
        enum        : ['SUMMARY','DETAIL']
    })
    type: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executedAt [input here api field description]',
        example     : '2020-09-20 15:44:53'
    })
    executedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'monitoringStartAt [input here api field description]',
        example     : '2020-09-19 17:32:54'
    })
    monitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'monitoringEndAt [input here api field description]',
        example     : '2020-09-20 08:51:11'
    })
    monitoringEndAt: string;
    
    
}
