import { ApiProperty } from '@nestjs/swagger';

export class UpdateClientDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '393943d2-20fe-48ea-a94d-4b942e14b2c0'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'grantType [input here api field description]',
        example     : 'CLIENT_CREDENTIALS',
        enum        : ['AUTHORIZATION_CODE','CLIENT_CREDENTIALS','PASSWORD']
    })
    grantType: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'a5lfp35x0j0ai7jj66ircp0kp82jtq70xdoj9llgowzxorkngmyn9w94up0x990h2mnrdkcv4bw18jibsyvy27rdzkolhf86mb1uervbq53opx4tdo70yxog6opsi2hxrb3xru9tprfmo6apzbmy2d4x229g0c7j86sz37a8zl21gsb4i4wghqxl0n5osdoifqvlowqz41ador4erh4tg1f38h2k6nmx3fyze1na1wym53l3wskvfwvg2awt11b'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'secret [input here api field description]',
        example     : '8s3rbzfhnymibveonefgo58ya7b4nrsk8jvr8idolbd4d9fumf5mrdikpb0dkm9j9mzjqfk5hy28s6kn8fp5323nph'
    })
    secret: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'authUrl [input here api field description]',
        example     : 'ttk484wflrubflfy99rwionscsqa2mihkwknyoin0mt7ll3jvawxze11nubbiytwaf6vf4ek9ilr7coauubuua15bplihudesy31wymyb8ff4hk7qlu5fo62a6c303g98ghe78fn5yxlexamhkto8lcmwjyhvfutphl2wrt6oa1jxkwj8wbn94mp5apf2l8x1dqskszrv5kt7k08ngwua5ku44ovsmcm8m7sbn2htszj6z3439garemvg7g6npmthjn1oncbx4elbb3ua8zlgwtktjhdzt9sdaof5p1r63gde4dxj2omworxekncaiqrldvapqcg6jxalxm7bgecsckv1eo0g68jrckqeokix3j0zvg4r6qkap41kjvwp13rkiaj5qdyjy3o2qibio6e2v0b2kvoebfdr7olebwerjwpqictd1n3jixdaropm2oh5b44nh5nm0gqavh0hc5u9pxprxie3u3w0ivb089h3w084edv14okbvxjyw72qxpi6t3tee399f46tqp7m53782aurmxpm0vahcr5n023n9tb0cpx61zbdsxzattmip2p1f9x4knk97feqmwu3ur9we3a1kyx5yst4iay6ldol6unqi9g7if9h2bmwqq50zvhb2lgpubq60i1cm5hcs58p42yd9escmz3iqzo0ugfekezqugg4yt54qu2doqypy6gdlbeg2zwqu2h2jsz4cw3alxtr7ue3tkbhyai11dckwd53npd1sjirtsqachy3n93g0yqkdsgiwiw87l98z9lb96mfutckpkkib5c8kk76neq4gtckgir9hkjusm78ahskc6awmldco6b5lvnk11ee6gghcro47rotvxf1i69fkf02hvsdz8lem1ctyix0m636oe6a8dzqzwkwdlk4alt5cdumhyl3rona7gl4le699kp7f750anot1u7s7qw4hti4y99bayht89vs2w1pa39clj0svcajlcvrpa82j7fgl9ql3f6l9wv8j7k5fzzgshcei4rt992owsefrk8aa8z4ddqok35t5lhqxwmal36z3lj29xjktx86s1wxtrq0i5kwuofgxrjvg2sbjoko790osq1h7kff4qnknw2pylp2mbnc1rfmxe3yuw76nzwp0jdktt1qgdl8zcc6jahpwmd6ex3hsklzew4i5pezqoziyqyogl9z9c5j9b5d6zw4c8sz0o06xfg13w5oj6y5g3m8oihot465qpw1zlhky9ha1im3impvhz5x6gf3o8pxvito0uuxxdseqblub082286mhpdbonzg3ecgvuu91ny7fteg6uxwjqebvj9dbcyemh5vhb2ge0k5hxy2knn6nsil3cloqk532f96im8ntv9sehufvt1e200vp4g3vk90yhagvgnz69vvjeyx67waln2ejd7vyqtyhw9lzjzw7mv2uajr5iohn2q7l1ul6i79o1ff82ie9ogc0613fgz6y1qqon479i83idplzt3v9g4vt8ytabjt8w22syus05wa55llx17sfev5vxzfepuwlvsah6dy7jgmi6g5c16edut5sxf9mm4w1cli5fv9irirwv4pufjwqfoggffmgim1ddlyuya5s9babmt55dte62ic8fo8e4k5nheudmjvd58d0epsd8muyoy5wd990ovhq911ca42dy6joefstu07d0pw5o1im338hk7hux3vf8r6x5k9yh0nvbvrypmerfh2wjjqh3tp6thrmvmtds36k9z20yxlddtelrv4zdkh1vzq3xvmem878cndsafj4892tw2pxbe1ho4mem4n80efpt7d5pir0rkjzelrtotrx2bv7ilohhfnpu4cuflghweew7q3tel7rly12ary8vrud888bhxgwh50pinrd56jzw3d6xdm5jbg7ppzlorra3kp0iztq4a8g5zzaygfl2fni4zot0hojiib0sr1ymztpqeqatdg4gv8uicde7on148zc0wcfg2wsy6ja6gnwexhop1fu62pabe7aq9hajqqjrea1b9'
    })
    authUrl: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'redirect [input here api field description]',
        example     : 'lfri7h0hlgveb2gs4bel1w127u2qr1rmab26cyls2boqnq9rnun5sbhw16s3kmufye06t4o7acn0ufhpynp6htamijqjm38orr9rhu5asjkgn9dsyugy14xkeue75vyiyjkh4lg57ju41wyn84vti7lzxzl71n5c7yjhauxik4w3jnpunw3t27uop9ramibpn408wo32bb2kcxrm1lt336vqfou2dj3uf5e5oifcxo0acvqvsbtfyjhz8m1yxg5it062me49gwk8jhhmb0dtpcrw322rx9kukiy1pgesj0g0sbd6smqnrky9qu8czsq29lqem7ewwibc45p5fwmb65putlx38znlnjikj0mh16uq7pgp6pme0yykw9u531q6imcauld4qppqh3t7tj3nzhwb8mq6rwcyvbn0leplln1q9tetl5ufsjzgenywqvis6byi3bx7pbnhbfhq631f8f992thhxyl622iw1idzbl1b3fd7mubeuhhyod75blzr5ob6rnilr7uprfed2c3ckj83ba0vag1bbqufystbg4nmf5ajbx79n9mwj0uu0xh3pcbnjknv8z3yzmg8k90nu39r495glth6k1zgvz6fyexsurbgo41y5wbv85pqte8sy3uh0259m6d03p06l02hybquixhv65jqznvvyb62bl0uw7bctadl7gqx2rhrn3iib2e3o9b3xl78s45cn8ydfe024qtxft799qo8f4d7xpfen0xcxdsrbpj644jh6omwlfnz0hoblnfqed8g14owve5w69bdjh1kzaray7w5b4jt0uan6mhc2exci9vydm8k9iczjhv70bw84c7pzavicj8ex9g9ud3iewqagv84ok8mlwtayuhswznlvyfuuv0an8khruy6qzl2sjavsq4ytfwin4jaqjpb21gewv4lgae0z4oaipqr4jilwq77a2ker1o62x41h47y4qcopwvy8wpbisrglgyhuwtefh3gmzf6tatc0ixxbivj8ujgwxujabhty2dzev4335v4v6reulwh7m6jezalp2374o6d4nxi1htp130vu25pem1sskh3f5eii2ilxx31u4vkequvjy8pctzftsojyo1udibnijoghw7gzygimlfie8uyf1lrx8pnatjice2ctlie7f6prjxbk9l002odpjgi18l7zb9tlrynbp1axhar4iu19uh8z9qrom81bf5qcavxfsfkvxrdj95ngsnlb0jvgcmtfow7nh9vnb45k6wxc4cbzkd452s3t5fmenc74a3qf4d3ofznifp4w49a7rcn0k7cnod1q8iyzmoni8ogi0f9qaqqx6qx58npfx5hdlym2jxki12zhb6hem89uibzjzgvlg6pr61wi9e9c3peqra8g4xw765wmeqpacpqvgbemu42whfy9fa3658bkiisbd2yfcnqu9l5bx3nbl3jyzcgugha4mv0mfnp54gwu6735viuupklnq0qyvh0s7s1avy0kyb51g4l4xlhx65sgmvbv4qkqew2dgwxuonrknu1a7v4uj1guppltratantdn77kxfek4d7k75zsp70wq6ux7pfb58hnxgohu45mwmsp2b7avbjo15uclhhw34vhyy6o4dgy2sb87asncjl2qa6w70o2yvyb9108xf5cawt49pcatbyljkf3v56din9vvd0h57wf8nn6u949vdlsgyid2t74ojlhr3sdnynuk4tsj0117w0p8brs12okqrc4bszk72spnozsh50dqpts2yocu0gn650t3h1fveo23q5d5vvekz0frb6r0yzsg2dm3m23j7cc0ns9kj3tgposmkvlnthm8ucqgyyh68kyyv7mjnz6fvb5ofp6ug1jjzlvybttp31sxpn7dmkgrbmxojzc8pc6xaid24jxvwhu6qar2xn5qx6h7leox95yzd60fogbyeuwsf4lb3to5lv25ncrqrdn33xn5u0aowo545g96jv5wy15ydkydkas4chhm5t0z9c53vh3v3i2ysdjtoawz3go'
    })
    redirect: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'expiredAccessToken [input here api field description]',
        example     : 6193298496
    })
    expiredAccessToken: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'expiredRefreshToken [input here api field description]',
        example     : 7574244206
    })
    expiredRefreshToken: number;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isRevoked [input here api field description]',
        example     : true
    })
    isRevoked: boolean;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isMaster [input here api field description]',
        example     : true
    })
    isMaster: boolean;
    
    
    
    @ApiProperty({
        type        : [String],
        description : 'applicationIds [input here api field description]',
        example     : '',
    })
    applicationIds: string[];
    
    
}
