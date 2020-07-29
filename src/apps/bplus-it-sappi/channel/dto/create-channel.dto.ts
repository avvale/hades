import { ApiProperty } from '@nestjs/swagger';

export class CreateChannelDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '6422895f-91c2-4399-911d-939f1de6d2ef'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'hash [input here api field description]',
        example     : 'tpjzs15vaze7gl21ixw65yrg4zvus2ds8kh53czn'
    })
    hash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'f0af7963-f115-449b-b2ac-563c70e15043'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'kvou7uluobry1h6jb5zelgw70de9nc6p84b6e7gsh1xucr19tw'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'f87481ef-348e-4618-81c7-6695caa9a574'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : '9szwjhzb9qtere5kh7qh'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : '74bwl95ozj1cdsbwe1714d2gp4xavz4vsrwat63z09uo1w4ihbvrsr422gkx4yqvyfegpwkao55ki949r72k7vkdt5ch8afk0c5i3zmyxbqnhs6rdciq32c5oh6a8lwugjumftex7ib1qmh2jylvsjkh13jte70i'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : 'nljt2t3reyv0gm0byntk3fo35si1ux1scobj4t4e4m15yxv12cpkosvjmhbsjm0vuk5agi7f35k5jkdo81we1bd3f1pzm4wss34oz88imybcn1lacbatqu2xbucud4ypaliw83gqer0k4wtg0h07vqtt4y56uwwg'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '1qp2ra2djjeo2w107ecczg7h0woniujszkybmoy4j46eme7yhkkp30cys6z6d33htmgtz06ycwygsvfwfg3t0bmnwrrwpv9w9fih0judktwme0fqfq0hvlhj0fba7nfwabwxjalland1r2fc2teypg6wg6jm19ae'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowId [input here api field description]',
        example     : 'ec6beb9e-9140-4ab8-b29b-c0ddc230fd98'
    })
    flowId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'suxh33851myeh86f5mqqqir1t6436h0r7pp8wehbcwggeyrmyfe6ijpbc5itgww0dkg94h5mxnghgrfskhw3zrhlx00bxi9xfrej9j0f9zdyzlz2p3ythivn60gfc1g6v0y3led14s88oz2nmzu310sdfnrot67b'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'rjzvdpdtqj0bd5rr0e4s8y6ni87xfpku9keo1o8r94fzd1v9n9cv6ywg65gjbihvqyrc5hvlagwc7giquw6bwfccavuqqw8qjrgnu4nxgg8dfhjah0f2388b7tyxfwj952sjerwkbiz4iachtoe25ozbq7l74cy2'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'tbo23fawcu6b2aulv3kwkravq0x24yzam7v6sdoveq4dy52v7u5xjnepjn8b53ik2cok5dz49hu0d3dqn6ptw8ztxmraoi7vv0wlx8y7gewrmmynblevro2gxa9zg8ly5mljmettgjnmrp1iv0zl8oroamg5igko'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'tikydcyvegjzc6luiu0itotu6gt6sk59x466knddavzw90sh48sxvuv7vrxarrvsoge5l29jvowlav86wy1wy7evvrmvwlh4wcxrwmea4u8zlorwof5upzikhg6eck61lg5ivhajodiauejma6ej3b8264ojhj5q'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'x983l352lxph28sh6h2q'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterType [input here api field description]',
        example     : 'wo7bmfffrkwnqv0uwnlco7cq4zr67i4bk1sy7b731dk88q99vlso1rmrg9e1'
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
        example     : 'za6tnygfw4n4r7ylsmu31s6x4eewl5w3ms18f9vmbfi47uxnl55ma5i26rci'
    })
    transportProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'messageProtocol [input here api field description]',
        example     : '5mrnig0xngm1qosmwehu0rxmqezouud4ipdy7ue74hztvwicqtniyn3e30ea'
    })
    messageProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterEngineName [input here api field description]',
        example     : 'he0ydceq0yxhh6xtylrjk813t61l9ajitudtwurpxvrhjiw07bu28ypo1otipm3paqppjim7re24l6y7kwanskyoejhb5hm6apb71fcm0b6ka3ojxdamnilwxl0gcdlzrv24p2jte7h49lpfz075hv5f9w0i8hno'
    })
    adapterEngineName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'url [input here api field description]',
        example     : 'fa9sdvdc25xz3hf1jnqq0f67971xl9kg7jqrwptu87ace7r1qrmjeye91blwfqsqdf57fj72yjeiootpyu4anb1uljlauu581m7f8p5g97w3flopwm2i4cdbxg24yba9gjvm6vax5c999y8i44jh06htve50hpb3w1ryiwreamy758w9o3xteyav1xl45c2hpisni9bgn536dcxu9r1cqt4lxc2i05qzu04jdsi8sx1ktshu39qjizbhh2uhmlyskbgz4sqp1810cf9sjyakjitbokd4hn0ry25ckgzfu82pceha1q1cqhhldjv7izql'
    })
    url: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'username [input here api field description]',
        example     : '1ra2jtnzo9kg0t141h46tdl18bpcz5m0c7lrjn17gu5mjy4qvfq8zw0ql2yg'
    })
    username: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'remoteHost [input here api field description]',
        example     : 'cjnt306ehfu7upnrr2s8036wyo17xu3mqrrqcw0ed2lo26ca7e9fuvjcsc8x068qiboh8xtzwj2xrlmoa9jg2z1fl3xh960prhfan9mp36jvl4ay1g550wtkt2znb7jseub6nzdqdj1p6xkitogkm4ebshd3eh0s'
    })
    remoteHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'remotePort [input here api field description]',
        example     : 8304550653
    })
    remotePort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'directory [input here api field description]',
        example     : 'x36q5wuit8dgc5sqxrcmihnojy60y7dn8765j5qx1jlmdq4ke49hykq65ebybb4e9k280nhc4k8qczoianvc4izk54dqlmtfr9gqbaeblfwfrmxg33m8m1fs4rzjoy8tm8qlkmshfm0k0htrp77xzqzugsy3gx3hizu1bai15mi1x9s30t156cl7pwp4zvcd1ihs9e6u929j5k66s5l20p82ydylpizi16fjdlwqngh4ftejvl3yo307rs1cf11896prqhj598bi591w3jq434zdij35shrehjy8jjdp221im0din0h57w954jgnsp9qk1pxss4a35rsg2vb7aphd5ejdl86vkeievxfrsgc1ysud9wby7pc0yimnjxclhqy39uflm7l834o9b74rrh9izca4zdcatm1idbhm2folulsc9qltm2omd43uixywa24mgg9txpxlv6tg4ifqppvqa7hfwiqko680c6celangk1uyrbq659lnzqyi82oxqq2qc7gfp5mr0b2z7imyf2omq6olgvudu1o8lupcj3llsyaxqvdv3q610rwxtpnvyl49k9nyo942itjgfwwsas7gl5sy7e5sa01x7iull8s9pgvlicjfj3vy5ee62d00rw4qmyw4o0rtneexrpcbbk2pb0awp0aizab43hv8dkn82fxf4iro1rsgpdqtrcdr709os5mgqif8dexboubk6bgixk6hege29czho83att4yna8g6yimfp7z0a16djmrk5vsjspi3ubu6s2jrb1lidpcw66xdzld0zdhvq2fyryf8f81oss1jpmchmr71qgm3sgdifa3mbk1w1sf83uhkdnmdxx11yfhnjsvsexi9g6z47hqppyclbdamgztg9fry4nvmhburejqfklyjz8qiql8l5fvhfgob32x2weo6b4s7re4kwse2ujbt7wzqxtjen4rn4f4l5u0or5xobgg78rkp98ciwruvgguoaeogi7i5tvra5r3d22e4ex7giwaozz'
    })
    directory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'fileSchema [input here api field description]',
        example     : '8q6ec6u1yiqqb4kij8b8p08xdnazhbsocpyl66bb0rghofm0q2b1aif06lhxwwhjg6hlmbe5kemw0knbb7qxv516n7lrgaqzdqk5tpprq4qy65mfvvw0lffimvu3i2x3vq9k8qwdgxz42jcd3focub1h616kpdvbi51c5n7cfy7ga2ep5mxuoqs7reap0w8zxrdgu0gqgjfd2l8dfx6uok7ezffpqwdejll9pqow8c2rxhhxy3mzpcmkg3g78c419silkdln83dsu0f0j046mpu61l11rnhcenp7y7nbxykjdpkxrnsin0kx0capyxvsoo6dsgr1bx2et6surj9h4ppbpj9pr628oijxfope3m6ev7p2qszw224niqjm8jtacbocscf9raasfstacgpcx1490wlx05ztcnblokojeg66ie2eajg8a3atyq1xdwzgc8hhy9rlul8z5sioosmd6ux9osi2wquutxspda22kn4iqk1cm2amfmry92rm4di1yaozyez4ixi8zp5uwzg595esu6284jvu0gxhojb8mr0s5g1kukbmpal0aqbbke3zm2sy94ib6yr4qcfzklpu9tr9xyqnj4u9z6kwu1zzwvmu2k3j5pmqce9wlyh2lcnc68rf3119g43r9nsfadgbhgvrbd97icikd6q5vhbsaa9kjfaljko5pb52h9olard5b354ss8mykne579zhjd23kt5l60291bp0geyu3874xti2ll7g52xsckhrvr7brv5wzfu3kysxlsnhblvzhonjjajj2z5kqv7lezbc743mhhszryrvx2ulzdju9oirk5d4vc5mmhmxh1lmfvhrckr0hdt6601kxlbgun8qbadabkch4bpf8cin72azgeh4pnzs4vawz6gybo6ldbpjmyxen14myr1289u9romayliy33zdwxbc3lr4sc2oqrzkamo4qae0bbkepz62vrth36w45zxtbm0nt4a4ksk133ek2aznm4qd5i8gir7u5rswqc0'
    })
    fileSchema: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'proxyHost [input here api field description]',
        example     : 't88o319uv9hb0uymssg84k5648s44xt4mah0cr24wxv0kswzoon14839k8hn'
    })
    proxyHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'proxyPort [input here api field description]',
        example     : 9684681554
    })
    proxyPort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'destination [input here api field description]',
        example     : '5ya7o06kcjxbpm8wyepy1eka183ze0kaffiafir3c2k4pam7cnedx8p20ju8z1qxqf92m5j852vbhxt54soy4llhkyf01ju3p42rfqvkmdt9andpl6ik0oqwq4dd2km6lyadrrwfv3n3u1h7nh4uacaistkq8r3n'
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
        example     : 'wikavlqtqxafjuul76ksi435vfm08ydvnryk0njcrqbfaq13hno6dgdpfqbu2nzuelkx7tlg50u8g6xobpvg48erxszbgb4pdnhbj50xv50pi2q2z3jxglo7q4wzyz48waxsa3am57pbg9xtasadg5ddz453hbsm'
    })
    softwareComponentName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccountName [input here api field description]',
        example     : '4hoqlvrjf5rrvvnffqw4'
    })
    responsibleUserAccountName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : 'y02mva7agyo46if8nfkc'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-07-28 17:21:32'
    })
    lastChangedAt: string;
    
    
}
