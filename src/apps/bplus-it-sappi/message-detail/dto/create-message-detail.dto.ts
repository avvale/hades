import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '6538794a-87ec-4570-8e7c-7d32b64d10f2'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'fc089b46-6e30-4672-9499-ace50a73cce4'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'akm2zskmhq53eva0gf0p6g9lgm19yujlk2ljq9cqghgzid32fw'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '1fb13b0c-f722-4791-8b22-6096eb52a5b4'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'gctnvtj5b17y4fpnjgaf'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : 'up3veq3y1tfhzo1li2pgi8zl359npqymbxdex57zntfxdcfpi0bf1ndr8fir'
    })
    scenario: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : 'c99da5e5-5d9e-49fc-9e6d-60baf34dbeb4'
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
        example     : '2020-07-28 23:47:17'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-28 23:39:51'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-29 09:25:16'
    })
    executionMonitoringEndAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowHash [input here api field description]',
        example     : 'dyjxrq2x9zfrx3klm9pbzg9sxehckq91ffsx6p87'
    })
    flowHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'altshctapgwhinryrobugfodrbnberq7pndsyavhniz65i8lnelqam91s7aaro2ybjcskrponimp28gilr17q5dlwympc9ggez8o7ywvvntexqs9hskz96ywge71j8gumhgstay8nga0nhdqgbdcndc2ylxddyw4'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'hkx9lf330cr8vz8whbtkhdicn3rb8t1q7wnb2z7ed41lbwlfh99iobc96ul13z3gpdwp7n6tpxz34enegk4806o5qoe545470m7ubawue6xsgx520u1pi8w921nseflz7in69p58x4hlf636jvbsf3vqmnq35yp6'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'rqu8r8jl9qs9t5alpb63dwxnfkal2yiifrapy13u4xdsynnr9kco8xyo0sjmlruj1bwbkf3xd70h74wtcqg044qggfcuqrj2s48mp48qqz1juyc27hmsc3z3onqtadt5qkj44yqgzeuvnngjd66d3wijf0pwx397'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : '64tepywijfw8s0kus8yu1yze8ytn15c5vxeb944w1rghisrjr6fup4qjwadf3x6fvugvejrghdu0tkjnr2e9881bwvnabgmi27a9bed255yspupjkj0c905dun3l6lyu9qrkk0xjb5r5pcdgyloz706ser9stq64'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'status [input here api field description]',
        example     : 'DELIVERING',
        enum        : ['SUCCESS','CANCELLED','DELIVERING','ERROR','HOLDING','TO_BE_DELIVERED','WAITING']
    })
    status: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'detail [input here api field description]',
        example     : 'Non dolores accusantium incidunt molestiae ut vel praesentium. Rerum omnis est sunt consequatur maxime. Molestiae ex amet quia officia. Autem dicta labore aperiam perferendis earum explicabo repudiandae blanditiis. Tempora praesentium ut totam doloribus.'
    })
    detail: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'example [input here api field description]',
        example     : 'hnztfli9miajbsxlm92ino74lyiwc66ckz086nzgjjkbnucq7dvnyumbze95xsmrg2ng1fb9qj7v3u9mebad70j89x8mg6wspyelgmcywbvppqprdnv0nc4hhkgjb3spfj2yj1ejkgdvzpuna0a6ezircq9g3gww'
    })
    example: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'startTimeAt [input here api field description]',
        example     : '2020-07-29 04:59:19'
    })
    startTimeAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'direction [input here api field description]',
        example     : 'OUTBOUND',
        enum        : ['INBOUND','OUTBOUND']
    })
    direction: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'errorCategory [input here api field description]',
        example     : 'kyksh4d7a4z9ychgykj23itxit6aezuri7td3ryzrqjrhzk3hvj9nte1qlh9cz1o9ph5ez05mdf6jof1j6mgcr158ufa4nrqxt3qyq8osu92935m2uhv67ku4ecjcud17zg4nnqazsemxx3hch4zdvuufinc0kl8'
    })
    errorCategory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'errorCode [input here api field description]',
        example     : 'prn8n4ntne9l6zdwih5h4m1gm584bo91hignluifh1xkwc0dy0'
    })
    errorCode: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'errorLabel [input here api field description]',
        example     : 484529
    })
    errorLabel: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'node [input here api field description]',
        example     : 8728453559
    })
    node: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'protocol [input here api field description]',
        example     : 'un5vzt6l9l7l200r9olu'
    })
    protocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'qualityOfService [input here api field description]',
        example     : '1dwlb2jn0bkj1mjb0cyx'
    })
    qualityOfService: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverParty [input here api field description]',
        example     : '7s0h3qyabhrpn1xzb5buoazxpy5ncnbdgrea9m4adzozjz7fou6p0wke6f07cixx67avv1mtfwwwofmzg1hswmp35agyvflst7ebphps6763ffgalmurwu7tjsuw7uww3x7gi5t39ae1xkh2wp679ia1iw2j3vxg'
    })
    receiverParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverComponent [input here api field description]',
        example     : 'r6l5ocls7yqjlqx2dtwoxv8nhi4avg3bq3shy4rmyly8vcdkrutiiylr9j1268paiu2kpcuk73a3cxav6e4v1bfdki39cnu8sfo7eec0sqc9j9ayej6sej3qi4h1bjj9h3nfoedv9cm6ph1iwsc84ofq0wi2z182'
    })
    receiverComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterface [input here api field description]',
        example     : 'k2kujmhfy8t6kqfy8s2sv5asy4knnbbjk3kp0p0odqxc014wpd4mmm1fwazqolsh1a1w86gf9uxtdjxa1ozjuz68vqjrk1lu1voyh62zktcw5x2gzc6m9569g0px1jou7w69vijawdfmwezf3866nni7liy5pd3m'
    })
    receiverInterface: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterfaceNamespace [input here api field description]',
        example     : 'hij862otxsvsuo29ed80cy1lt2eseo4okeff0yju70p21ufhcw8y6m7v2r904kanfalro79dm8kah5nuk9r20afqoz3oylnkw4ojs42ykzepei9hza70g7x3lvzx0xextagb58studmey46lcsx6m4qnmusdlgf9'
    })
    receiverInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'retries [input here api field description]',
        example     : 7322974235
    })
    retries: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'size [input here api field description]',
        example     : 5338630590
    })
    size: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'timesFailed [input here api field description]',
        example     : 9413090992
    })
    timesFailed: number;
    
    
}
