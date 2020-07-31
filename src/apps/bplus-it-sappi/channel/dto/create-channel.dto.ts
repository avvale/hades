import { ApiProperty } from '@nestjs/swagger';

export class CreateChannelDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '1586ced5-80eb-46ac-a3b0-142ed1d7f2ae'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'hash [input here api field description]',
        example     : '415nm2ao629ws3ro2wpjtje2t95iyqxxw36v1is0'
    })
    hash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'd6f6b978-8b5a-47e4-94f4-73d42bdfa37b'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'su3345fsppxfpybjm8g6h9za0zixrr8d8bnm4cgb3v62moxtru'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'a8fd7bfc-d4f5-433a-b42a-be2f88cab25c'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'cy9lvca98jgvdt6hfsoc'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : '90gmmu8vrwc80wc3miaozdv6p6579we46jjjzte6067gxasu94zhqyhm0f862b8wbg3zb99cr8nx85kaqn2hw8ytmuboftsec87hhpmuchqg8umz7pepv5mzgldz6ot734u6mp47lniqh7y185k7kinnzme0ejbt'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : 'cd7at5pfyhhfji1dyyqk28rzpo6s0647e6pcl4wh0fch8c4swxp519lposg4ert8mzgicrmuk900rt9grtnife652mmwn63qygd3ylae8tf9lr3gpvpb9nr3nnkyud30ga3bcqm1e5d1rxdkvbfm6i112ip3sxll'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'rsnz4s6mrsv0jx95ek8qz9hdou8maelopg8buap937admv59z7hi30x5t7eiiyqejz19y86nvjh9vjnfbf19mxnepnee6hw0czjk8g60i7rkkdtcajxfcjnyksitcvzf56ucwlcrf8uan1iiaclw70aorsamokoh'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowId [input here api field description]',
        example     : 'e942c835-0278-46bf-ae64-6a56cd0de3c0'
    })
    flowId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'r1fy5o0wbaricu3oyoocpihuap3bk5t4vvquha6um3fpshq6ssf4q34l4pf0zk9ytxcqpqql6y01lom127h5q59ob7j8jks2ekxsgm2v7yqrc5e3yk56nxbi75k4xb8huxypm49ry6aby90f8cdras6i2ax8hava'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'fb34ugyxugecq198ba20sfrl5jy6daxk2nmf0e2qrri5089n8qcephystdn7ew39vdde2yi8tzuy4dv6jmvod03nidwynpbrgyg8wwzgabgxqop79ubn1tja7jwv5vkdffjhpofm92blx486e4y5bjbjbogrf1xe'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'd7l2kg1ewl4qs44vlj3z4wpau1q8eaa7cqircmp1xnljsf4ip24at65pwbec5v96ineegag6ertoj9qepf7dhomh6pyfkyo00mkgph2x8w0f47lyo1le0cpsjf3e568tlh23q4kf3cx6iyzo5tcr4hnvpini8591'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'jvvsemn4qvdqzvyutjqajt8bltpcr6x027fnfmwudpq9vglsim1u6nj375n6tsdga743v2i0r94gh49tphhusaavhd6mzu6wrxilbyzziufn42bxr02dez8tl8xi91gxxl8fw0s8ml2tyos4jdh05bizjea4mq7j'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'c6fu29qp4qvuzrxmm1a6'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterType [input here api field description]',
        example     : 'p275hcemyfpcf2388f3arkcn8wvz2c93ft8bi0t1pttq7n4jwf73m53fn6bi'
    })
    adapterType: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'direction [input here api field description]',
        example     : 'RECEIVER',
        enum        : ['SENDER','RECEIVER']
    })
    direction: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'transportProtocol [input here api field description]',
        example     : 'k63j65lidvlhqbx15afqvctvqvia0uh5t75mvns6ibbdum2vsdllqo52pe4k'
    })
    transportProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'messageProtocol [input here api field description]',
        example     : 'jj0wa8qfrhjup268phautu08cldnsxvnn1p5hcx9k7kna2pz54lw4lc05tyc'
    })
    messageProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterEngineName [input here api field description]',
        example     : 'srgpje6w38zmne3qezrr0pkvua2l3in26fzencjrmah27vv9tle0vcgh03cdie93540ar94qpuor00ldi0olq9acbhddne000k820eth7zrttmh0cbus3meqrvtxvfelag457k56l4b6m6yj0vizmqvxvi9jmqz2'
    })
    adapterEngineName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'url [input here api field description]',
        example     : '30n3d9x1c92qhop1v34bu5t4sl6tigvgdzdd5w92a1qfefhd8wvq83fbfjm0f3ruqcvymv4bs5bg941dskly3qe2fz9ay7xm5av5mgjog82ro2sorq96ybe17ni2ki8v7k09qx382sa5l7ro83a88sdrxxlzw17yklxzhn0biyuqtyb840hqgmdb5tgc107adtem8vgqmj2niw3u5byrwalbdoz1cizqefy2ud9o8yhzvmvmeelqb35iebbcfcud01vrt7i8x1m2e1zd297inq7ggmjeadnpuumtxh5nknjsuc73tsb5rrdt30k78lne'
    })
    url: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'username [input here api field description]',
        example     : '8lzuu4wqx24qmkgn3tqu23pohf6471wcq0k8987g7qtp4uhchbz89b1mt7em'
    })
    username: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'remoteHost [input here api field description]',
        example     : 'iqaljs0mr422m83verdui2gt5a9sipu8qcbrmiw7u0im2e4i49j6g5egwz3sfgx48gxav6qo94bx9kjnt8t171l7u56pjvdwtzqvbagvylr3tgk0klxn0qnipwq2lcqx5mvd8okz9pltxc2ky8ayz9ns8fvystqh'
    })
    remoteHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'remotePort [input here api field description]',
        example     : 5706643974
    })
    remotePort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'directory [input here api field description]',
        example     : 'wv4btir37mxknhhnvcm9vjqk02g5gsjjiu48z1zyktaldh2ungknlvvflif2k7vtp9qvk92xfeeoia28e708zo2ydcqrn6ul6wbgpe6fuypu0lajijrl77uadncoqvyxu0tc1w9hzank10z6dl3m9i5oo4t2uj3r0xez706uty3hic8svi5q1liexb6mcea00jpvjyvgugj6rg83ujgvh071u7jr2fgpowk2btyy5eu33hl4vltlze47ccl3ks67tmp9xevrp4d0zv7xrcfoqfyboxei5cjeemm4neqip3d1o373nti2cz9ckmcqk2o4jvj5gip95sjpu30s0839zdb8zq0m76x9x373m4l9rhivhyviowwhp9qf0s6warr9afjimarprp2nclun0qy8lubj9s3vx8t4y6vsvpkcfx6u0nhy5irbumofovyrvxmhf18zqxjebiiynegiskg7gid3qlm1n9o61nu0h37h739t9fbt6f277c8ek4eeotmzc5p6g3mkm56tj3rkr4s289wywo23wddzgue70er69kswkx8vgfbfnyetjre9mw8eb2zrjajkjjvini2mi3fyaf64ugmgysmphz0lf4n3eyprigkp41ozor74655r3lnt1qktfc5tzr6ews6o1fl6otj0t4m8jloma96b82bjpop6lxmgdnb1iee336t4fih2dfghs7t1gfft1sq3hcttukprgnz244gyn7cm7chf5v7t0mast03ld2hiyqgy9a56k9n57ce5szcsati6cmmegkj4bph0zgkujc9uz8my96wf5seh7geh8s9jnqik8huwfwhkuygrxv2cmofc31fo5f7elgus7r3f8gri9wbnxh22a0nzjtayzsgnk4nk2dhy8o6uaa625wwzz4advl6eallcm0g2ixdez6zvpb1z3jyyvf5ibjsz1pjj33ib42tyl881p4o8zc68fdq0946w1nacbbyg7znoyj0lvtv7xy31qkne8o5lxwoiow8jpy70'
    })
    directory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'fileSchema [input here api field description]',
        example     : 'hnn70glrvcwvtevpd136k7ypq2byk4spdl4xoyg2nre90p6aa4p3kzgzprvxnhr5rrugu4ga1z71k1o773r63zr0wom433yigz2o0vwh3d3vbmxwr7fgqxe8f1wij0x1pqko8tw4ro2hclkjuu1qevmeur9mgqfx1net14akv4u1ev1svllcrhpuy8ogrtdnfzhvbaej1gwq4uourdnqeusk2f1kx18kf8r6nffwqj1ch5bxw3g64tq6p3xz2qyrliwbhe3mgq2pqvzfnrzi73uhsk7y7qtqnt1hrcdi4tbkt0q957vfkxmye6hetiihvfvvikeseopc727relbhhdbmqtsmjfo097yfkpdw83kig5nonj5731hcevskutu71s2k9omxvq1mof08txns860wm9hnxglzjon5zdnjwtjz4w9481bih10q162bm3olbhgzstl07tjnoewp3d7fi3o30qacdy1abbr92c3xgt95dru6fuctmpmq4gbqefcdi6ievdrn7trv80thzron00gbfrtk9dkr5ek38dc5sz27ac5e7qs3kwa5xg3a7f8rvs2z7ixpd47p54rs57stbmpstbmzk51eeggvwpqsbe1b4oj7m1mx415irhn39l5ws28vj28ocefcrderty7eeh59e133vilr0j3nz2altcm46zqsxhrbazh92s6ftnn4fucdb88yc4rthv3lcaz0ik9insuc7fzylm6y9cm5civgqgbq221b70v4j62tfvcmaqiia3jq3shm2zhjz3lzl7zu1qt58i9o34cio2cs0wknanglkyvx5m4phjxarla4kyzkv7nrg11j6si32j36vim45ho8ei7kb6b4k5fin7ev8yk3ee8htp2c10k38m0lxwztgryctlr3j3lyfbnydx6cm89826xtgo91few4fj5yq2ldb6t93rwqsct7990qk4s2u39zl2r9kle3t4x7jk9r2ntq7ozb464o42o1czmgvrpkctff3dxa5cz3xme3'
    })
    fileSchema: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'proxyHost [input here api field description]',
        example     : 'wv415emmndjlaqffmq0i2bou3sq17rxemzrcl1hphp1byri9dqtylo1mccki'
    })
    proxyHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'proxyPort [input here api field description]',
        example     : 5020587144
    })
    proxyPort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'destination [input here api field description]',
        example     : '23j9q3fqdiacom4ji4di75wf8wd0607aitshzm7a3n2ri7s60vhx4prqhs0s1eipmz39fizp97n7fb0ymoons7rojc8xlyw9s5ebv1ry8qiw0ghpn9srr65062e02eb6ocqejzwwfmezqak4bezdd3di644grfsj'
    })
    destination: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterStatus [input here api field description]',
        example     : 'ACTIVE',
        enum        : ['ACTIVE','INACTIVE']
    })
    adapterStatus: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'softwareComponentName [input here api field description]',
        example     : 'too3mq8493qznujpmtps68fllgjpkr2t0poyxss434p49hvgw399ee03vear3g2sq74jgek3tcbmw0xz2o7svlp27en5czjjg7ix7hkhgb5dtb4qivzci9astxnwollnr30wwtobwy9gkfp7lyzh999vze2rdwny'
    })
    softwareComponentName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccountName [input here api field description]',
        example     : 'bvq478dqxbso5c36f3u8'
    })
    responsibleUserAccountName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : '2d5esw7h3er6jcbuc3te'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-07-31 06:49:42'
    })
    lastChangedAt: string;
    
    
}
