import { ApiProperty } from '@nestjs/swagger';

export class MessageDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'f7e41556-9598-49e1-9961-cb409cc7525e'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'beb63308-f14e-4889-be91-42e05e3d7aeb'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'sqtkbrucrwxziuxf9ocy4dpyu0fo5mn3wpvzikzu8wretd0hqi'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'dbcff575-915c-4e8f-a0ae-b6fbf9aaf703'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'cktcjm5xcmi43ushwtlm'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : 'vxgb67n57ao1ew749ftr7reyqzqe8nukfm5u0mydeiyggtx3uerxa657v5gw'
    })
    scenario: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : 'c8949b41-3c40-4aca-a429-2cc6c174d507'
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
        example     : '2020-07-29 22:42:21'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-29 14:26:12'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-29 14:52:08'
    })
    executionMonitoringEndAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowHash [input here api field description]',
        example     : 'y8y6xp14rgorrm177km5hth31te39bailmuspk8b'
    })
    flowHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'uqpzrp89lp3vi8i0z7tsm4jrwvsniez44a7n15stzi45wt777984m1feo07nqwcl2e6cxr8qmf6cle8ymduadg06cnism79ct8iq76xdwgawkpboms0qms3hmx2pujm7del5meiclqb1gmqu4vswgkokyfmen5g4'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'kthgpmhs5d5cnz47v1tfjs351qvcrxkb895xyyc5gjc7branxrls11r80kbwqgfho6k3bu7jyjbmybvxswrbk9a2ok5xpg0fg70d5607lvcpjmve0kgriskmq9aag5837touikj8skwuopgtqvrm068uaohk1myl'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'wifin9hjcam6y9noegyzlyk3y4zolkhp8g0jfhwzr0p75bhfu90m6idjss4h1vmufktnjyszq555heoodqpqwus1x3ng6uc3qrm631xh4e8fn0kusdtk958wln5s3qqgegkrzvqytnx11v1msn2gxt9bltcdctad'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'cve9liemqzoyky192ir39f43848pjw7pk5s7l821yp6htj8jioa6q20q02znxacv02dqhfuk7q2ek8h8ns9myy3yqqsioneqrfewxza1hkeh0ly81750bg07mzcuy2wh0oziwlliq0f0d2uaz4ljjz6894rt1g4e'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'status [input here api field description]',
        example     : 'ERROR',
        enum        : ['SUCCESS','CANCELLED','DELIVERING','ERROR','HOLDING','TO_BE_DELIVERED','WAITING']
    })
    status: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'detail [input here api field description]',
        example     : 'Laborum omnis aut molestias tempora reiciendis tempora sequi itaque tenetur. Dolorum officia officiis. Aut libero consequuntur dicta laudantium sit reprehenderit dolor ullam praesentium. Quia dicta dolorem assumenda tempora nesciunt ipsum.'
    })
    detail: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'example [input here api field description]',
        example     : '3zqqvoz6b9pz08vdav24ig9p5efm67zsr6bj7d0tcuvel2t7dmdpzwaifmydifhdwdrv1b900ptgjtkkke1d5mvf23dkaadn5ybqwktmtl2h1w3lze8iggspolf4pn9mw4p2ksqmbarqnwnuchssvdb3s3jh4bi0'
    })
    example: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'startTimeAt [input here api field description]',
        example     : '2020-07-29 19:29:55'
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
        example     : 'p53bl0v8y0mr1sfxmyfvpdbaoovbh38bckfyo44yzcmxj20umnturq7g27sbv232rijhxeil63a1km5fau2aqka8j37wa28005osva6w1n8f7ohaqiq1vqalqlqgs05eesdeoo2fxzebjnbqd4oj1oyk5emx1ilp'
    })
    errorCategory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'errorCode [input here api field description]',
        example     : 'zwb5wmwnq1pd8bk40nayjeit01fabwrakjnhsh4zunqg5z6zd2'
    })
    errorCode: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'errorLabel [input here api field description]',
        example     : 641961
    })
    errorLabel: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'node [input here api field description]',
        example     : 1126241234
    })
    node: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'protocol [input here api field description]',
        example     : '1rzq1liacjf0tfvu6jad'
    })
    protocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'qualityOfService [input here api field description]',
        example     : 'n1ljeojzil6wckc93y27'
    })
    qualityOfService: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverParty [input here api field description]',
        example     : 'n4a5o9qt0p2swkm8tc40wmvxcz37dm7b5uuc2id3r74wbunshrswy5lq2vdw30cisg0fxfqc9g14ml4685f10wd2qztpedxvgaqtnsboy8zax7xfln9r32sayf5e3uh98y4nuwl2rdlvmyxpvdy6ngmrmk8laoct'
    })
    receiverParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverComponent [input here api field description]',
        example     : '19suwol047s314evyzaaplyqevbrixdonx67p1119qriz4asswvnmmssmrf2hqabv0blnktgsfz33vh9prn9ym3n3s4xujtvp4gtgkvuxd7nicqw4rl3h9tlko9azm2iqlhm6oybsdi8rye3ugplwg6guyr9jndv'
    })
    receiverComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterface [input here api field description]',
        example     : 's6r9ey75gjp0gf39ft2cocp6maxkpzs756bay6qxlykt5nqope854qu5k8sjirpe8tm8kn78a0fo21mr4iff4m56fhzjg7z6sthife2660g7j1ul4waajdv79mjz1nokgc2xnvkbau3uikbf8o9fpfudftdrvcrk'
    })
    receiverInterface: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterfaceNamespace [input here api field description]',
        example     : '91k2mrpj991o3tftty42j042irnrb2eqyvpez533wet03sfp0rglk1ze3sdnew7m8snhi46l9ji2wl2auhk4tfj9mh97umoxh2twmyuco96dv0rbni5sr1jljyhe7gvh8r9k47vw5pu6x6jf1egwtjb2glq08jn3'
    })
    receiverInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'retries [input here api field description]',
        example     : 2103953807
    })
    retries: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'size [input here api field description]',
        example     : 3438399809
    })
    size: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'timesFailed [input here api field description]',
        example     : 8468944192
    })
    timesFailed: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-29 12:15:58'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-30 00:21:07'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-29 10:29:02'
    })
    deletedAt: string;
    
    
}
