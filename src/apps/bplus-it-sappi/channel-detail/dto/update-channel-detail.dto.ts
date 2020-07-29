import { ApiProperty } from '@nestjs/swagger';

export class UpdateChannelDetailDto 
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
        example     : 'lldob0tx1nbj02vwawzzpa10hgrih1q7jiu50bc9eyr1fcog18'
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
        example     : '0fxk9deo7s3zlwhx0xu2'
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
        example     : '2020-07-28 17:17:16'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-28 23:57:25'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-28 19:23:01'
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
        example     : 'd04lkx66yfoaozdhte2xwnaznc1bxuad0l19ueym'
    })
    channelHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelSapId [input here api field description]',
        example     : 'gja0p7g1ps3wv0auvm1i8q568tevzxyvcx8nsq03hzrznqglom'
    })
    channelSapId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : '90q2e2ed8cbqlk31964zbu1fuh01z0c4j1wbfhju1ltq3yhnmxz99djmh8258g6rc1ub8yekw5arc2ay3iohlq7ddc5ursazkuoq19dcw98v0xauk5idhyvj36u9kf72owp193b5l5546fs17zknyi9g8gux4yvq'
    })
    channelParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : 'k3klkca76n92zr13zczc7668eje6w76l058a4l8b5pv0d6pckag6a7gzs77qom1sfuvo1r6odpcwso1zgwchd28ccz9owyjkh33xbvlwceco79wpucasvnckavxqs2g0wzjzo49c9etbj41s1kpgvbv7bc5bwnh7'
    })
    channelComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : 'xzho6yto9wvlt5oki7o37abx18wcrofjkvm5migl3jwspkyjqnhy07f6wu20hh1gytsuz2ymprwj37vyy1mwix44guqyuo9ymy9kqmnh06zzclhn66qauxx2lru4c3vbuwj2ya19n4bl0qofw9jp4plb0xdd7u6f'
    })
    channelName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'detail [input here api field description]',
        example     : 'Quisquam dolores ipsam facilis eligendi qui corporis nulla et. Sed blanditiis quia. Et tenetur ab sint at. Sint eveniet quis consectetur non beatae enim.'
    })
    detail: string;
    
    
}
