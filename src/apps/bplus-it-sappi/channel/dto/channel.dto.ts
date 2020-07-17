import { ApiProperty } from '@nestjs/swagger';

export class ChannelDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'bc9efbb1-2b66-4f8a-8b60-7125694e1a40',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '5e09071e-30e7-469e-b7eb-2b7feb8e33a3',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'a29ef734-eaf8-430e-b44a-b57db72ed4d8',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : 'ckzziuvfo8yjsyos191b9q00yugjszzmlzw4xl1x5t5ja28x4hibpw3jq7ts84l1gldqk0vg0lzclvxk447edebiuhglgibq69foxt7iy4c1flgy2afou9yp35wwkyjsq9m4jrv2h6egpkif254z0caf0b07haxv',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : '8g8aphm2g4kuj0zese1fkphc5z13jf0v4xd96xk8ur1ttvrul4d5zfz5ypwmfin7r0sya5mzm3qp02wlzwyl8tsk0wrg1mbnzmsl8h6kgh4vq42mevln6oobfo61h6z85hkj68mn7ram82sg3mvjsuf991ha3pec',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'f6el4mz3yea8oe6crqimsqq6uqdslthpiaam9sf9f5clxit5doq56vybdvu88s573gr5yp78rzemqtb711oomw13tgjed4upr1mp7ito16hz3079hwcse5e7477a9cwbelecb39dssouv51sgtaag7ek1sjk37kw',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'h0cr3tunzs5q2x7t7o5g440u93ft02thjf60fybeftqr9fgkrbhgg0wzjjbleiwk42xkxdl6bmstnjvl36rm0dpealrvptwg7kanqctxfexc17i30gibrdhm7w2bz8pr8q9utjy12w23aohj0qqr79mjgwt9csdv',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : '7vabmmqdgan4kgv7j1gr9wf1maeq33t064jss1am3qrmnwq0829brfc4rdst226thmgl8b1ciisn1uumslqgohbpzomup6bk7szxv295azz6pcltnudie1ukuzzdemo8tmxtasv48ug8156oqu9w82w9cybknc2g',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'cm9kt7qzdc47yutjla5xz8iwz6xtkwahmaj8h0m4bsvbhkdk7okalvxjj6y03hyof5outg7m65kwnfjwj8zct3br16xxs8nuyqvlugufo0x4citv1bj07b07qqplwg2h5dgem6bms0xtgfwuiutpxhk87zwh0440',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : '6l1qugb8lsa7tjmz45zb7yqltz9p6zqjaok3pwa1ayzz0hashlyvd4a01mo2jagyjmq8istcx1ms7f7bw4g1usuv9j45hc6id6izl528b68uivmbokvm2x2of36l5n5x9n2zfgpo4krajzxe57h0cvq4nfk55ilh',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterType [input here api field description]',
        example     : 'ktaue1irejx17evax9g98gxwc4zkrrq5l3uom384hyeyi9k4jxzttigluj8s',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    adapterType: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'direction [input here api field description]',
        example     : 'SENDER',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    direction: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'transportProtocol [input here api field description]',
        example     : '6hyu3hurbpf0pv6pxbml76sybfkm371e2jmzzwk0enast5h2ljr2zpf6bdx8',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    transportProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'messageProtocol [input here api field description]',
        example     : 'ydcfzzjcf1zyhp4t7s7n3k9tmskmrocshnpgedkkbp2bpo9fa5cqym96gyc6',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    messageProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterEngineName [input here api field description]',
        example     : 'av9zuxe0gqpdn8pmpjrpihmgxowhmfw5wg1ulibd6jxzqpd38et1tfmookxtlrx15dlx608j3oufsv1q8twsu998htiaepoh0ss583zejzhfyb41fazfvxqpr6ybyib408utav60ziwseyq9484q57r9li2wcl9j',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    adapterEngineName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'url [input here api field description]',
        example     : 'ym4yjzz4tm5n3cfhkgskm032rush1e6v197pbwmwcag9rezgb4uj61c6qx63lk1eznnqfjqze31uzeidv8grcydurk4ei3c3o4o266r12x25cg0awjdukdvfqo0a6tlxals8nz640wzzwzn8tu6p7w8h4ybwr6z3km0b7t1p46b4sdxsvl0hyk3d2rlgv4uyem0slpasbdnsp0nnxr1a9p32x33qqx458j64wy6dawkda1tq0dec2ren9562c996i21m5sdeu4wr2wbxtxtxm7g7os3ivcv4sb60l74mph8hpolpbde53gg79s7995lc',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    url: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'username [input here api field description]',
        example     : 'ryzku8m5kskwj154hpj0sqdw355ws5xm9z10qi7k70df3a5og35cjboqltm0',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    username: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'remoteHost [input here api field description]',
        example     : 'wimdjujn92u7gboxbwzy06i1fi8ydu41ziregnej80cgm6oyoygjglqxrv9bec3a0hc5dyxsnj0cl30z1ebuhhhtkl15y3215nbon8xs1r6r4r8hd8owdv88v60dhwgoq4lqzbxc9dki54w2khy9glnq8quoi04e',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    remoteHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'remotePort [input here api field description]',
        example     : 3577160266,
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    remotePort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'directory [input here api field description]',
        example     : 'impq2wu8m206ebzsot6rdiljos8mc552nbkctrm5w1rxjg3ei5kqmu100oh5u32kunku9a6db28b6jl0vjpmv449avcdb99ndpzf802hgaqyysc31vfie48xjboiwrwky0svqr9e78mf9m52kgya2gvralsc6gj9k04f1zhm2c71v7kf57oevkn3pqt9esby6ctmqsgeojdjneeihqo3u3tccgc56zlgl703f0nhcyl7vxmk0l4r8b781a0p5v3wtl2p1w2ee8d4fsj0ybp9mlnhwx9vi8gbaqgkq417yptqcmcb9boze09tlg20qgq543tus50khz09z3keq1aemlaj9v1tier5ntaflboisvatwhk693fdmczaecal5nfl86rr7mj4mhbop8rglsttb8xklmxkufarne52wwq0mdhinzlldq7wfqn32p4kkmjv33108a9rpb1kft002s3wbr9701loykql7p6k5vyux5yxh87vxf728g470pv53u91xje1q7y0ndcpo0mvyp5hrptoodc1m1tpyroyeu2gjxhbfkn3bgyrogtfvl6vd46ofo4kvros2gidmlfdh721i198894tc61onj5v8k5slfzeobrt5fb3z42t0m1inc7mfw1umfuzkqewgy66io098s2lhsxuua5obukq1dca0j2042daurfvrxz2poli7dmmxzeezrcso9sovp0jg63sonekqervc9ysa1qivr1lffyxniki93z93pkzcsgcsqoxy4v9ut8q1waohce5wzxpue9mhotvqhkezh4j53bqk91ya9hx4qpzlk9mj5yqo4xbm9xk6g2vmggdrsb8roh2is0tindi8i4v0egkfjzxbyhsa997i0oh6v3ziv7on2bm8ugtyd845ryy7rnna9sd3xfww8gwljwr6799gkv52mtxp16tssb61gskbo9ut9qc5cbk4bflqe1bblu6ah4d1sfd9q2uovy6sb5wkylfuy57froi5qg98owygkjgu5os',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    directory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'fileSchema [input here api field description]',
        example     : 'eotvkd3l21g2s5ib8t17vndm6lz1hewu5c0286n5xakgjxv9oo08mq863b5yvsp6pzz94cyrdp460c04bq7tmzolz3auvr1uvqz75cz3eux4h2fc5rgkgjxmcdqh6wrb2z3abjsvc7ovs0gy6a3veigft6bgg9bo9rld1xptbwyglunxfrvtm9v3vpaw2b1jp68w2qs52zumspehl9vqda245pvrd67sl910ulef1xcehy2oqz0udyq91hirdenigywc6p0reo9awi4642c5egvihjb0r0tmwmvarypohd8dtepphrpclbo8kzdqqrdg71wbda38nran5b0ao9mcn7uwtenczh2nj94lbd0v1tz1m4kpo0wa7lv1vjtmnoxa6m21uiq1io7i6ur1gz71su426p0098itxw8q9dzoncvqm20857dfyt1hcfq96175dg7e34qw8wz8zoymz2pq4yy50phqqnzg2bejlencc0uaablf71oyl1ywmui5rpwqbw7mh84k3mgyyu73nl37lrfoppzr2vp9x0e6h5sfp24gl9qg9i588zr1bilv8lkmgwqhfq319qx57vf0ryh5aw798p3gzd4m7okjqhsr25az7rvsxstmvceptfc1hcnhgm7fexqa7b6cdayr3t2hd33ksrwc8twzmnc61t97ed70xllu2n1maok1erky5c3pazd8fzuoj8yqt13bg7y4gq0z9p64l89h46n2ybgmtfsezug7uk6gqyrqufl1yqbpfj2dihmdhaacn2zvek9bkpushhs2x3kbq61j0o4l3f8k75ijx5rgllbgtoifkv33qcs44pkxqqat3zrzty1s6r19n7hg5mkuzjvlih7wsognxfkbg0ez2zyosb4mv5pa55sbbjfos2br6nbjxj13yylmrulfton0asmjm4cjdu84z3959oeiwoywuxic2xswcsh8cv3hpeiyqrkabet9bdm71gnreup4265wxxjgs55lxbl0baakj8we6af6fwi1',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    fileSchema: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'proxyHost [input here api field description]',
        example     : 'yhr1d7saacdib5pjpmg3onk1xp0fgrnxzcb5rf1j3uncn6pbzlho87cw7w5q',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    proxyHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'proxyPort [input here api field description]',
        example     : 8901907688,
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    proxyPort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'destination [input here api field description]',
        example     : 'tsm8fiaol4b3inzrcppk38z5u1fgvdm8ioewrcks0bov2i9qmbi5ua0v2qluneq831si41ev9zihw3g0jl31qcn6t5mmgrh2anz6di06bbk26vz0nnzgkvqwu2jbx7ohxu5q3yfyvii21pw2d0n00f2l8y6u1hnd',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    destination: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterStatus [input here api field description]',
        example     : 'ACTIVE',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    adapterStatus: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'softwareComponentName [input here api field description]',
        example     : 'rje129p4tmgnmqhj2fup928t59vfu016meg4mjjkcfygl3367s6bjuximkz7m719x5cpr36joz3ouaxc6o8qh5qlnikm657w80kkbq2r5wpfmkqzntj0e7ls85jbmchum7ouofoyptnmlajj2utnb6gc5zvizshv',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    softwareComponentName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccountName [input here api field description]',
        example     : 'rh6sa1qh2rzulr3ojse6',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    responsibleUserAccountName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : 'fmzzbkwc4kdx124ppf8i',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-07-17 00:27:16',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    lastChangedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-17 14:26:14',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-17 08:00:31',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-16 20:42:24',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    deletedAt: string;
    
    
}
