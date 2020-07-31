import { ApiProperty } from '@nestjs/swagger';

export class ChannelDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '1586ced5-80eb-46ac-a3b0-142ed1d7f2ae'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'hash [input here api field description]',
        example     : 'z5a664h1mysq0z2nteu1c5zdcgwdfozc9s9m3p2d'
    })
    hash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'd6f6b978-8b5a-47e4-94f4-73d42bdfa37b'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'ptei504s9any4n74fbgivxmk59um3iwhmrb1po5wdkmum4py2v'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'a8fd7bfc-d4f5-433a-b42a-be2f88cab25c'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'gmjaskfz5mq6ec78zdjm'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : 'z1do1hpxpa1j0w1pnwpzy7pzi1fki07gbgw70b5o6ybkgt75ppxh2yhahupqzbb58gojs6gkiou9po9ngjc7um9hcnhquaiph62ablql23nzv64kdwb96e258y1ejasdmm9sdl7olkt9z92gpmo3rzzeovvbytmr'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : '2lt0oo4l754msii1w7md4v4f3t8okr8odxunbfd0hdb500stdiayqhnnnqhv5d6mdxiydzzwdcbtlyj033y0q9y7ynyig4ma7mh6703f8yrnkz64hzhgtgro9fd6n265qs74o8ja4xptb2jyfmsdth1vv6jvbgn1'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '2j3n89ab1dp7jziqzo0tu71oa2e1w8hg4dgz2qw6q76pn8eu297ia2c4jvbt4y1d7svtts9bqd2cl0bwqipfnx5g1266n774pztmcz4n54h52viggl0wrqnsovravd5dh6o5wy7wwte5xszqsaofrot21p80p6g4'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowId [input here api field description]',
        example     : 'e942c835-0278-46bf-ae64-6a56cd0de3c0'
    })
    flowId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : '0elzswzv81jkoza8mwm99gxm26tn3ltgvbdri83vom9r46iriik20a21h3ciplp8hzfyvh1aqnubei9ebmlqso9j514in2ml41lesqh03njl6iaxfqfdf2tps3u9adnl3zmvuf4t5cq3s995fqjpl9aklm0xjexh'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : '342jdhj3ziyl7526ve6pwpvqkjyuh215z1kom32o8l4jrsw1wdrcobjlomjallo9p79e1zy15vizccyx2n1pz6uqc2zv2amhe4q0kdfnxysz97ttccwku4w5zzw9nl4jrbovyqlqd0b02mql759ztiwctzlug6s2'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : '3735514w133x3l78b2201s5qh9ae0xz8c8bxhp0eaasttma8yvydtl1tdq78jnob2xzysoymvlmre2ujk0rzxdt4kamdkwut7c99s874x7rvucov64i25fq2ljl3hows88r3fg40ys6z4kf09hc4mhzbglwrelkw'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : '00n79gkvnzrjqju1io9iohlljqx4q1qmh0g6udlohg2kzwte3hohjam2vu5uel61x8ltiaf2s2sgpzw69hlt7i02wmooiiia3pj08rxy76vj05ljf76wnrtbco10uc8zzvaaivf2cww563ddxx078zzeh82r6y5k'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'dzsugyhvy58grxasx6wo'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterType [input here api field description]',
        example     : 'tbu42pg67bovpu5f9wxlvzjdbfpsq9f477csonuun479qxk5tycearj7p7g7'
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
        example     : 'xeskxnx51yft4x07izaxu4ldvca831agh6n5dk5jool6r7gzihyi7452c1i1'
    })
    transportProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'messageProtocol [input here api field description]',
        example     : 'fw0bs65retsyalxzd2xs7vln9p169r4pqpfpbqr2awnyczdsldwh7a9hpd3u'
    })
    messageProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterEngineName [input here api field description]',
        example     : 'yh4ps2ww14hmqxd5940fkzdqlugr25wwaint9zmkheuimu2ekutqxkvoelkevokl5bx57ngisu4929alsjjh3vjshvs7h67ymk6t60644aml9pv3rowxe59ckmh01qr2d9rajvuztob7tb0hnfcahc4a5w5njdfh'
    })
    adapterEngineName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'url [input here api field description]',
        example     : 'fzuiaw1182zaafkqjmuu5l53vyr1jrc973py40wnf1ws8h3qs5ru91koe975izfpfxosj2ugf5d3hq5yxb4mhmxv6noq7u0t4bzd9tr0ilmbw5hikj9kfpkuydcgh5u289sx4admdt8ji3rvlb2aw61ey3546kkhwpasr5isygcpruekl2sv20bbx11e6i545vc3ojqv9eb73humtksv52ecescf6ofthom7c9v5thdnt9hbmiupw04yng7by1fc3b7q3mos3endnazrwtwhjjm4w12zqgvw3p61f33q5biq7fb2zcq4c06xcewvyiyu'
    })
    url: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'username [input here api field description]',
        example     : '8031djfc7c7rwy2z3do6vwj02g0fo5kzwch10hy14ztpuugjkc2j4t3b5c36'
    })
    username: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'remoteHost [input here api field description]',
        example     : 'kxk83g0b945188imzftqymq9407ndvqpx1usbfzg0uhy0h0oq10h2vxcufwsr54zuts7oepucxtv4decoll7r87zcg5ma31epgyzm7lljqb9er85phrubch2den864m5bwyexswfll1c90tg9lyc0kjbdifjcgdt'
    })
    remoteHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'remotePort [input here api field description]',
        example     : 2093428523
    })
    remotePort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'directory [input here api field description]',
        example     : 'plesti2uwgeuc75qmkw1fh82f63qxsuv350swqkbqvdaoblla4tqevhl534ahsvwbtxctz357o2v2mgqvnofon0c6ew2yt4x39a12as8kt3m7m5i8he2d5cejhuj0fh3umwwvxqab5ksq3cmrjgjcppbvbdunpzp60parmyqxl1bhd3idtfhapwqnfcroh51e5iaseaeo23hi37x1i65otaju9tdbukc7x6nlip503z7ug15zr7xauptsmp8jua2f1ce7kksazozisc3dcnasd4x5ysh39hoz0xkamifizeszw6x7iryzespmox5cw0q0fie5q1uzfma9wpqngm8mtk7fkr4kaqof8zby0k2scghcofknkdu6mcon5erkbfscqcuiujjjz5cnanhi6innzlxhqx9f11cw80vvngwv9zk7tzpb96sruxmr25okx4my16evoc5n9q8buweympuci04fj8ao6x1yzcxg0xarwmykbyzdgq1oxatihzgb2t3rwxlxjqgxgcovyjbn1stwgunxlhydg4az1ay6u4bd78qib929795dx44k1869h4rl2eklryftmnjweopldbihvheujlpi7tcdrcgdoi6cehauhxxfndds5s7wfo30mkwpf8ggcopy9c0f3vjvymnrd5nu0u8gdpysw20ommnmdj0vrv6js6rkjhux1qq7e4i88mg8co2g3binfhmo2w22pw61ql747k3wsf77pvcytq55647bbsc4h7swdyhhwjz2xw5t0zlwvzf6f6mmpppzgefmhh2ki03vcnn81jzcppds6kohs0d7ym4cz4stqsra6ldsmmbkdbww63dhpa9bdngr0c94twv88o4wqtnxyek6d0ghbepk57pinrra3rdbkj3o0l43e35c9l0ddikucok4fz1mvk3z7ybususxk3tlhaat6zb5yq7omeqser2oz5ssq8gtp15kbfn2z6afz4t0bul4o1kykmthii3al3ws02njbzvegn6vevgqr1n'
    })
    directory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'fileSchema [input here api field description]',
        example     : 'xi7tp1708pby2dt2qg1iszvoo93s7sbl9y6xmz09gia6xh6o3auu8ealrt97s6n8n7iiboklxbzrygt4kr5vrwhqam1twduu16s7s98e8caw1xznhqcec7aq5kp7m2pi1e8y12tnvu6bkpuoelbd5j1daijx6lqkkceyif5z5kj4j1qhe6put8rp4dd0nf2r9tyuaplof0f094ygrqum3v4cdxfk9ybms89smkom73f1xkwntat63al7kozwurptyx2s2vmi5yktg8iyge1hgejmqcjw0bb6xmkd7r27nmohx38r438n7m9oolyqsythsif7g9iqaftimuqsjhxj54z4js4uvs053crmgn3gd9hhx7z859xm7kb9uadl74bnvevtf1wj3gzwxf6mfs72n9emxnl8ebhif3xyyplsrasovoanll4fl089ms60kx1kakfh2fdukixmtlkya1xbxkqoifymk4mirs3jcp2lfc0h38lh4pxzkqltb3rdryg82gtmf1odfv5ltgwdius3jdtfh6p7sxc2k3i4z3jaawk4vyckjbkl29syll4n2a8jn4ug63jb9saustnrn7w3q1sw7s17h0dt62ut3tzwhnpbubmstscgplhhkx7q8u84ywncv3oup8no0x900tkvokbz5njkspvo9vb2t7ya651r8k7t2nbvm97x2tvgm1k8ujmklcvimmjtba7zhydan8cegypf2kh72lz56a4v7y1c2uexehkjm5r30wnp8okiv5a6p87mn3yvjgmus28ed2y2iso1ywi8pj3yrviatbf5qw8zmf2ob26vyoqw9wns0ku2wuzjfqfncjme02f02bwh9gasqh0jcoezjzlbwaeqa5y4awmkfgzyhz4fug7tdwmu9llnk9958mv1d2e20y32z3kqm6m85ki6e0xdafpc79oupy76fgsujuxqxcum0oumx7sdogfoj9m3natrr6etkrm8rn1devv99xqrk7cc1fa3ngdcnt6uehvsurl1'
    })
    fileSchema: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'proxyHost [input here api field description]',
        example     : 'emxj1biurbptr3ksnu58rznjt8i5ejmx7xrj3701wmpnpuzq21sha7mwc302'
    })
    proxyHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'proxyPort [input here api field description]',
        example     : 6034191473
    })
    proxyPort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'destination [input here api field description]',
        example     : 'temw49v1okxy8n0117mie0pd57wf3wlbfaznndayx0j2a7scfxm7xed0uwphdaln6ghx19z6kmqnt0mzu8vu3ma0b5oywqus1bqpz6l35d07sicsww8hfemcx1iggeyk5ruresz7gl4r9tnh3bk2yfctnm01spt4'
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
        example     : '1dxqjbbvz41duoe9b8cw1yvzmtcwrfhffciwaia0w36hkeonm4fyhpijbv4075nhm8ds9jyo5wohz7ovwyvb3smhw6me43w4mo9vitzyf9xv3p5lwh01itjdh1ke5qojnuz7kdosy5d52pk28tjezziuysxravz1'
    })
    softwareComponentName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccountName [input here api field description]',
        example     : 's9k29oiz9qk0x2t90lc8'
    })
    responsibleUserAccountName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : '3t6rdufryrdcqw3ebtz0'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-07-31 13:30:23'
    })
    lastChangedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-30 19:39:06'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-31 07:07:43'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-30 15:35:48'
    })
    deletedAt: string;
    
    
}
