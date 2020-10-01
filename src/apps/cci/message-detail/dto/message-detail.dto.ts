import { ApiProperty } from '@nestjs/swagger';

export class MessageDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '27f9127f-0d91-4ad1-a460-ff464071e590'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'e1ded4ef-be0a-4e87-a29d-8f80a52c39b6'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'g7z16zg83lhcg1ifx465nmow975bjqpggwh5z0m5ws59u7grbi'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '48f27216-3426-4d46-a424-6e1ef2cd40b9'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'c5fz3aifsegn9623gk4z'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : 'i4y5tv7a1toh8bg7xuroacbd129nqesc21ptrbmtce5gcu7hi9o65nsizhg4'
    })
    scenario: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : '6b38dfd5-6282-4595-ba41-f59847f71c75'
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
        example     : '2020-09-20 00:41:04'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-09-19 21:33:58'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-09-20 10:28:04'
    })
    executionMonitoringEndAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowHash [input here api field description]',
        example     : '5xlmksos5nq98ibqyw5c48f7viszv6oguvwwtk4a'
    })
    flowHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : '3l8gv3260t0fy0hc6au7e1aocwua330h0qd590hcsby188ichb119z0mzgou6agsow3a37ud4y1smtblyqv62xqdyy24bbptbdu8zwdd8851sk8sfujb7uinh4gcflm7zp2cn6cx8ggc8vq244qbwsxol28ro3qz'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowReceiverParty [input here api field description]',
        example     : 'b8v6c87avzt0yda6x32xqdjtfx81a7b48e74l8aotgqjh8z1h49r2psu31rpg524ip0a8fyj54zwvzph68im3zaf3fttjqh9in7ckb9ogytebx4h5ojhbtg96lusprwymrxnu7ikyjzav42jf06a8idi059iwaq8'
    })
    flowReceiverParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'zh17zmg3jkqyjg4ohvgldmsmkt61zzdibo8m2vnx63vd3746krhlb4fnbw1jhxbl586qj6lkaxw1k6egxj3nhlgulh4zoikwtiom4g7ks3xagd6p5nyxp12nczvykh9ywqroo2wkzmkrgdcpv7lo0tcrjncxflzj'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowReceiverComponent [input here api field description]',
        example     : 'fd79gxzjotz42bwq1szkuh9fa95aqbqgioijqlz1dqqpd2exm74ldqaa1c57wvfb8557vue537p1s8ht6psvb7637no16iw82sy7ymm7s9xstc9ypsrr801313wdf6aisbw1phw41a6ywohfthwttj9en1z0pga2'
    })
    flowReceiverComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'zv64npm4nfrq60smkkbzj8w1mthtsocjgzszdtga9rzvtss21rsyede13lypmrhse219jdn5qpt9hq9pzh8tiwije86s4aayap9cwxe12cyngtnmruppcjtpnvcql2zovy11wrkonpcsaiqg96e7sxqexshcrn73'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'h8tzl4ff7f7wwyz4fp6c2t9xzc5crk7jtxojtuec0uri827udpiw0le1oabu1rier2qa3krbskkkfq5jdwgksthaiy3d97llastxocdm9yqrex3uzsb8tusuxhdj5nxx6ziivpihji5e7fmyj2k4j1jexdp9inw2'
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
        description : 'refMessageId [input here api field description]',
        example     : 'v24g9k9olwx07f9ujilqc8mgfbdh65yrem6getxf50rm5j344m45u5soq17pai0la565wcdqu5qrsz6gxoxetdr3eflyrn0zjbmvwcrerlz5xp50jhsux9djycb8jg498snd7ytp6n1mmhzwe28d0ybz4y43ydia'
    })
    refMessageId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'detail [input here api field description]',
        example     : 'Qui non sit ex vel quis quod cum. Aliquid sed dolor eos dolores vitae et doloribus. Exercitationem ut reprehenderit illum quia numquam. Dicta error tempore molestiae repudiandae quisquam consequatur. Alias incidunt quibusdam atque quidem autem.'
    })
    detail: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'example [input here api field description]',
        example     : '8nloflzy7hjwzaqclx3g4xo4q2auaijravnr32oc3gyvc6akmadftwkgqdu45z443yi0jdxermnq6b0mph7529ov4zi3oeaxyxi26oc6nogp4164a5yfzzitcspzmh4cvrbqpgnroy6jlz947dgx73n7w6fgjs5a'
    })
    example: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'startTimeAt [input here api field description]',
        example     : '2020-09-20 08:46:15'
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
        example     : 'cdftodc8c7tntqn8edhiyfsf9p0rmis9ekynpfdd4rf67dadvzh7ycfc02k3zb97oasajwzv15jcmarbff2yb4wyi9rzh7uzms8ulzg4b5fe1uiki0vgxsisguvcms577qrre2poa2eq0wm978y97axpylbshctg'
    })
    errorCategory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'errorCode [input here api field description]',
        example     : 'vnljhdrakg4t1ydn6ov3ajm8ph80dfuc4iji54e3j9fknnkcfo'
    })
    errorCode: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'errorLabel [input here api field description]',
        example     : 284313
    })
    errorLabel: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'node [input here api field description]',
        example     : 5525619791
    })
    node: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'protocol [input here api field description]',
        example     : '34q6lbdafpikydlk0i0d'
    })
    protocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'qualityOfService [input here api field description]',
        example     : 'sq8dx9lsc7tidjftkcx6'
    })
    qualityOfService: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverParty [input here api field description]',
        example     : 'wjs1a4z9k8ptiha08c5m19dslcg1pna8hjkgu2x54x1suhlnmvd0raa16spmgyufy232rpzm8qppl5rf0jg3i5d8g4xnprauk31wbmm7wgomuxlok0rutvz3ez37v2yv33a6op6fvjzp1j5enwy3ma4qb118es92'
    })
    receiverParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverComponent [input here api field description]',
        example     : 'h8uivu0d7lrd35i6kxkb7ogq61hvdg598bp9uduxd5g3ecgc3y66tuygkvmv6sdzi5ugjhk9ymwn5492mh2xzgnytyjit3fuutw6up8oa7x5ookgrod6vmpp3obmlaz0q4m6hthn5iokqssx0mw7vfyt7zmx8m9y'
    })
    receiverComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterface [input here api field description]',
        example     : 'xqq0m2vf7ikleu4ccfk4ngoc7zp1kmte91gtzyfy0h9t7fr9v2v4n0y6drbe02krbqrqmcpnwt7sqta7mexbai0ecctz7u9lp87yw4tkpgj1groaao3k5hblk6x0i1q8bfrt6q8iahg3fbf6znwpbw5j5hozc8me'
    })
    receiverInterface: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterfaceNamespace [input here api field description]',
        example     : 'kvxkpdgh7o4im1arrbf84zm4n2bbh9b8s8kctu2h9oqmdi82ucysj84i6d6zmsg2nylfuusk5004lv4jwobyjlt21j254upl6n61sxh5m0uwnzxuqzger6ex23zdzpw3ebyo1ntyw5f6yq18xnmdj5a0pp6c7yns'
    })
    receiverInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'retries [input here api field description]',
        example     : 9981016714
    })
    retries: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'size [input here api field description]',
        example     : 7962954226
    })
    size: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'timesFailed [input here api field description]',
        example     : 6169061660
    })
    timesFailed: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'numberMax [input here api field description]',
        example     : 3761635183
    })
    numberMax: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'numberDays [input here api field description]',
        example     : 2219048438
    })
    numberDays: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-09-20 04:08:34'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-09-20 01:38:43'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-09-20 16:57:59'
    })
    deletedAt: string;
    
    
}
