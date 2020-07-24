import { ApiProperty } from '@nestjs/swagger';

export class ChannelDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'e636b2a9-ee7d-497d-a883-416b32afc714'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'ed0938ec-0d62-439e-86cb-794b0b61e2f2'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : '9zkmpvksatzsmtxagxfhhcgs0sf0xhbcqz69q4fkvzc6jy46i5'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'dd23336f-d048-422d-a38c-4c41d9da6581'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'jtwcx5sp027slhekhblm'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : '1d26e770-ca38-42fb-b0b9-6c173a189292'
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
        example     : '2020-07-24 17:19:14'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-24 03:37:44'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-24 01:50:49'
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
        description : 'channelId [input here api field description]',
        example     : '27585f04-6232-43cd-b3fc-1b7e6f9dcf9f'
    })
    channelId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelSapId [input here api field description]',
        example     : '667l8hfxyez1uz5v0ou4pe5wogpeau3rspiagk7qeusxa8te3u'
    })
    channelSapId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : 'ndzar2ms7x6cssum1unmw7d9d2h6rircuaiwa2czcid739mz5myuj8dl8miezddpdbhd14hv8vil15ffewgg3ym2vq4s38ak6mke93svkita79r3jpvk29g0m66xar60dhdix4z7iqyzv0xt3s5w7w29w62t3nsl'
    })
    channelParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : 'i3hbf9d34x1kdfhd6r7d6culxit0rq08zkeq76pny62ks1h9p1thyh17f8hl2dlip3uua61ol1e09yckiebiovqd6qde19py2jzktgln83izgf3zdpt1hk9ls93chnea7h41pcerhakwqxlzm9soln1fi5tug1h4'
    })
    channelComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : 'c1uaai90hqtdu4nzypxqy8zs62yp2lxzdmtd1ce95dsxb4ta1iqd7d15odn9a4xg7heddvw3dguu6sxbx922bywrc4cuoytajxb7l5amxs0npdq14stffmlhqn9d86sx8w72644reaxoayvife51fhezitezcgft'
    })
    channelName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'detail [input here api field description]',
        example     : 'Quasi sequi excepturi. Neque sed vel. Quia eius sint. In optio deleniti reiciendis sit. Facere molestias ut necessitatibus odit exercitationem.'
    })
    detail: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-24 11:31:26'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-24 17:15:25'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-23 22:01:17'
    })
    deletedAt: string;
    
    
}
