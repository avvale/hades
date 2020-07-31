import { ApiProperty } from '@nestjs/swagger';

export class CreateExecutionDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'b214df65-f8e0-4f33-a30e-7bd4671361a0'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'e36fefff-df01-46a6-bf9a-18273e19b308'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'le1gqe8h69se3kqrf3mirc2wus1jmcmbvyx85lw9nmbtjideqz'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'ec6920c8-ff4d-4663-9728-46eb5ec62fe5'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'b9jusw8sxsm8jkclx4yf'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : '4c2vu2otbp0r96afeqwu'
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
        example     : '2020-07-31 11:41:59'
    })
    executedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'monitoringStartAt [input here api field description]',
        example     : '2020-07-31 10:02:23'
    })
    monitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'monitoringEndAt [input here api field description]',
        example     : '2020-07-31 07:17:12'
    })
    monitoringEndAt: string;
    
    
}
