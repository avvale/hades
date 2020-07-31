import { ApiProperty } from '@nestjs/swagger';

export class CreateChannelOverviewDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '5cdaeaf2-6d3b-4a16-907a-409cc69eec04'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '018920d0-77b7-42f8-b9ca-4bbca611967a'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'nn7nxua0hu66q5660iuwtqf5xvlw58db384ixn2ursjrdnbr49'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '513dec1e-3cb7-4145-9b48-9089c3ce464c'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : '6ocru3y8p8iwqcdspkwi'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : 'b41bf9c2-ebe7-4e3f-ad47-7845913274af'
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
        example     : '2020-07-31 02:59:44'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-31 01:45:09'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-30 17:12:29'
    })
    executionMonitoringEndAt: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'error [input here api field description]',
        example     : 7738714477
    })
    error: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'inactive [input here api field description]',
        example     : 6404359836
    })
    inactive: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'successful [input here api field description]',
        example     : 4458453464
    })
    successful: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'stopped [input here api field description]',
        example     : 1830469178
    })
    stopped: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'unknown [input here api field description]',
        example     : 7006846325
    })
    unknown: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'unregistered [input here api field description]',
        example     : 4529315904
    })
    unregistered: number;
    
    
}
