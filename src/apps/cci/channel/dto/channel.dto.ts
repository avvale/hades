import { ApiProperty } from '@nestjs/swagger';

export class ChannelDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'f05a1557-8577-464d-94e0-93e3f7d2c056'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'hash [input here api field description]',
        example     : 'v05chza4mq04ypgd0dmcap7mocjcq7m0omu9mvpp'
    })
    hash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '6fbbd70d-4a09-4ed3-a837-21f35dbd1e0e'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : '35dfpgv940k448xu4wrwv8yzr4g669i5sfcgbafnk8p7as6y4m'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'aa18636b-9a2c-44e6-83f1-a66c0cf2838d'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'be2r1r11dr1rinlhfbti'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : '1h0npojrlf62hne0fbmfnnhmjd58s6mks98i1c90scljcp88bda84s2ce5v2645b3zd658z26x0k3dd6e1v50fe35svicq9pxmcfbkcocpgktqin0pzzbhpbzwd7f0fpwlus20pxgjtuzn3x6rodzho2qt4xo3fw'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : '25hrnmau7nb5qigpne6w12pv7bk63pexeqqtg36zlk0r2k5t64bccyvmx8aesirfk7fr1hmaifrsuwm3c87qbbwtzg4uvqtncyjvrn0245xvqukx7zhtnkvjjqoyh6fonjas7g5ii9iwynjapfk14p1ikvpfahr8'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '8i2k70lajavvzd79kf640prgwf1842e90sjodphnp81m4ua3qqyry96w4idk3dt80aokrhh24u0bhujvhi8ej6xcnc3da4n781x4xcd9ho0ci5o2u8gpxrz3m45dot5wxts014nij7krjabd0pq549yen6m9y3io'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowHash [input here api field description]',
        example     : 'cug19neflri36y0imdfqn3fng7gvdf6wtu0jdhgq'
    })
    flowHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'gnwjfr4eii13o7fo6otnnf7stmzl17bk323c1yi4kfyj484kxr19f1n9nyrsqgc0rfi2b9vrh6akpmzif0h1shl9b5i5a7p958uj8ynp0bgzqd76bsj27t4gkg8l0prud9c4g1an2ihz91rtxge3l7xxv9yexs78'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowReceiverParty [input here api field description]',
        example     : 'o0wi3lql6411vyv2p1ybfw0h5fxgz5mt98hg2gdqgc47bmnxpyjco5axh9ncx59jgnlb4c4exdb6j2hnx6l8ntyr5izz6hd3f4f4d159pzk3racuusz8my75yzmtjqzztzjhdtt35gck9qduofukzo3bwuyv8lv5'
    })
    flowReceiverParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : '5jlxqm0irz8nnwbuufv0lfcvjq5livhordiboc0ya4hexax7cpliykhl4h7aeyzlczfp9ennpwami8xmt3wcw4mda90x2pwpab70kgx32o6q33fdfrcxuoowmfaxfubebylwrq5bpmuyxw6v2a0191tdvhhh53bd'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowReceiverComponent [input here api field description]',
        example     : 'dyf0a3g70yxtgbazmubk1tziuu59j1qjqwlk880v84indd9yqq9j0zwwjo28195yspu9vdg26bdnzqezrzcj8v2lmu8d6bfwmrb2p2rialjbuovr8b25umtc7pe3qg19m8y42fxkqi3anrss60d80tdjptg5cqpj'
    })
    flowReceiverComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'wimjmyp3vq784y3gtbly0tvqgkik84v6aow5dx5jlznf4dy78zscqwznww7v1y041gs8g7yv9vq0sfe1e3srcyvh7vhbj0wukph8iojfiqlbbxjlj2f9fjzb516v72i1rontvcmq1xew48jzs6xvl86foxs4kl4l'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'z9y0y0nhxp4k4ooxo8qk5s7i27kv0anrc24gs4yimftrmim2gbkgt6kj0j9n7rk6celngwekbtdnt6bx04b2064w8qb284oc9rrqe6st7y3u0xh6ftof602zi7aalkcdk7kj12tok15j184eirpebpfn9lox6nep'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'coynirt8bsco03vqvohq'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterType [input here api field description]',
        example     : '5s0yqs8yvar8tbhw09x94vdwumno90j67ape7t714gd7xoobll3b1b4y60en'
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
        example     : '791djfgzn6idm1qlqo766kxyffi63x419tfv2xy29jcux8zfxv9ql4pv9pbd'
    })
    transportProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'messageProtocol [input here api field description]',
        example     : 'bnwtiycq5j065x7c1dn1bljoht493l1xrmclxqa4eqpe7uma5fvtowvshvzz'
    })
    messageProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterEngineName [input here api field description]',
        example     : 'j2orft2xxe24qltjdoqarlv07hdppyf1y599gmcogri5ya3lpj38mpd38phrfbo2kjbt5m3jcyjguuyvrenxvxlad96et68gk4h7hvl0ts4kqqbc3yivx1dcwtjjnxv1i8t14707zy0rlru6rcuw9t24idubgdc1'
    })
    adapterEngineName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'url [input here api field description]',
        example     : '9d8eingvnlhgh9qkhg16tnq3421ckc7af7buq42dkmfyxqax0v6gj9ha8pepchm60h0ui4wzwvmp1ys1y0ft1yiym5m7b6ul577mjji8t2iritm8sultnrz7jpt7sbfvw0c2a61m9149nmx7nzh2kpx4l396akagb7bkkjg5s86k110uehfryil9k61kap6usq3bb9gwb1jxpebrqjsk8csaea0o6b6cqjj1ofnrc7u0yjnmo8xogee3eeyadb1sofvfbs7gplsz0pvg0m98rr6gig7xy96mxpm88m0vlclnx0rrbg3a1a2jke3v5oyr'
    })
    url: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'username [input here api field description]',
        example     : 'btw05vpwe9bm3rsaq5a6hsxjkydpx178ie4nqgehlb7x3w6q7eanfymc1j4n'
    })
    username: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'remoteHost [input here api field description]',
        example     : 'j2y1plzsz5xiaax1j8u26cni5mytskhuwwl115ymdiv3yb4e7b50j4n5g2acyhcjxrrxl88yf38dwbfr7g6gjophf93mfnptux5lz2vnyrra10lqsl01ohgdjz08tir42o3sfff1oyx0ule3b0xy2zpck68o8lh2'
    })
    remoteHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'remotePort [input here api field description]',
        example     : 6177461156
    })
    remotePort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'directory [input here api field description]',
        example     : 'n21zqwuc036zssqa5lwe95fu85dwh0u9ofvpy0pt2oobuw8rb7ec4g9qu50wuuhwt4iyxncy01s0vvwwh2a46kot3ct6xr12qkhbmd7t64601syb57dfegrya9v0ldwqp1chtnt7ymskva1o7nufsqvajd20gxx7zy08p9vag3nfil47622h0wh8nbatpa0fnlrrue9ogo1340dgun4fi4c2iw0ebqiw0ogca3osauwdt8pyised5104jtyq8nhh3unvzgkeuohhs2vkwto4kxzjtmcf1q1hyqk8qt0l8ufpnso853963nrk9ivrewsdk2zp4b2umn950g94kd0988bjvedunkjxyrqnus3x6vyl991qb20zord726nwsfk9yzopb8to4tsd6awr8tt1015816mo6v6pejkx7hzbbxh1nhnfuyv2u3c99c0f7pixp37vbo9u4sajzpfzr5hv14g02wqr4e4f89xvk9del07qxlwtvyzy208o2kvfn8ig41cz1u2d43f5155jj83mry0iv6fk8nid53zq1wgncwfjxhmdxqt6hmoxipe24z4cztoygw5tpla3yabghg248k3kj47wcjrrk5juahkbmt2igvveo47ex0nvtagr7y0onorq0m8sqllwe53eafzuoq98tu2z472q9c4g9uel8ycywz6p2ob4ilicrkixii565z0t0x5pn9p0qi8xnapfcg68tld5yt2njsq0kx8ncd9qk7gwtzqid9xf5tuwsbrn5aqzslfp9bzkjhxwc485q6rrhpcldr9agyusjk2x166aynl722h628qn94diwarzup2folekvr1wgv6zqiwqdcc3u8pgkz9aoclcuazo9aqpsf4sfcfu6snrf6e9mn8we08fcn3fnatw5i464dxbxxvz72jbcx82q6aew98qoxokgfvkcx0b29187i8tlia66djodhg8q34efmzi3mvzb8wk34bc2scr0y4avobbb0ndxp9f8bmzlntobdbw3gr8'
    })
    directory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'fileSchema [input here api field description]',
        example     : 'lgcmysukq7wesy80ct2h0yuzpop78lt9v3292u2qastepbalvspd5v7vdf90yjyvjhng4jghhraurq25ippkob5rwnl09fo64r2ydazv75007ku8s8g28ves6lecthftgpae5hh3hhivw2cqp4f2r3jiyt29p7d1wc9jxu5vi8y3p03uffy9l8q1y8hw8546okufe7pfuzcc7yhgmajy1x636w34l29lpos3tw2p6bz15jajv8pcvkgwsmuc2lpv5oh9eaue4zc9n32eklmaxia9x7ffx5nfm5xwa26afzpj03hhtpjnk8sflwqm71u6a1777i037hv95lghvkc3bg4oczwrr162jux1yrp8kr3mu72lkzc4smz3z1r3xgo0cdgy97af3gyvbd1p7xbexn3r8h5r7gl0p2pc5r2by1vgx4460o6lgfghct9jrv4aofn68uakij5qq6xhal03hskp4st4r6fs0qp3kvzai1m52x5p7dnvz4jpy0wiccpy5yyusxeyz5dwx0ic96wg0z9nkswu9moh1eae9d054b0frgcnb0nc273m2tz7mhjclytaaaw71w7d61f9x4lw67g139534t9ymncfljv3yoc0vin92ipb72zqz3ycvokz1w4w214d2i2hhexybdvaw45pnu9nwye4tyo6x74utxld6omv7fdhd2mnwkkhs31c0icq8e00cfaqjnlbrpidq7z5suioqhjd77y8s6i3hw4shc8ykpyokzfy5a2hfu9brzh4d01h2zbsilzofqpe5ayen4pyfdkfl4pfwd54k63dxkfgv93f4r3vrpiqai1czcyn7tgr4l41xmsk8hc3orj6kpzpgn43udq2be1e35y77bcf1biwmh03rw99zg2xqfxomkdm4bw7p3h7t3rsox7tkrczwdaxx9vr0k0njwctbxi84ujfsctfjtp0b2hwmpr2tu5d0694l3utpldshtrxctq5kvluq65qfwirqld2sm9ukl0i05lunygs351n'
    })
    fileSchema: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'proxyHost [input here api field description]',
        example     : 'rzpr47g539i86f4gy2mzpqefm4txm5dcadbm96fil42t9t2h0afhoztsju1q'
    })
    proxyHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'proxyPort [input here api field description]',
        example     : 5479932578
    })
    proxyPort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'destination [input here api field description]',
        example     : 'dt86vm312s9t7tc055yx98rn13sz2e05pxi9iscbi5lnby5pcsdstsl4ygw8v2teu6a0msg1xcss5ee2cd6mxi2j6kojz6t311na9ntzx6v22s1rt9jl28r0ny5m968h3gszuwd3iq6cqk98uq34t4x5v6ig4a9j'
    })
    destination: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterStatus [input here api field description]',
        example     : 'ACTIVE',
        enum        : ['ACTIVE','INACTIVE']
    })
    adapterStatus: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'softwareComponentName [input here api field description]',
        example     : 'qorxz07fye56csy73ah8go1eyds4g4egichhoqmdam1b3bbv86fc13gjv9s2swv7fy10god9ffhkr8gcnqv1ti4rvojkcsc31n1tyk4er0sui4jgyd6nilxsudxkl7nyxvl1dmtd3tvd94crxdptamu5uc70zx5c'
    })
    softwareComponentName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccountName [input here api field description]',
        example     : 'n0emjdbnzyiu5r1w6twe'
    })
    responsibleUserAccountName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : 'ed23fqr7h2npoxs3xp3u'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-10-14 19:19:44'
    })
    lastChangedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'riInterfaceName [input here api field description]',
        example     : 'dzlazkbjcoil2rehfg9zw4avos2gih0xyvfafjaqs4bmombtxrzupccv2yc8ct51j9ozrdt7nwfx8pbw7ccda4b61bpk20qi4ne7gjhynuynfkns63wjgg0is5pgag1lc3bxlpir784jyt8c4q8riuuwdhek7piz'
    })
    riInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'riInterfaceNamespace [input here api field description]',
        example     : 'yruu7is6xf58ozjf5kjso9o5qsek96a1ydwhqqzblczw5oue6lpy0bvsub0o2mf7kmhcc108mw67w9ldz9gv4hooq018nz9wwe5y8uksu7hoo9bqa9bdsuhpfygm0dkli7fw300lpqdmoa4wj6huek75lz1syoj6'
    })
    riInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-10-14 08:37:10'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-10-14 01:50:48'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-10-14 06:46:52'
    })
    deletedAt: string;
    
    
}
