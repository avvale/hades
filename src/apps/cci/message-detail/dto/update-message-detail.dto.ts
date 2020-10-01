import { ApiProperty } from '@nestjs/swagger';

export class UpdateMessageDetailDto 
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
        example     : 'xi0aqh19ol7btovpf4krjghko3yfab8wsnqrheaabz4s1o3wyz'
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
        example     : '9ffbk2a663wtlgf6p3zk'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : '3u1xyo8e5jwud2gnezqvi1i1v87czrkxonktkzbh71verua8h9uy71mgalc6'
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
        example     : '2020-09-20 06:46:39'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-09-20 01:58:29'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-09-20 17:01:07'
    })
    executionMonitoringEndAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowHash [input here api field description]',
        example     : '0c0uq2hq356etks0pvd8jysfi536yx5e9r5zcaic'
    })
    flowHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : '1c9av9v88d380ff5e0uc640kpc23m5ijefbnlk2mq1mrfkr9cea7ao7rbyydklvs4va2awpbaedd03ppsifeypo3b95o7dze863kv2ouufvub0vbuuwt4bigl7aaxxxpt1rx68v7vq3034g15qzeyjbzjtrs3iyv'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowReceiverParty [input here api field description]',
        example     : 'yuk4iic3f3mt2zhly7mcdw6dr2u78v3fh045u89nuj6xsmibfgfge50iev0h4pugy1sc774gb661zrijtbbi9n1aa7rq743mtjiowvneyo79qlkpvib43u3j4r0wmmwkucc6w7pmm1f1gzq9iph0hmrz28c154m6'
    })
    flowReceiverParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'm12ipftbeertufupuemuy5ewg0p893hcy2cx7zxpkmvxqib67qxpdw499yzmb0s0756364xu5epgiv73p1di1ryn9acdlcej1wqd2kwhm2fv9p6ot0a5x93gpnw6vtgcfas0eivd7kagjiyrvly4b3l46r9aryc8'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowReceiverComponent [input here api field description]',
        example     : 'k8dy22efyec34sekt59ss6ias7fa6o62whbl4ru2snok263ucihq5mi6s95o9lbtui7rjthe97yb0kuc0kljzj2b73dfkxj1fl8xu94sp70d9tp76uepto7yrosinhp0t860w6ea41nn9m41e1pwfhi9r2foryng'
    })
    flowReceiverComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'wlvm2hnena90xx9g9mgvezm6ppz3k9yx2lnkv0ms91xf5cn3ezcn3opl0tyd4g6y0p538z9iholh1d3ja1klfkyaum76013zgg2g5qcuryz9bffexk5lwp9xcv0nje6sa6uwc5rbniuhfqcvaqpzn94t3cprsq5f'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : '6rikv055ycgkferhb9cc2cz9cx5dgy3aefbike441b6lt9hv63a2kog23dew0pwce6x90jun04yt4w9u5787mzbxroap4jvgqosqz5vwigixd12c9y28zpuwu9dww9r07ef2zro4u36uwlssaqumd8kwa90w6ab6'
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
        description : 'refMessageId [input here api field description]',
        example     : '2oo92i98zqof4551ofjy85fb3wxh7n914i0wnzr1xc0zslheryyu2ts0azre2fyp0holbpp16k11m2tt1o3rv8cvg05dvne2lsa2ob2rkw9rysl4bsr8qk53pecql2w7lyix8nvb7brxql5ljzvuap2twc90z61y'
    })
    refMessageId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'detail [input here api field description]',
        example     : 'Dicta facilis doloribus voluptates earum explicabo et architecto inventore. Voluptas molestias aliquid repellendus eum esse ea et sunt. Itaque quo repellat atque. Cumque deserunt impedit.'
    })
    detail: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'example [input here api field description]',
        example     : 'uwmkjtkdccmj7lr090okenmhqgyzbdu2l4w85z8nuybko9wi1v4j31d2r6qycoc9yvu9ih975e0ftw83zuctko7gbu0e217t8gnsea3plw439uxjiltthvtyf2retvduxc5vpetxjeytaucwirdov9ji94bb84y5'
    })
    example: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'startTimeAt [input here api field description]',
        example     : '2020-09-20 07:40:03'
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
        example     : 'dyslnlyg3auwno7uueirznzec9dus31p2p03vbbnhzotic109do8iihy3y9dxx7e2ym1vhl81hb588g9sxcewybo2g4j2k964r3ue300x609uew35vg8enk8c1m2n1vzt0lm1o6jwtsbkbk9l7qu9ojnzkakougs'
    })
    errorCategory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'errorCode [input here api field description]',
        example     : '53xfnnmriv1gagtnhwdzfyklz4cofw6e3mm2t9fba1niwkrm6c'
    })
    errorCode: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'errorLabel [input here api field description]',
        example     : 947567
    })
    errorLabel: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'node [input here api field description]',
        example     : 8504073557
    })
    node: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'protocol [input here api field description]',
        example     : 'f4ov21d2xpbnf8mmikt5'
    })
    protocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'qualityOfService [input here api field description]',
        example     : 'qxvve1h10215yqe0yxcc'
    })
    qualityOfService: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverParty [input here api field description]',
        example     : '742ltxsl8463kiu3nyk3sncm4o9skzz00ae8j3za8ulr87qmyxkzacr70rso24ivjr9wc5meoksvdc6u3ur46es9ie2fnj45hnsuc5s82kz49ofh51mcxtjws0drc9x1e1ci1nlxfl5ibm4hht13qvana1zj4yrx'
    })
    receiverParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverComponent [input here api field description]',
        example     : 'g6kzhr732ruytg1o8que16qtdnidwbg6ydbxwi94d6nwm43orma6yz44x10rev4su3jlqwgv5iyocf47mxgvil6qt1mdi7odr800hior620jko0omd4q227qng35bfufz3l6i3qenps7drw6blhd2sc5c95v4uu3'
    })
    receiverComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterface [input here api field description]',
        example     : '7r5uvdlhn6ga1thpq4v4snd9bi2krhry1plh9hig1528zkm73yv4in9mjbmqtplekplp3xys7t9pip9d4ik5inelzb0temt1gexg1dwbeijci201eem3cwd4yijugaieq2tlty0eejutgtcstfam1jorpd430he7'
    })
    receiverInterface: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterfaceNamespace [input here api field description]',
        example     : '7e03g75c1568ak8z9jzpya0suexbeht4tv42gumrj97u8kl80kg9o4c0tlwefbwinxji10slvafse9cw37rbrkqldevz9iw0t463u6if1m14nk910xwnvs4o1l0icii56nyypu6v8d44dppdh85ro8pu6evlh64f'
    })
    receiverInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'retries [input here api field description]',
        example     : 2094295392
    })
    retries: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'size [input here api field description]',
        example     : 1662816597
    })
    size: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'timesFailed [input here api field description]',
        example     : 6245027109
    })
    timesFailed: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'numberMax [input here api field description]',
        example     : 8724154025
    })
    numberMax: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'numberDays [input here api field description]',
        example     : 4164282527
    })
    numberDays: number;
    
    
}
