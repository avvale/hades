import { ApiProperty } from '@nestjs/swagger';

export class ChannelDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'a1f89b4f-784d-4888-87f5-9f72d75a709e'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '04dea72f-4666-48f4-8957-aa0d3149f993'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '22670223-233d-4d94-996f-1be8f793f547'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : '19tibpioq10mwyvjgvtt'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : 'b2bb4e30-6145-47b4-b18e-35fbdbd8d216'
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
        example     : '2020-07-21 05:08:00'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-21 13:39:25'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-21 17:06:51'
    })
    executionMonitoringEndAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'status [input here api field description]',
        example     : 'INACTIVE',
        enum        : ['ERROR','INACTIVE','SUCCESSFUL','STOPPED','UNKNOWN','UNREGISTERED']
    })
    status: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelId [input here api field description]',
        example     : '8fd7172f-e38f-42f2-a152-1d0079b549df'
    })
    channelId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : '4btaj99t81s0xak1us1zh10rjum8llm9pwo1nmnvobh6x3xxe0v2ul9duf5d0uy6eg5exzws5zslbs3s7anc9wqegyir739qj17i9vh3dnaqs9n1z273f3ymd3ydboiza20cvd13ts61y0dtqyhl3thik79j3bdv'
    })
    channelParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : '0mzbux3wvute9mlvnq8p7i244r2hz6lo58lhg66jvam2ha4i0xkve3jzy147e7rp5s1rzpnv3bczalruwq9i5govg75abyfdtxa584j11yky93b22d53r9af1se2fi9g46i8gq4tmy0pe2abl2whzmr3te97ap2u'
    })
    channelComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : 'ofgxstplwm6frj9twmzo3cp9a990gvg57y99b0xdmfijewx7ml9k8xtdjkebeg20hs6kj8pkaeg4etn0uakztoc3xi1nzvveljnk52yycbmppnqcfadnrhiepilcvyfsh300ycyl3wkby0ubvuv59bn8zk2qprdn'
    })
    channelName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'detail [input here api field description]',
        example     : 'Et quasi omnis distinctio sapiente et amet qui reiciendis voluptas. Iure aspernatur repudiandae doloribus quia quia vero dolores ut voluptatem. Beatae repudiandae omnis sequi et consequatur possimus voluptas accusamus praesentium.'
    })
    detail: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'example [input here api field description]',
        example     : 'o65zaemlx3cgnfbflocp9dqi7rjwamztmqpkzbfulb75wta9jewteu0yeocgtd9ow2rasunzh21a7eiwirjul4qgevxzxql4j2c4p8taiygv5dkij6xycf7uny7ah0fuj5p532mpg9sg0ooezunyaluxv327ihv4'
    })
    example: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-21 00:52:01'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-21 22:05:29'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-21 08:50:10'
    })
    deletedAt: string;
    
    
}
