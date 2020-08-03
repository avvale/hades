import { ApiProperty } from '@nestjs/swagger';

export class ChannelOverviewDto 
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
        example     : 'p4ged4pjsjm4n47qy66gxycccxyz1cnbxgxd1vco45xkryd16i'
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
        example     : '3327v7xda3ee9b3g6ohf'
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
        example     : '2020-08-02 22:14:13'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-08-02 21:35:08'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-08-03 09:09:41'
    })
    executionMonitoringEndAt: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'error [input here api field description]',
        example     : 1595327275
    })
    error: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'inactive [input here api field description]',
        example     : 6721775935
    })
    inactive: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'successful [input here api field description]',
        example     : 7126323223
    })
    successful: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'stopped [input here api field description]',
        example     : 8960956144
    })
    stopped: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'unknown [input here api field description]',
        example     : 8161022277
    })
    unknown: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'unregistered [input here api field description]',
        example     : 7724895154
    })
    unregistered: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-08-03 09:57:38'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-08-02 19:55:19'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-08-03 16:51:08'
    })
    deletedAt: string;
    
    
}
