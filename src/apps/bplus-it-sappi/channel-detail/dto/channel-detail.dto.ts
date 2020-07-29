import { ApiProperty } from '@nestjs/swagger';

export class ChannelDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '30f5a7e9-171d-4304-93a7-17f61f8f5370'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '6f49d2d2-9c8f-40b1-b5ac-981e48aedc89'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'j2lol2y34g883wgwins15ca3fcbgmryo42nlv3ede0o7pv88cm'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '4bf38c59-048d-459c-aaae-c5851480e77e'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'rhhsb33td86raxkyy51c'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : '5ddc25c1-3dce-4b49-86af-c940712436d0'
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
        example     : '2020-07-28 17:40:31'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-28 20:08:59'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-28 19:52:03'
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
        example     : 'z7kkatyh53ddxsg57wadr71ujvn2lokhhtk705q7'
    })
    channelHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelSapId [input here api field description]',
        example     : 'x4det9fm4z5a7sek4wzed44q2s5ch1t8ma9saifp423e1sxk0q'
    })
    channelSapId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : '3u93bvi2bss11c1ldm1lnpwu87q6usi5ynedqv5t0zv9tykd8pfwwec9wt8zcdcrkbo5bxqh4jshqdnmbj88c8thx6md7xf0lhopl8q32ny7lywh8kla3plqbxa94di8htjyn1529m73f6b1k4mlc9mv8llam3zq'
    })
    channelParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : 'gxfukwhq58hzlhs28g4glj137k8f5de07dov2f9okzmqyjhsfa723kyydj0o7yeoebc8lepzx2td13e8kqqngc1lbsj4satie1qor9jqh8ehayp31wgdj6l6v01wfiqxxobvhgpjdb7wjqhzgvs6ecsvzy5ifaof'
    })
    channelComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : '9mdvx5qgi6cy6r6xfik63hz35mzycmsw7ef299wdho0d3n3qzbigs3uqvw3708ahicm5s6955bxg6ph9x7lz8e5kppw2179sndmukvaeexc16f7idia3cwkgy103c54vmzfbn6hfmfqyojsstcxbmfdhym66ggpt'
    })
    channelName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'detail [input here api field description]',
        example     : 'Aut odio et repudiandae ab perferendis tempore. Consequatur natus enim qui non distinctio. Natus voluptatem nam. Voluptates neque aut fugiat omnis dignissimos minus. Fuga doloribus quod.'
    })
    detail: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-28 16:45:55'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-29 13:18:58'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-29 12:03:55'
    })
    deletedAt: string;
    
    
}
