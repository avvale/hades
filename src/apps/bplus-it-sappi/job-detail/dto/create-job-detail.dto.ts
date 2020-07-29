import { ApiProperty } from '@nestjs/swagger';

export class CreateJobDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'cb42f3ad-6a02-424f-acff-4235af79f568'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '379b11ff-6d08-41ba-8e5d-e2ce9413b96b'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'k8vcky9c7aqvlnssztqfnca8g24z28vjz69s5edpszftj53vp6'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'a00af397-acb8-4d11-8b6a-72d04eec80e8'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'nx29nvrf6befuib3vk8q'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : 'd445db73-8d9d-4c6b-9125-7f6f60e8267f'
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
        example     : '2020-07-29 20:21:09'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-29 03:17:22'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-29 15:12:18'
    })
    executionMonitoringEndAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'status [input here api field description]',
        example     : 'ERROR',
        enum        : ['CANCELLED','COMPLETED','ERROR']
    })
    status: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'd7z7z793spd760cr7m4acdlngpe1zu63kz1uikith76zy4v4fdtlqw3rtmorauarsar9pvwlptfcgvj9a4jeeljhcd68w4u0osch2qc73c3yr0eswwxo6jjisc8oggkc6v3ervswwc9uqie08rr796e1lunsjqi7j3oavfejx2c74es0ddp9q50dru8qrr7pk3uerea526v4kudnl3qak8mthwe3vipt0mzk9ul76v9wt48levt0qcto0am7hd3'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'returnCode [input here api field description]',
        example     : 8952574167
    })
    returnCode: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'node [input here api field description]',
        example     : '83xj6ogks2u2080k8jc1q4b6628trb121tx19biieoy8zexcrsvw721eeko839hlukokdg5wb205devr3kz5p6gkxfq7njsvth1pbgvn1eyxu3yux0jbtnt9x8dr7q0arj186gmrpccx1s16hc5khjmxhj6ir12f'
    })
    node: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'user [input here api field description]',
        example     : 'bavca8mg3h52uagxkmjxnth7vmfxk1b4nqh0skyus6orb9rri3jhxmjjas9peseoqlkvzdq57a4psv8lxzwxn419n4gvk59as42k1n25obj3d6h222pi9dz4jkjmzsl6rde7vy5hig1bpwghqoy8s1p0s3vdtd8n80oy75tzen150nmww53gnu1fq78ltr5zy94wecy03su2b6wpybysv5cppgyhkxqgrvh46ct2k709fexk0h2pkyc9l9lu649'
    })
    user: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'startAt [input here api field description]',
        example     : '2020-07-29 13:35:30'
    })
    startAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'endAt [input here api field description]',
        example     : '2020-07-29 13:19:24'
    })
    endAt: string;
    
    
}
