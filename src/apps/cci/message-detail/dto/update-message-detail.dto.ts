import { ApiProperty } from '@nestjs/swagger';

export class UpdateMessageDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '53de2976-3362-48d1-8b27-5841b7a049b8'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '340d849f-8258-4900-8156-0610c134bcca'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'yin4kfmd4rt5la1mpwqoxvlczegsmz2nyykc7q5fofbaiovsuk'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'cb8afd66-5187-4eed-88c0-97713bc0db22'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'btjf5binjvjbfoolj4w8'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : '4puvfyrwbo64azrnzg27mzdkyr0yvh6ed3qbwqglzodb8iw9f0sf9x7p42dx'
    })
    scenario: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : '7ce4568b-403a-4b2c-8321-8aa3397dee43'
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
        example     : '2020-10-23 11:10:37'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-10-23 08:45:19'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-10-22 23:34:42'
    })
    executionMonitoringEndAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowHash [input here api field description]',
        example     : '8njr2xtww1jjctaj9et5e8hxkog3fsmhfzz8zr21'
    })
    flowHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'ams90xka9qvdlsxjuo3ms9lajzaosfyyt5mqfwiqrdxoy3y5gymjx8sa0u25n0wmjymgc4invxu8qkost54j2apwwpi8g8o4ruuh6t7deqgjy70wgvl4v3ublypqou6vvbh783pdk5wh0xgoef68ljy0dtmro08t'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowReceiverParty [input here api field description]',
        example     : 'ubhfr94hmbg9lhh3j9zv8ve4l5v3y4oinry06zvk6p39do26s1g783diyk1y53dkzmqoptw89204gqil2y7w2n4gzledpchu338zxiirp3oj624lkret85mwm576u6y4dc7paplqpr9zk3pec9f3h7ggze3pdn1o'
    })
    flowReceiverParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'kxnwa52wtus5cl447w3m1b2r1d2epw58wo1gmtpusxybjk9w3mu4r9n10qn39sx10kcvauv0ijhax31tyvhac5lhao7l84roeezew7ncr54waihnopyoeek416k5njitjjj8l7303np7fzbq9j5mq4s9q16d7ki9'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowReceiverComponent [input here api field description]',
        example     : 'v6nrps5ymunv4j51xasgao5ynenhn0484wtrd1x9bwib6j8bdc0o2tcucpvbt5kuuslazlqgf8c42gn3ocpjyjb986d7vd5pf4i4ezxq68jfsujec5uh50dtr00ql87zfx4c4xpptghs5qhtxa16zhi6y1h79oho'
    })
    flowReceiverComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'r4w2zj0k0do7zz999qg8ja5kb6tj9r6ixshah6psekqmlmliox3ws4jpekbfx8hchsz6r5hr0vs4sg31syo1c2mar6cuha5y6mtor2f94xmp5cewy1by89u6pktyls9ziyu9np39lgh6x0eg377ygltf33aaj83l'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : '0marfs89fsrq01ryeaspwv6h8mm3znck08jbto2zdp2yz2sfsqkuqg77ile054li7bf0czbdnwjmrrpndxffe2rmvgspa7em399jqwjqikowdnpuu3ooxpab9gmc60e4k7xvby3868jzp4n48cwtep3zl7cvtt32'
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
        example     : 'enjsr3fjb755vh173bjdwx59wko92x3np3nqw4zb19p5hauon4681ozcmtwmzxrmazpjwvpj2ef1miz8sdl9lty315ik6eysk9xn6190xbci0r5kjsipgp9kwv5vzzy4qctxh0416ka6z7qkghkj0lvl1g9bcfuw'
    })
    refMessageId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'detail [input here api field description]',
        example     : 'In eum occaecati dicta nihil. Eum rerum quasi alias. Laborum repellat excepturi omnis corrupti tempora et. Beatae dolor alias id occaecati. Et dolorem reiciendis dolorum distinctio perferendis enim.'
    })
    detail: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'example [input here api field description]',
        example     : 'koovz2yiv0fuds493rpfa181qyzrr1eb4i70rx2lqf04nqaeo1t49gg4t0wojxnu0t4x7ql0dgeut6vxdgeuy5duh9ivfymlpj1bwu543p0j8qiqytxxrve1uh06wzgnbns871u4h0j860ggqccgx55u9pf3moe7'
    })
    example: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'startTimeAt [input here api field description]',
        example     : '2020-10-22 12:49:43'
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
        example     : 'mya81wz0apk7uijv48bej3vs6pahmav3g8rkdqcmf4bwmum592d1um2h6d375fxii326mw2nmbwy1d24di9yned9o2uwbs7em93jur7db8capgplydb3uakulpx2z22yn8l8ai1xo2vge7mlcrni83ifeto1l5nz'
    })
    errorCategory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'errorCode [input here api field description]',
        example     : 'elxl49qmn3vn660zdg646fwtx7pfbbmfxwdkekyivzufe1yjcs'
    })
    errorCode: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'errorLabel [input here api field description]',
        example     : 614820
    })
    errorLabel: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'node [input here api field description]',
        example     : 2216561153
    })
    node: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'protocol [input here api field description]',
        example     : 'aancq703cxsxiwlkijxx'
    })
    protocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'qualityOfService [input here api field description]',
        example     : 'kjat7c3vu9y36u193a1f'
    })
    qualityOfService: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverParty [input here api field description]',
        example     : 'opgyup0o2vl6b485vpx9fnbinggt04srqx1qeu7lvistt2u4291vz6tywvwrq6e0rhn9qtk9zhk4hnv4jets7tgtlmcmtkuk55s549fwf5sqeqqrgwnwlwt1w43bi29v6flhg8ue8a58wt0a1v5p9dnssfntl3k2'
    })
    receiverParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverComponent [input here api field description]',
        example     : 'dvdnfub0cxaftkbqafthjmpzhon1ls0ike9g2uh7wwlfqlygcxsr1otm8rvy4elysxkq8y6g7cncke87w4pas3h9g5lqsl6dw6h0rmrmb2zhtlxelb88a6t0z6j0gwfz74yq7d2ffvdl16liwsq9ma43ep0rq9sw'
    })
    receiverComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterface [input here api field description]',
        example     : '81whygul02f320h1y98i4stem50rg9l32xlxgslbqj2coh50jdbc6buroizps8ra0nycnin2l8ptaf6kun6ytc3dypbzfb1jsbcsntk1yra34irrway3kc32oa8dsq0rv57e3g3pv2r1h32ry1wh27scs8l3vjoc'
    })
    receiverInterface: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterfaceNamespace [input here api field description]',
        example     : 'wf6cvvegxhq54ks5h98jlyq904os2de2n10mkg9zjy3jr9m2o1qrdt6trj6hqtshx6zd8yyjejz9uz8kjvg7nfi4utzw2qvpjm9b4mp4d53zs6zap07wy5ojekxok6ygn6ppensjvcets24vrkc0qjupp0zn00uo'
    })
    receiverInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'retries [input here api field description]',
        example     : 6576504782
    })
    retries: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'size [input here api field description]',
        example     : 4818303505
    })
    size: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'timesFailed [input here api field description]',
        example     : 8747566298
    })
    timesFailed: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'numberMax [input here api field description]',
        example     : 5806570288
    })
    numberMax: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'numberDays [input here api field description]',
        example     : 6247250295
    })
    numberDays: number;
    
    
}
