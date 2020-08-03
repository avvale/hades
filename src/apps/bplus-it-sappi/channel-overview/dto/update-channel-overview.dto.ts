import { ApiProperty } from '@nestjs/swagger';

export class UpdateChannelOverviewDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '45d7174e-c0b4-4bf9-be6b-12d830621d4c'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'ae9eef35-4be6-4496-ab7e-b1f4012f29ad'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : '0ik7um9cq29uursgqbkndbifqfh2o4kzvybjy91rt3dqqsbll7'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '0b3338b9-e7e8-4557-bad1-d8eefff68250'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'oekmgo304z76vxzmb8sx'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : '8af391b4-abe7-443d-8827-6f9109ba6512'
    })
    executionId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionType [input here api field description]',
        example     : 'SUMMARY',
        enum        : ['SUMMARY','DETAIL']
    })
    executionType: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionExecutedAt [input here api field description]',
        example     : '2020-08-03 06:06:55'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-08-03 07:36:47'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-08-03 12:03:12'
    })
    executionMonitoringEndAt: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'error [input here api field description]',
        example     : 7708067334
    })
    error: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'inactive [input here api field description]',
        example     : 3863395088
    })
    inactive: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'successful [input here api field description]',
        example     : 4563699350
    })
    successful: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'stopped [input here api field description]',
        example     : 4345780463
    })
    stopped: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'unknown [input here api field description]',
        example     : 4054797269
    })
    unknown: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'unregistered [input here api field description]',
        example     : 2501843005
    })
    unregistered: number;
    
    
}
