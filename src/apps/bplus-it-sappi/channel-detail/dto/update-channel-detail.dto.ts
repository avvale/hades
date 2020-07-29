import { ApiProperty } from '@nestjs/swagger';

export class UpdateChannelDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'd44fac03-2236-4492-9511-576fe4024c39'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '8432aec6-22c2-49a2-a5ce-987bb6221ca4'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : '1ttuu9duo4ma8kdmdkmq1hwlxg9kphgitlbzrpp7msuhs9b7f0'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '51c31370-5ea2-4417-836c-5841d6811822'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'w9kl4j93x4l57rd9vgi0'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : 'b91e4258-9c9a-439e-9563-f1e3c9b8ea1c'
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
        example     : '2020-07-29 10:31:39'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-29 07:59:27'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-29 11:46:41'
    })
    executionMonitoringEndAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'status [input here api field description]',
        example     : 'UNREGISTERED',
        enum        : ['ERROR','INACTIVE','SUCCESSFUL','STOPPED','UNKNOWN','UNREGISTERED']
    })
    status: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelHash [input here api field description]',
        example     : 'aemehmdbgb94iksyo7vd7nsuhhbp1potecxgyc56'
    })
    channelHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelSapId [input here api field description]',
        example     : 'lf4dsa6s64ld1y9mob9f3x7s256qb5yo5i8yk22m3hwxsfelnq'
    })
    channelSapId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : 'xmblevrqyglqm6fmg5xlacjoyx6htc2nef2e5e6jh2yvlaqylqg4eljdqzvcrknc03ho7czqgdyavaufe0r1ak3189ntmjdv46ovvv15waov0kpu4qztak66usvz1k1d3b3je8qbs9ewrsdrmbux7o78zanwbsym'
    })
    channelParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : 'amsz3i9k6ayqfix65m0qx6ycilgih9zpdockmzl84e7c28d49an8t4m4pu5y0ur6uh7jagu6o4cg2dz7dr7tvky0ld8v80x6xe5p5ao6gwu22avtcwj1bkvhc0s9uxur18loeyl7ku4mm1xh7al1z0y6sv8z48hg'
    })
    channelComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : 'e7qi97716wn2nu40o1345hjdunon25doppv9ie3pu9e6cjo6tcmga6jwz3xvlicu36gzehkghtb57qi9bq8ueg44w9gr8ul5x5fno26qfryxo7pap51757xt68oubp4fjhmsfu4pyf2cxt8k04cgzdv6t9t5c10y'
    })
    channelName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'detail [input here api field description]',
        example     : 'Qui iusto non eos qui officiis doloremque voluptas velit. Enim nam exercitationem omnis illo. Sint quis qui dolore esse blanditiis. Ducimus nisi dolorem.'
    })
    detail: string;
    
    
}
