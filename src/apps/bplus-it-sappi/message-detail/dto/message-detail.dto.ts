import { ApiProperty } from '@nestjs/swagger';

export class MessageDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '744cd95d-2717-4c7a-b502-d6716e3180d6'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '392a71aa-3c08-405b-8595-17f6e43eff96'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'vqaiwv5al6u1j4dg5t1avyi0z189loq3am1ganwd8qyoxjllk5'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '1010a45e-2eb2-432b-9245-4efa085cf125'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : '6ndnolsi3d9surm7rswy'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : 'u2z7miaw207rmplb35749t3phmwoxmr38ht2f7fmjg51yrxs7alakbtlyur7'
    })
    scenario: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : '4a889ed0-086c-48bb-a605-a24f36815e81'
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
        example     : '2020-08-03 00:19:06'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-08-03 04:08:01'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-08-03 12:41:20'
    })
    executionMonitoringEndAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowHash [input here api field description]',
        example     : 's5ujp9o661kpd6czkv9orpiktu7due0g2blcshy3'
    })
    flowHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'vi4x6h0ho5eiyyocbtdmwaueu7b4a1a4xbn1wwr7pbe64k2rsyqul9rnu2y1xwzvpv8vqkn313xqddofldf8fkr4qjs1j4aaq7cwk8n7gv3gejyu3bl9k7vnb7p7is8tvah71q65fn1cf0sn7u29w2ex08ras7ri'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'b1rw1gl8332suhcewulos4zxuwf9cpptuozune5730un7b5b2rffka0e3eo4j49paoogluece3rp12fi9cjyv4vagz6hqeua82ihtm2ld3zotpk7gh8my35ffo74uq6gxkh5psl197trn37pijtbi9opmrmb3kmp'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'rtoie53awgq64h60r6a6tgwa67xzvse88x5767pk63n1i3y5yjxmc5nbe71642ftamjk0mgo7s7axhi7662q43v9abhlh3fe2fcg75q14oqg53yofzpfxokfq7h2wqfod6cxmlp20gh6bzpk8136d0r5yzyouf75'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : '1dfhab8iy6ow6yvhwhdbpiuq5ljwycoc9nfeil2woh7dwm6gv874qkqcgdbsk7p2um360mvjuzupt2lblgwsqf8a5b9j8g5lwalt39bofs376tqrs64blgigsj6iebc7oov97s24o30niooixu7brhdi4fyri4qe'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'status [input here api field description]',
        example     : 'CANCELLED',
        enum        : ['SUCCESS','CANCELLED','DELIVERING','ERROR','HOLDING','TO_BE_DELIVERED','WAITING']
    })
    status: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'detail [input here api field description]',
        example     : 'Eaque quis vero quas in. Consequatur reprehenderit et. Quia ut laboriosam. In voluptatem aperiam voluptatibus excepturi.'
    })
    detail: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'example [input here api field description]',
        example     : '2tqlz7jndmvbxgi6r1mqg05av9ay40suj8ofybyiha95iuohji1cf3reju6g4l8bi1qvt6giozv9izauxx7cate4plr2ab8yj6jwaz5qffrblk3a8qpqnipw223ig0tzkoa20ojeca9eyb6419ggcx0tfgmks7yb'
    })
    example: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'startTimeAt [input here api field description]',
        example     : '2020-08-02 21:35:40'
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
        example     : 'd0rhavzkdan4qyawpyqq1ichv2up4dypiaqgnek1t23ufw2hzi9s8ehj7kc5vqm8bljsp45koxpkivbcu9xjoooh3b2cen2oovig1njm43e7zjhby1qwv06idyy0zlrkqtcs1imnrlpbmxb3oblmuh8qmo71g2vy'
    })
    errorCategory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'errorCode [input here api field description]',
        example     : 'cihheo0wwn17qxt34iom89rdot4wz4kywm47d2injueeaa9e5b'
    })
    errorCode: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'errorLabel [input here api field description]',
        example     : 918194
    })
    errorLabel: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'node [input here api field description]',
        example     : 5648478201
    })
    node: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'protocol [input here api field description]',
        example     : 'vnn6yjkh24ater15vdeo'
    })
    protocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'qualityOfService [input here api field description]',
        example     : 'pgqbwu335of6hh70dwh4'
    })
    qualityOfService: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverParty [input here api field description]',
        example     : '5cy2i833ybxvyu7n5vac6nn39hyvx0mhqmxjboija9l8h26beg90fbdath4hb52rrkhb143r8me5oozqys1sj8480yhtbdqmw46w87e53u9eaxjy8m77nsyy5licrj1cnp76limijcy3lbu3wnssl1cfuwdfbsu1'
    })
    receiverParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverComponent [input here api field description]',
        example     : 'j9oe3wyz3q3som8uhisbcbtsjx2dx251620kw1115mccjp1bgdsn3yh6n0b8xscuup9uqebatn5r6h1a1db7nzeoq12mip5uarbe4820l2ge7n4ez3craf0vf27w5eckfvhh3u95gfeov52axfck8xop8gs0bgvi'
    })
    receiverComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterface [input here api field description]',
        example     : '0m54r7upj9rvf9g3mjxiswm8sfis5w7zmir2bbzju5g2x64pne0a9f94y5odlke4vnd2oj0abobw8soq4brdzvku8nflzwa3a6d17qmsjralatmhd0gobtbx1781gou34o1autaacmypzb4qqltoxa8qi73n70ja'
    })
    receiverInterface: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterfaceNamespace [input here api field description]',
        example     : '7flxqjjaz8ouf74kuuh6v9ewfkvg67e0non6gust97uylu9hbkkcwcmj0epzoocxj3gh9xzupqbkuvj7iqncvve95ob666oma9p79hsj038dkf1vzoqodpm2omq0fx2xcoky5ry85i1nwvh2m56y25wv2jvy4vox'
    })
    receiverInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'retries [input here api field description]',
        example     : 4105520827
    })
    retries: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'size [input here api field description]',
        example     : 7602365424
    })
    size: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'timesFailed [input here api field description]',
        example     : 1848208243
    })
    timesFailed: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-08-02 22:47:04'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-08-03 14:46:32'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-08-02 20:53:42'
    })
    deletedAt: string;
    
    
}
