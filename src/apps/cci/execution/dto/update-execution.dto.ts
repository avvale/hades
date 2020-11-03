import { ApiProperty } from '@nestjs/swagger';

export class UpdateExecutionDto
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'e69db8da-9cde-4b35-b301-0b037b9690cb'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '70db1085-d99a-42f0-99ee-c018d061fa4a'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : '8rwcpx636qbts3ainxjoedabsi0bzbmszz2dljpcxzghdfvt26'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'bba9b7c7-60e4-4e0b-97fa-fe0d6b7fa4cb'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'mjx6br5bgn6dsxefmgdi'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'l2hu165ljlgcgm82edtt'
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
        example     : '2020-11-03 17:46:45'
    })
    executedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'monitoringStartAt [input here api field description]',
        example     : '2020-11-03 04:08:09'
    })
    monitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'monitoringEndAt [input here api field description]',
        example     : '2020-11-03 20:33:11'
    })
    monitoringEndAt: string;
    
    
}
