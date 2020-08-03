import { ApiProperty } from '@nestjs/swagger';

export class UpdateJobOverviewDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'cef152b6-5cb4-4bde-8e87-db647bdef79d'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '3c094bcc-81c4-45d5-bf3c-9fa973bf0cc3'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : '10js1paneffj0ogcdypb4ljkfs1jpi7rbeq7dgk5a0gmo93md4'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '47242f1e-225b-4775-a350-6e0d7e43db0c'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'mnt9b5iips4nedtmlpw6'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : '3892e556-c03a-40c9-ae1e-fe5fc55c2ea4'
    })
    executionId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionType [input here api field description]',
        example     : 'DETAIL',
        enum        : ['SUMMARY','DETAIL']
    })
    executionType: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionExecutedAt [input here api field description]',
        example     : '2020-08-03 04:20:18'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-08-03 13:20:28'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-08-03 12:57:59'
    })
    executionMonitoringEndAt: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'cancelled [input here api field description]',
        example     : 3980571934
    })
    cancelled: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'completed [input here api field description]',
        example     : 3962608885
    })
    completed: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'error [input here api field description]',
        example     : 6455610570
    })
    error: number;
    
    
}
