import { ApiProperty } from '@nestjs/swagger';

export class ChannelDetailDto 
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
        example     : 'zrqk69zmrfyxr8mzocrgd9m48ec6p8wo1cg451tcmrj23zmaon'
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
        example     : 'q3uau0d2n3xnun10nqrg'
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
        example     : 'SUMMARY',
        enum        : ['SUMMARY','DETAIL']
    })
    executionType: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionExecutedAt [input here api field description]',
        example     : '2020-07-26 19:56:13'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-27 07:13:20'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-27 09:41:10'
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
        example     : 'e3542545-7b8a-4afa-9f33-b560847d3bb5'
    })
    channelId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelSapId [input here api field description]',
        example     : 'mvruux3t79qrnq25sjpvttqjl0c29l0xqcf6zthdn4l9gri143'
    })
    channelSapId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : 'd6ntqaxujtf4ev5vsuuovykxb2drt5mwssflu5duekfiiv8sku9tkq1ah0r7vmuvj4hp14id0jyj89qts2v2eugqmqkfqeaoqefew2hliwng4tgsduq4a6s1q5obst435oqs35zrucc2g00nrb0jvuxa3orq1jr1'
    })
    channelParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : 'w8416hanm02tprcko31rzuxnrfu1f33ck3j6a02lt3nsctfnaokx0k1kj1dl1ybccwcbriyc25ty6j6fwave82751klt3sifrjj1ux6bu34t8dlznismixvix9mztpaderchbzhwo1k0ovxmzb7attkgil24gyuc'
    })
    channelComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : '6yalzkg02ovulnf3xs0l5zfz453uffjopfqiubw7t6vt3fb8hpex3fjy5vx6pacfj8b7bej4g5zjwbv47mq4t0jssouezrcgz1268oqjvdx89lvvtgdi44rsua9rsfp95r634umj2x2oszq6kj9kzrol8k3kqm5h'
    })
    channelName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'detail [input here api field description]',
        example     : 'Aut et eaque explicabo. Earum sunt voluptas. Non consequatur non sint itaque corporis vel fuga sint.'
    })
    detail: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-26 17:26:55'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-27 08:46:19'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-27 09:35:15'
    })
    deletedAt: string;
    
    
}
