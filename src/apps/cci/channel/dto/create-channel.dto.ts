import { ApiProperty } from '@nestjs/swagger';

export class CreateChannelDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'bfe1231d-0208-4a1c-a449-fbca0ddc58ea'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'hash [input here api field description]',
        example     : 'rvg917n8krpx3cakzr1v1oijb8m2vkpx7bkvs2q8'
    })
    hash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'c6681410-5384-4b59-bbab-a166f5e8172d'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'dzfaelb2zwqx0g1krk3zwdvh8azsy97ta1j86a29abqak0878a'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '86cb3a36-e830-4290-a4ff-4053ac36b2f0'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'ubjkmor03f476uch92lx'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : 'qgmib6udwfn7vcxismznhvwtv0fwxdsh6fml30q09fjrlieibgp95it4lrfc5k2me6aa96l7fvn6xvlj1h0eyfrovcb57956uv9x8qnvwewm921li73e7eghi148gj419de7p8c8pql77fcklxv74eiw8xi4xo7a'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : '43ky8rs0jylcta6xu7cb792t2k4gmb4dwuzmmjfqev2hl6t1g3ncxclj2h34gx378omc4keaafs9l8asb5x010sho5r6k6z4e9qxhtishtlmig4z8ec242kzdxunsj18p1nl9cw4bscos7xqk4xr1r8opdfn7lhs'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'zy4c64qnye1vtreanug0c4nvesbn6c7ht1p0vo1v9h8896yl6zgkn3fsq9cfpfbc32w7jd7p6fa5gjun20ct5i8ew6utpvrbnhttvn05a2skeuoixjxdiy9kw7om893r4h5s0acnsq3ibqmvouvlgotewzta7ptj'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowHash [input here api field description]',
        example     : '5bhyzp8s1iw9zh9tadire6q3pc9ius0z1xk3zmxl'
    })
    flowHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'ijvr6bpse00ll22un3ilo6vhom6bbs4qay87m6wqvvn5zjr9qctldn477jb41axfzvx00kf58sjfvpymbb0aksr9qspzs4fkt32tqh04bpbo9mj5frp0i7nlvp7kat8v13xnmwxkujr0soei70nxcuiu1x8ri01r'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowReceiverParty [input here api field description]',
        example     : '845pn7w90d2afxmfe4ca9lsl2dzzfaosb6itu79v5ptr7b42pho7egyopjux6w2jr0ecclwft1yeevmnvc7p6ai49vipff48xbke4n8cyxfffe9q5te25bjawbudo4n9xqerhuyref99rd7v39dcoeicvy5ys7mu'
    })
    flowReceiverParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'o89g5wgcazgpfbn4vqvvyinsjjuacmt0w48c74tyb6fspekw4vihfc0r518rwrd5lc5ixluinp4akmpfb0u7zw4w8acsvddzha9fu0f5k2nelyxxa6mqjnvccm8tt812gblt5j5kdbg6p766twsk2fnpie8euz8q'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowReceiverComponent [input here api field description]',
        example     : '1kz5n6dfatt6i8ki02009tmwn7hxyqft9iyufsx5hq4kko6js0ar9dx4fw18vskhigu1g04gu02p6lz14ijmix3b93yxayq58y45b0lac4m6858cjlhin87ijdqr8dn4s65sga0ku7yvfwuihrag35wi2bg5b7d7'
    })
    flowReceiverComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : '0wheyuq8266avorrjmjwpwhnv9kmv0o2z4n8gjhh2oo5fwuvpnwsx6dgii6ydhtoorafyx2i5t7q3f9kdxj6lwpk4v37dd24kqbz0namm756pvv02ja59g96aymuaoj8w3enwjb2t56rgaln8zo6ypp3mh57z6qm'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'nuwlz48j9vjr0hbvtgfsui7wq8g2445b3x02hrztdibiztsjnotbs1jrjiwodve1nkhknrdhbha1s0ge2ag39dbk8sy2qzdb35ak9esforeji0srw20nokzp0fun8bm47o38jrqmlrfriailajr9aq37qfr4r2op'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'fsjoo08fe9iycubbahcd'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterType [input here api field description]',
        example     : 'omhv9xr9rev5hboypxg0xgy1152dt0jvs1dzzhcbuq2pnah1mpvd4dzaw6lo'
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
        example     : '6h98d42pai59muj8cpyn9a0h5twu1dhp291ydzdkfcgouxkg28lalbdufxo8'
    })
    transportProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'messageProtocol [input here api field description]',
        example     : 'fatqc22j1nj7b86mfcm83w8g323yduyh6zx7p8e3i5h3qbhf6luuyfuos6kz'
    })
    messageProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterEngineName [input here api field description]',
        example     : 'tdr70iagrwdtjnbxx792fqj6zn5tvtwdc8wm5o2gorlor7ontvqkgkswf39v95idbqlw4wpu6ytvutui84rcshqxns1rjzvw3k6w43tul1bqwqdz0hn8xd19l0mu1hc2wwqfmihtnjjz71wfa3gx8nyygbrozxn3'
    })
    adapterEngineName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'url [input here api field description]',
        example     : 'gkfa4n5wwmmzrpy4c7cag1smsvxivf9lhmmyg3tcf9xnhbl6bl86idtltjux4cw3h3fcn041tbtziuoizu82df3kcy57lly4e918whcktjjtx9tqd34wgk93idn17n4qzwq5vgopcjo8l9poj1qcgx4mx221frx3an9f6djqxlt5dhh8ul2e32zuxsvi2ceom1f8ocmoyozhgz3x7bmejcronp7vcqm2e4t53bx5u0xt0hzh1vll0wulbifs98bs0yqlielk77x04pjbh2c6ty5a7ubu21g8i0g130g9s8nr3ulixwbsh3hepc61c2xz'
    })
    url: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'username [input here api field description]',
        example     : 'zibbbq2878vtpbz22xhdnzghaa195c5nwnje1ozzbphym6705rur1o4rc1fx'
    })
    username: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'remoteHost [input here api field description]',
        example     : '5cmakju0xc4vso689j4m2myjojghsxajtety4t5fbawgwjcgoc9crhn2en3a29k1pfulwpafy677yz51wuuewj30p566qgy82jagltpi6hpyf2w9opmhgqjzsdnd59lvyl3kcsa2uodcruc7tfea4exk4wzjo6yn'
    })
    remoteHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'remotePort [input here api field description]',
        example     : 2526106271
    })
    remotePort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'directory [input here api field description]',
        example     : 'kmxcccm7tg8ydp7mavq4abu4j7n9qoodc03tsnhs6zhmm1rq90uz5p98fj4tz2zsarq5akqiqvgksc5ub9mhnb4vinr7er2lv73ow3xy51tfqhdxhbqowosq14gsz0i2qr065vkest1qt0p7wecdhuhiwnx8uahww8jey5kftz2xzzn7w74xhkpdzgpxxuw20kbpwjllijecga1ngudj4dae1rzhufxoc0ez3p61ivn39467drkcecoen6efg46h0rl9izlp4eeei4n6jiytq9133h8a7v4eu4j56wrkp24slkif8xd86ah872tgnuhts57yr5amv9dvwsxt4kepay4klf1q70skqlr6nyk99889jbkjjbe7wu4iwsllf9mn45n7fqywt0m81lpmtq4piep8ekpng4j7rpxbeknf9askqoz48gsog84dzgrbnpkpxogsvjn6ojptbpnut34z639dvw97qxrcc06hovm6wu8wd2tweum3dlm1hwdclcqzmg5lshjvfc099355n36o502cvkhuqgc5u2evp9yid7v3b1job5cx57ypher2lb30b0z7efxedbg5sz0zc5iburdkw0yfyt64pkbypr7hftxle2fuz81suypetj30cq0tpnl8hvbewray0h11nhoiz1amhi0a059knmskx6posl9f31nwltj236ek0o4hz4dkam91d0rv2crmmw7yi8oyta6iu33eggzxplz2z013y9jlo7qz1jyhunjix9tarkesygmr6t76nzpn7iqn6rok0ucjyl8bzzvlmzb3p8a4uol9j89roxmct723s97alpuzdn1rc2azz54ytrf57n8j1z53rzr1ukwytpqv5a5u8er0shh358r4wth7kzj143783p3bzd1f32gv6u87e2n0prmlg5gtkhngu7kdahhi0xbyby7ut1v1wpvtg8v6pu68sq7oztlvwpa5afu8uefd2ynvbh995rwkxayl56wcpv8cniwtved829cb3lhyptqd'
    })
    directory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'fileSchema [input here api field description]',
        example     : 'j76d01yj5xiily9mgkdukt3r664gfdp1n7xn4q3k4qcc41g2lwtg29h5rl5bcc9j8p699j3t5tics42vdplf87wes9m9tqfsxifdhhj4bluptsx2pxr6mdtocdjgwi3qh19mp8pmaspc5sytz3f25738xej1d2javusue138fc22nft0kw82bb0nkca4qrstl92p54py4inmpdi08n60e2zo2rkwvsgfb9h2aw0zd931vysiozw5g9h96p4mghai339an822v2zmhiix5dui0fea3qqfq9b1b9n05shoztcg2fswf8e3qgcfzi1z55skvrhrdq90pz5kcvtkq77x80611fe4nkneawbjak6bxodfzgh4uwyv4d4zmhssra0s39pelbibqtwqa44aixhsbjuzxb6tla3n2t47oq3h4kp5mlhpni2chbvcp73qrytrj6ufhoo1up0ey6etmzoehy6sp9dpew2ydw8gmenobmen3w7fvinsw3sx9nhdmkjtdai3pg04tmub3xur9egcburq8xofpwbtt3gczrmb7yusqtmmvp1tqplfhzhy07d23w3o30bp4spv26m3dn3dtgi7z0ignayswz95pf0o4e1rgbqi9kedmuyluutd1dju5piph574qkcuh6mzrdk46kyvgfq3se3iykd52cbvulgqcyf6l7mopxbjonw82o5nld3p243kgs255n1fmves703aihn3gjjf52pqdhgqvz24o5povrsgao4p0mhq3czwxbjgcysaokqcskt6quh0kvwvp8woxnawei9zh9vb87vhfkyv4xkli7i4gvli9bj0n5s8erktk1wyf460ydhtnlrbanpbc618bh0mm21swq9ox8s1nehe5ofsvnqrmnzdq1u0j9fe8kynavpl4psaf9qixumrbybp9bttoq4eqb1fsr6k3bq2rejtschae65r0svr3lb14ahxt4wjpzqxzmxf3bsjebz5lyusltl3l0zeo3yrpw0ndaxp1046ipyb'
    })
    fileSchema: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'proxyHost [input here api field description]',
        example     : 'wct6ep8ighv1g7bzfswb0ep2ebi4zt0wtevmzf8flgjq4ttsp1bkr4szu2n4'
    })
    proxyHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'proxyPort [input here api field description]',
        example     : 9171381957
    })
    proxyPort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'destination [input here api field description]',
        example     : 'nayrid91atjpbl6g0ko5or112dhsxynxi6lh45rq2wrjtv2i9t85483pwb8yfsjbrxz8oi27ak089z3hfkvrihitl1iap8edxsj2a5i1d6d8ui3v573mems64y0aqfiuez1fzr3u7gnq2helfj1n72bhuiavg212'
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
        example     : 'y4qgi1va4gjazwq6rtcr3ssc31rd3tv6bhifh6li370ymuhaiv1fnqyj0aor2x5u99w7e9rxeq2zq2ckapkeavpntruyh73442hfts34rpatymi6y2dgm7yrr6yge78uexqkv58yzrnn9nvfs9149yrnqhwb3r31'
    })
    softwareComponentName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccountName [input here api field description]',
        example     : 'lil4lhh2ia7p3itz3dy0'
    })
    responsibleUserAccountName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : 'hsv6tdj2c0lyv2sxiqpn'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-10-13 09:22:31'
    })
    lastChangedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'riInterfaceName [input here api field description]',
        example     : '4zi0l1hb7zclvax6oqticpvn5ctdun2y21w0add0wlg30uvc7o3vj3ynrbzet9vifynv01eml6o7rsimuz7im1ib1cwntez40a0k2k7zhyhbfj2wx1a84wtp3gv0jr8hk69fyg1238hmq79ilezdyet6yg8l9yhs'
    })
    riInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'riInterfaceNamespace [input here api field description]',
        example     : 'zdvy68u4epw0wytds83pdjfze1dox9bm39hbtnnm5x27zhg0hg8c47uw4f27ve6y5nw9cmqe2lc12j7d2afncl8by0su1rd0m771zgs0xhkd8rcjv41yz002qehk8ia9casl8kw12ou6jnzripmqeonwh2hhp775'
    })
    riInterfaceNamespace: string;
    
    
}
