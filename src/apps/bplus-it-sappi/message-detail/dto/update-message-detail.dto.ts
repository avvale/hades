import { ApiProperty } from '@nestjs/swagger';

export class UpdateMessageDetailDto 
{   
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '8761b63d-3ae5-41d3-95be-958ca51dfc1c'
    })
    id: string;
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'b81db37e-a5c2-4f2d-83af-ffb7f23c1def'
    })
    tenantId: string;
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'bcafefb7-cf68-4f3b-a844-1bb60c649712'
    })
    systemId: string;
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'szy2mk40b7bmm60skcsj'
    })
    systemName: string;
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : 'cxem26x6avqkimm97terttw6vut0owoob1j8n1m93vsiistxqvsrrqsyqp0l'
    })
    scenario: string;
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : '10ab02f3-b600-44cb-a7c2-63978290326e'
    })
    executionId: string;
    
    @ApiProperty({
        type        : String,
        description : 'executionType [input here api field description]',
        example     : 'DETAIL'
    })
    executionType: string;
    
    @ApiProperty({
        type        : String,
        description : 'executionExecutedAt [input here api field description]',
        example     : '2020-07-17 11:53:51'
    })
    executionExecutedAt: string;
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-17 05:36:16'
    })
    executionMonitoringStartAt: string;
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-17 14:44:42'
    })
    executionMonitoringEndAt: string;
    
    @ApiProperty({
        type        : String,
        description : 'flowId [input here api field description]',
        example     : '7111a4f6-d53a-49a9-ae2f-c337b4c299d6'
    })
    flowId: string;
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'kii7usr97cckq2qrjvmfhwg3ifufvltjnoozayqbzsnhd9c1d7e6ay0wvyco2zk71qd94s473lcd1ppccxcom5webukwlx1nr6dgzyym4ffv3oa6jjcam4ec3a6n0mp4ohezgmdciowds4mlf90ybmbeoaogv5wh'
    })
    flowParty: string;
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'vo73ccryud5y6d3m84ap1r7qz5a0jzq5ym0qfvbn7gz4d71c80398szb2kog9tt89jhawqb2vhv3dxgbj1qs7lge9y8dlx6mrncknayj4oeegdfcpr39ks6sikglazmdujxtlt49dd21j1q97t0hkmjggmr08zi7'
    })
    flowComponent: string;
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'b2fcj3d0ftaaaejudqf3ikgxq3f9a4q7x8mucrmczip7szm6ovmfokb556mk9t5gp34nqie8u2ye38wfxp85hirfsbkxp6mr0n6ko3fjj2v7ec5kvjbccxki16tg6oljdj583blan2mx7653qdyh58pp0q4xgule'
    })
    flowInterfaceName: string;
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : '9094jai93651l6x7z1pr5rwpby0dilku9f6dylf50quq258to6nsvy27479wn1598js6fb8cfzw602f6yslin0hq3ujis70r1h4myooruk9quv2bq60xcf38a41vrecs3lof4tdge33p9pd68ty3r33546llx3rw'
    })
    flowInterfaceNamespace: string;
    
    @ApiProperty({
        type        : String,
        description : 'status [input here api field description]',
        example     : 'ERROR'
    })
    status: string;
    
    @ApiProperty({
        type        : String,
        description : 'detail [input here api field description]',
        example     : 'Itaque sit explicabo quidem magni dolor porro vel eaque eaque. Officiis nisi hic perspiciatis nesciunt maxime eaque voluptatem dolores voluptatem. Et tempore quas ipsa ratione aut sed debitis unde error. Labore quos ad velit provident.'
    })
    detail: string;
    
    @ApiProperty({
        type        : String,
        description : 'example [input here api field description]',
        example     : 'r237mpx7dedzrtahsonl888w9mcof2kajfkk85gm0oihr2i2f6uwywoxz6w0pu97g20ilq3g3k6lbdq20fe28vulb6af9ndz3z0d9hhg6z9hj5d8j09bbbt1gs4bv6lpljdf2deapa8syccfhusznaorw5pm4ukr'
    })
    example: string;
    
    @ApiProperty({
        type        : String,
        description : 'startTimeAt [input here api field description]',
        example     : '2020-07-17 11:24:38'
    })
    startTimeAt: string;
    
    @ApiProperty({
        type        : String,
        description : 'direction [input here api field description]',
        example     : '06p9m31addwcqo60tniq'
    })
    direction: string;
    
    @ApiProperty({
        type        : String,
        description : 'errorCategory [input here api field description]',
        example     : 'oj0n6o22m932wmtkrdmwac434djgbp0copiafkawx726qfiou9rgb8ye5gguxr2fh6n2dxfg2c1h1l9fj5yv2aa60d1v0rss0odean98z2aje1m2gomkelpvhk1ufbq6di528wknump4z5ptfimz8u6ikvyye281'
    })
    errorCategory: string;
    
    @ApiProperty({
        type        : String,
        description : 'errorCode [input here api field description]',
        example     : 'cee3yduczwbzcmaxz5yi'
    })
    errorCode: string;
    
    @ApiProperty({
        type        : String,
        description : 'errorLabel [input here api field description]',
        example     : 'zqrcuxt38zst6g50au0pcdf47vtcbontie078y1u2esq1sp3m7ugifnsknh0ub18nsvt3jl1atmxss5lcayd5sg4fsqlfc1gzd7p7fgp6ydrils4qqqif3oy45i8nksut8g2wgmv7ggwwz2ijpe3mck6dj5cqz8n'
    })
    errorLabel: string;
    
    @ApiProperty({
        type        : Number,
        description : 'node [input here api field description]',
        example     : 3406256543
    })
    node: number;
    
    @ApiProperty({
        type        : String,
        description : 'protocol [input here api field description]',
        example     : '9f5y8hoagvbh10kmmukr'
    })
    protocol: string;
    
    @ApiProperty({
        type        : String,
        description : 'qualityOfService [input here api field description]',
        example     : 'x8ad74k249quolbuxsm8'
    })
    qualityOfService: string;
    
    @ApiProperty({
        type        : String,
        description : 'receiverParty [input here api field description]',
        example     : 'lw3myuak07y82dpa60mmfnw20xhuqhz7ez1k5cgns5p4zk4uz0qlh105cirxr50622d044sngq6tnsaqdhtrv8ijkvzxeukpiieked575aisev4mj9yitw2i49uqpkqy0fxa47wmdlxri4ycehgly2g4mja4za4p'
    })
    receiverParty: string;
    
    @ApiProperty({
        type        : String,
        description : 'receiverComponent [input here api field description]',
        example     : 'l8gkc7u3c1texsrywqg9rrx6hktz6wstbrwribwyyi036eawxwdanw7v9owo0s2gfvclf8tob2u620zyswzrc2hqgrjxko0v2vmktxmgy4kr4uggbuofbtbmx4bxdhwvnnsbl2xxkjrmy5gc1idev1jid808p3yc'
    })
    receiverComponent: string;
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterface [input here api field description]',
        example     : '7pzs7ldieafh4l96y40g1zo51pthv9hwd2n5la9eti6n0c188vzc7abezfkd3xoni3xdip1vz7jw677pttb7yhmtqfo0gxtaa8puvh2lbfgtad30jxhwzk65zwnqxn3f02z1kkzo67ds8kak7x5w54yp8orxd4w6'
    })
    receiverInterface: string;
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterfaceNamespace [input here api field description]',
        example     : '2jmasbhxh129xcpd4tl483biolo5negtl1sa8zo3yalhg53azsy3czf7qppy7yrhvegginl597adptfnzjtioliedliu8iirv90bipb9viityq4mxpoodst78vnl7xqczbhi9nzv5pngyneq84anvp36fd43hfav'
    })
    receiverInterfaceNamespace: string;
    
    @ApiProperty({
        type        : Number,
        description : 'retries [input here api field description]',
        example     : 2912326513
    })
    retries: number;
    
    @ApiProperty({
        type        : Number,
        description : 'size [input here api field description]',
        example     : 7981688898
    })
    size: number;
    
    @ApiProperty({
        type        : Number,
        description : 'timesFailed [input here api field description]',
        example     : 6512571907
    })
    timesFailed: number;
    
}
