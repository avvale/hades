import { ApiProperty } from '@nestjs/swagger';

export class UpdateJobOverviewDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'e57466a5-40a4-48ba-8b83-cbd6dd80d137'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '90a5fdbd-49c9-4f8f-a8d9-92ffc4d707e1'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'fxau28d0b61u56del53vkvcaeie6cjbk0fi56mybshmtg33y40'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'fc8ef8de-a1f5-4958-8864-8351b9263f8f'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'pecu76fyral982jf1cc1'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : 'b2567ea7-1d38-420b-8ab0-e98087672709'
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
        example     : '2020-07-30 21:43:45'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-31 08:39:01'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-31 00:50:01'
    })
    executionMonitoringEndAt: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'cancelled [input here api field description]',
        example     : 9261912897
    })
    cancelled: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'completed [input here api field description]',
        example     : 3789444949
    })
    completed: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'error [input here api field description]',
        example     : 2224249807
    })
    error: number;
    
    
}
