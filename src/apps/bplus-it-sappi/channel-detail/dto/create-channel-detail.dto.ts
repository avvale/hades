import { ApiProperty } from '@nestjs/swagger';

export class CreateChannelDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '3590528f-d23a-4232-b036-a58070348587'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '6b2e2446-2a9a-444c-801a-ca8f814cfe62'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'oycd91ubg2wgl0582ylosoccei12x8k0f0ld36gjypebbowjn1'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '84a293c3-3f9c-4a1b-b6f6-0172f5ba276c'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : '8d89yx167uyuvl0s1hhe'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : '3d1f0d2a-c2d0-41b6-a05c-97c2d7e9fd2f'
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
        example     : '2020-07-27 09:50:32'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-27 13:34:13'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-27 05:05:58'
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
        description : 'channelId [input here api field description]',
        example     : 'e3542545-7b8a-4afa-9f33-b560847d3bb5'
    })
    channelId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelSapId [input here api field description]',
        example     : 'st0zmixmq1ujywu0853wt5d7f7oorxwsx98gmfr2agih9dkmv8'
    })
    channelSapId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : 'myao5chut371ctpwfk602qtvsoti4op1ph4yg1uel3o2y96ymao7f084wesed2kzon4k6rt5vzvwmk0ngz6966iaql263ilg8mjn97zvph4dym7672bgu81ai8zrvmsky19ds13oej3x2yyseaot4cxn4dqe94d4'
    })
    channelParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : 'dd5fvhqbsc3b6pqfjxbcbsy2myhjsi534l2zvfty97f8r4t58jg5ihhxcn0sxmsrwgqwsplb4tmaxrnt8edx9okiwjia0gfkwvck4u65hr8vhvcs8zhbioof3haoomiru64pomnn4wdjxl2i7lk55y88nx83qip2'
    })
    channelComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : 'su0rg6xp8svddhm8eb55mjswtp36dbu6adj4v4biz9rjjjzf977felmh1pnuuxlv0x56r4qqbv3k51nuw54uo1dkaels1sq1sezvy5mncsx6iy2fvq58h18k2kfgn9wl073jtskzazee4vp6cbyfs7g7ixd1g0x0'
    })
    channelName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'detail [input here api field description]',
        example     : 'Quo quibusdam error perferendis reprehenderit qui enim sit laudantium nisi. Est cum itaque deserunt quia. Quibusdam ad quod. Et omnis repellendus impedit. Cupiditate id nesciunt omnis ut necessitatibus quas.'
    })
    detail: string;
    
    
}
