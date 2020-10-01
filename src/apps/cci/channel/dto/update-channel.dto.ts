import { ApiProperty } from '@nestjs/swagger';

export class UpdateChannelDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '65b01198-a4ca-491e-805c-9f3080dc8d28'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'hash [input here api field description]',
        example     : 'xobgzkd52zq4tb0tyrddh1p5ukgdz80xnp6k9lve'
    })
    hash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '613574f8-e566-4132-8abe-583acd7f1736'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'jr6ihe99ueff4uer1wh3nibjm0yrqiipvsx2lvrz6x733djbmj'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '3fdee952-b453-43c2-9657-da6214583579'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'o4z912gq37ccfyerljjz'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : '1aednefq5mybs2ng8je14lmv6dx7od0hvs3bbuu4gp3zhmuvwgkxtgqeldienwscntlthh3ixqit8pv297c6ngqqx73njtgnsuvlw1ub1hgh1506m4l4odg9i669384p3qiajw1dpqy38hmyg1g4b3w4uecj04sm'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : 'fs6l698h6xpmbhb7zao16u3ex72f54anzb21zltw6ce1ys30m5q2nukcqhat81lfqcjtoevrqz08fn29l1x5tzq2hob58qmlv60il481jqj9ccbazgy72h5fl1r3pq0z89e5hr344arvvg9g28d1vm43z3x7e4h4'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '1rb6a6vw1wvc0uqebbc8n144zxqv45rmj96z7ck6so0qacr0yciay8zvao9h9um2m8cwcqq5y1fh2ujf96stfe16srmmb4etjrc1744w00p0bak2spfadxaaqdpsbwp1ja7orxgsroxazc3ti0iax1u2s9l838u3'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowHash [input here api field description]',
        example     : 'dkllespusydksnwghdoud4li0im8rl1btcrtetzk'
    })
    flowHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'b4wgpu3eus4cm1fg7jsgy6zhm0dxvyfzehfhcsl0vj056pn5u8ye7t7bh1o0zip0ttkydftr8lpqed152sadj051c0fsf34onbicsn81tv2nl3nhdx6utrvhq75wihq6vgrz4rckjg2kzd0m8dm2bv6jh1rp9qai'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowReceiverParty [input here api field description]',
        example     : 'n7x5mbumude5zmqwi07yk2kccxrs4qg26746blped42mern2xklw5jb0ifo3zjm6x2oez70xe61fompbaqewx611tvad4rxgiy2brzgx2uhdqtwvz235qxd2v6lczkwmljfwuu3zwiyf91eh6qxbvr0uusvvsk8c'
    })
    flowReceiverParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'yu8ppuuawcsrra8yglj22vaoeluhjmf4c6fevexp2h3my85jkyvihfulm8ix1bclb4ytbw6gdwfn6fwmaasvtjpmw7scfuzr5bsgoo5fo46gp3ecdua5rhawf6zz9qtu0j04xi6wiytuekidmckzy90e2qt5ks2g'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowReceiverComponent [input here api field description]',
        example     : 'au89ozbzqmq2l2tg4jae52h51tlcq4dw5kcim5zhoogs1w1tb5e9qaffhz6vrpu1rek3kog3ivi68gcx3vzuyt2b01i7x7zlcrwy8yzobrgozd64t10f76u07vbq17ix5jucq8myi5wp500s69zzhwgxpqifmh6l'
    })
    flowReceiverComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'agkstic9vkarkjb96bi9c4m7qighunsnv9dcv65v01qki9xxcxcsze86y04iich5zqlzfrmyrry7cr69qvirzmls5c9t2bxdp4g69o9gydm5lv5xum9zh2fuja5ul2brgrvgm5ezk4ifu5hnidh8yszueh49qudt'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'qzjbq10jihnh6657639to8hbudzufvlihtvf7u3tlging2b2cwunjahalo0p6txjp759bqw5kt8u9zf0rxf3dw36r1kv9ww1pq2hp8u87dm2wlxh9nccgw0afj8rkwi3usc5en1hq7ps829c7h22mk57ubdz5u96'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'hncx61wsygv2brirclwl'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterType [input here api field description]',
        example     : 'dfde6rb6cwvewvun54k1b4v4q9edgo1jotywd5o6rfjoidfo5i3odqqijlzt'
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
        example     : '88dmious1tkqh7s1sqhtts7qaccvl9qkkrh99kqfjhx2xijdbdd0dtuvrr7r'
    })
    transportProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'messageProtocol [input here api field description]',
        example     : 'r7uwk6f1n19mlfvpaachewd04m6z4glu5eakxol8kpugvr9zhjamhtnd6nsb'
    })
    messageProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterEngineName [input here api field description]',
        example     : 'wvrmjcn78lgxlx4l5u5r5zu7fpmaqgo25tw1yp4ik1csf5io4bca9hqz07c92sf41s4a9kj0f5g9ot5e4xgvv90mgpk6x48m6yq3khwcnnug96uvkvgwgeage2nxac6ot0q25vl4a6ijtsl6nhm6r15q48suac06'
    })
    adapterEngineName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'url [input here api field description]',
        example     : '25jsq59lfqf4rn82apg3waqmvdniajwqxbtvs2x715qrlnmhhzec043y1plgd7gbnttgxmccuewgyzakbvx9avu3bg8awcf84802ybmogxl3cu5a7eja89s1wbfagngls2lp7keeg47lrjefkb65j3rwzsxs30cz1r0515mhh8y0l50dbe0wgiv3y6ohmbadze8f6ypn161h97114igl18ev0bs57zedzmlmgswjleqx2o66zwx6dwt5637gszb8wir4euibmq5rrn64hnnx9e7wy2gnrfalc6uuspirqf43u35l1blv7jf96koc0lv1'
    })
    url: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'username [input here api field description]',
        example     : 'cd9ul1r69fz1fgef14e0a2e64si9r1fb5pcnf4vrjnr6nlmks6pe7l2fnotw'
    })
    username: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'remoteHost [input here api field description]',
        example     : '04vbx66t6rxjqrihugsplv5td8r29rlgsyt0ovkp4xs7xyls461e9hw4flapltjjvo1sd40lna90z1kkw0vdgces7j3xme396e064hak1pam3wnmlf56nwkbdph3o3ia03b98xl17v3ehsvu6dwe3cyydnovrh6p'
    })
    remoteHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'remotePort [input here api field description]',
        example     : 4789728427
    })
    remotePort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'directory [input here api field description]',
        example     : 'ru3b0a42e5vb0oifk18718gt9pahfhps4t0cy4c4htt3ft5l1wqmzdc7m8mujvqevce5thllfl8gzqjm37oat2ofln9wwlfsxii3xsj37gsnf1g2td6ffl6tliymdwp0eo6z49qggofl58a483hyw2oeq99g5lkv7jg1hi1mx66wblu52uyoolvtqx16mf3u5lha3j7z7roi6pfk9o9045cy94qcl3djfrm75v183behrnhjwkk4gvjb8vqzdkqm4xdd0qqt61k1ufiz40wi3ie5viosmd2014bxks7gokhasvezz8c4nugjxrvqtyx3l36r41p1eobg81c6svae75ithihq9m26eh0uy0b7wshk8md4cskfppx3rloahrsasu0341ap142rk5pnh1oy6tifcd3cts3iojhduc0j0l27m8l4cdns45e557y3r6e92lheq5cp6izxvjl3sw19xkkb6w5cnziz8j6gvwq17gad552ym0egq4nnvmcr8n15nh7u9eh36mi5wql4lefhdss0mcdy7kbprz5ko8a7tfmqbhghc9xklf9j4pgpxby6lwmdt9ppe8gntb801dh1b9znvjyjm2qhkwg9q7xyla3mz48or2zf9z3ci9ftbpwj10w56p7lujz0whis0h5y9smdb77dfldpd7gf97xym8kzqnvfyttj9x3xw1pcoazlngxn128aar1v8vnofnlahl6awod2seb3y5b7u32nohqtm8qs6hin7rtbpx1dcrwbloadr4x382hlrn8ee9ehzb8ds419avkw4xf3a554zycexdu4p8ek4a8s51bcptt0ogz09u4etgm9h6kes064q68vae6pbfgitrfwso50o0ks93gqbnplmwnq2zewjdio6bc35ruifagc1635810mwl630sfkfn8ljpelli42gxxnktl5l2t7yjwvf65otc9wxpg0e6o6rrcisr26ehpcvb3fcq9xr7ug8rcm88m8mz6rub63ackzefo6yue5edki'
    })
    directory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'fileSchema [input here api field description]',
        example     : 'ucgi60r0j8jj73t1isjltogaqhe0wzlffuj4fraeme9o0m5pdpfd6aa3edxnt5vn517k0szxx63hi1lmaru1p4vz995an5huw1x2q5ip7gflibzeuav3hj3pf5k6bsshc2nilmwcsctw9z69zb30fmwze25iqa2zlmljye2b9g7o15ailkg1hbt5kdnufazk14avajeggjahdfeaz7jcm5lm5pegbnwb208oty8xvtllmvzsswhl9uwjlgxxif8nebcq9861bt8uaihkkyacr3ujfpx3wrr7vwoni2ukybysrtu02fzdo42455u2gxx8r7t3a5nww1jfyxqespeuf7obs2e0k55vbwzujngjxneehf2ujnvfl9wvmnj2pmj1gb66joewcs4biyxq8a2kbxu575lbhzlpolzc2h67n1ljvgo47gkcqdw3vktiscca3pl0t9mw6ftf8b3kf2uwft1pna33809aq6qbgtvwwgzfp5xqc2letm945eaa2yc7k6922jnjga39z33i3fqwxngmawe48wkkenevervf8cg99lycwhptn0qpeiuua6z9s5wvs7e0s4poc6z0ez85ir5yx3axnepopukm8293yw1xh4acp01ywbu3avniha5w3j1a4myi90k50gs4blamu9d9hwn91r5du8zw9ofvyw5r2cpqb5r0pzlq6468tmtg1hfbf63x4iuzg42870ojywr33moav4cex9kvjkr9i5q5nvt3j10rdr6ko30gw2s8lyt98s5te77todscjemp036ywuwi3ugj077c3mbpjqgcplzqu1az33dr4e9t6pz7l1m0jtditr5xnnptvxgi7m88dgkhf2zyq0cdzcfpwykjsyiwurl5sd7gvupqkx70r8gpur79gmx7dyc0jyj6rko34t9z7vek869oar3a66c8krx0win6xnsbkqy2b31jjp4zezdmurdw8ui5loo6jkuc3shy3msbuatssk9aulzpxv6q9luod673o0wsk6k6'
    })
    fileSchema: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'proxyHost [input here api field description]',
        example     : 'juzb070zp2abvbgawjg71puzmvtgz4mr6glqn1c3qxa6lupjz85zolfjdcdz'
    })
    proxyHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'proxyPort [input here api field description]',
        example     : 7401712309
    })
    proxyPort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'destination [input here api field description]',
        example     : 'dakojkynh2b03rgg3fl87h4xj8kh40xfyxg1yudxh7jd8gnf5xy94wvt2ouviqych4zlq1bhgrwotkqo6go0evrb45hnjdr7z8chu818y4n17vvy3bwhxkhaj9lncu5nf8m3gqc7e4t7xgsz4fxhbm7lyx1i3911'
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
        example     : '3yqn0q3ckcoki0qlovfc6d38csag4afeclsksruqedh2bzpqd5n0x1wv3u5j690ljqxixy59qm2xs7kpc6cyqan2s39523lemkag6pku5vvhrml09nvdl3rti54mg6xkd6ijix1yqsz338hpop9oydhjohwvd78c'
    })
    softwareComponentName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccountName [input here api field description]',
        example     : 'zc04fl0a38cvmx0eqqai'
    })
    responsibleUserAccountName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : 'sywjw5xmm4vgifpkvxay'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-09-19 23:19:05'
    })
    lastChangedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'riInterfaceName [input here api field description]',
        example     : 'ga05hygr61hz3hrlh69equdnhw1orpre7imu64a4bwuamx426va23rbbxul8jyn2aghxh28d6ljw6o49aqg9141tydg3jvpmrdodyfmv4m2guvk2flu41xcg2k55orzk68idinpzyg8hodvvwt0trjbeg7nkkdnk'
    })
    riInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'riInterfaceNamespace [input here api field description]',
        example     : 's0dok4rzl0jq1zrjkvar6kqhk4axpi7p2t10txiej0xy9hsoxbrhqrpj3hllpdog8eg93undudpm0g6a2z3xvnoe58ag60y1k729lmpsow0dhx42wpmh537745n60pp6c4y3gavombdg2yj8lu5u25qnr3f4713i'
    })
    riInterfaceNamespace: string;
    
    
}
