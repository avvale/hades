import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '3a4ab88e-5a0d-4644-828a-834ca446cdf4'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'c416329f-05b6-4f4f-9b47-99fc7dbbcfbe'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'adot30nh7nakr9gcyqtap3zsp5i1odgrpuqi488oytg3td36zn'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '62c25b1d-785c-4414-8fa4-f5954855e72d'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'zl0cnxj5xqxspc9uv8uo'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : 'of6230ostdqqymom7am17qicdohdr33pzsrndjyfbssjhw8avsbis5fx03ns'
    })
    scenario: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : '037868d3-322c-4179-bada-292eeba79554'
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
        example     : '2020-07-27 21:26:42'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-27 04:38:10'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-27 03:55:34'
    })
    executionMonitoringEndAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowId [input here api field description]',
        example     : 'ad9fb78d-ea7e-486c-9312-32dce5d85c46'
    })
    flowId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : '7jrcfcv7mddyp657ujtns7fb12c39icsgnqbczfb3qs2tfftg04ar1e0mj0tn30vki40s1j7jcbqxhyfb8l9s1ppke6mn33s01wnrzqklsn8cgxoh9sabqcpb3dc47bgcky1ieu2n8k76z84d3bmir0ihphkf96a'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'q6wnpyau9tn38hyohfs1zp894h2k1h7yhalh0ue6tze41na0yq7u5l2z3uxjhwwbc4hfhn54ppu6iyz4e3tmmbnkdie62fg5d0bjga38zles0onsfsc6iz66aq7h4ck6p402rmviecb36hp0e63cplz9elhdmnmp'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'v0nptpx84qvzba42blzx4tor4sw168351n8ddjxzn64cvj1219vbbe2cj6fdiebl9hhdknllrwo2ev2wbnmgngn35e8wn97466v2iu0cd9l9sqfsg05rrtp2fi36oeuvf1n111u7nl7k81mei3bdw6awmv920z2q'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'wvjwgu5xncp4a1f77ts98cgid2b4rhmk8ixvg9ocealy90y1m5nxmm9mgrpwr7kiiavbt59w7rvpig7gbkqka309yv9tt4zr9xy8drpw8km43r4md06dkm2770j8crrn0sdl8826a2ephz7w2hta4itfjjcyblta'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'status [input here api field description]',
        example     : 'HOLDING',
        enum        : ['SUCCESS','CANCELLED','DELIVERING','ERROR','HOLDING','TO_BE_DELIVERED','WAITING']
    })
    status: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'detail [input here api field description]',
        example     : 'Quaerat voluptatem provident magnam autem aut et inventore deserunt. Quas qui ab aliquam tenetur aut sequi enim voluptatem quia. Quasi velit odio perspiciatis. Eum odio ex.'
    })
    detail: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'example [input here api field description]',
        example     : '6hhkyv4ff36w2ma4rx8s53l70egb6zghzxnbw8beyzurzg53r9xlu6at44n0ouxkl8up2921q7xgtpnu7r4m9fqq25y8mms33dtr3fhjhh1yca80vtlibpe5sdywaayk5xtqbprhhretuuoc4m9gqrnurn2xx3hy'
    })
    example: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'startTimeAt [input here api field description]',
        example     : '2020-07-27 17:08:18'
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
        example     : 'hbhfe57om6j6iv4v6x38xe37lxxsk50g4g1z4exd169poyp09vyxgfwysb10p5p6d654pov4d55k3ril6oz15v94085un2wbnr1uoikgbxiu4wd4dbwvqc485zw4u7bwct5k712sxg0bv5ztazr7x9cdqbpzarde'
    })
    errorCategory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'errorCode [input here api field description]',
        example     : '05h48qf4mf92xbizj9od6xlhykb880o5nxipweuv6mpwm2hoze'
    })
    errorCode: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'errorLabel [input here api field description]',
        example     : 463211
    })
    errorLabel: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'node [input here api field description]',
        example     : 4091138524
    })
    node: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'protocol [input here api field description]',
        example     : 'mc6y6weyzahmwbdaps5i'
    })
    protocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'qualityOfService [input here api field description]',
        example     : 'arjdqt4pa7iumek1yixy'
    })
    qualityOfService: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverParty [input here api field description]',
        example     : '3llne557bwj8pnmex3gwon53p8zsjnrhztydvkivltsgobttkb5heykaq67izfvhhnxydzin99jop8ygv8nqs3sgcjegkwu5gb2arhw2abjnut61qfowii9r50emlssg0gk856ylwspf266jezoas5gc8vli0fy5'
    })
    receiverParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverComponent [input here api field description]',
        example     : 'xfjhhdg5ay86cbp0hz0wab2xayrlfjitb9lnqpvb0yofk48vcr47yqf86jbfrz376dpbrk44i5z4vyeliu2c70mkwgc9qtz6hviuqml9zk3e5tus73mxycqbz8uzdgoqt3nwsh9ax540p3gghn51zq5v23wlay56'
    })
    receiverComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterface [input here api field description]',
        example     : 'u00xwjk2lwdjhfszpjbv9mzjdwio2286qv40oqqu1xqx8pq3h6hc1kx044kz45ak3cfubppe0zrke94a52lqulxlr9fo1n0etospvhi4pz0u9zn3gtpdht8aj202kdb791v3zonds2fy3vnes9v6c85q3zzcq9vq'
    })
    receiverInterface: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterfaceNamespace [input here api field description]',
        example     : '7wgzk3arqbxqyrh7wvvrkfmz0xn4dx7abgchcdkflr5ziq829cewob58psw0zziuobu9etobs9c5g3kimkci2b3gstufj4irdv2y2kdd5k6529m05ad7rmmnxgp1mb0t961q1wmvwuvs9xknoe3z8hsbnbx5f1tr'
    })
    receiverInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'retries [input here api field description]',
        example     : 1898857766
    })
    retries: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'size [input here api field description]',
        example     : 6990721228
    })
    size: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'timesFailed [input here api field description]',
        example     : 1064394147
    })
    timesFailed: number;
    
    
}
