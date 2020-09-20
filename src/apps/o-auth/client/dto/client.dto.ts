import { ApiProperty } from '@nestjs/swagger';

export class ClientDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '895b4570-a8b8-4b47-bd7e-9643d2017523'
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
        example     : '1xmdewlinxxh8q13bdfki71nfmbvl0yz60gsvulivsvnt4zcsutncz1n0gu4zkpf2tje1wpll0495aku7btvrg7q8j7sznvy84hn225dsqqjc6uuorg4a8d66eli7ufir8apakhs2psp6scs85z7zqaixbu6xlvk4j04npfkil9tb0ymu5pieit9hlh1ir0rs14r21r77neu3ei6u23t2ksx26rg7nxo8vrjs6xvgir5093jczc4dgzgwtgnamh'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'secret [input here api field description]',
        example     : '41bw9h2z6kc87yi56nosdmk5q286kvn09vphtxc5jtr9j2ci26rzvyg2b09wzcvzdchf82q1cl3xwtqi5gn6b0npp7'
    })
    secret: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'authUrl [input here api field description]',
        example     : 'rm4jppqdr0g4yt2eikvas15ljznmialmb2m8bdf5tsotdojy4ax82qvwffjciyot83rtbv6d7g3utwdld4cm6bxluiktudx0bivubqvounprm48j6epspkd2qx5yt7o2wcyd9he1u6u93d5at6b6ckfc6tdlzwrfrb7b47y4ddwvyj0rl9n1eygtevwt8wr3fa6cwlivd4plwg980n8aupixmr19szayeey6ynkbw3c962vkiws7fq6hmf1y9l0xzbadl70vl537zsxkk15ux9l55rvsso582zqxte9puf9ofswy2v4nrfb03wuvgfsxhrzvv9zo4nrq39mv6vi0pq4bm892ifaj89c7s6vtrd7im9z9tpyp25y4mnhynd5brppspwby5kf4x7wrsk96bej5w06vosggkyemvv5u28aiujjwane5yajav6c9pqmt7ufee35l4inavpj054t6x4lfx63z16m8sucuu1juphm0yt4f47aw3hxvj2dhhvqlfezgahb35inu2w84rxcvw6kik9hj6pwqzdwqw92mr7ywmalitjzrmw6xh8tnvuqjv18qnqbqllhdin4l3ydw9jvyauqveeic19cbsebl3b4gyn60w652mt6rbaxz0nx3oozb7ltv4dw4tr15zve03jwupgmnp2j8djjnaty1dyezdh2cd4g00fqeahop10sxqfw1iamptrnsyjl8yeovwqvflcwgqsnosu8w18e9ifes2krx9wxswcad13onqxfap7pjw4wqxvd2xpigzzlxywtmdpwfsjngku91vg1u2z55hw7fxzt60pjd3in1gnygdff5km1nhz09rfx7vpdivm6djlv8vjjd5i0coylic14zm1hyy98g39olspt8lm39a5e8vjyk998y91dyd6xemawx6kthrubw9kudsyqm8xbecqnc1m22f4uif26r9jq5rezreg4xhfkq40bksmh4orlia42rpkwpfgu994xtxtgdddyakvfec8x45x4rigmn1edtvyk2gypy9btpz587o70baniq7oeqp9gzvdkbnrc9wsb9avr3npg5tshi1hmbddptyxf3ct27lzhn8ccs2jbsd9q01a2kb1odysc3xv5fbdw4w7yq4tkqb4fye51cqyj6mwjdc3d5ztqgwee7ngucnf9v9lbqu49d2vj86ulix5mcapu83o0q3jdffawmtaucrq75go2ccx2s3ytzdgh2qluc3udlunip94wvh0x6q1a6irs4kylk09qy9t2ekgun0aid2082snp52ekxkdrp0gsfcu9xq4ct9tdiswo3n06gxs20jxch5eqxtahelvnsq8vz77zpaff445dks4vl7ysad0qk9ra8i76tv2hh9w6s0vbx3dicuvzbpj6v54nxoa9ddt7c5kl8gvch87lfhh10bq4aiv1ezs350s2q9ce7duhy3nj3z2o42is8zfymp50ctjrc08t1o3b8uw74f6dn8htzbnatthwbdfruoc6zujyimndreuy05z31x423vrm9alfg0bgfosmbvlzpkyqy7v2a4cj7ufab13830glvo368w9aqopcql29jre8ruvu281ruk7087h1yoqpi3x0gcj8l5n4ivlja96bmz7z7sjw5kryd4rmh2o7z4oysj8wefqpfct6pxju8owvvfqxohyjdyndujrixdwdw6d2o2n46jyftkunuatt7at67cf53i5gvvctzgp23gja0vjx5erkmovvyscx4dsxrhm8sx9lqhkrg3qeozjy30sfhqanoib3x5y6gut52v8tyki7fe1jw36e8ttndkw3ownr6x1vtwz1m47k8hxreks3chbcbnegituclj8ejw71pwpmsem5ko8q5tbxbkh8hiyd52w230k5rrg4y2t6608or2pmqphmr092thw2c0ptvhcuk5bn4x4k6c80dgtpuw0g4tkdrd1mt6h16engjv4332w4x1y33nksn07x8nde5l5rja25927l07t7m6zr8upygzibh60e8a59vx1qc'
    })
    authUrl: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'redirect [input here api field description]',
        example     : 'ojzs56pbgskvet0fymp1vnese79cuoanqqz4ozakmj5joe5k0u93gf93odddsq1myas8gnjfk43mfcrxys6xl3fwsmeph24foapftbpedzqrr7nh9vfa8hsdcxvfa9i0wis9gvfpdqrlfyszrq837avrkjfcfuluz4hyawp1w7oktzb3h9lvwhm7ekd3c748g60eckqbo8yqiiq7pok0rgvps7o5v0aysj71f682vx893znne0315h58vsvn4wz76u2jyp9gq8tnpks3nnvzgeh9ae7y0h5a5b7zmum0520zgzvchbwu4eimjzvw50qoxf0xoq1fszir144t9e70gfli2gw9mks4l45t5w6pobnlkj7blzi5ioqziuquw1khj8cimqkfkw0tczw1ciis72fw35cp28zjwwhe1q6a5wfjdsr807d6di3w7pus2845o5vtmfwuedkspsw0xiyzjjuvx4szbwtnkrsa9ixorzj3sha497bx6bqu7f19207x6a7yhgxcslc2pbtstpmwd83f1zpi3fanwel0or5xfbzpkn5k6z66m9hq6toki59323nrqk2s8ipkvc6pgmbhv93cz5ngz6cfpawmm47hpnc28yxo1g6wd0jjxh6smrpuyp8kk5nc3jvhvi63yj2xf2iuphnwq2q2rluoqq0nittug40bg8gur6kp7pjfabfbng0g89wysc7u2og9jvu2op4mei4gvo5nlw8l4oxcf0zzs1joljxpalzfct7l2mtjlaicprzq3ja9khhv15y8jae3ldmbuikvt7o41atsmkhgs5833wnsvhcmzm42dis1m71ssn0et4vwy8idj2l60fh330wnxpqokx07pxxzg3hlm0urpbk37c1fzlg2gxmc3etwu2idunsmfpz10rs266evm7gqoswwc88frno60qf4x88wkuczqj6uedthw491zpk4mtrrvrj2aavbpc83mdg2upwt85jjg4ovr2h4z6p0l7javjiulcnzje5lpixaw4srxk845slf5sluvishkmckb4rqv7eum7xoq63beinqnsqkueql1qysam5y78e749cs4mw5aom5axydbsb8z5codpzubkmtzhbn53tyes2auuatsx0a8gn0h6njnvzv2xeax9u6uce2m1nc3tejz580dwkcp5n065s367t4y8kict424eitsrdj3e2dkuh3b9w6vjcgjkn45bm3tyd8jda5pyjocgwvksva13xmol3pfcji1b256ztbpe0vksbdbd4xtcf02h3toledvc1fp5gcbtblmgh1lxmsjkshinfihf3wvdrfbjbc6n01mcnqu66tp2sg8sl0hhd89oq0h42jvt8j7c37hkl9ch3l9agzwz9kdefb14h66ytcck4a650iwbmufsf8xvg3iwlzs3o7b670xt9zsxl6ikr4c8k8rob16wp4exgqm199m4o2s2y3e0632iwqto1m07fuw3dnrlwcz7kw33v1st8dh0hoa9abewv69ved5nxboh77n6vqf3yxga2x5izknze4upl1ansk6xea33feyuh51eik3uvbkahpqo7b6s6c59v9eslgi1rmu1hrb7rs6f4dmygwjrxbkyghykcpb1c4m2kohaie86qthk4wmybf3enu7z0i9qjmcnh6ryr4410lw6iimzyqxhfcirp4yc2oeeh3c1zupl7hopu331k8qyevr0i0jb4u2cdpgp4dmofpigzxo19p806zrxo2by40uhmexysi6pg8wuvvmzgo6v3iphk4sn4c7ubzozvhtcz1hnmb2aoek1fk9pudsfbvpyxlras9mdon21jqm02itw55el6ccc8xfyinafayzgyq7mkbpo8i2kywh7kog63thvsnkawj7ezry5m9jhbwp8bw4dbf0jei5znwnstskvg4aeh9i80k4h1ycv5begp859geho987dorkg4pxxm7gu8eregn386c83by86bka9nujcd5p0hdeydr9wbk8kxaz7u9pc6z0ix7rphqpseegnay'
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
        example     : 2849483630
    })
    expiredAccessToken: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'expiredRefreshToken [input here api field description]',
        example     : 8824783444
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
        example     : false
    })
    isMaster: boolean;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-09-19 22:46:35'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-09-20 12:19:48'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-09-20 01:37:48'
    })
    deletedAt: string;
    
    
}
