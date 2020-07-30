import { ApiProperty } from '@nestjs/swagger';

export class CreateModuleDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'd83d0bd5-aac3-426e-8876-3a39768a8458'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '7f97c247-d523-4863-8aa3-3368b986ba27'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'q6s26h53qgax6skgethnjmtfc8rqemounyc06burqd009sgiy3'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '1930f027-5eea-4303-be76-3c77630bf4dc'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : '8ojnupiq4k9dnqenauk1'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelId [input here api field description]',
        example     : '271fad34-5cf6-407a-a7d2-eac8da83f121'
    })
    channelId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : 'o1x5fhvb3iviapfpczq5s640xxzqlg6vaoh2nyyrpkii55f17o6het16c2pii4t6rbseb42pcmuiihfx0jtfk1tf52x5e9zt7p0hhutvua9m5ti48hthc3emou59nasynrq7pgekot2r8qp0uivpi2i9qacr7hm9'
    })
    channelParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : 'i1qcxyopyq7um8t3tlxsor0sqribcduhnqpo0618lpd0ge8t6cx0u6ck1pubgis65wegue6ekej6dilnsihhl724pbuh52nqc2cns41c77umm16ppwcikdcqdl16wlptjrw7zyys33zokxgbt597kt3ba1lf2dz7'
    })
    channelComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : 'em7afi5j3rbagrr1i7dc8yteqsje37ti0tuufgzteygye8m8ark7qowenjic2042ylp7miwkgjhk4olwy8jdyjbfbkv6mcdcdd17zq6jj4v26nn9mhja4tfkbhjrlwloq9fhssgxgglzz0l31jc9fy7c7mjdra9k'
    })
    channelName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowId [input here api field description]',
        example     : '283c0249-2de5-4b64-b08c-8cd0109680a2'
    })
    flowId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'weqfwi8355ol3l55e9d21ybhrhptrlsf7rc8bs0h1cjptyk4fvurivdxx1772rjkh2gtl6rajuwfofnwka1zli5v0qz02h00tiqi54rtp10qanfdiqcxo0vofap0uystj06gr39qeku96ysn9phs3mq9hsc81pep'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'a9hrnxby2of2tive7xqvy4pa3k9k74cjp4pyh31i8h8j0vsyke4f9tgbwduv5c5tv4b00f5xtdx709zelzi25k007ju3lk3jy6zvtfju4idr1x01oh8lyiyix5jqwaey2x7ss6ejxaj50rk6zq4cm5lrxr4nycfm'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'y66sj55dki4oohvp4l1hhop57me060mi420p74wm8irovisav6jt5kbesjcmhd4nieajy3y8ox28rssr070rjtjokjjcwcfarsaxdu1b2og2l3xqrlwm27mnmaolf3c216tmuo1ql2qfbm6jzc0kgaggejbpcywt'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'ah3aarjept7scbk8virp0clrry8tpq1h2cive3poauur81kdmenlqombhtx5gp8vxq8gatkly7gzmux2uhgrsz8aij7ixwi7msgs3l72q36dgz0f65ns96vb01ljqr1m6fmapivc1qbay5onddm7dqke9pnhiwou'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'cz5h8ee8ajvh6er72d69'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterGroup [input here api field description]',
        example     : 'nz9w1wh0838k2sd8sma0rd0ngitnd36qa9jerb7g8scfdlj9n9jrp62rfoeak9imtrwv2xjpfdr5l8p6z0cuxa4jl3tnxxlyx9fo9kjbrunebhad2aasp2xl0ey4l66fwvabudf1212ywfkj3omru2sovde8jx7omlgvdorc3m1y06cfur82y4xcyo6asafsnf8ff2zdf61jgxuenvxb31q14kwlvfjh9jfnyy0l56z4qls495ooirk658ywk4f'
    })
    parameterGroup: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'agb6wbzzey8a2inmphktdz7j3zn274wwww7tyfxene1i4raj94ainod8ygu6fajmv47gvla3xwy1rofezavzu58agmhj1rcy5kvg81nuhqjm6s3uosrmdavpq6q8zf03feaecxlqr7do3ypr2j57x2se95mc468de2fd59r56c6x8h2hjfrwlwajm9hds7gwgvtrje1ijwb67atmtw1wx9wje1f9z21cickaysa6dx2f3ihcwy5gi42mfvp53sk9jaoghafqwissm97rb2t3dmh267g19dc2xs504jxvnjkkextfbvwawri385skqtit'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterName [input here api field description]',
        example     : 'quuwpzoevav7uv8u7ebig32k2aacepwmna2xffcqzb2k3pwsaa655rgwvrzjdsyge6mc78l7m3ooqm8v0xightrkdidbbafqzwb61pucidrd02l6cx2izn6w4kxwq5q0xyxon1llc1kgbvgwlqamsqsmnthma7szpmdu61xc3q6o8cv1dzh18f82lpjc9gbi5r2k6gchd4ixh7cownnr4ae6qpgx7yzbddkoef0nj76uba85i9bh7oz8ffz9stnlwgi0cqkf6uhzwlfbjz9zyeusvs0pbsoatv4qj9ac5pt3g7162hukkfhbtunoz912'
    })
    parameterName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterValue [input here api field description]',
        example     : 'oq9wt1peffyvfzjk07sduhx8vssm6fjiycpejkir0v7qxcob4t49z9u9vmspx7o9k2b5knsf8v1l3qettc99g1lkf16f956c8ci879nhw3u0fvsv3s0iq2n45dgg3y67fbgoin2lr9mkh5j32b4kauci84frhu6bubte7uxc0wc8p2vbj1fhrw9j5d0b3338atbyfnkfaceoqbjoq4490hen3zolpfbe2m0cb11u2zbvmje49mio8glom0t50q3hn79rrsbw38fhjwqfuk6fc99gatolrl5mqdvgtylil4zrbzagtgado3qb1l31r20gpl3821vgm6vcohuk9hyrg9mr6afl5fk1du8bg104o5rhdk8lw7msz5rzdk2yr00ux3rsy94igzan5j2w64acda0f5dsq4c7m15kq3m201fnspwytbyf5cugb8pct0x48apzxyrky8cnudgcjrns6damhymq0a0gqrv9iwlic6ht5y9n8xd2n14r1mtclps9ptls8fwt74471qmsw92jl4ysccwfr498ly9a3pf4euolmmzu2auw5goo7wlx3wdd13glah5q6caog4tkjdhnwwlz8y35kfxh1s7l7nc61qlwcdlh4cnc1jq0rsl6o095avatdh30u63lym70spmakkl0n0uunwt3jdn2a52rnnug3s64tjyc1u5jaskik5qdg3x4eciq2zovid67myd4eycvcgr73b465ublcsru70syg8q4qz9kt7ubx15bhll03udj0fkliuk76eoquhx7o4m6ppq4mj1dhqdjul5n0sii9y04vx3cck8fp3ehg4z96zswf1adh3m90mbu30zggu9z6ptc2i23bfcgyqnkhnvhdcdsfii33bm82qv1r901gurx7kk5i05y4czz7ph3aa5cd285jst6msnp9kgnaaudayex2m0h2eps0eypta853zuc6vf5vavm2x1mq4fh03q5iduqdf6yaln08lxmdlawc7g82qss8n747rjswu1cj'
    })
    parameterValue: string;
    
    
}
