import { ApiProperty } from '@nestjs/swagger';

export class ChannelDetailDto 
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
        example     : '2sz7019a64ayh049jxlc7y7scd0yn5e137tcz6487nsx5oxawb'
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
        example     : 'sy6icxmuzd2redtmnf2k'
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
        example     : 'DETAIL',
        enum        : ['SUMMARY','DETAIL']
    })
    executionType: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionExecutedAt [input here api field description]',
        example     : '2020-07-28 22:50:23'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-29 02:02:06'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-28 21:04:23'
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
        example     : 'oejrnkm4ywyvbxzsxjopolejbdv5u6hds4a1kvxa'
    })
    channelHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelSapId [input here api field description]',
        example     : 'unwqrs9jzzjczwkipocs7dd8mwafbhej7rm3b8z7z11xqljliz'
    })
    channelSapId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : 'ju4s1yxrsaj6u71xuf5h2dok1yqp6n9zg67o6sp7w4t8shgudoli3r4ir2qnk4x4k1yll8md3svcnjmjyn9co73u0cex3pgq6naj7q10d2aahpjc7r8o06ap8r8oqrn68spw5hiafgw8lyhfvdhstfe8zuhs6aaz'
    })
    channelParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : 'hfqm6vp408ysavkvq6w6w2gc9x3c13gvsm4ey5lou08f2y8jc9mm9157wlw52tkbvgj4km3757rh03qrp118jjg0ohsuisn7k5fx1r5vspi6vp26qy7i8y2cvd5947b6w73mg3gfjghk4oemd1sfku0rgvm6ap9u'
    })
    channelComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : 'am86utqow7k2pfv9wwestgz5g1jlohrw4xp8ey7mwuq5to2f67fqupwgzb32nasmiq8br4i9rq7shnqd8h4dc39hbsefv3i6xyvl8uc9b5nfa9hpsl4ngynbyivefgiroar6g635vk7qighz2qclsyo0gxye3nxq'
    })
    channelName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'detail [input here api field description]',
        example     : 'Facilis consequatur facilis enim quia veritatis eos architecto ea modi. Illum in dolore non ex accusantium dolore ex. Saepe veritatis dignissimos velit debitis mollitia nemo a explicabo. Aut quo dolor nesciunt non ut modi. Natus amet consequatur enim quia dicta aut sint ut eos.'
    })
    detail: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-28 19:44:04'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-28 18:24:55'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-28 21:22:46'
    })
    deletedAt: string;
    
    
}
