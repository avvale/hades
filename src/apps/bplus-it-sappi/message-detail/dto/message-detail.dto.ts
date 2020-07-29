import { ApiProperty } from '@nestjs/swagger';

export class MessageDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'a27ac773-ed3b-4f9f-8dff-685c65f983ec'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '3af88c70-a54c-4562-990d-44ab464f5c5d'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'yrb4d67yqk11qhk5jn1w5uf98rxnnos28lku45fg3fbw648kej'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '0080f5b7-8930-47f7-8197-62402c76fdea'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'c7wtmvqc8qrxj7vz6w5p'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : 'i0px8az27sf8hgj4fai7sogir9uhyuj2hbvlc6k1biyycia9b48dihyoc7qx'
    })
    scenario: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : 'ff016f67-887c-4146-bd38-356134465749'
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
        example     : '2020-07-29 09:10:15'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-29 08:46:05'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-29 00:09:18'
    })
    executionMonitoringEndAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowHash [input here api field description]',
        example     : 'ritm1c3mp6945eu1ybcnqqw7vtiuajvt1h9lsedz'
    })
    flowHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'bd2oxo8mcwj1xljm3lre2hpudckb5cz5z30g1g06ipiw3flt70rs1o9euehk0ab45kjpc7xf0o6evpfu243ib3mfgwj8ncmcpmonntf1uoz0q8ed3jea3oqycexexypxr5fo0la3xbpmsr8e9qpp77s6s2bsm5dt'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : '52fnm7rs6vb48g3qb47j2r3e4u3ufkun8xzxtrh5grsbzr3lu390hkg1k3mfswi3lkvjf3to66wil2mzjwruinro6r0rvz2rlib8v5d07cfa07z5r9nmbeugmzgby4dqm7h1av68vlfxi2j3jj2uc7boaurd11n1'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'afmk28lijrpihe2ij6z7hyg7gt53zwxh0wtlcftimzvrtix1uim9qctubnffyx4lcyk6fll68z67xtp4fw5r31q4gys0tdm9f6yaqsjurp56ahjigypjj7lpy3j7vd8tzgqvhjbtof3u6sz1v9ye2fcpw3xcoboe'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'dlqm2c277nazbk1e9l8oxo57flm3yn40e13ynmfs7h7ed4kvovmrmx8mgfexfrhvfqe81vz50l8zdo6hzvh8smaw63g8mzfaht8cydhkthkqiowjh06bzhwzwjhy3yp0d24gasergtcd4ntzeu7xim1y6k3mzb7v'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'status [input here api field description]',
        example     : 'WAITING',
        enum        : ['SUCCESS','CANCELLED','DELIVERING','ERROR','HOLDING','TO_BE_DELIVERED','WAITING']
    })
    status: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'detail [input here api field description]',
        example     : 'Libero esse sunt aut eius. Doloribus quas quia et officia debitis ducimus nihil et dignissimos. Ut ullam rerum velit quod delectus quia nihil ipsum reprehenderit. Qui ut molestias vel. Vel illo ut voluptatem quia rerum aut rerum error reiciendis. Non facilis voluptatem.'
    })
    detail: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'example [input here api field description]',
        example     : 'p4k9spw95ldyorn850imhxkra69j56s90pxibca8qmbbjq6h0th1dyx3wmiw2xt1lwvkgtuvflvaviofc9k789snb2ymo27maedruvd6ptgp73fu4svbiyobxc1uub9l1nxfvmw56ba6cnvms9p516f3b688nf55'
    })
    example: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'startTimeAt [input here api field description]',
        example     : '2020-07-28 21:47:04'
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
        example     : 'fdeeo958a0ytj2ga3gj21zu3nynsasnhpsiqy4cjit1mwhzx5dvjnyfdtsk2htiydsl78s4tmmftgqk66exd4xmt4injs26smj49but1p1bpgx6opy01vy8oojsxi6gj77s2lv240itjifhmnzuktibmmqk6lor4'
    })
    errorCategory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'errorCode [input here api field description]',
        example     : 'elt7x9kfdgux1heo787ida9vgomxk4tpu3j6oddq5hzbcrzi6v'
    })
    errorCode: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'errorLabel [input here api field description]',
        example     : 680336
    })
    errorLabel: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'node [input here api field description]',
        example     : 3541174043
    })
    node: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'protocol [input here api field description]',
        example     : '7q08q4jtceqeb86diui2'
    })
    protocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'qualityOfService [input here api field description]',
        example     : '7h0se0711scoqe3dqa47'
    })
    qualityOfService: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverParty [input here api field description]',
        example     : 'f372r2dn5vgg3j352jahyzcy804zidui1ochs1g124npaz5ylrh32qwg9pf9fz9oh6se371exc6meey7kk3mw2l1aj0ujajtyuaqpoyahadesi6yzsee8b2pyiphqo50c30wnj0wq3hhc2xhw80un8b0te3dgg80'
    })
    receiverParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverComponent [input here api field description]',
        example     : 'jjr3tlxh3ulit4jce87aa3bthfbelaon26x3einal0c23nyqqobu2uuzjwanvmdjccc428hfg0hzh1iktmcdyugqzcuj6k2uxb93v9e1oevascpjb9zn1w8wtxidxifbzkzrwqz9lwcvby7oyuxh4n5x3rxtwef2'
    })
    receiverComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterface [input here api field description]',
        example     : 'lew8vf0abykvn1qjlh1dyq5gfs6j8cf6tv122fjhx0v71f37dh2p7hjm9cextq3qmix2gf4r8ln98q9oftajiqoql8l4mv0fanx9lx500zp4qv8p4yfp1lsfa2tqdc5lmxrp9i9eq8zzhsg79qalklr5w0y8fkvk'
    })
    receiverInterface: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterfaceNamespace [input here api field description]',
        example     : '2eelhazmqjl9o39e0coymgjc6ybq2io6evxn629nw2u0rflav3r3z8e5ttb1t42i7a0yxtny28naal8aypcvrleg3plzls9a52zxb5vlde4m8uu3me4u2m9ogvg19e17p1q8qyumyx7xptwgchmc5akd33pqvccy'
    })
    receiverInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'retries [input here api field description]',
        example     : 2504474403
    })
    retries: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'size [input here api field description]',
        example     : 9362296824
    })
    size: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'timesFailed [input here api field description]',
        example     : 2053079091
    })
    timesFailed: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-29 12:30:50'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-28 23:24:19'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-29 03:48:42'
    })
    deletedAt: string;
    
    
}
