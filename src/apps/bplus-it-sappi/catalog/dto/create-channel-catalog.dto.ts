import { ApiProperty } from '@nestjs/swagger';

export class CreateChannelCatalogDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'ca360478-6988-4e28-86d3-10aa75f73e68'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'hash [input here api field description]',
        example     : 'zm2n6w16bxqbjzer3gzp3xym0341dkeg3aeydhsx'
    })
    hash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'dcd78845-0d79-4bed-b02f-47a91163fdfd'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'ijb1t0mav11ryt85avsh7aezb70msjp90l8n84lssjdlmxfn9c'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '3f03b1bb-71d3-4d16-8ef1-00949a1aad44'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'mrav9096p0ogkemppaaz'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : 't02tzizdta5hif4a3k7l6vv6qg94o42cj3r9bpu8rdt9xd9u8eworyujvp5o3o1jpuror0ngq08ka57cixbw8250s3mbw8urwq6hdn303895ewstvuzj5hghv3z3qloqslru0fpjeammknml6x00yax5i9twz41g'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : '4q816xj30kr241q2zcpbo4ogj478ex2glg7ghs8jd55yq65h5zoter563ty8e5mi9tbj9j12x31n62xv45gtks4xf9dl28i8csj5bfm8h0a66cz97txbe20uw546nvm5f2zyd0098oqwy5r7czvy4r4uvxk8oyxe'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '6s3wnje70dnzwhyxfcvgp4ywuq0ou4wq10hyy7cnu3pzbegzes5wd6qubz9yq4i2zu2jdtfs2uc94lf2ys4ohdb2luao6mtzoj5csnn5qg5ec98y9x1hix4j8yq40vd4rzvu60cnstxdtxb84t1cn4o5rhftlp5i'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowId [input here api field description]',
        example     : 'b6547879-31de-4289-8e9c-6c2a75de6604'
    })
    flowId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'esm03aizhstbtx7fcq1ddxm90pwx0mpiddb70jut2utv5n5298pf8kcyumd8nbzrtt4a7caopdcvjvcnsswxtwk1aup13mgz3qxtbxbpg809u9tssuhlpn9xhokmtuhhpym8rtxft29w3b8i1bsthgrpp0mqbqi3'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'p5fve552i683espshekvypp3fv5pvlms92tz676tqlso9poz0xscxens8qdtie3g1ok0hd24m3eim2zxw8bndfck8rdlkz78gq21d7tlnvzlalqtborcn3yshx2c0p7xqscgy2d3roj0cu128pfdf6kfncna4wcb'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'wfxcl8q1r07orvcke78rxwtjdcaymlnkpc55kin4tmuet2vgygckwrznp6n29sfrnpnhzav37xveijft9xkrjku2it1g5jxsi51l39eq22agfo0zwoh2xbyh11mnwkxeeu3pgz0omgwwnw21ie3nk63nyn09gjk6'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : '1lledh2ttjr6c4ew03bpgfoe3mom0e5xtlykrzcdaj5wppp9pzn9o95ztjdmnz19pwgrw7qx1wcfl1lgv8r9kbb9y0a8ttc95mlc8b5ik25mzxaj5qi3f3boqnrnhp0fn1rhr6k8m55mu3ndl4zk0c1xxzptet95'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'kqfc7hlgbryxbechna30'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterType [input here api field description]',
        example     : 'zv2onddht7guxli7q78zfqcv05pfozz34xzf9z21kvjzb9cps02ozgxrdqyn'
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
        example     : 'jf6ji3pg3vm41rpcpiqu2mn9jna85eg3y07ri8ky2f30scn7n5vfyuhx3587'
    })
    transportProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'messageProtocol [input here api field description]',
        example     : 'cvzmu92mh5s2kqwn5qonbrbddcpiewktus70pi9k0958eh97g7wqfhb27a80'
    })
    messageProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterEngineName [input here api field description]',
        example     : 'fu4ytyhqcms1nmhas8d6t3qj0l05lwh0cwgytvas1typ46wa03ngdxbwpo8aitlzi2qmgayidfv8sh830mxqyxuo3dgcalfrnsxo9gaso9jedtvzwhgnt8kkl1sosu88sxyyzzlthbpovgtbd4glkutmspqk6fil'
    })
    adapterEngineName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'url [input here api field description]',
        example     : 'i27i1jw0nne40oidzrex1jwlkxwx7a99dz92901j6yi1i6hhg0njzkp64tlmkad5ofknoqnu9bm6h123fstijgxs0z85w0j7czpmbjbnqp9bv8p0qncuyxqtd0avqhkcw8llhi6987towuoy3suvgfl5g6z2mtx0ag5kn31qtcjpglokw44sh12tpp86d90y5twbmcwi6tnye7dmsjnz2mmvfdn8py35y81un0m4jx4e9dkv2541cqbzz82ee7emmxy2lqu8azxd9s2e9mql5hn74m0ven91pwrvh0snw6h2zk1bzvpoo3xwlk18apjs'
    })
    url: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'username [input here api field description]',
        example     : 'owuqrkn25tfn70te52pxv5c9z9y8nn6d88bmmc72y8h97c5y5anm0ahtbwyn'
    })
    username: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'remoteHost [input here api field description]',
        example     : '2ujqe7am03enhvm4sry4i9n0m27gq7ic0jxmhkrlc8kbz1eo301jvj4n46c4fss3wiulz8hznzrjlh62umqvyveaua9gcgt6bml6r28kaz8qvwn4asqbtslurnwve46ejf6e44zvbdvsvkm8pzf3kg5f3aly8r9j'
    })
    remoteHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'remotePort [input here api field description]',
        example     : 1066105938
    })
    remotePort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'directory [input here api field description]',
        example     : 'wrs00xl09itlszguwmzvzvixgvu18syku36tvyhx5vvk0v7tdwt2nta168syuilrb2vtffyf5nt5rod7pw98v88t4uu8ik0ggou3gz4pwj7hpela31x8qh3iflvjz5il8bl68yd00fbhgn9zvo8wy9npx0khmh9iyv0n86kit01dwqp34ixz9o2fkcl8osvy5ky70deb96y5mv8omgrz9g1xwlmfxjlv1aif31o4so1b53sdt3fzo940wt0eq36g9796ufim5jo3h0qytltx6fcnrueho8ovx2m1a3p3zx93jwl13fg94f4j2cm3gpi77rt97mcb06xzj4ovsi82jxj2bbmtpk0y46gag3m8wc56jqfrd2py4jkc4l8oruffd3rl4fwk1hb9fackx8hxhvpm3l0pnap4ysrfjgpi4ojegp56tt7k0vv7rte63ochrh65nkxzy50c3t14x4ofdy1htlhijd3rpioo3zzbmja06bukf3b93vykplcsmh0owf5mmebzl6wygb71pb0hpp50btwehyexyyt2s2yrvk7wmewsks8e6v73kbgyhkr77y5zjg00zln9wcmooni2qo1x1lc33jro10954rb1nntqfwm53khtz707s7gp86p7rcfzh9w9zyr0q0ts8zs30tbosrooq6rlazroihzvikhrugmnlhdmul1zzgrckvc8llzcl7pij7rrdssgjqvxbn3q0jki53qobr9lbzmk6gt3sdj6kd2wehdni4iezz7lahyqm2aqeuqpugnm4lkz471hzq5ubjp2w1nv3s81xci6treevr22cpkdp4s94o9a2nb7ieynbfti0qg7e273t8pianacxpxmtqxpv6vb587s2smxc8c5bvy7bzlu9azdapr1qfusdqglaazns5m4furtld7n6swrmo17ftcukym36cgdi7jngcfekcszv2diu0gi0hqlfs0jhqle021ruzbrwst6jlta8l0rhu8ii18x36p6cli3ucizqaqvs94d'
    })
    directory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'fileSchema [input here api field description]',
        example     : 'seikcf198sd9q2zyo53x4y7buri0rnosg9syexmi96q38qgcqkd9m7eup88l72cskq8vvk33yrd0pgs30vwkhya7fv6afihwrtc822j5vzqrvurw7nc2u5icdvjmx8zf59ljcj37h3wozhu3t30rb3vkms581l647hi4hpcvgqlxkmtdin3ges79wzmgz2f5l6cfuvfhq1f1cw65iorbchm88t4kqi2pxlfk951laoeif6itll880nltkuppx8zb30rndmoklg5p0uxjvjxito9629bm74ybquvav0c2ieqwj6g9vyhl5a6nb41iqpdvag3unfpczrpnsqnir5j8s3ar1uwk97ca8ze9ys3wgr4y5otk390x3zitzthsr1idjahg1f1gco4dkm0d5stdfo4qx36m043jvp51yzca5waufd8v0quivc4mizm9ium89m4c4ql31w29epmismwlzz8wpn45jzvsuoeuozi5rz7ryesvxdyl6n9ta5a0ehd2s3afj00w6isrmjhvnv4l0nmurqlkckj4h2sa7cfxfzbem9ucdswhgd09evl6jv0ffvv8wh1uzulcmym6usq7gbxvjjnnn5rm9heg441j6ymxmx9maptufyzh1ucs7ik2i66nviq3hep0dnh4v91xay0jkgijids0wjp2pi9w756gg8mzk9w2h0klk1s5lc41v4vs4qb49ce1t2znnepnsj5k0fcscrozkskqzoyma0crv7y3uhzsy1b1s8p374mq16sluk3rphkqyl198t97sov3oxxwg01pprfsj52z1p96wtgsh6gm81iedz6vuxin1ftd3ynn8v8qt0y8vl61bab619fvzmbnsptelt8ufo87gnv2fgpitume29xmdhtn9dp0peqte92hxxwnnjqavmbc9zibcck1gsilttov3ovaccercxwoxu7brr9n3ps9jxedtqqeahcxlkcwqleb0ider130vsh38t4p81p9zowxlwt726u2sp6czl3y1ejz'
    })
    fileSchema: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'proxyHost [input here api field description]',
        example     : 'eynht77gdvfvuqqlpyz4p71k88ac2jxolwlx4k39g3coe96qd8td88rko416'
    })
    proxyHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'proxyPort [input here api field description]',
        example     : 3098040849
    })
    proxyPort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'destination [input here api field description]',
        example     : '3g3a4qwfnqvost8hdp4hb78wzc5zz5edhi33f8a6uigg3l8fxpayk4by1lyn7oqzakrwzmmdq0hxhtmgmw3t9f8ad2i0yqklroiwnl9jq91k8u613v35l0y7bfr8b4a7hh2mi8oyyyni8ddhepc52sal61bufeaa'
    })
    destination: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterStatus [input here api field description]',
        example     : 'INACTIVE',
        enum        : ['ACTIVE','INACTIVE']
    })
    adapterStatus: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'softwareComponentName [input here api field description]',
        example     : '2ykxrmb2s1q4vkikar5rh0ex1ux60iboox0mhwv6cberpp724wrelm0axytod0bnbauoco84griug4tsnimm8825piqjunlddmsymxljq58quq855mxny0x6xuja3ja40pl5dxtdx6yllnu3l27z0cykcrwvlnv8'
    })
    softwareComponentName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccountName [input here api field description]',
        example     : '2nv7vdlvy3jlq666fcqi'
    })
    responsibleUserAccountName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : 'fmiib0q72o76i8bnhah1'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-08-03 01:27:08'
    })
    lastChangedAt: string;
    
    
}
