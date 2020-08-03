import { ApiProperty } from '@nestjs/swagger';

export class CreateChannelDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'e5b32fe5-fe04-4a9a-9857-08840cf8b9ce'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '50256894-b4a5-44f5-808a-cc75dec00e7b'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'fem9xudhw44lh7shbsctxr9vhd1wnjogu6xdkmwpl3f1pb691h'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '02e4d2a1-7d30-4d85-8502-f34baf5e5e9a'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'utyv28dceefzg1fsmiky'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : '143be2e1-e31b-4a87-8a70-5fe8ee6318da'
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
        example     : '2020-08-03 10:43:07'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-08-03 03:44:53'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-08-03 06:42:59'
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
        example     : 'htdmt58xzilaadnblhwt7s8vcxzbdguy6gjnbjwm'
    })
    channelHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelSapId [input here api field description]',
        example     : '0x6jh6naxw7et6lsyo98r4ht6yjpgg9i10rket8gyanb4ywd6z'
    })
    channelSapId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : 'yotx5wuk16m8mv1vcxpl8e2p4db1c4okxwtodjoor3vezsi5shqm8yrfleikal8dr0m0tg7mktggjer4t3xbok58wugancm1qcubeq3pr0b2eod6xxlqs5d5lhw1xv9duet6roxlimsi1bfc5a934jxs5a1uli6f'
    })
    channelParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : '8u70xifmnvqj981udnnuz61st7xe92v85smjkrrp2iy326te1pstm82r2pdz9w9wtqu7vwqgkcvkyn6vkwhrvtu2d3dbxyq7ud2mr35jbqyabgrn6ymv3ij8btrtd6z1yo1t5o6m39kmfb9nx7cfyfxyvcupr0ib'
    })
    channelComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : 'bkq4zletq90rfgx6m5t4uzy0ow4p7f9kt7sc2yf4pt702n3nmcgcbbi4j38e1skqe7thwk6xjnjjoutii88gqw9ekzqecsar6bx2lvnxn95d3l6iibf02qtrbp01qkjv37kcr8dz20eja9s0m6fltcchh5tvzikp'
    })
    channelName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'detail [input here api field description]',
        example     : 'Aut consequatur perferendis quia quis iure quo tempora ullam. Id sed quibusdam porro ut qui vitae. Quas qui qui non voluptatem et ipsa voluptatem rerum.'
    })
    detail: string;
    
    
}
