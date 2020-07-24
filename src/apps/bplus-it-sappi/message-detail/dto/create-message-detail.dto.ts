import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'baf9e4dd-353a-418b-a13d-40063a154583'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '89d56833-9f23-4d1e-afdf-3e3b485ee7db'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'ygg0156w82xs62sidj4ba97v3nj1l3yq1qd2c5b57x2w3ucnw5'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'b0afe8ec-ae62-4d48-a2db-7d00d2602923'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : '5qeh9jm0v2ng8rz2rfu6'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : 'xf1t3ioultx35229sodpeie13z7axj1loatdc1nq6ml4x5bmtngdayccoaov'
    })
    scenario: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : '7fdaeb58-b101-46b6-84fb-1d8d18a226ce'
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
        example     : '2020-07-24 07:13:14'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-24 16:08:12'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-23 20:31:49'
    })
    executionMonitoringEndAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowId [input here api field description]',
        example     : '48d5d753-efb1-478c-8e77-4bbbdca30c42'
    })
    flowId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'zzvbgqft9p4qjuqg118ow1vws720h1h68bqb79ooowgm93budcl33hzjdqgogdy2tr3ci2d8srtmwupmw6tqy34y01tgjqbkok01mcxdfl7fcg054klx2ujdeik7shi393nusoj7f7cjudifigvolvlk5osinp4l'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'kioo02we6uf9nzkkh2whxfytc9wciq2rp3fk96kehatsyu73z2ewcwb7mkqop65rfdoke8rypa95ioppnsscktx3tkqrfbtk48kd9sdgp2uq6tfen52mth01eqdtabkgjlc9r9wl7tvglzue2bk1kdrry753jctf'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'xxpfq43g4pavepzsqraavnaotk0b0yvg01hii0lu2q92twhyrpca8scsl7zf5vz07fb1mkeap34m2lkz01cae480bxcn33bbglgcerswmvc2vtt04snrc1x929gbziwoy1grj8rkq9dwikwhhn3ip1x9n2nxcutj'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'ibjtpbqm4yps3h9bw4pfirkkbyp4cfrs9ghj3q3ylkbiktyz1ghh09nwz69kn1xaxwqjffzu7a6jouehra9ly3tyzttc702nyjwv2lm8zd7p57ab3gs0a6ygarf4pkvrgczxqcmeupheht93sq2hb6nzt5q3i2i7'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'status [input here api field description]',
        example     : 'SUCCESS',
        enum        : ['SUCCESS','CANCELLED','DELIVERING','ERROR','HOLDING','TO_BE_DELIVERED','WAITING']
    })
    status: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'detail [input here api field description]',
        example     : 'Perspiciatis velit vel non eos quaerat eaque dicta. Quam vero et rerum aliquid ut asperiores. Magnam ex atque est ut. Consequatur voluptas voluptatum asperiores aperiam dolorum est. Saepe qui minima debitis quo nihil voluptatibus quidem et perferendis. Autem voluptatem tenetur occaecati ut laborum necessitatibus iure nulla.'
    })
    detail: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'example [input here api field description]',
        example     : '64kh4e3d9pi7ovmmvgunlfcfnqv6ndk9ngx8dq72tw3mpy8fppspdlpq9ijrgds6ul4hlnj9mgnmshpxj8xjgbaj29lqjhz1o2jn6ndgsecrzy5ybma0hmgdf2wzamvi4vwwzbwae0dgqzwcv5p8myvpbf6r9pzs'
    })
    example: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'startTimeAt [input here api field description]',
        example     : '2020-07-24 14:21:35'
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
        example     : 'mf5zv8f4fs3dez7msg70d6whbottq0uskv1adz44noc5smwpw5qoh9pr0v11ngv9zpbqjs0ghm1zo8zdfycydqdo7sb38fgh4z5jkft4ebpksojet8dsxw68lunsthihrxqsr1j0vfspkdi8eufq3kzss0uy9a2v'
    })
    errorCategory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'errorCode [input here api field description]',
        example     : 'g65m42dqlli3he02h5ej'
    })
    errorCode: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'errorLabel [input here api field description]',
        example     : 783321
    })
    errorLabel: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'node [input here api field description]',
        example     : 3091782876
    })
    node: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'protocol [input here api field description]',
        example     : 'pemg8vj03n5p1am4ij3v'
    })
    protocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'qualityOfService [input here api field description]',
        example     : 'uncd19j4ddg8fytl5kj8'
    })
    qualityOfService: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverParty [input here api field description]',
        example     : 'gnryp2u3jmlxd13nlc5qwgl87tir89b1yfo3fxgzex8nrqyw3j14vlcfi5n5yve5mggf00o53q0pdhidlhkuuo75vllyp7eh9vbqtnoe4rav0ppw4utli8lzx6jk6qnaugsl2dibzpkob3r5qozrtatsutjgzwkf'
    })
    receiverParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverComponent [input here api field description]',
        example     : 'h60lf18tiaa0engdkr82vyeolk1rabf0emz7ptful856ymwl4kb5uf67mghmba19yno9ncpm1v34g53jaj94ht1mtmqedpeip8jno7ly5akl5273uozgl9ntty22hfgr4i9rc1zzstg0u1rp0wx57hamj3nzrm78'
    })
    receiverComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterface [input here api field description]',
        example     : 'oc653g467jxk7wl5atv9m82vkwhvq2bz591264huizzveto23szssp0ysx53miwaqr84li96n0zpp8i8wtrsfaerz4ld0k09e8r5920ceq7ruq9gvnslwahej0uuyylsvu1h2nxlzrynvaoz3kksiwws1wi4895m'
    })
    receiverInterface: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterfaceNamespace [input here api field description]',
        example     : 'cqxjrx0l8sg6ilyn1xl2dsayngxnv808y49jordn4lpwz1h7179jr40bj2tcun7jwwjk2ewrf5nywfqvcd9wici6r09fjm1j5kuqzu8p36amx8mrfrtu2bdycvc0mts3zmg0uq9lv5hxaunfd574wk9mul7h5pg4'
    })
    receiverInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'retries [input here api field description]',
        example     : 1885919556
    })
    retries: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'size [input here api field description]',
        example     : 8873450746
    })
    size: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'timesFailed [input here api field description]',
        example     : 5888731805
    })
    timesFailed: number;
    
    
}
