import { ApiProperty } from '@nestjs/swagger';

export class ChannelDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '436f18ff-0a01-4f81-84cc-50bc62254e61'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '3417d5ec-1f10-477a-87fb-f7d0fa0562a3'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'a5gsynsxvia0detkg954i0zys1gxxu734fw8rqnueqh8taz06i'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '74e7e1cf-88f4-425d-8795-33103ff20f73'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'jjuwzyrp0c72nu9ozvu9'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : '5ecca706-d8e1-4495-b131-c36f7cc3cfab'
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
        example     : '2020-07-27 12:03:31'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-27 00:59:04'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-27 01:04:14'
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
        description : 'channelId [input here api field description]',
        example     : 'b1050b31-ad63-421c-ab5e-174a0084d9d9'
    })
    channelId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelSapId [input here api field description]',
        example     : 'p3dsrp3ee3sbo51nyqjwzlwzhwlxlph770dzlpg898o17v34j7'
    })
    channelSapId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : '7s32oyuvzaucn698dbmn8mz34onuq2m3qc5d2mo5p9fgpfj9lymzvubhrjyilge7nuo7xlv0fdoumocz126mvb2h07mqznra4j6x1r6ul6rxr7blwwmbhi2p4voe3tdv62dsq7pl7wkc830gfhiae8a0k6u2hkgk'
    })
    channelParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : 'rhfh3vqsni4pqsnuanpi2rba3vqlu7jy3ldamsscqm27xxb7de6mzjsxg9fat0ypzsd9ccm2emske7bcer2wjxrkaxvbd18ymjhv22cj07jsm2e9ksp05m4d8195i4naux2ykyso2h3k8bsubhqhse2f9hvpz8yy'
    })
    channelComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : 'xj7c4w7xpjikul8wdukoqfb7fv8a0rynfy281h1hgd93prwb14egikca1a7x5i5v09i54pygs6jxappalv9jyhxcw41z8kwjek3em6c88rs5ethqgf48ebnmiffpxy9o5yqqsmfmvtrn437xy2x44ce9n9is61e7'
    })
    channelName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'detail [input here api field description]',
        example     : 'Id maiores voluptatem voluptas qui sed. Asperiores nihil consectetur iure non dolorem dicta quia amet optio. Animi eveniet veritatis sequi officia cupiditate ab voluptas atque itaque. Quis ipsam id eum temporibus velit consequatur et nihil consequatur.'
    })
    detail: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-27 16:59:33'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-27 22:14:01'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-27 07:21:48'
    })
    deletedAt: string;
    
    
}
