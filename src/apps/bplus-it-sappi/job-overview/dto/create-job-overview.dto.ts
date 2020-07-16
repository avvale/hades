import { ApiProperty } from '@nestjs/swagger';

export class CreateJobOverviewDto 
{   
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '6b4e8e54-58c2-4c14-96b8-15fd76ba02e0'
    })
    id: string;
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'a68a588d-9ca9-4dcd-9471-e2b8c7f3ff7f'
    })
    tenantId: string;
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'e3fbb6f6-fd47-490c-9ebc-d67fc3baa8d3'
    })
    systemId: string;
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : '2udaxd6t41rs9an2igah'
    })
    systemName: string;
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : '7ff72752-fd8e-4519-ab23-05fbe04160da'
    })
    executionId: string;
    
    @ApiProperty({
        type        : String,
        description : 'executionType [input here api field description]',
        example     : 'DETAIL'
    })
    executionType: string;
    
    @ApiProperty({
        type        : String,
        description : 'executionExecutedAt [input here api field description]',
        example     : '2020-07-16 14:35:09'
    })
    executionExecutedAt: string;
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-16 02:18:49'
    })
    executionMonitoringStartAt: string;
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-16 13:07:26'
    })
    executionMonitoringEndAt: string;
    
    @ApiProperty({
        type        : Number,
        description : 'cancelled [input here api field description]',
        example     : 7871209413
    })
    cancelled: number;
    
    @ApiProperty({
        type        : Number,
        description : 'completed [input here api field description]',
        example     : 4084391033
    })
    completed: number;
    
    @ApiProperty({
        type        : Number,
        description : 'error [input here api field description]',
        example     : 4789315457
    })
    error: number;
    
}
