import { ApiProperty } from '@nestjs/swagger';

export class ChannelDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '502a5f46-8674-49ff-9c7c-9c608bc06786'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '33b3b361-a914-4658-bc9e-d141522a506b'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'wchzgy8uwud0rq4r0jreuw9g3yyj0hfgjwms8cwx1gypc4rcb6'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'de86c386-6677-4382-b18f-7bedb33a7b09'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : '4e7z0lbx6fj0uyr6dh56'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : '97409111-8a55-4be9-a414-e586b1b3b3c0'
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
        example     : '2020-07-29 22:23:37'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-29 20:02:28'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-29 10:12:04'
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
        example     : '9h4wpdqcov9bxccvmr6v4c41lnkmt1d5ymu6x84i'
    })
    channelHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelSapId [input here api field description]',
        example     : '2n9mdro7rohii5vctftbmygwv7ce59hpj8l2uviszgpvehnged'
    })
    channelSapId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : '8bixtg5o0kqzmon2eh2v2nfaexfj2ddx56se688ffv07rhlylilh2mp56udvl88dafhdlyyw9rc777qvmgia3p6fxfszhprx5oc4gf3hwjoszrvbqnq3o1rs6nujz55615kz8w25z20kuk2ovk1t30uujpyec8hs'
    })
    channelParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : 'jg0l7th2t2kq2w39v6oiu4qh4bk5700x1u8o3z8v56iun8hdd8kh0sqazrlqqgf4nm4hy0hd3fize54man5nqu6tlzlzw0ep9sft0p2xfvnjschzv2dhpyy4xf4z3qp83erq1fm34ptwrzsnndk9udaiu0pjhi51'
    })
    channelComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : '2d7lshf3o4mkieskt8aqh6u5mrcxsxti2gyef7ulivymio14aydyjext7leih8h65xaf2h9gb5c540rv9llf1fmv9gj2a4sdtc6zvbbavo72kitgg984k0jc77i9tw7y4uqukb8qq72g335qtwf3vzrn6uwyya07'
    })
    channelName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'detail [input here api field description]',
        example     : 'Est magni quia. Maxime aut et eum quo ut nemo magnam. Est tempore quibusdam nesciunt sit et cupiditate ad alias. Repellendus distinctio placeat voluptatem expedita. Magni suscipit suscipit expedita ea. Et quaerat at repudiandae rerum ut vitae.'
    })
    detail: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-29 06:37:16'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-29 09:37:44'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-29 04:12:47'
    })
    deletedAt: string;
    
    
}
