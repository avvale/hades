import { ApiProperty } from '@nestjs/swagger';

export class CreateChannelDto 
{   
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '5385dd31-7545-48b2-8578-50479909afa4'
    })
    id: string;
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '36d23852-dc7f-47cd-8244-16b4f5e6cfec'
    })
    tenantId: string;
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'a0dc9ac5-dfdc-4150-aabd-b88c552926af'
    })
    systemId: string;
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : 'd29yqkazoprakflzj28wdmq9m91w9rv7l9wg1yjet1bbxfwb14nesepmzojk6xgvabn0qwpq4g3kfwzntv55qcnpmvwhoeqlg7u5n6o5lkvabplee3au6w87jm1xwswhqn9sxgvxucw06kgjchn8y6k18hkrz7b8'
    })
    party: string;
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : 'opar9dl1oi7i2dtcf22kjqjyfp6eixbyreb5svw37k6g3kwc7msh0yxtbant4z0exgom1gnjahaycdj0y0cmnvr8pm6kclyywirktcdkhmb0ckla65kahm92kejcyafk0maegc9cig5kab2iepyxcbjhi9wg3enr'
    })
    component: string;
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'l6z3cv65ooaewx6xr1vs2lgn24uyt6awlrzgpqt7ech9gjm0f8bcmm7msa77d8x960gimie7wkp9e1u1sfl3kq95bk7ogwnhqfrqxz9cx1wl5m0hi1fx9xrhkig10pzf5b7trph6cqkps6a8p3hdp2eby9m43sza'
    })
    name: string;
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : '9i4svdxs3eyfthi4x8abiyket1k5iho3ciwy32y6t06lvekbxswekvehhhcjc9xy7the79qnftcef9jobunkqhodz1xpw5atuv7lhbxdo7tey1z8wcgw211kg1l63zy65lvvyl1462obfkbgxaye2mrw1mzpa0u6'
    })
    flowParty: string;
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : '7q5c66sgim5a62arjcgpc5da3s0ty4lpb7z69vc8u4fgjzl0b8xi0ehubkpfmemulfnreceyuq62vtqb3kux2b2vkp4yz46g9kvd2fc5fna67xigmhba0an94iriy884frmr5dvo67rwjjxez422a4ecb7yo3c70'
    })
    flowComponent: string;
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'gutn1oswdtek5phj0ta1m91emz0kxenklfecrl57ecnhcdz8gc2hgbhj7a4f9bwyl8cdujc4vl0qb3y202v1xdd13ckzfxu2slm9gqsoxd5a4z8sxwkqtljkcm2vp8ls7j5m1d621auqejoltkweb9jz3e66dyti'
    })
    flowInterfaceName: string;
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'uluzw3ewvr68rx93gaiyi17tdc5nhgg8bfqia37sxvvbrx9a6smf8rizc699zy2l4k10rk89elgrhxhq889k1oxsuf1wfwqakg25veoz0fil7rqnp1vm3mg2vx2pq6knmg0o48to8gzok02srd5yp42nj2tzsxoe'
    })
    flowInterfaceNamespace: string;
    
    @ApiProperty({
        type        : String,
        description : 'adapterType [input here api field description]',
        example     : 'm29texuhq6rju44ehvfj0ymmi9238p0ykqfw2qwl4tr5cvzf06hathj8d9x1'
    })
    adapterType: string;
    
    @ApiProperty({
        type        : String,
        description : 'direction [input here api field description]',
        example     : 'RECEIVER'
    })
    direction: string;
    
    @ApiProperty({
        type        : String,
        description : 'transportProtocol [input here api field description]',
        example     : 'kxpt3emlyci3095ucg2og1rtz82afgpcwsj6wgg0qy4r5sehr4crxozzl0zp'
    })
    transportProtocol: string;
    
    @ApiProperty({
        type        : String,
        description : 'messageProtocol [input here api field description]',
        example     : 'pqqwyebe3af2e5z1gvxcv1hmp98u2hbauo8omp57r3cm7v6yxwvhioi6tb8l'
    })
    messageProtocol: string;
    
    @ApiProperty({
        type        : String,
        description : 'adapterEngineName [input here api field description]',
        example     : 's756ygh9io9hwh46zj52aczgji49x6495zgh2b096zm6e996h36fvov5uz0rpttyzjjfw7g29qx8mlbg4is8zsmdeevjl8q8arvw37d6o3piu71mnoub0olttp5r02wdoz20rpwqe5rz04f3iaxhw6vf35cxiix0'
    })
    adapterEngineName: string;
    
    @ApiProperty({
        type        : String,
        description : 'url [input here api field description]',
        example     : '4dfd1zopy373xoxw48oax7xv7adb71ecjpdpvo3sfdcpn9pt2rk57xojvah8euieowuuoumujvyxf4lby46f0plhsyhe37gq0dsix746gqdq16mo3cq9j95orrzgjirj6dl9ot2vy12gricbskidmf6lrd48v20isah7u4asg62wcnb4na6439yicsgqgjy1d8vdrvn4fr7lknuawcuhxqkknxyaaz4o1iaod1vt8e8edetitcczwab6oa1x2m2bpr3x43shbf9lter1gdsqjd8z7kyj3jqvax9lde44xvvma51pm7y8bgkzdcvimg05'
    })
    url: string;
    
    @ApiProperty({
        type        : String,
        description : 'username [input here api field description]',
        example     : 'mbw1ulvjrgzv1onayrwakt7irvhup31pudr3euhppuze6hd8tr2mmgbrej33'
    })
    username: string;
    
    @ApiProperty({
        type        : String,
        description : 'remoteHost [input here api field description]',
        example     : '36ycbbfjspgpd8j3xzoi01oqdplct6da40m9md4ewvbbdjyqwlvw8uztkvred353ae1irqlhoyv8f0k2xf226pmitlx06rwpz0ak5af3yln90s5bcr684togevtjqsp1223yqb1hphd8wymqzbk8ivx0pp977w8v'
    })
    remoteHost: string;
    
    @ApiProperty({
        type        : Number,
        description : 'remotePort [input here api field description]',
        example     : 7484000481
    })
    remotePort: number;
    
    @ApiProperty({
        type        : String,
        description : 'directory [input here api field description]',
        example     : '0oi6ejf405bp1rw8xjeva6tyqwfsk6m7uky2d4gu1llqsuf88vkq9wkbm3j161mw78b9846yrhpe95ho3bueh7d1h0g2ns43719yo42po8ud13q3wt5wtdxamu0xw2udpclemxcjb215bij88ufn9dih4qzdhd8iihdtifse2xrbg3qw0fc19kfd5pzk5m1gyf4nogrj5ou72juxliu1a73y9f9ypyb87kk9auglkz32ai3gizdkbzdr33a8ighsb9v4w6dllcqkf9vay9z9bnxhn7bfwany9z3xwr3w2ax5yhgbl7knjxunu0e4gwxog0diaakptc6f2xnnk6wiwojs2fl2w7yo1dbo47kwi0ijh5imf2dfimj20aja7i7je1d4qzyr7mt5ji3iea7llcrulq46q1ox6gnhbw79549bzr55576j46d3j4n0bf7dn1o1qilwgu1w81ig5aunw5sezrvks1mtu8afklc8fb5796vuaokkzoj9v6i3x78qw5wgkgpdbtx59ykuup07ixt8elj9fq2rdk8g9lwg0hap2pknty3o0kgm4s9yg7fjz170hlp11cyskmb4uw4icudn247dlrztmyfbnmrkbrgntagxc93jc72l87xelqf1m72mus4m371zxq4b6i05mpn54tv3wz759ucqvztf0x0vzm1ow7a2e1msx3cbjgszx7y255h4kgdi9hhabibu6zull8bqxv72kpor84g3o9x88ikq17b3rfbrwk9c0f1j094vhotrvsw8dzrzuflr9f3s187lb5gwappom4ka2qbgievpatu07fkeumkmk2va3ee905lnznrziir3t5ojsg0o2whnvpa40nouyf90x27ymipkm1vn0bc64bbxqav2kfxe290vbgn9bqtvv3coq6aepwn67cly5mkagj542cno5qwm2fq7bg5lzj44p4sf537p6o2xlqhnw3xmyoy3n9eln1ro43kvukqyezloilh0ac8zx34lvmws1fyl3g6q'
    })
    directory: string;
    
    @ApiProperty({
        type        : String,
        description : 'fileSchema [input here api field description]',
        example     : 'xctb3vztqgms26qbjz2ame5zrivvrxiekrl0yjef9ujn4odqr5inuedozqf0e1vfhgzddy6l549ighqr1c4p40ql0qxdm130hnafkiugmho84f7vxc73etppk7wdu2kw2ce9kcnx58epnlfta8znl748lzy2qmytxr24p78tw1q3gz4j8f18l8we8dh8iyf54hrec6oe979jyf55bn1ka9ownep1lzn0t3ybwmd4t5s59mwc5xzxg4lfzzftgny1dl7rc0ron7djd4n0y37cjk1tee4qnwfal4fg3jzljpt0s6p8zjmhhefvl58vacl42istvsa48cqifisrb76b97eb7yn13nt0v0vycw2rm5dztiar31h53if1t96hnneg6ke1xbymrgwo2spuy0ke3ob0c0qzacd7xis5vqomlej4ubml32v6nxpa9yixhkcfp5536nc921t63f05eioncnm0cm2v4ag0fm1yarezkvert1wyjrxbqe6qgcsmiue5d28ciimhln60c9hbsckdp0bp1n3egwg7wvx0kah9c99paxoz7x2xvanj94b7naiurtc4ij7661otdzfm5j1fjh16i2c1ioinz710ya1uno6ic9nca0idqv4cu9tbo048qtz58dzbews39qn9puco959gck6krzjdhp2rh4nxkordzhz9zzn691h2jup6qa0t12vc5vv30ck8c64gx48yogmwbz2rkf41rfhooa4lk9ljp7z0qjfdqgenbpa31c0pumwk2wnsi6cm30e6b6zmaurmrkatpj7xkksd133g269nlrrajy775f00efs7qbk9uac8o2qkxvmglperl8mhb1lueuroke2jur8fj9zbukw0043nhsagjh5oo67cn7p6w9wxjlqy9zz2b63exqp2t6gux5kdde3iuxp5eh3wnyhx96m56p7eqpdd59zi43u5jziybjl3iiims7skzpebm1309o64rex1gxd4jh6esamqqvgiwjqogc4os465lt8q'
    })
    fileSchema: string;
    
    @ApiProperty({
        type        : String,
        description : 'proxyHost [input here api field description]',
        example     : 'fn2rl1eo08gtvfm80t3nrz8j3qz0z3vskegmm9ir7xrf9nx2kpovrqf10s1m'
    })
    proxyHost: string;
    
    @ApiProperty({
        type        : Number,
        description : 'proxyPort [input here api field description]',
        example     : 9228332722
    })
    proxyPort: number;
    
    @ApiProperty({
        type        : String,
        description : 'destination [input here api field description]',
        example     : '6o6mqfhk0hsg0gqrrezdohzmsf64tpeu100r36mvrd9xlszrjqx2k919ytc7uloj7u5c1kj140rw153rk9sgndmy1td9u0ag7eoub6i8w6nz8affz017bznuq2gwfzzm5ych7vz4ktwbir729clegkiwkj0fq8ak'
    })
    destination: string;
    
    @ApiProperty({
        type        : String,
        description : 'adapterStatus [input here api field description]',
        example     : 'INACTIVE'
    })
    adapterStatus: string;
    
    @ApiProperty({
        type        : String,
        description : 'softwareComponentName [input here api field description]',
        example     : '1qsstg5k6b26yg7hhbh722jawhj6ynn5t8jtsapgv3a6c8f4ls1rwd07e0542y1yoi1ljsc8mdljknzpgqpc5tqv1a99yiztqce9r1byobqrhq4edlikgoyjjywi0xi4ea95gv20pscxkbvih90c7vodae715ol4'
    })
    softwareComponentName: string;
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccountName [input here api field description]',
        example     : '4igqogs9rh6d70xm6k1z'
    })
    responsibleUserAccountName: string;
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : 'abyjcui7jr6n3ej9is3e'
    })
    lastChangeUserAccount: string;
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-07-07 10:03:38'
    })
    lastChangedAt: string;
    
}
