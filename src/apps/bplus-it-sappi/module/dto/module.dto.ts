import { ApiProperty } from '@nestjs/swagger';

export class ModuleDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'bce0e175-0e73-4e47-a773-429215ad0f63'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '04cd311a-5e07-4503-8f07-e1390e4c8ed7'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'anq4wj73vign33vi8iaxf3nk6foyyjpv74mdow0yjxv3ne57wf'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'b0407ccc-fe31-4f1b-8421-4fa24ffc08a9'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'za6np5622qqij2mu0lqk'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelId [input here api field description]',
        example     : 'd27e58dd-b8a8-40a7-a121-0b02ac7bc6e1'
    })
    channelId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : '3q4kk51b2jdkxxy3fmbczxzd4gkf40oxhl6pvv1ulgkshtkqn3syr4opi7melrpa331fbc7hj1gtywbte9ol8vurc45s0lnqh0448v96l0o6yy540jnuovm2okokal8o5k5y3lnqwp2tdv5u3h4myt311nlqug5j'
    })
    channelParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : 'or2t6x4914hc400szyqrkwe6i1epgwynm3wky0v7dnbcvpev8akl58kh3lmcw11r17gf4zypntt10qxtzn25t0q7oo8ymd9enn6ahhnm16a581db056atbjk98ricn94x2g0f9usst35d5th2bamux9ahvs0y444'
    })
    channelComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : '6uzdn0umjjtcqcbml8v9uzajwt3w9jgzx0raldoaoex8j74dl5h9nok7rtc2ne5620u85kdkzgcphyz7jnoe5phonumhp8w0h5947hmazmh4z7ietxr64r72yjrouhmtny0pxs5dhsti1tutzkmw2c1u6dt0i8qx'
    })
    channelName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowId [input here api field description]',
        example     : '37d2fb5c-fb23-4e47-a29b-9f1386ca9ca8'
    })
    flowId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'gxyiv0w1evf1mug87lkovvfv9cz8v3elll4e343mh48vbkhjy3pswz6gq4yx1np69mwry9gbekig7i62t1idwjk6mrisx9hd4xi08nvpqwahjecp0k99zm7lwrn1ikns54v67tbuzm0c7mwi7ea7a9jjm5j64glb'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'n6p545eefw4iynbi774rs1ltabm3yve3grzbzpwro4migq3n9fp64aleiw2ljwfctx13qz4ddnawctxei9y8zb6soo9swraamzghcenlxozr8hs1umn8gkqq6dnpfnj1qfvml9dieqafgfmie8p83j5kmsequpai'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'hytexusltuocv252oyizn2ltowhmseka4e71w9fjh0cm6d1j167b80z9fpqlou4s1yodhhyc2ik72p92wb099l2qlo3r48n2a6lyms9zauyri24w5u9pp6fncxbui46mxoi3dqlxxnlrtybhp0z4ljk8nalt3jdj'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'e9zoiqsegrens7nr9o4cp49cgktbddkkk8onuwwxh0yq0sv6rogjf4zm8twyckmly0cs0vle9z70tytjq5m4hrga1973lfv2z9u0sv7ptvjh0eb0mo7s8rhavie97buqn7ryv9qc6ws6x0zr6b6fx0u4pjhj76ce'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'b9r8eouygfuabmds9ykf'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterGroup [input here api field description]',
        example     : '8ypq7qrl87ov5hakyysim0srp2mvpajj21uyuxz4tmnsztrphi825qwsd5rezb7ozjzfa4yjejhhpn27coc8y65d2rr08b7xn3c5kem24v5tmkhfvl9psfyas2xdyqe5kyerr6tlqp0abotos3y7xeie5d8sybjsn0sxv8hqpmnnr6sma9wxjsr5tstj3ezmjqg2sv2r4ahj64ahu5rettgvhwab09l0710fjwaur99g52wt19vfegjavjwuju7'
    })
    parameterGroup: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 't3866iubtimdqswrczonfwpdjd4kftv9gv6hcvarkkwvdmcwrc8tx33ccrpefn1py8k24fklybvgvk39q5g6ac39vzm2n016bpsu1oawdv7eb5s7atnpq8dnafx6lyeh1hy2dt034u4v709c6lfjco0fy7pf04uym4wn7fqdm2kfk37b40g2736j13igzfm2w7wznxd1p83u65o9nuepawtq44pquv1t59eskzcwbt4qyucq3jz82kvyjbwd0d7e3rf51rzr07u16cedbrxuwm323c5jvdgwpnjccntpsp6j0l3hw5jmxibejxlv6hy2'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterName [input here api field description]',
        example     : 'vwbtcehwkkvc45ogxv07bz2ebve1ek0537ddeq5tus421x2rew3y0qxt5i20px1vd5sjnlotvn8iq7ocq95w5ukd95qy3y4wotsd5rackf4q1yaytu8qokq17bld4aaq9nhwq35lnqd35qwvof252ldkvug3qar4zialf60rnimurxr12y4vaxaa7uprg4ag6dclxszjbl9yv68svdnm6bq6tq82xxh3veai0n9like8nsrh7g5wk39zwo06wzc5o5p0ftcg9oyvbd3wb39mual2qamny9a9f8fkmojrnd5zkffnef33swjiyl3mezr3'
    })
    parameterName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterValue [input here api field description]',
        example     : 'f0oowvp1pus6fxl2z6tfvzreuxe7y3u362c8r3lcy61zf10o9g9umpzbk88ze091ph612vmees5dc18fo9jbnr40sxak0klvxqrybz4gj4gyffaextqnlww7sankhmz1h01drduf41upvzjonou4xj09w6b8n0x1f70m01cnvbi5nsuo3p75ol7r9ag7jhy06fb5vw5n2yp0l0g4l4zfmn75g96h52zwcooo2dqmahnnue5ydd5riceozcl5ovjgc89b3tp5aehsf7996n3bgg1bu7c5gwrq6mkz5mskodxjkx3djmecsqo0jgcrx0ox98t1lynzi5yhbcjlqj00as9yqyjei7ucqsfg0co9ivnnoehlnn0mqf7vywqof541w20sogchni6mf4jmahc0iz44gcu1dwo4pg34qi9bn43gr8ov7d2ep6eqm0gzj7hsw1xmnnhbtzh2xfir865vhuq5ut7b5kfzgky42t7yuc3089sgeole04u34tnas1hguyr9l1a2x4tt4ver1xuijs4mwvspcdtw1yxkypzpy6y9hbkvy1om98607ruow9q7ijnvj9qga8yztp57hk0hsfbjwxxfr77kp7d8bfbq5vhc1huadfcsqx0oiil5ceohtq5r11a59seogipzw7go6ohm2ou34p2yv9o5bj76u4jyq53ew3och144fx5a6bdaag8oquqt1bfjw6tapliw6ax7j217pcri9aclwhg2r2xgrj87cw5zgploix10mg5yr0e8pdas2aelmqezefmucck8ttd815h214lpacnx3xxbsz2t2gbkrf3k8ic1usjvqjzlip11dmxr238ol29wccnif1ke6xfubvcrsi5w3shpzz7yhr03s6u3qm7164vv9dj1d0e8f7day241vomeejwu5i8dk5jvdcjp05xd0e8gakuu7j1h2u22xk4mr5ht5ehwfxsgvep3rzx9gasojam4ea25sq569lnv7nawjjynsespski5tr02fzo9zia0'
    })
    parameterValue: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-26 23:39:21'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-27 05:25:06'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-27 02:29:01'
    })
    deletedAt: string;
    
    
}
