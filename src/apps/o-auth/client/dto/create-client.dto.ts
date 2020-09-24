import { ApiProperty } from '@nestjs/swagger';

export class CreateClientDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '414f3627-b916-4f8f-8286-bdacb61e6d11'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'grantType [input here api field description]',
        example     : 'PASSWORD',
        enum        : ['AUTHORIZATION_CODE','CLIENT_CREDENTIALS','PASSWORD']
    })
    grantType: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'sfqdtzu19wpyqqwrf1hfesoh57on5h9x35esttr9xgpevgpqia4aot0h72bigslqsuzshbb6vx2vml81op8elwwyxko96uqqme0r31kgm0xdrivjunxf0rbaevnwsenvgn4fjsyerxaexmc7rqdetwm47kofjokb2lzq18hf7i0iqlrafase05kgk077qqcs0i8wbopcrjj2u7ui5cuezb4qjw4doekpuaspipck5dgrmx48w1ekhdkfixzvivw'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'secret [input here api field description]',
        example     : 'iruksq1kg29sl3c64kw4tgaepobiyd1i95dudz2hoi3acqlv7sbzb9nrpf1f5i52tdjd7gdtd9xsfqcuw7nb92oe72'
    })
    secret: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'authUrl [input here api field description]',
        example     : '8zilwu98qoa9xso8fl5zp4fkhq54eqq33z69ctqlxo3rzo0azpwezzochs8lwtx1tpsgs7pljctlat6dfel2bbz5os953ryoqiqk3ptfcbydblmhqh2b6u9vsjali3p7017pjp08jcdl5kpdstqiwim34vpelm2uidd5tg22b3q5wftc9rykj437e9ef933e2lgjcqjas46ipe8yutug64u4szq8yl5lxdp5k6nxfcnb5426ewfgibcfrt9ibsqh82pabu7lmh3z6riwixouar79xbybiqeew1esh9343nd41cbiyrp1usngosccqj8569o08t2i26pr3jmcnkbyajaqce7n1x7pj89p22kzulc05o05tpwle0zrbqn0n8kx8y5b0tykln79ccic4znjk55auueyqmftcbuo5g2e2wj4varjuct42msj81bgf8ahrlhf8unye33ri99krdibhzruwmbgo8vrkmnmrx03wq5yuslx64f1g5x5lvz68lxj9udhn8nubpsftveopwys52gkzlccuxdpwkunk84k2pxlh9nc8uapb7crguip0ok3zzfw1p09mmyns51x3sss5taa1420k3zptufu1ris4fd99net5uphmwfrdfqogo5syl8zjm1xvo7azr0a0ad4um4p9a9cs439kovfsco1o4ut0nes95irolcp361l9bctclwbt05x7kcs2c2x5tm78pdpbful1kxi48t9kx18rxto4alwfgrav3elo2kptpi6rqtp2qzo7nn1ymi4bwdov9nzed6ts7b9pvduqkczq8fp3o6m4nmmip5kqktwq8dic8sh28vp3350ncp6odov1i11dbz8p8mg5p7xmolh25xvpxaxzm7qxaj9frf7l1t7c55k9rlsltzlfpzdwbqc11wk5et2w1b8no27pe1lfueu9jotzcy955xx2givripiq4s1xk15eobs6jwqvzo8kofqm0zhfrnbemn9f3nu5bgyt8tucakyrttxohkuy89tzfu0r980vt0hlbaw6ooldlxsvhrmhkjdos2j6lkzuq7wa4lg8zxawred2itob9ntt86c2v8qrz573c8a6czvleg73389bpgr54a1jeytd4vqlpur7xgp4zfwwev7lho3d285m3gpz9rk9gp5buqfv4ipsobbtkt7rf9ep04f7iqr6pfk13n7mt8lszyinpgn7prmrry6y08jxml9289srpjk8qcacohzixgoo6d0ulraeov57m3jet48u9qc653zqsnfvh2cg3006b0sz5qbjsdt0u2lygzvnr9ei38y0w438wg9bbzaiv1j6qmpa6m1truu8dxph2hlju0ahepqxguks6uk9ptpknirftvnp4g4z9g0ha4na4ehznuttzkr7vqyijh4gk7yb9h8oh0ymdul2pcl94imor4a1jmq1l7tl2k74wb25ko7evo43428hyepvrnewsu5ajgkouikkfp01hie22fjxgevn41rwbct6iygxzcw19dz9bx1ttk6ekt7jw784unqfhtgtho49bdinamzdxl5dudbxpnba8hox9nmcryakr0njfid5rrlx03ay130ka012b3jukxyo8o96519ykcd9j1a7lqau21r3y55ul5bazq1figut5ux7mjxahv6wu0llgulkks4lewln9ws1cgx9hk8origdhihtq9orptyvd9e4t034e0vfp9uoymh46ndjn7utljbn01ypc94qabz9w06m5rgsjr5zv2yj6k4bli3wnfod34hwajxszgmvvytrqw7cuwerle0dq9en9j9orxywknk94u19sha4tp6tuwtsome2zmv8afae56za4rzyf0p7gt4giqgunkqkymo6kx9di85n1qedge4cxim4fv4261wycalquh5zamhepuvkci7sy9vu8n20ghwx2or5i37r1uhnck6ss47miiq9yj2enkl5697jmmpe3l1dh8jxdd38168acao6u4d9od3ml0sxpx112xu1wt4uumsb3ayqtt05szb'
    })
    authUrl: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'redirect [input here api field description]',
        example     : 'e2efomi1vd03zzyd5nylftu60w2blapzb8c8icvlctk6ktbhgai46c65njw4f6u4i4ttomcn9o46k64wakh69mht56otu9ilirvpld7w9oxhzd3tgjkam7t8b446c4uozxuajk4o4a66n3eeloqfyvrsahp0mj59eszn925r7arag28u1ml1isgi5numzl7xq1sdxum53ngu7kvwunxwtw9dxm2iep328dbjafcuv9a67afhs57k0pribcmn0u3bdu5qwhrixd7g8it0ui8va2jvlnetmvma59xprnwjew5knlpl143icgofrhcjkjc2sf4c20iyvqsoaxi33nexoyukkhizcimm4qb0l9z3mrfa12sngfd6ggg6beic3kwqpfd5w3a9295duop7mvhvra4fdorxgv9bldzo6w8mv7833xa5d7qygxcouox0pviexzv51rjsq63jesvr2232b0eiktb9hrc9k3a3o8iz2vdrx7imvdnq9hxzdn4e4t732ydnklg5clx8ppxhmg9y1u69md91p0ynt7n7liyzu59szlcuhuk2oxwn0ald6uv839xryuzt67ns5ky4bp5yd4acwvpwwxd7ecm941xb1h4j9nt3md7bhgte1j6vhzjhonzd1l5dtj3q76bb2unk421dgirl0zpsr1xlule9k55i70cjeoza84gjagkyqayzezhgddszegluqce8lgj5ef8pad4trgwcx7mazezl351740ejlx6usq36grja4ychuvtkeu31o9wwm7k63gm62yu381qz6bz0sgo3qp8ewb3s79cs36383v2bwwv88307hpa51q22e6kg25i413jxhwh47jubx4od006i96zo65u1mxc80z760atmdp9tsy3wfus312hfviwlsedamappze1vd47t2n744ybkdq237ihmbcrqt0rrk7ty6mc9x251s4wd4mw85yznynoa9hms6fyyqsrfmd27u6eq2rfkx7aoj4ab2mrovd8lj2dg7ej16ds303lde70iq75w8nd8r1804lon9csrzml5ixf36tn4hhhn8vcd2ye1l6zfi5snclk2ajme4n3g8dth8lzeyjopz9halvttqy40vgw4quumk4lqbqfkuxumjhboaw2r82uoojsvsbkdm7libl1i8dh2t8uz508ruzc4kcdyc1bh8b2wrve7zutzteaap5ttlyt2xt4o74pxsdsk8inrfv79ivx4puifzaiz8u8nvi1c1r29nlbe4m2lifz59fff1iza1njm9vxrbwzlxbhxe3btgqgts0xznwf1ktvzpfp08wle2rwxrbbnyacakp3398fhsy1qwzkhkplhz1x6jgzepimz1uzuqcqqk0d8fkhvhzkfm6f583yv0cikrnf0stc0zhphuqpstgapzjispjl5tvgv7enax3atmvl39hyxslmmmjke9mq0avua62wmj12ppc3mjprzdv0eijcoan8a46r17wa104uhv8x48c6zpvm2xyxfvrt54haxx2epvplr72gm7q3tk5qduqic4a25in7fioyppdfcpzxgxbqtbdjt747i4cutmc89vrnupul6ph79a5rkiur5nf7f6esud463evv9qvn4h5smaks6f8tf60qzr5qqt68j7wx9ihtxretczzxoav0rwnm27z0djppd2yx9iquubi09hwrbiimv9zguu869zcp3q0u9h7xt6tmhdgbqbminzsvkl6o3usjk9mnqn2vf1q6zhmoww2am5jm62xrghssu1rwheg0oka7zlfm201unvf2mss45kpr6tdwss5x46pfkphg7agfr9j7tch9jc6thji2j8m1cgna8t9yurdmutlrk8nodh6y1kocl43ka9kged939go11o6j8ugs9wt4cn2mpvx7o4ggbdghm1fytens60g2orn064z4an6wvgbqwmic7uwz5hwgrj98cd1emp3fbr898torzy5ihmgbmsbz9mufyxhxas6jzx93a3jp6wbj2xl4jsvz8y4h2ssavhmqj'
    })
    redirect: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'expiredAccessToken [input here api field description]',
        example     : 1713687974
    })
    expiredAccessToken: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'expiredRefreshToken [input here api field description]',
        example     : 8616871960
    })
    expiredRefreshToken: number;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isRevoked [input here api field description]',
        example     : false
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
