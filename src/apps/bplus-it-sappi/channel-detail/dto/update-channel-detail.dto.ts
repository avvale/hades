import { ApiProperty } from '@nestjs/swagger';

export class UpdateChannelDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '3590528f-d23a-4232-b036-a58070348587'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '6b2e2446-2a9a-444c-801a-ca8f814cfe62'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : '9qh2w16gajptdkoq44rnsclh12az0uvzokd8meb490wyheaaz7'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '84a293c3-3f9c-4a1b-b6f6-0172f5ba276c'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'y1mkrm4nmtrz6ju3eyb1'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : '3d1f0d2a-c2d0-41b6-a05c-97c2d7e9fd2f'
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
        example     : '2020-07-27 13:44:44'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-27 04:36:42'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-27 13:02:58'
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
        description : 'channelId [input here api field description]',
        example     : 'e3542545-7b8a-4afa-9f33-b560847d3bb5'
    })
    channelId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelSapId [input here api field description]',
        example     : 'zbzbtas7puar6e5yzrn88m3ymqcsbzbqot2nt63xutdnthgtvc'
    })
    channelSapId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : 'pid7n60nl3jk61ofjagmfcfmnk6cil1but37ydjx7gu9esk6fv4jed56ibftalg80qa1j77bl15judyvks0avjlaluu4lunamtdejjlf97w8suggej74365g7zq5j0kl1idxufz9dncurvvws4zlk68lwn7d4va1'
    })
    channelParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : 'yn9jjy87gvj2nyuus6vvv6mnisrfavve77wpw5ked4dvze003c6xu73t4s6fq0l8i5ormkdq85ywzr8v8oxud6jts1pnpmect7ff76lv51yaekt91y2m58rceniofnn7udnm2xu7ewo7ljwup1mgrd6lct1zugyy'
    })
    channelComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : 'g1xnu1tipjcqk9wstqkve95n8uuv3l7innwmop690dfm32jw6sef3pir21tg6oufx5hu3xb7nffsa11hij392wrvr6kbbjzltg7eq0c0sder6yp15z55o8wku8ky4rk4ysust276grcwfuq9xzq7nittyoyoyuhv'
    })
    channelName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'detail [input here api field description]',
        example     : 'Laudantium et laboriosam. Quia corporis voluptatem eius sed. Beatae et tenetur nesciunt debitis dolores quidem totam minus modi. Provident quidem et assumenda repudiandae. Similique blanditiis reprehenderit nostrum enim perferendis qui voluptas.'
    })
    detail: string;
    
    
}
