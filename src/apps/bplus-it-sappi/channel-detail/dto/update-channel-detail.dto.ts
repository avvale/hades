import { ApiProperty } from '@nestjs/swagger';

export class UpdateChannelDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'c4bb892b-4cb5-4747-bc8b-390d5d0d139c'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '8a31e12b-018d-43e9-8d58-8746bae6b01a'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'mqa3px3ni8eggdx4yroz8t8js6ank2o3m4c61h7lg84x5yuy8s'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '484039ed-36fe-48ad-9862-3ee3a36c0f04'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'jcphymx2mia1r34fm8ll'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : '656afb0e-aeb8-4710-905d-df224440e09a'
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
        example     : '2020-07-29 16:21:20'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-29 15:32:17'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-29 08:12:46'
    })
    executionMonitoringEndAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'status [input here api field description]',
        example     : 'ERROR',
        enum        : ['ERROR','INACTIVE','SUCCESSFUL','STOPPED','UNKNOWN','UNREGISTERED']
    })
    status: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelHash [input here api field description]',
        example     : '5ai78s19mk5sclkwpnn1i3b82gkjzn5oxrtb6463'
    })
    channelHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelSapId [input here api field description]',
        example     : '2bj9kjj1cw9emq1vja38hzmluk2vitylx7ncvwr0ihsf5ecrga'
    })
    channelSapId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : 'quax5xows9mph3ydnsxje89d91l7n2gcs8d1ij29h043d7kd9c1eyomoiu3kxemf3ih6wuosgwik9ca5rn5kuh90whkh1f49hiqgc6sre8mrfdmayj4letmz7532hnzn5qed6om2qnbgaz0hagse3nmce8koaguq'
    })
    channelParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : 'y44qvo5hsrqvhp3u2j76kly42rzvp2hfhmfz1a1il0yk2yjlflurz8ncptx0vn9z239avdrv2vvwkxbfmh8whdjftm1xeszqx8ltbgnnymuj99bq1xqe34ggxh0fhsv7s02davol91c7lsv3ijerixyzp03oh1f9'
    })
    channelComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : 'y4xduuwgk45l24q7yytwf7mbzy1j9tbmvtpgx8fkeg7bx1vh4uoo37fgnp8s3huxsksj58giwh1nippqjwdh50wldeaj0731aiua9y6slopkl3y2vmyep73a35hfsfy8yvy92pry6js00wh6xvx05n77v3ir4ls3'
    })
    channelName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'detail [input here api field description]',
        example     : 'Repudiandae vitae saepe harum. Est molestiae mollitia recusandae voluptate omnis. Ut officiis aliquam iusto quo iure quia nesciunt. Suscipit sed et aliquid voluptate.'
    })
    detail: string;
    
    
}
