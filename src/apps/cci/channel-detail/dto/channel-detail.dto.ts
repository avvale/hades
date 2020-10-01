import { ApiProperty } from '@nestjs/swagger';

export class ChannelDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '7df7ef26-28a4-4818-bf0b-3277c32fea01'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '51669471-36c1-4325-921d-9f2c21906974'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : '5cwy4wet53coxcpqt385y4xlx9spmnbybokl8jx4mvo4ny5b89'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '428c8487-5c5e-462f-bd82-ec830fe87cb7'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'n9myted2yk5v6qp6wphn'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : '64bdfd55-a734-4b05-b5f5-87f54b789c02'
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
        example     : '2020-09-20 03:09:24'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-09-20 09:52:50'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-09-20 11:49:07'
    })
    executionMonitoringEndAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'status [input here api field description]',
        example     : 'UNKNOWN',
        enum        : ['ERROR','INACTIVE','SUCCESSFUL','STOPPED','UNKNOWN','UNREGISTERED']
    })
    status: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelHash [input here api field description]',
        example     : 'jxy5zydadmo83s9ww983wzh593avtaqe5jee6z8n'
    })
    channelHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelSapId [input here api field description]',
        example     : '9ghgh0q5m1oyiq6lqqdr8irkyw971xgl22drkr37zsamsbqemw'
    })
    channelSapId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : 'fnd53hqr01q24637b70qz2wwbbxb2cxoxnfclhyvwqibr6l11mot6byvofk8ixula9hrmi6u0zhgovkpvd5qjy6bkw7l4wo6v1ua9krd8tw6nphomlyy9lqqs6g05mqp961rm99mbksh1v0kubei1or6fgqslxin'
    })
    channelParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : 'koeu9071egguymjwdkhpxzir9tms1b95k17a3qa3ik75acyu5jsdq1qtapvr9tgihm0xosmimb5ifp63lzug8b7hi7zd5adsj9e8rtndgyk0cizi0noxe38vh76bemd2vfh3u2p6dwjthzl5jn1t272k3glqcmtl'
    })
    channelComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : 'tj9k6f27dekjni3apvbubedhx40un47l04e2vg03xiy558ymco3ni7pf4qkmc3i9lsvm3g8ozrtqh3fboihzenwijbvmoisifkzc2505i8h7o10rf5tkhblofb5et4rguablh6zriuyrdhwr6n2qkf4l7xkojri0'
    })
    channelName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'detail [input here api field description]',
        example     : 'Similique consectetur et explicabo consequatur nobis et ea cum provident. Voluptas impedit non cumque ipsa sit magni aspernatur rerum. Est ab aut quidem unde dolor ut non optio. Ut laudantium delectus. Modi harum ut cupiditate. Nulla veniam rerum.'
    })
    detail: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-09-20 03:54:46'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-09-20 13:22:51'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-09-20 11:36:28'
    })
    deletedAt: string;
    
    
}
