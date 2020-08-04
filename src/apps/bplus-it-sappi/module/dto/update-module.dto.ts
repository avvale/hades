import { ApiProperty } from '@nestjs/swagger';

export class UpdateModuleDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '9fc6c034-941e-4237-8561-9c0d549b37e5'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'a32de94a-766c-4f44-a089-18678c3d49ee'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'y1e0unj62jfut72l5ia4fbsso54fgbmfvg9qxum05yuhdcz31y'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '1a7aaf01-5e7e-43bf-bdee-acb54d74296e'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'g17xevhxmib0j6s5a4ny'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelHash [input here api field description]',
        example     : 'p1xh42ch71w1i6fb589yyp8u1u537l0l94iq9uzs'
    })
    channelHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : 'qvt474z5b4p1e7ifwnw2z33a24fgvddjnifpi4rjkfjoqxpul2y18b6r9a6hmfrgwpsie02hqmkxg89xinuauff2frqifn2els3vpztfizt9s0tvxnkib70zpq46ell8jf4kras5kivlvp3b4wph8tung50cs2pv'
    })
    channelParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : 'gcujm60uef4yaj8z5p7d3xlx6s4hydypxbj1y5amqv11jxf38741o70jprv6lahf9kquwvyce0ln7guz7v9gy045f6ve00eztux1pk3t60oblgv448ejjolx9jwqqum21w2gveaw7k56qqls2ck41plxt0tgfu46'
    })
    channelComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : '495j1arkdyoe36vyqq8duq39um78sl2wnychsdywcqrpglk9ebhntnjgkh8non37z8rjbbm5hztpcgwg25072g5c1839jnlv055va8kut9lssienpjycro6agh6y9u72gjdgq5gie9hvt9efq35998zfgc5ma212'
    })
    channelName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowHash [input here api field description]',
        example     : 'k190vjyvnwvw88wp7s5lktn1usur8a2sd34pxy2y'
    })
    flowHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'm8uya50uzc4anhru2crwt17q6v8o76oytjy7dnlewy4swt4uamm3heovv15uu5aippohntivk970ecqimspwavp63hzivsn8vdz3f2plf4bbesrt0ocr69nlpm1cf2xnarel31nzf5v2ow5z338cjhfc6kv74hgs'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : '0av1hzdx5c4thug9lxi3h327f9t33vhgmha1iinuzcsnlnxl2ov3t39ecxv9rp72oi5gdfuxi33xpkd8b58oad6pixedly9h31ln5hvjcux9l02d3vaqoc48kt4nejhvn67udjt5j2mlahij626yvhg2qzy74ieg'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'ew4jd1dj5tjktikqcj6wenchzfxmypwskntztu0tjgcjlufepmmoyp26e4cotzlhi8dcjqj0u5eja8h39zbn0uke4tv7x4y5sg0c92hthnm6bfvcl8bblieahm9snapc2qnaiirq77er1yro4trsangmt9xsjr0z'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'wi87qftz602p7hmq9bympoq03i6rk1jzitna3tsmqgg9a8rfa79jkhchk6um96x4qgmftuus24djzlfxxiyc1be1j65nm6yodpxhawk46ppqd7dc2cr2odjm0vrkfvkelw6kanny8okwpb18brxjcw8ws5tvhnqi'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'moj8184lvwe55hbt18pn'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterGroup [input here api field description]',
        example     : 'rsc4k7px8gjegvj5ocgnuliyrq1t2hvgrtlam2pg3c779jq0nesf2ftc0cqyt0fmcvlucpov2ye2u2ahmot8cvvbcyivywjllmhvj1z5n2jxctwlcnx1pxqeuao4lcofdfo5rqsyr53thz2ksd29mywq6gsdhjz25h949hw3i6l8uy4wbvrak2ujj0nt4vfph5kp1qln6pkvixw7jzpcavuqr0e7c4jzs5l4oqb4qrc651qhjqashbhriwx2x51'
    })
    parameterGroup: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'ltt58jc7gwc96mgmbsq6r6qzq7d033s63aa85nquoz76yjrasneokxjs3jf45j67xop52kg03ie46wgac2zxhf4czw0jbn3m77wf5iudvy0ot6mja4fcw2pwb4bxmblxiumoq2py74n82t0xrrejmzd26f564px4nas6ri7qu9fwssbz3dnfykqfy4a8dml1b4r9r1fy4kn4bbg1y1hdp4na9n3727y2c7ap4g9ofjrqxo3184oz69kedj64ibtzaffkvftl59q50avp14fk1xnw30h14z0ycwd9gkltjb5k206wycjqeu2m9kyjbc4p'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterName [input here api field description]',
        example     : 'q8s0aepjwv3tiw8i17c84nb6hm98tsw16czg0uj6enueosqfnntstfshnoo5cg819nh06l0e8rmu9mm8k11h8hyihnom7djj3xs20xskmxjz4d1icivuswhwy3gifvu65indxn1rulscbac8pyf6kc5vcujyvbu67s96cov5lpv95z5up3b1kpqjphtzlv3d0u6ngcvjo91msspy8ya7t14hswf6ddqylzvs7jp52jfz9i2wg41b6ru00vblkky2csd9p3m43whn0m6w2l9fvab74kix8jj10pcjwv0bj09sp6ilq5sggbfkl22zz118'
    })
    parameterName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterValue [input here api field description]',
        example     : '7rcc9lgknssigpux1laa2xmo1ew3kt9sogyd1vtux61lfx1fm869tzklqpp83a6nu267wuxn2ldza73091e6rls4k45g4uvssxk759gvlpirvwdovpg5mf6ppqd2qpjd2cz629fcppv7cwehu3qvgiimzttq9bbzap9t38igg05dzxchv09o4v0qgrpa426qyjg51hr1wvv32ssnft8yn4f5unxroqzll7ia29h2v1898ctlsqib1afpso5m76o1xvbdhvjhq8oz8vzymredwiwb34ll1wwk4m7oo0ujk6h0kw8spxbbn6po7i71slnch7ly2hdtxq638c5vjz9k6mb0h4llmngiwza2vjiomp5q0qcl7ff339pd442veeb2jys13d9m2dfcrurn77nonzycukklb49qvqt3ey5warugafb0pjoko2742d8cdbjtmsto93v5hnrdx82a561v438zjg96qis71mguhdgffkey39fu80qz65zyipfcewzoxue9usq4a4o5aj1e7ij9fdwad0rb6mvpysru42ymlhgy5ue8755bdrouaykpu13zucmt4d7ozde3soh4zh43jkwkwltixrteyy0sahqdt0t80fji8prurmc0e79q3lrf9c5iris67xjsjm88mnoa1fqy4y1ayhg7xxc913om1cvleuoq3yimqxdkmo4uhplrauhmsjk8hy1cbxy5m0glusyfu7g2r7wgigumsgqkiwvdc58d9p9cil7dlvjr35ofds27k3do697yd7f94z3whu6euddei51cdn5uuziq93vr83i44pq8a0cb4krtbm7oarb53pvtomto023b5n5igpxxaprp8ilsqkhkjj2xiv978dalmrvugd0xa9u3t6borvm0i2zh821kowrpoh49m5jw7dtaqf3u3945bulfm6d2hho68balk3x1wuv5w0cz5fpchwuk8z5u6ssoth9dxn2csbd9sska33lg25wiefr6mxxz863fa03azvqre8kr'
    })
    parameterValue: string;
    
    
}
