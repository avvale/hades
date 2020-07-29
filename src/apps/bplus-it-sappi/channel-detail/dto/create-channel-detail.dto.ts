import { ApiProperty } from '@nestjs/swagger';

export class CreateChannelDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '75890c23-62bf-42f6-9d77-b8be4f40ba8d'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'c94549ab-979a-46c3-9ef1-e32329a8568b'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'awpmtfk6yu7dq0085ozbp3cpstt1exia96ahasjeyvte9j81u8'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'ca623564-86d5-4ba6-95f7-898ee1649c1f'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'su1va5zgh7y6zxgfkefe'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : '654693ad-2c0d-4b4b-a1f7-6e7f3d39d0d8'
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
        example     : '2020-07-29 05:28:48'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-29 00:52:30'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-28 23:14:23'
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
        example     : '3ipwaxnava7gext4xk5h92x3pa900shcehfd5tta'
    })
    channelHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelSapId [input here api field description]',
        example     : 'prsv3m8fvrem3hht7gl7bdhp5rx6cdzlzso7bxfhpjtzc9lf12'
    })
    channelSapId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : '136o44bwitt5i7aohkvydmy94u7bilja4ijgaiopowmugg6guh0p1bpbd2nu1cgzjhv00viu0tsswqivano0uw2tenjmxrfy3wanwfk9ajdzwcr8tmmshgfvttn9eurf9knb4op6kguj0cmc52j5z2rjidqd0glh'
    })
    channelParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : 'wnz3l3xb1t5838klw8gonyt4ddyc09c3lebrn95ehqqaiko1lgfguhlyy3kfssk8riz9zzzbh9ms2awtiozhxwwinuwsqyeflieebnhhjq0yrezj6pdhnbnptm2hmg8vezb3k6ggu89k5pkhlh4i0ctmaj2mefmn'
    })
    channelComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : '758ih40k9f908s34l0t5gcozvgnzr5wn0ga7cc9aih3m6eiy24yuz3i3y34pij1y2ex5pplpnit56iwaabldswab05inzadik7ut5nq6ynazjyevhnztpqd9bgwpfyxfjtucgt5dtkgg06d7ybdmzhv8h0v34aen'
    })
    channelName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'detail [input here api field description]',
        example     : 'Dolores recusandae rem quos voluptatem iste est tempore. Cumque veniam quia at voluptatibus rerum consequatur commodi dolorem nihil. Vel cumque harum aut omnis incidunt quia vel molestiae explicabo. Reprehenderit iure dolor aut eos a est exercitationem.'
    })
    detail: string;
    
    
}
