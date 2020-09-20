import { ApiProperty } from '@nestjs/swagger';

export class CreateClientDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '2d8bbde5-e0d9-46e8-b0a3-13c4fbc91028'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'grantType [input here api field description]',
        example     : 'AUTHORIZATION_CODE',
        enum        : ['AUTHORIZATION_CODE','CLIENT_CREDENTIALS','PASSWORD_GRANT']
    })
    grantType: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'os4ziizzz5qm6cluym0onqpmeo2bawqfk4ewxer9gi9pc9l9ih9lkdz2xrgnh92fisvc5593tscu64vtuncoeqe70mvp85xhpnw3h5g6ggm4wwmogz972wmuv6emr936loo7xxgstoo9wcq0inb1deqwez5o4rxhsyrlal13heb9rjsrstayr00l2cen1kkkkkpseimv0u9jo9fkzgo78rqks2fzxosor6hdxsitg0qzeze3ki1a90b949eoyia'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'secret [input here api field description]',
        example     : 'ev699wqlzuqu185672y6c228wcrcm8c6ecxjnq5j01vktrynl3i88uhl8ntlz0f5sdpmd0qwlfs3v3b3m9c0fkkd4e'
    })
    secret: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'authUrl [input here api field description]',
        example     : 'f81t9wp7mcittjlavy09ie075fk6i0r6akwsnizysy887kmfzooalzawkp6i6uhrcgbbd9vhdhthlvijmuccx9lu3wjbsd58py9ikdige9g272vuzrave9udkw21c6gmkcovdul1y4qswcnouqtd6i7h4dkg1867uckvmy3mbpp87dazh81z0jxi7npbdbc9xjjl0vot89rzzxcdlf2ny6154xssu1nsne4vqk8t02wdltzexwjho1c1aevjawz0k2hnc591jtuq49stfb6g1yls475qbbuvz30leht26pzphxudz287sjistju6iwix2z4h1n2h46o52p6sv22iwxrvnmrb73u13y146wt9opsv4hbmuqrw2gui1fq1u3n2pv11ntas349isoo7abrzm4qi2lj45jntgl2hkgsu9com2q6q8j22ye7objucyanhmuy6uj4a3rm5fda9jrk7qe86rqobjan8vdjwl5ejrjhimx9t32ahnuufnx43gh9yanvs7on3ud2xihyoeu3tfnoyez5hifth9603rxmazry0ydpcxmh2ikho39yhthi0yzysiwfo16a12igjcnvlctdv9frxh0ddxiy1vet9is6i876jb0z2wpx0o75yhsrr9sizh11glvf7fn6oxcn6mpqu5lkhnplqntki6p6ozm2ow7mi7cdfbem7d8l04fzz25awcm9vr23nx72swn79tvw9yj1yguvbgkrg6zvqprintzfkv89tknqij1z0dz4lfzi410crj6uydup3axq1v2pe2n7n90gsuf1hfc0iaawx5d1lp8zgwze3spufarq6ubxze509xy39no93padq1sgvpp4mzrujp1b2a72v5lurfl7kqfmqg4eezbh9nuxmdppcfycr7fvpvjlpjdchmzohd0y78ojkj9tymuokns2uzonlgh2ryn8lmm7cdirjueeceaskwgsiuyolm8byjq0rpparzgei3m75fzmv7ydymy2jlb7lmc0avx82v467x49dj9itcb5y97jpk9yqjcfw3q5f32j0x492bfvufi0xs9nc1vjkx3sxpobngaw01oyxgzfyh9mjgpjqxo40tee5oqdlfiblqwpf3unj3z6l5pfkt312fg6fspugay8syunvd3flsig58pxwqnoqhv3jzx82tgtpn54ot73mjbj16iyjn3tosbcie84lyl08453t0vpibjcrjcn1hc4w9defvs2rm39hbtiwocp47gqj64esuuv0d9mlkolf292m8oh2720xaf5d4a1wpphe6u4viwoffr7xi23jr5symkdcwm0iu57lwirocz9lqcefc89o914tk1p775wif6r1sgjmbinkfeebtgqwuhssrndvxa7sm8xezfana074i1lsuv8jud0b6if1l4g6zlt8x4csuh3p30dfgqtbwsop3jpfy8cspt0ecgwv6vli51dtweeqkkttw213k2fsx205jmhb55taiazx8tbvrmptpj9teuq5ftp4u3idf12axq77i8sytzvm3xk63nlideiggy1lwg7wn131nytj2wv2kh0pdjw47nrou75kvay6k8rwejmqpi4m1orjgkw2v37s4ag3mi3ecsd825l55m613gtzu1hmj3vwdyqh25fj3jtx4a14chplfrrs0eufahizfvn73icw2trhlorvz9h04hfrifej7lddei00wke06dv1cfonlb0knhv0pe8orxu33ae888ukxcli2w3h0zm4xnspbw7jvk9gmgdabngp57w9ph5dnsn7ptjql4gj5cp3a7giwu2b5p7yif5rkftowobtd5g3trjmmtlet74ybtues7kpn2jdbhkik9q8z771lrfqverrla4sb81q5mvvupgadpx9k27lp0qo7wcg1wkltqz82b72bsa3dacwtqms59funs1q17v903cvsjbs6j6xfm7va7nmtzu9v4504j7vcfva2ocmk9myizpjqy3vobodzz9zo291xftqbbg0454n2n6h1ji62fzcfj1n6bl4'
    })
    authUrl: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'redirect [input here api field description]',
        example     : '94ynfzmfxinubvchy2sgkkdj8gum8ho7hwj8i2i99w3jqivd1oeogkyq727e2zwdhjy4i3kmtn16duclcbs49gd1nsjwlx7wqszxew5gsl527lzinhe4i3bow3ttghauy6gm8lrftrgihfpqve1zfbz3y3tpa2u3w4szivr0npepgmmdj140ds3u7x0sfnljdjfqpi7wtk50nsnekrf68s595mbyvd96nq2ohqgk2btiwsdjszf50hgges8uz4b6ytzspgr1p2jtxpku3fsqs0kobmxruz0qqfs0b7dsj6icwh5rnt2r52p9sw5k2gns62jnyywnr0kt4tgr91vh862bzm7mp0dmsbt0ac59xb185fb1j0ye55f245flmwp6njwxvcmzklichfvgpqbocqmbkd3qvgyjm03ao2dt64vnlrtlr5l643r505ftlq8nuip4l3me1s2vi4i6lt1ujeekwxlwishtf30uegwze7kmr1p44o1igmii9kp6v4cosoj1xsekb4p2346xy859wbcvu1ypw67veibdu8rjgddyp1ese2falj9cpz83jqsuploepf35swu90c4ecftj2qfxbmmqsiab1dd3w3amontog0aoq81wb79odgh3wqnj0x1aznlja789jhyybg9ck8n7ap4jet6wunpvs05rq6n00kg0hwhvvfeq522tcfgoxrj05nxgc3c5ljn7t8af2fdqumqan17tocf4ce9b2wpy2uxqqajhtvtb2acm2jxvy2ftyhv5miaxgs31jnvud9tafq1zlwz6k88s5c4pwo2l9jz41dwp9nvdv6phvgvvuvtyon80vl03z92desqzi306psalagubjp2yfv2mse8uese42x2n3sic0l3d8wtf02yqq9xsdwy3srnmshiptqo4vjhufxaa3if5bbzel9jkgjgocbeb7qyz6grdk61fcqo9jpkiwamu3ar5x1qtv6737ved3gbnjzn43401non9k7wfwp8ftjv6hfzoz06ifphta0dhc1bthsganyhz9wl9zm3n0ikcpgp36m7f4etdy2uslpetirz51s8rlln3ybqlhbio5gjnxjsu68zeuh36miatonksoccrxuf32zdlzpxf171bz73r6fhoccg7vp24ev05llhho37nspn4cka4x8pn1taq0x2j8uo7hcmfqby9vma4gft2ui0x8kfjv8i93pyd33717lhfttl45iml83t8ebb24dmmz77lo1mukhf9u7fb9mq22tgswmakbslwnkabqb6glppzhk186kfbpvlzrn5w6zr6kit5l2pw61ndujhfp8luxgg0696kiut10w00tk2wu9w71v04ql173c5yi19datrd1ceuq75izeesskrxa02ohaeviyffuoeydibxwrxrcd2yje5pinpeqnvtq39x7plo1fzxqw69mgerkfuoa6fsnm6ywisnyqfm6rfl5quy8xzz3ivy4oheqyeq2906ud8lq6poh046ja1y5s6dh5h4fmm6dq6774tc90szkqa6wtf73stw52e36gqqznlh64atibsarsti4yfmtmk3xh45abab8xg4vpsux5gxrt8fwy64pimnz9vp147zfz23uosvzyjlwlty6536qpxl6rv773mig21nklzwu0wfrdvsf7jvasp7a8a8mke5v71g6xyijcngfo5821m6d0f6ieylqqpcmads7n9ddgrmw65ml8xg4m1nj5dopblbq1va7cfr67x40a6k98c35onc1md1s588fiynuvitdi8o2chrgdwp9zr0yn865o7f2y6qydvtn2knkxqu4nl75tvqd6t2okyvztmeikst5sj97k6hsabjpedb9ox5lvfgbgcam7yissyojrjkmcvn3x99dmg04t9xs3w9we31608qf7xdsufbuh976vlgbztkfe1p2arlhfklnaqkw2v35y9jf2ausxxcclc9vrhp1e2ncvsllq2qgf2oycb9yvf4r89o5w8815tqg3anfoepfxa8229edyw5u139'
    })
    redirect: string;
    
    
    
    @ApiProperty({
        type        : Object,
        description : 'resourceCodes [input here api field description]',
        example     : { "foo" : "bar" }
    })
    resourceCodes: any;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'expiredAccessToken [input here api field description]',
        example     : 5089146933
    })
    expiredAccessToken: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'expiredRefreshToken [input here api field description]',
        example     : 7366571001
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
        example     : false
    })
    isMaster: boolean;
    
    
}
