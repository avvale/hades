import { ApiProperty } from '@nestjs/swagger';

export class MessageDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '2578dbe8-3df6-4b7e-bfbf-225390315594'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '0e791533-1e01-450d-bb1a-5e9a2a315752'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'md23huyxi6gp2lsrbyjkgaab4vjay262c5zyng0ifu6zlqzquy'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '51f2e58d-0ee3-4172-8cd4-0e91841bfabc'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : '4moxxxrgmp1i3ymj4nrm'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : '4uiplumooseawvho3aatf9cv8ruaokdst5kki2cjqs9rod7p2v2mb0o6ztwm'
    })
    scenario: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : 'a25fa511-8c1e-40ed-a971-073595a75a4f'
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
        example     : '2020-07-29 12:29:15'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-29 10:16:57'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-29 04:49:55'
    })
    executionMonitoringEndAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowHash [input here api field description]',
        example     : 'bx1hhvm5stqdk3adfuxfepq90kpcrpso43vtn4iq'
    })
    flowHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : '9yo4g9i2pre172e0p5fw83oj4ozpf215xjmjrzq4xkd5cut1bx25udhw9k4z5vi89w321gva0dy0zkamfp08mq9kcz4aklkrqrv9vgadjr87fpd4xyypdl0yt92dx6xa6yh5amfqf3bchihr6xw672xnq0enma29'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'oaehu20o10yvg3xto8ou11ix5uffny39iyth54mkpor3pk3fhoiwm21ijijbn8tt227jb4ycgorp1qze38xjvdt3p5vagtcwhp9ckjesxflcpz4e6qygvwge04zk1t6u1482kqhdt3c9n5olyhit20gtuomakivp'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'q05c1pjhdx7k1i3irfd28f41cnbv7d9p01jnggs83oi0hzk7jtiq1c0u3ba0dpwa2k56xmvtai7oh2qo6u8mtug42paqyo2mrpan8b7te50d36ceqdfyp8xf6lmdlps59jaxfdl662jeacflosb97uo7b87i61fa'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'bmyot569kaemmhkktte8rnzs91eg6g2sk5z2zuz3q3gqei4xrsj7714odclrql0dx9wqwjmknunsq6qyprle2fs2hhc4f4cq055qzh5v2bs7jp15if095tzq1gu14atqupsdd9wqihpfe489b5sbmdjq1nz3yfr6'
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
        example     : 'Voluptas neque consectetur. Laborum reiciendis ab iure dolor aut ea soluta modi provident. Optio reiciendis quos non sit ab natus magnam et. Eius vero et non et qui praesentium fugiat non.'
    })
    detail: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'example [input here api field description]',
        example     : '0nzjbgruev2xmiqkba06htjn7wi0xzip3tm2sfvq7iqk4z2yi4lhufs0lj6c5792l583xi9no7vd9pn2o6c5n8aurifgzm33tolc7spqn1emhwymgylxfji0y06agfbcum7h6p53lcwhruxn4nff1r0xk4wkmvkz'
    })
    example: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'startTimeAt [input here api field description]',
        example     : '2020-07-29 03:07:33'
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
        example     : 'h40w24lioqu4rfo12anzjwueaugsr6o2n6ikoazmuoloanpksxv4dfmq9sd2emtphb6tjt0gucnw83ap0uxxcqkh02y4jw7jyhn5xeczlmauqyz3mxjn8ltdpjaoqdph2p6mh551bmj8qf52xqddp5jxbonk394p'
    })
    errorCategory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'errorCode [input here api field description]',
        example     : 'jqde3ichcspti2ohpuicw8b8q1ho7ny7nngztywptd4xqegqng'
    })
    errorCode: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'errorLabel [input here api field description]',
        example     : 758142
    })
    errorLabel: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'node [input here api field description]',
        example     : 8539772745
    })
    node: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'protocol [input here api field description]',
        example     : '12qyga1vnu3jqvrq367c'
    })
    protocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'qualityOfService [input here api field description]',
        example     : 'qtdoi6o3zchv8vz57k33'
    })
    qualityOfService: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverParty [input here api field description]',
        example     : 'y6yc27rh29uqka6vvsvil5gaskku0euoq4yj4v1e1gzw0nwfn4emmrymyf5i8lvjgre44uc3cmpi44bu4l7fr6grgvl3qehe2kguk4kl46y14jvze4uv7qg1uaeelq2tumohjzfbbgcpiuz6nt46cc6xhrvcpjkb'
    })
    receiverParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverComponent [input here api field description]',
        example     : 'tqrevatxlviloyuygojls207jm3i735v2gcvnqt23h7e9wugxjoczilkk9jlxy06iaxusx8nat33cxz9mq7vorvvou0k3bx5zpu7riu64dztbvlvmgglp4rl8l4stixx578cy41vp3114d20mktxmh3623b9af82'
    })
    receiverComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterface [input here api field description]',
        example     : 'xspu4rnzk2qoqdc2rmkvhesjrkwo2j3pw540mcfb1ijdqdljw2o1g32ca5ezlhrzo31e1u4nntp6bzer31i1wc5pzf3fts9qbdzgtpb63xo4jz9tf4yyhsutxkdygsa5qwt2caej51rxcda1s61ke7i52q56kqvw'
    })
    receiverInterface: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterfaceNamespace [input here api field description]',
        example     : 'dcvz4vc10qfpr1dyg3ja17vd42ewwi61yy6ltyf108mzjm5v92vp1b8wjav4hsn3o8xz2y9s8bnur46f6f5f4jjeo7nuc0f1l7m2i11hwobuxu3e6f2dvmvc0tddm704duaogmngc5o0emhb1iufrqliet3uc3ij'
    })
    receiverInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'retries [input here api field description]',
        example     : 4291695084
    })
    retries: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'size [input here api field description]',
        example     : 4219163456
    })
    size: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'timesFailed [input here api field description]',
        example     : 9456242164
    })
    timesFailed: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-28 21:14:09'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-29 14:48:58'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-28 19:06:12'
    })
    deletedAt: string;
    
    
}
