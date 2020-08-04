import { ApiProperty } from '@nestjs/swagger';

export class CreateChannelDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '038067fe-dd6b-40aa-bb69-43657c527ff4'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'c30d6b30-0cc8-4e37-8131-75f6e21353b8'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'v2d1priuhvjikwdrsoymidflt6wuqk7dbafe3vtmq847z5z6q4'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'fd64441b-766d-4c21-9fa0-8ab1cdccf383'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'yt1k5fybqv2ic3weozmj'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : '8fcc2bda-4251-4342-b2b3-49424bcd00a3'
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
        example     : '2020-08-04 01:08:23'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-08-04 04:07:08'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-08-03 19:03:20'
    })
    executionMonitoringEndAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'status [input here api field description]',
        example     : 'STOPPED',
        enum        : ['ERROR','INACTIVE','SUCCESSFUL','STOPPED','UNKNOWN','UNREGISTERED']
    })
    status: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelHash [input here api field description]',
        example     : '14gwn7qayjvjwo1im85hhd5cdf337a65jeiu93df'
    })
    channelHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelSapId [input here api field description]',
        example     : '92i63qj6gvrvv3dgcgobby0wow2zv8jfbxaypv99hs52piat42'
    })
    channelSapId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : 'lukkuuypdicqw33742c4y13wzg404hwxn2eb2cs5xauo17nx02zo1lp2em9lz1mn9lglniladeljd0hwwod8fge2thdttfaa4faee3wwz0picn1m0a7inij18brc1w8lbq6jnima8uqow69sg78nkiqf12srhwvi'
    })
    channelParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : 'm8965zhv20z6aua7ufls8zs06dnm5is12167qtgadiwd2ro1z8isgwa6b82nbjo2ria8t8dk7emogolmglpk5r34az6tf33dise10docyzc4fcvmivfd35e1xs9qezqbm1fq62xargwiagnxagupdrmt0epwyzhz'
    })
    channelComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : 'f16g3mamz96zc6xfzde47m7h6mppjdg3eqjmlpb0e61rdk5dbrhf8tl68qyu1tmc29n1ag1pmexke7r8exbhfn3c2gr8u1se6ntrc2a6la35lhe7gndp5kmf4mmirheul2mhn4km0l37q4tk8iahin6948cyynm6'
    })
    channelName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'detail [input here api field description]',
        example     : 'Esse repellendus sunt rerum. Voluptates odio ratione consequatur. Aperiam rerum reprehenderit itaque qui.'
    })
    detail: string;
    
    
}
