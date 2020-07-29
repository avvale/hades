import { ApiProperty } from '@nestjs/swagger';

export class ChannelDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '78c328a7-e8b1-47c3-9029-563372c9cc14'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'hash [input here api field description]',
        example     : '84eeb71dhyc235zixt361u4k3uhvz4u3apzrf9rq'
    })
    hash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '3731cf9a-6d17-40e4-a0b4-858b44e74cf3'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'hhsmh0lhqz3q67k7gk23fxfji2efiq0s5ncm6qodxe3zzp7qvr'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'a2cee2f3-7f2a-4b24-98ee-b7556bfbb691'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'wji3huh6ejqi1gc267fj'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : 'j9cvcldazwhyl5r2btxodorke85cvlbgtpg4eoifhwed272e2g0ihqzixu9xwiqrf75yzu4p8cm3evpryfqo4u8kunv6ay36fe7rdqeojz47yrxpcu1n58n1h0h6o6lclmm45c4j9w2mcx7lz34k4m3sz86f7gj4'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : 'r1pelrjns1mcwh6jjigxt36vwu9blnez0dh4nybf5p82eafwuikc4o9mmlymw4903hdblodqsgujcpw7vsunrhtlroqv26eoccfpdgkaa8ym1p2p6wptcirravhqt2dkh2l75avk5vv2a2jb0wuh68xneylm006w'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '76zm6x4nactsy9ff3gtvmd7fslqmxup1pfrqx3dyxfo4v908zbhvgbd0ptjv1xe0drsip6or6j7x3s74h5f8hertlplichy52vzwdh1m4e3iciiqvgkrep81ly3gvl5alx46xyz664gaifd175z9hkqtchxmg993'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowId [input here api field description]',
        example     : '65fdbdb0-076f-4ef9-96cc-03370603f631'
    })
    flowId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : '1lrxsgqrhcx8ewdj4ijfelim4k8o8k3rl0prciireabippb2byg6g80966ouo0rzn004666ofr0i426baovpnxmqt0adu3ct834nhf4tcy8id8c91pdbrlogx3pm7la4g86fiaeut1m9vuimjx3l4oq5qxckata0'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'ekllebnt0h98rzrcbbffabon7rq6yvh69ugnnhn7qq0ux8ze128cpjlai39obtney7qfi2jm66nozksy99dy2t3ul8mibi2x9hhvuc38inyaop448l2058hv0gpbrhaykwz0acom0gzaondli7czk1yindk0skbg'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'cbyfie6xhbj8mukvjp36kdn0hqjbvamiy320kbot2vz5wwlfs9mnulipqbpefjfrxm5yioehxyhoo09ugz8j32yiorpzswhnle86lwywnwksuwzo690828poizzf27tbja9qfnwqiievw8ki6415zq0nev1yo9us'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'lzs9r3f4g57bqnwva5mpm9q2fboke7hbrs6e9ve5upd1m06ng2ztf9l5y8d6almikhbdy4hk46cy82mkbrjqxihjaz9vw66t0k7gleuutqumf9eh9p6da49lqtpuzob7d14ngr5ne09a97ymjoy8sqw4x8su1fq6'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'eb9n6w1b4s2re472pknf'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterType [input here api field description]',
        example     : '2uij79omm1p3y5fkm7ld7li16adt74tefjrnyz7c3tzlei2zi6ssxt3xp3u7'
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
        example     : 'suaylk66tlbnuxfbg6uj18xnutnqq0ui9d8ghytyepku0tttonpstb2rtrh9'
    })
    transportProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'messageProtocol [input here api field description]',
        example     : 'effguuj5skyqzdp070804hgieayrossbtbr58plbtsgsulkxd4v8f6lghyp6'
    })
    messageProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterEngineName [input here api field description]',
        example     : 'hqkvqlppui8v1gr3p7di9f3k6294hbyr66x8nd1hmhu5t7gjn7jx6m2mllp2xbx4fef0s52vfpv425mqqsps5gjefdktna216411qocdtvok2j80vsiquik410vr9iy548ocibzl5o9kvtuqp3yjbzmlgxjy6msw'
    })
    adapterEngineName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'url [input here api field description]',
        example     : 'rn3g8cor71hvk1wwa8yh6ifuzbbzz1l88020s4d4avyyivqlytqscuao5i4dx4t7hyf8p6dnqw90jqk0d3ssfkrp7d572wir1bycpd68ps4tjvn48ul5ehd5ozp11qz5jomyvmj9wjol3bezue58qey74v3q2onozpkxcyaz21667tk7ihymhl1pjinqmev6dpmgvbb8i6204wcwl1pjodl12mx4brb2kse5vqg7kf60pv8efghfmyam415d44e5h8bf8m07ctewao94g7dffk1dqpwz8h0qpoxs1enckg8e1bo432b038s60hsky960'
    })
    url: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'username [input here api field description]',
        example     : 'y4ip98c2wzt3rhx02njzicbtf3nria0je1oa94sax5von8ntsuy6kfpf2tu0'
    })
    username: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'remoteHost [input here api field description]',
        example     : 'zn251flzioswlavu9ypp5odc6pm4brwkohz3mxqs4vn4wqoknep8d57070zr76rdg0teb85fcrbw9h3ol2i0z76qhxrk6xcw1zcyv4ttql6idsgb5kxt5jmv4kx7qepdsp3jrlrs8dji35ar0ypcpccin0wknmr0'
    })
    remoteHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'remotePort [input here api field description]',
        example     : 5692040958
    })
    remotePort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'directory [input here api field description]',
        example     : 'uwo81hbrizlremomdx23o27ckp4bjanc6uld4gcsoms5pjfpyktu842nd9uibmc9wi8xhq6htz9t4r8hhwzmpp7e7mo1uhuw0tmq9dmjbyn5atqzvt846vzcbyxs71twpgxe49v1b5m3ue30ppsjcxx0ak3bgej9zd7w0hh0558pcxtfrxje81meat75b8ez6ags0a5nhgy6th63y68x4jscb85rpoo5wumxdbl1d1sgol3sd4ybd49cw2u7rn3wytftlw8j1xivtqisn97xw28uecb3vfr7hyaxufvbvm7rptg2chcprdytwn8iwutlf8jsm283dvrcwc8scmnbl3u6610rp3q0zhe0f9cnjvwfbwhg3r7osgnp6xos0fp5jnldhc9ttoz10y386cwiwmo8qqcrxryo4ohqym0xfdi8qc1eheaxvbw8xz2zloidpb60gewcp3yrlzz3qchu2tmjuxcnlom5nnqdgsmk8um0rr7ooh8v7ndl5c53uu3t78qiiu8ucr02ljbs8i79kz2463c88hd9dh7ffadc8rmcyp5tdqbxkjbofkeqlcjjx73k1qidb0q58c1tw98dmyoh4grrz3f0iqfgp7oweqyocnhbs6c6tu93lqo1b9jyga1bvz57epd0lx8lyaxoax94b2p5ohanfj45g9sdfm9219ui264lnthm3wl12y2sm871qtsv1l66cjjyrdxy19cm99ywdu0ek2zpdrzmwwjy2l4mrzvtxheq4xa1i2a6wt0r0lm7gkui664wssz5biivpjqee6nq97upmzvm4ucrbs7s8yvtxfilojxb4ljtm4rx84qkrp2ixdwwo04qbegod6nb4bt6beq8cyoe8y9jzkeee4ozcydt1g6eywa6z9ugblb0hsimw7cn54mzoefehh0lg657zuu1djnewubka2p8id88j1s7elnmey1ovoidue770vu1af6319gr6t0v3iw5m9bitw97gigumrckneuxh0f9zlt1furd6nhw'
    })
    directory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'fileSchema [input here api field description]',
        example     : 'xek9ucynkhmhy47udepden29we3g0224gk9jklqzyibnbgxivnsb4j3xgrw0qpn29kcce1wz5r8bh31ag2o8m3fk48cy4awvjwybwh1cl89208ppzpgon5rot822xw28spjxxmtiweuatg24qp31ck7bmn5sbjfvidxyj3hzv2f3plqx0c8rcuxa26g7x9xteyixvg7awwpduj5tlbdo3gtnet8ddzh0n510ze4xm02aut9zftqk15or9598cpahq3utlb2kan0x0l8vuxzwwkr0qyk81ibrzujt1xa45qftftgyj3p5hg8wrvzke535p0ynz9x55ewhr1iro1qawodf3mvaqz4yysvgs3g04o1hwjumbm29lod5xiy0qny66toc80n887ih0kfgxssvcqakby6edaxxki3n02xqa538zjjzaz46tug2hj9z7slop4pxfobhnsun98m82dvndxqe6rcwc3s97s962v5xw75m7q7edly7ykfoy5yx5u8sbvuq6eo97ujpp35qve5cv92e5yggmi8xhgb9esjcilcqi0hh8qiys75tlwx5qhi4yby0xw3sqx8d21at43f7tfxkv234ddwb1eilgef1ynmthbzfffig59tyy1idqzmyjaqwji5bga2oijw2t79fsfxyd8jicllbmghk3sg9usotlkpe96clytcuq6n0uh0gotmeh49lyhzeg116os906rt90gh8hl58sey9kwnn9wunoud8uomy9momqdf1w5nwolcuawd2cjgeg3ovo5elcnr3n3251wkx9g3puflw71shnav2d2vufw42g923co82eciubldlj7yxnzvnwrplpni6rzhfwj7zdhe0cng693nnn3wz1yrjjqiqc4t8rbkyvdt3a2jhbr2nhf4esdtix3za77yohe4y81d4ixid2b1m1y5uyn4r07eyqey7fi53dsij8vdwbqmr7q823c3l70369vqcz8vamuvja39sp9xfem7kiiyoc10u5wkhxw6a'
    })
    fileSchema: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'proxyHost [input here api field description]',
        example     : '9xpn0huk8a1so8x9guua6sxbcv1svm3iu2akqq8v00s0968kpbbi8lzjqzky'
    })
    proxyHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'proxyPort [input here api field description]',
        example     : 3040990021
    })
    proxyPort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'destination [input here api field description]',
        example     : 'qfak7corzckxjmf770etd88g8yiv4ts8dx2ro1wlxz7hn3rs265foy2qomlcbw9lofydhv5u5kteti5jytbhf8v487lpb9ap4kr5qyzhj8vqrazu0mp1cqx0thuic9snbqrxwqo3ee5we4v55p59ts7a6wjsl89p'
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
        example     : 'xu156cn3bs1ylgp1xn83jdkr32e4tncz012eyizjovkavz4et94yko4mg5gr4dfosjzs9ldjvnh34wr6fmeeqf3ra1jn1t7vllc6cmvisr6gnradpi27j9etrvdsz5kpp8ul7oxz9ryzryy244a19w19qdrhpspo'
    })
    softwareComponentName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccountName [input here api field description]',
        example     : 'y0dutb67a5qta1h13zzt'
    })
    responsibleUserAccountName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : 'xz2opffnfznbtawtlspv'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-07-29 14:01:14'
    })
    lastChangedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-29 08:09:21'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-29 08:59:52'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-29 08:31:15'
    })
    deletedAt: string;
    
    
}
