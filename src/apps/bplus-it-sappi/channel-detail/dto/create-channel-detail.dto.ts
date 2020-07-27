import { ApiProperty } from '@nestjs/swagger';

export class CreateChannelDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'd35c0435-691e-4f46-b0e6-ad6c2452cc01'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'a32a2837-b181-4e09-aa08-c7e5e9a168f3'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'ibtldmdxurmex2g7ax9lrhshrph1lnhfzqj71jdoefruytfwa3'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'f07e6293-cbed-4b64-9210-a1124af2ec75'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : '4mrjmnyoliaiaxpcs6wj'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : 'd26cd44f-808a-4dd3-8a60-bb6db1d079e4'
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
        example     : '2020-07-27 07:02:27'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-27 15:14:12'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-26 23:04:18'
    })
    executionMonitoringEndAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'status [input here api field description]',
        example     : 'SUCCESSFUL',
        enum        : ['ERROR','INACTIVE','SUCCESSFUL','STOPPED','UNKNOWN','UNREGISTERED']
    })
    status: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelId [input here api field description]',
        example     : '62fd8a68-8fef-46a9-9523-e3cfb6cc6795'
    })
    channelId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelSapId [input here api field description]',
        example     : 'qdf8l3m33nfn8i9iyrjcvb6l5yvs4jo8dp6o1b52vbj233byuf'
    })
    channelSapId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : 'ezpr0zdafxom80x1df4kb4kafokbgk079ltzobi2yu7hgyrkysrfqk0ptzszvgaa5f2xxoarl6n17ppbq1nssyxhj459m68cfqkn5yldfvj1ocn2mtulzvv4ouzs313qk7fvxjhoci6pdmid9imkkgasii004wql'
    })
    channelParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : 's6boqnhv2y0f56r09qcggngs4sqj523rzy82264o0nwczjir96t5pw1k95fl1we94nplnzoeaqp22oqstnlrr5n8v1whqby9qynfmd3xvggrrwxrihoynvjuaztf6klfso53cbjubrhkpy8rp18xguk7a8rp3geu'
    })
    channelComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : '6brgm0cnuvjfkupt7dfflsxvrmt5yyadwpxpvniu58xqlcajb845t3fpjry3zp67bafxlw5rmuuplqcsj6rgg1gn4rhaq973mic2wbjqlqoq2kl6pd28w5ztv1hzdng3xfpiio6ifgbr3rqxfnp3aur394bibmiq'
    })
    channelName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'detail [input here api field description]',
        example     : 'Similique culpa aut in et impedit eveniet amet qui. Odit beatae et aut facilis temporibus architecto nulla asperiores quis. Non error amet error vero autem omnis non fuga ipsum.'
    })
    detail: string;
    
    
}
