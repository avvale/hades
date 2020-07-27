import { ApiProperty } from '@nestjs/swagger';

export class UpdateMessageDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '79de2087-0846-47b4-b4b9-5182a572d36c'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '0e9597ee-8163-4e47-a8f1-7d1c2ea2f0b9'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'pj7o4tzoi454e5fv9hih70p4b75hv73xrn7dzdfug4pds4nyw2'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '0c8af42b-fc59-4d94-8b23-21249b593a96'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'yux5xpesxt5ua1l83v17'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : 'm407fv09ed1e15jdoqeaf7jsuk4dz5w02ymmqesu54wmoks7vw1q6s9hl43j'
    })
    scenario: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : '18891c63-0400-4f46-8189-1bca175e4527'
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
        example     : '2020-07-26 21:07:01'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-27 08:54:57'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-26 22:39:45'
    })
    executionMonitoringEndAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowId [input here api field description]',
        example     : '69475263-2068-4745-a249-c0e37746e355'
    })
    flowId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'y85fb5ls320jkaekhxw1av5oc1t4q2ied22e74bdxwv47tr4f7s2eyjjkwh88kj47sw1cpjus8hj2jkdg8wzra2xfhghyf9aa1y4h1x1xc5a577kybqntayerkfkq54oq64eokfc7lg2ixfz7mnbbyqrpgcqokgl'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'becl19raqzgjyujbzuvti0sag7h44ug7hl7mwxx56zfpbwoye7bnsvgh1ar9edlp0cr6wfjwsb1pa0qwh0ovkpxnqpihqz0s2a62jj62nigcnw8epmqabjf4jgh8vxmoxryp3o9da2l0absfa1uiipw626hcyyak'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'p8z0zg6oy8uf54wyf2l3laqsj3xt1wkbzclb24ddzia3dlh0c13r4r3c1d28f7lke9s5vn1rn1ckf1gz44jb30hgvyepmgt1u2rmgakhqpw7z4fspqkwipyb4jol9mm21rnpu95qva2hkr0p6frrz27vv21rktn2'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'rmbkc8knr70ilklyi4o8fo4zm3r0zu5qodnfp2h6jk5p6as216dcnle0h2r87dzjqc67bmmctepgj041zn9nanhxbgpbmcrihlhouro40xmztpyjaf9crhwxq2i6y3bfg9kjj5qtf0a7b63z6dtkicau36a2ahn3'
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
        example     : 'Debitis consequatur ducimus occaecati. Quasi et praesentium facere at illo unde architecto maxime quisquam. Debitis consequatur dolore qui aliquid reprehenderit temporibus. Et rem nesciunt sed. Eligendi ex blanditiis unde omnis beatae. Enim autem nostrum voluptatum sed et.'
    })
    detail: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'example [input here api field description]',
        example     : 't28xyj2r1kd6k51nt7lnj0ub6xlmkwv9gpkrc6rhtm5mxoxlmyyrh7diz7sn6zypckrhnip487qcm52r32l7rh5nsahjv8k6ra5htxr16yj0aon1d9uwtppu2lm9mfqoebbjx08zwvbcvkde9tl9yo5ticshuckj'
    })
    example: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'startTimeAt [input here api field description]',
        example     : '2020-07-26 19:18:19'
    })
    startTimeAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'direction [input here api field description]',
        example     : 'INBOUND',
        enum        : ['INBOUND','OUTBOUND']
    })
    direction: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'errorCategory [input here api field description]',
        example     : 'cx5w4a3uf6qyzhoqjtsn9nbb68dydw6evef127734pyq2ivcqay1y64ktdos7ru395z9sodd86v4qqgdrvzlpqircm5f34pciwqiy1o4ucd33raoz2jc16x125ilqs2ewbooyphtuj4f1dlkaye79yrsp5cia79h'
    })
    errorCategory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'errorCode [input here api field description]',
        example     : 'ddvgv0yiynibz5cqu7pb'
    })
    errorCode: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'errorLabel [input here api field description]',
        example     : 588238
    })
    errorLabel: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'node [input here api field description]',
        example     : 4621860754
    })
    node: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'protocol [input here api field description]',
        example     : '678dsxonj1didov9cf94'
    })
    protocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'qualityOfService [input here api field description]',
        example     : 'v82wjci2klim4fktezfa'
    })
    qualityOfService: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverParty [input here api field description]',
        example     : 'o8q0u7g07i1zhmz808jdum5sixrwhxykz8x3hor741tm1odxlbc5zvoj79c5r638p5v8bh7iqxb2w2874b50aey0t83oufhj6neqzt3mbtd2qabbzm1jbu2o1cwemwf9s7oykkc21qbeunryklo6yk2uxijppj0x'
    })
    receiverParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverComponent [input here api field description]',
        example     : 'uio5yvoy3b37p2lv286rdw7c0jc8hzyn9fpm8ig9l42nh2kuyob31g6g424ocjvie90v13v81j1y6dyj1ofbuf4si5g1kqc5jy23wknlk4g2sre3zfuyofkpwoadwwru7ezhlacj4bm2116r1utyym2sakndhd4s'
    })
    receiverComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterface [input here api field description]',
        example     : 'm9v645y1hmt91c1z7q1qy4tod19q6zsmobe1nqi49fq5tlckm12bes9mikxv83fq2jq57e4qze7icb8w3pi40f0xlrw2p5zy8qv9lwy1dwsb2azdu9sc25bjtnalwvntegkqjnrrgdm29qbdxuiw1d46t2z877ch'
    })
    receiverInterface: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterfaceNamespace [input here api field description]',
        example     : '9a3um69ef1ylxdpgm13n1u40s831rs5xvf65hlsaz3lcrau7qz9n5udi9pl51ipay5kjswmzh93co185ird2j8bx7ylfvj1ldn60v3iejp8yrd5uy6y84f38yrsir2rc8la9ca48wqp53pmhwzptxkwhqvj8xpe8'
    })
    receiverInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'retries [input here api field description]',
        example     : 4259488729
    })
    retries: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'size [input here api field description]',
        example     : 8740636246
    })
    size: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'timesFailed [input here api field description]',
        example     : 5889087725
    })
    timesFailed: number;
    
    
}
