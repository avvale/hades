import { ApiProperty } from '@nestjs/swagger';

export class CreateChannelDetailDto 
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
        example     : '6qtel86pgsvs60c5biqr01uj8uph9bvi7t8kene3cxkl4ce3cc'
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
        example     : '71t55t7pt29cuz25168n'
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
        example     : 'DETAIL',
        enum        : ['SUMMARY','DETAIL']
    })
    executionType: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionExecutedAt [input here api field description]',
        example     : '2020-07-28 20:30:42'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-29 09:11:19'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-28 19:28:49'
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
        description : 'channelHash [input here api field description]',
        example     : 'y2v0u2cf7wvahw9h85w00jmycewmqpqrtqejcvno'
    })
    channelHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelSapId [input here api field description]',
        example     : '8o74klg6brbdwmk0yzbk7w3uvtcwc03jo2vq0tzfy8k3azifil'
    })
    channelSapId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : '1nx4fvsfdvvljrzkcs6s2ry9u58oogoai2h1oqpaxi9w9j0dzuqookbz9cohlpuez8dt1bqqxxofmx4xezv0rwr20mej96auc0gkcvzv3bq1hgswwounv530pse6e2sk4lw0fr5qxal9ufiwlce5yevrfc58mosy'
    })
    channelParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : 'lbnzcp96583bk3o7nox0jt5nv7jb44jz3w8ayumomt24iioedroud4vtsjxu4agqbiafd3g2mwvgqx35jgeizwdsfb25lw60cjvbedrb2jw65fnvauxz4g8nllxdtq3shi4lw4uvo0yp4zmhdajw10pngw0w0ctj'
    })
    channelComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : 'ryjyz42mphts55ga9dqeuzf8o2r2wwq5k96ktm4ea071il2jud3v61j9uof2h4rmyoxabijpex9hrk024ynh5ih73asrun6c14cwqaqg6kliphlhkugluwiqgjqse22xbpgjpz0m08y4z8n5ut3one74ydxwofwz'
    })
    channelName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'detail [input here api field description]',
        example     : 'Quaerat labore et velit in voluptates. Est voluptatum voluptates dolorem optio et magnam omnis suscipit. Mollitia libero nam dolorem aut aspernatur.'
    })
    detail: string;
    
    
}
