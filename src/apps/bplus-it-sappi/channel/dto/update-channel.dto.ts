import { ApiProperty } from '@nestjs/swagger';

export class UpdateChannelDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '59cf5246-34df-4098-8660-a55e589e4214'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'hash [input here api field description]',
        example     : '0ktvwq8kau7pokw6ukii5bfg9hd5ga0i4h6xp3vs'
    })
    hash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '1e6eb83e-8f30-456d-a977-466d6a0acbb2'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'tqkxkgkd2l7qps6ugf9ugtjs32n34ys72xn5nlkjk3wqf4q37a'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '7558f16c-7e15-46a0-8731-13140d2c9606'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : '92lxk7qhlubjsr2tnf3x'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : '5xvsj4pp6hp9pa5wqj4i9nje9xnxg382s5yaivbt16ahbbpzucb0id1ek2rzc7gvwjmtxwzlz7h3b4l9e2hbxy7iiuxyo72eedeq4nsnib0vamb5oj9rbbir4f2g9v38l96mhcenajaztygdtmxkkmrbdlm9r03z'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : 'wsg4ekicw2fcabqewr0r86nlqp7qr92c9vqnxc0xy89cfvgzeodt9lwsejbeecoxr9mxa86h54v5pqt2qqj810jzl1ga2q6bjnf85n9wxobpgwtq3q48ku93pye9jjuig4b5hedrvnos8ejyqobzxm6do44ppqvz'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'xow1irjwwku4td2i1xcyy4kvl93cgpadtglso70hbksdg1p1w98bx7n7x29mwzwoakt5sjwfbftubm66nb1m9wor1vp95w8vz8awktparbhj5qwc9hx3p077hkz72lh23cgc9em134r0ywqeqwbek7oyhtpjqaki'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowId [input here api field description]',
        example     : 'd1feb162-e4a0-4594-87ff-e7762fe6df74'
    })
    flowId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'zz8rf3fhheys044i9j82ijmuac14zk1bzwwzvkryerc8somwx3zygxtehjdhruq0dmdrdx75ufk0mwcz45wluhym1yek8tz9qbodvq5k7igcejcrjezsesd5mmi0ybdr4hbbmm1vukk4rmhkne2x0ifyfelcet5v'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'ojtoj0b19sgithv4m7saokumdvvjxoy2utjx3xpry1tck48wdy975ghq0fsodlry8zfb9sn2bz7gdcc2t9vdxiwayzqsu02ceqxi04jvixoy1ct821x6memw3ul9r1qkrmokxeojxn8rpma11qks2dzsdbah46tz'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'au33a7cxqof51j570lw8hs6dw9mwllap0iejke238v1luqyu907r57tt31340zgnduaa3ckmabw3chs9w7eyr7m3pte14tahdr56uxx8o1p5jlage9quew41lauvcgzaieovjxt2gqhw9vr93xm0fybjml4tydrx'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'm8qrdza0idju9kfxlpf7hvf45m1gnq8vhsm0m9vz68ftvh1urg5y6m3cmley0y36ylapdsx0f2zkkx2nvgsaob2m9p5d0rja9pogs86ksztt4bnil4vfkx63src25vufb00cas360jbi3vfbq73sthfxofem3qjl'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'bxs8jtyjacto156bvsv6'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterType [input here api field description]',
        example     : 'br1pcvr4zucq377vudjkx6svj90wvcmhyczszubwevh5a0amwpg9wdx8lcsv'
    })
    adapterType: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'direction [input here api field description]',
        example     : 'SENDER',
        enum        : ['SENDER','RECEIVER']
    })
    direction: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'transportProtocol [input here api field description]',
        example     : 'yo2t245mxe7vh0clzqfrvjscwmqxrsf1ruyt35kqjrbqa1rxh04povb5dulu'
    })
    transportProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'messageProtocol [input here api field description]',
        example     : 'rcbhytz0tkzzswc2qvow73kfq0oi7hb6wxi4s7msevfl169f4jg7gyt5tyx7'
    })
    messageProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterEngineName [input here api field description]',
        example     : 'tyd93m7envga0pam3zonhw1odd2p062dttp3ghg5cat6kp0m0nsj1bvg41uod7tegwn3cv47vk37xdqwhmg6arig1whrggf9brcvxwvunikqrdbr0fnfw8fs6g9eq9myk63f3lvgat9f858zs6ot89of11dp17kv'
    })
    adapterEngineName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'url [input here api field description]',
        example     : 'klckwhf9edz7g3485gzdzfxzqfmbl5jwp11gkwb3847fol6bj54vinyf1hxjwwlp6x4ry3x2dklxzw5djvb5cvkzwn5h8w7synlz496xoeq8bpwhkjtqnz7g5dbxh9g1ero1hwqf1jw4ae8dygdvrs2nfdlm8eudehlifwrr18a3l4usyyhrmb14xq7a1on6qdqn4rxxcnv6cvj64gq79c94zb33jdk0egof2nbnm5gt64du5zynmqcd0cq1f5x1j4b0j9g4tosic1sfu2go2oa723adnxpmvm93v31tjrlatff8faq109fsmsiac14z'
    })
    url: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'username [input here api field description]',
        example     : 'ry1ahc0o5eero1d6h63ynor32n72qt8p7cqtym5bmuua8aba3erwbnkmpkua'
    })
    username: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'remoteHost [input here api field description]',
        example     : '99tbkhvv4n1ah187zr1m6x3jp1w0o1gryb1h9bga4x0knnu7qrk240p0pdohz52vhtlvuk2rirtga5hj650xut3usw82xf1xg587sat9qo22bl2y106lo1geu21yzm4twfirmemjbd3wz72qh0uo9stxsp7e38q1'
    })
    remoteHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'remotePort [input here api field description]',
        example     : 5232167008
    })
    remotePort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'directory [input here api field description]',
        example     : 'ft83hvvr1qcj6xl8se4s3ucly7ijarzav0de4e0t17vicmvwuyd34mwm7mgfcwxjwyarzdar7g88u7rz2b7ix2soefk96q0wrjtmqmqcs8ggxrlex5w6w3w36f0kkunk4dt54z1zux4fffabs2cosvsrkctgc5ptd26nx60b03a51gmboxsofb2x63c21ls48gqru28ewvl60mxmwb3lp4va16cmsmnnnfj1zd2g06kafafy9proav90p4n6gavuse46ckxnnbzilo7flu4729bhgrz0oxolpl1nqqyluhlgrg9eyq15vnn0bl9sc9y9mbmz2i6osns9exwsfd0393ohnneken8ani6lk2wbk5x3iccztdyo51wsmc7311ldy42uys94cvfasl8es81ij8n6kz0of6ch4zs8xs270pieftiuhykdf6bsbng1hqtoequbfmlthxov18brrl7bu60jf3av3r9py67ryvqqkz1rpvr0iow2tafcojr0w6lqhhu59x4qkplt0mfcl3gurvhhsunfrt7q5n5qmc4c6z42p7p66ebvvljgerj4gne1cao2obsc76y7bsnt4w629smczuhsfudbao2baupxlsh8dh109722o4ag4jx53knee1v39u4r6337bocqkrm5kkrgxtdwz3cnqf0ai0o5u02bti5jpyb1phfh4yrwn7hwk58wkqbuw5ce967gcdbvswvgptl3rqoqd8lj2wxowinxjgx39x0q5s8veljoibk2mezwdyj36d4yuze6bpu9e7gcku9nwibq6ahtw6gzqahhph4491d8gnsiw5d9p67d3f87uk0yzn4m7m6lspu7ynjmp336poniyoz0dwmp922y6bfozrd6ksnkv207xfdr352qhkf7xt5t1rk05qvbsega32cw61krpyloq6k6sir058cda3zkg357nvjft50vrul6pd0bcq655qg1vhq4z4ofmrxnjn7tpg1pbyjyp7hguayuxfzcur0wop2hrekv'
    })
    directory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'fileSchema [input here api field description]',
        example     : 'g2cifz8tq4e72hbpxnpic4moaw7pfmez7ribi4fp7t1iqb6cesaqjqkjai12r9h20eglr3v11rpd49z5ddjgn34abofhtb606lu34ddgft6vtm0bo4h9131nso2quxvcjw0buskbu6tueo10c5qjfz7dvtbwjyi38nu3gkxxycsujhybck666d5n15xiynanxvd6t6xznanr1ym1u908vozx7xub5iv2owukef44gfg8so50xdl3h7tgb0v35gtoq8zjfl9r9t11tzmsf0nfiv29uq9jnltpktrnccw6tqlnttrekw96p4zzg86tay9ernciep599y44megz37il3xz95ac8aeuzgxhf1t4fmfi11aycttbkea241ut9oamm4ueru9wda07fh78buuxnbbc5frn7br3pkdapu49rodgfso5vyez8beqa832q45pysugqrwrrjkxcfz4rmknc0tf7y8qi7oykme5vrhnc4aq1slrlyyi1fabpi50hlh6b5a0o0vr8tq7k7xhqmtytqoy0dpyddj8snag8d7053h9xrxnpvoh8sienliuat82s0qmys4escpf35ms4lmumevvtthu2612pquksvg3luxd2tzshjar7k4g3hp3xqfpf6w6so6kg97w3kbjxux5ca3b5jyobnedmzdq13s9lwd2jqzwsp5dac40vxtkjgabvdfblahocms2w140s7xlznejmsfwhw88ixd31ll8rrg3cfuhpgja2k9ixtna60lc2xvkzi0se4kw7yeuvmf4q64fh6ogymyh55i14qfj6005j770wv3vvy3ei9743irhdt3dke2li4ul2wicj7vxr6an116ikt01e42d5ueyhenqmhwzazkg03ka7ipkhg19782lqmj6lsxanacoryp1monvpep9tjqattn5gaa6lzqdt3urwudr5o1k9gxozlrvasb6at0089mv1oybngsyl29v2s1c4rn79z89lh86p0bxr9jhvgv0xl3h7wssu7uy3'
    })
    fileSchema: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'proxyHost [input here api field description]',
        example     : 'rqjttd1ba80p085tk0bwr4q53fw8az5nw9804rjla6ccu3gvc68courd25qu'
    })
    proxyHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'proxyPort [input here api field description]',
        example     : 6148887594
    })
    proxyPort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'destination [input here api field description]',
        example     : '8x6r482m37102ygzi9cptckwug9pafrbz4jsebn9au0lqtf6m9bkeammd9tmofmvqtuy4b4ymw0bwzcir8l4i2sbtcfvgj2k463gn2oe0x3ui7anyxr53c6h3acz78tujnug0nqyevdvy6xq78tdpzkh671e4pf3'
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
        example     : 'ikh11s0vqw89vv2xtafgggest31qb9vjmazlfqyndiei48g488u2w0y8qdie954tgp74h0y848q8orqcjj6yrfoyt6sznrl7jow62baoh4m0cisgwkga5vbsagu5aa650irha3riiqf0czl3g9c5um25mkg3hs4w'
    })
    softwareComponentName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccountName [input here api field description]',
        example     : 'snfyai32gphiae0orx2e'
    })
    responsibleUserAccountName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : 'dgejuu5l83xg9vavli7t'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-07-29 12:37:00'
    })
    lastChangedAt: string;
    
    
}
