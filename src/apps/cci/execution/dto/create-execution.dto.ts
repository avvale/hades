import { ApiProperty } from '@nestjs/swagger';

export class CreateExecutionDto
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
        example     : '3fi53vj5bhjr87n2rzk9uaozkbmwyqy15ep3v3nlqmj9i93vu9'
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
        example     : 'jqrvbzyrz8jz1j1e6ybu'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : '6i42fblryaagd83u09er'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'type [input here api field description]',
        example     : 'SUMMARY',
        enum        : ['SUMMARY','DETAIL']
    })
    type: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executedAt [input here api field description]',
        example     : '2020-11-03 04:00:20'
    })
    executedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'monitoringStartAt [input here api field description]',
        example     : '2020-11-03 01:05:20'
    })
    monitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'monitoringEndAt [input here api field description]',
        example     : '2020-11-04 00:04:01'
    })
    monitoringEndAt: string;
    
    
}
