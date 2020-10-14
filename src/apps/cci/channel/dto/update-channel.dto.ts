import { ApiProperty } from '@nestjs/swagger';

export class UpdateChannelDto 
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
        example     : 'yc6pe0pg0pjsvr4ad7v18mr3q0pe00j1091b1y86'
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
        example     : '6dfzwc2iu5a6lsx7zufva3um8j7p073bm0cc4194o4fvk59kul'
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
        example     : 'iyrtkd5f2m4wueo54rsf'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : 'v0pnjnr4moatuh688cnewtf8hkwwictuhxeh3bvgu41b35mdgb1dfdvztq8k4h4zncf6bzsvd1wm82hyy72tbe1sl08vjxo7uzswm728bi5n5uu6jg72z0u66dc2rv8x7v3c93bzn144y47dwmm8s98lg05pdp0m'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : 'at9q67o45q7vf7jnlf3wpnlz5ov02wg6ckccme7phco04dft36wmavkderkt5fb0hweerplkdhekr2npt39vf2wvo47am7l97gw6973jjyj9foi23a2vripw7lrqtdw5bvsvf2q9j9fvi3byaeblsybtoxieosuv'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '3njx40dt35hs37ij04sm88jt4589574e630wci75pko9t9vvi6z63rpozy9qbj1u6w33wozjwl8gd26r8ci9sii6jlijnqupk1s7d40nimhcin6vf6w4xdbnx17kdutcjdmrvq6y9czdef46p6k52f661bsntvbq'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowHash [input here api field description]',
        example     : '66ipayam0kxhqbzyknbhvbdq4yxvn0td6g1dlbdi'
    })
    flowHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 't40zvq4vgq8isx75iav59onl8mluq3jo1nexmenl1tvm4k9chjmt2uush39k0e0md3523jp9zdbttlg0aafo8snd2szbz0bfzmsdzfqqbi4tmusim2ftligg4nlepxm1x0j2ziy73bfpxrkp7u7jtrfceuy8l5jb'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowReceiverParty [input here api field description]',
        example     : '7s6jhwy174nbnxvwjcjnx6t89xjpwr3zqr778jmabdx0e6ruxcil6nllwd0n9d5piopdbd2fdapvm5g0q5z31d8cr63uymy57gqs8hkzp7n1ibuj1ss789bq9duilcnw3t6w08h4jqwh5n2etruxxhyj0ew23jso'
    })
    flowReceiverParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : '4ur8ul26g76e7bx9msi2b5y4dp2hg2e1m3nmer7s49tuln8vsgjwow2ys09awnr04zs6jyz227vsqhzlujcgzds4svwo88wcdh48agj1jfv4vu1xigl4h0m7a205p5s8gra8051lt7jln0o1vepbpkxrnpds7g54'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowReceiverComponent [input here api field description]',
        example     : 'wypzl762wefj96lf84mmjo5fzd13ham3d4f0a0wbhinszqv8isqiyxo76f7npoa5gq8iotm5w1ocb5qemfmvmxmany09vbvsocts1h0046yh48qx3hk7iparuzrvrydoud5ajlszlgdcbze5gv8xhkvs0xff2wbv'
    })
    flowReceiverComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'ugv8nbuvm5w7yums3bz4kejvqyq5lu98uuhxpjioja47qxghjug10czntdng1vybny9xysf5hsurn14p4guou3dvdn7dm8ebpa8k2bbozn258jf8roix3ixip2j43qcxjctbenmovuxcbcrfhh476ksnj1gqmdjc'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'ztr5mmozz27dp2gjsa1eg856jof9nmkr2zo4cpiifjhxn5ekiheidokimncxx6b861r9qt5lq3vprytyk3eklili9j2nsqqfdj853ayskzo9fulyxotqvsoyyc3gd7tn0fqh5byv8mn2gio7qrbiqwtfua958pxs'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'cjtpkqpg3mayx1xlcqxk'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterType [input here api field description]',
        example     : 'ncwegt5bo9a77u1btzwlw4qki2b130q7gb5s9cm1jnv276z6prabpfmkld9o'
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
        example     : '5vqtnfj6uzme6jmg0yc25fhg0vcvkt1rgfmds0yoygp984vhu363qjpmucij'
    })
    transportProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'messageProtocol [input here api field description]',
        example     : '0zc4c8najkkap2yx949tk7ecaoh80ievwilqg2c5khfyix1pmctc51z8cayy'
    })
    messageProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterEngineName [input here api field description]',
        example     : '2a5czjtqpxzhq931mnw0jlpybry0ljzw6emnmcixwh51t1hujh2ydhoiwcnj4cqvr50zmahp2mca4jxqgvl2926ack6g9pbsxfi4p57scr1hojumyak7jm17kwho3fs98efqhs9ou4wqol28orbx4u9ebeu1nvu0'
    })
    adapterEngineName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'url [input here api field description]',
        example     : 'oad76lr50cgvssw4ix4ukxbmllft6mtyrhh05mx72w3cr0nfdx8oaafx928j1n627d4j2z3lvi1t3a0ijrtng11026ekm6748e9dct8b1nvwa0x5jan8wmbh9cgqzzd774xlfglr3repj3e10jxyu3dn0xzildvvc8y4v4gbnsiqr884ldadecz0qrj2i2tt1tjewtluvcgxidhfxbhp6x1sh9g0qmlyedrzpy7dqs56cx3a8jdaypmnan2cbacqq6mt5wjqxctncugxy9ebvkhopar1xd26s7ooe03htvypzn3er7udpdhrv0n7b60w'
    })
    url: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'username [input here api field description]',
        example     : 'jrgd5gt4826ou14jw46h5qkqj3uolw54t5b0kuni2xkihrxfrzgdkfshhhw1'
    })
    username: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'remoteHost [input here api field description]',
        example     : 'x946vdhrbe9emf0fh1o0xnhug4ikhcs6w9vxixvl8izx7b0k3u7wi1jg1zyrmks941w2v19oiwcmk1ly1zt1ankmkgsfumcxi4hbjg24gxmpxqvikm8hz6xd59o0jenucac7mc4svlzb3w52189f691oblgskkwr'
    })
    remoteHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'remotePort [input here api field description]',
        example     : 2434472859
    })
    remotePort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'directory [input here api field description]',
        example     : '9f7j8x3qwsbw5l6btt5013ahmi31jzf950ydtkarifnl401ff2feioc24o6ixbn5gylmyzk7wl5fajhqmo8fextm43mh8q914ajokt7c7e6nvgdo9yzbe1eea1nhu2jkn1gywpi1skrwq9p47blk2hun3i463gzpebt7umqr8x4zv6ofo9qc8i7uo3egqerh1na4y9gv0m4ypf9s37ljb9nff8l5bp99og6ua5le87v6vtpeww3mrjmqjfy5agpu2249su9z404taabxt9hd2wtwhi2mdxj82m6jo9e7uys5zmg1iapbnnhpdzj1ts2vz6w8ua2kzj1uli2w5k0jzdiwex4c4tq9yfzrejgpefvs0sibkfzb8quqq45l6gbtpjc6ogml0zgp42r83loumv2t6ndyhk2530q5gn7bk7tqsa76pn9ig9m3uzknjmiiijfoyamgeupvgb6p2y0nps1sg70gj71nen1hu76u4pqle7e4wtjnjhla3ffkbhqnouxpmbrw544y11iftj0cquwt0l38sepopwz5phpzl1t90nls0t4bojwbuzje1cpipun0snnufcwn2hhhu3b3ufsfyxvwyalwk21yd1u09fde0ewl7kpbzt693giw6uzhfki6136be83pyq9ssfeir94aby6etuh59957mgsflbt0zvdnmzxpd6u720n66brulymlktrpoa92o7uz2bfp2eh85tzn6z282uiq1tb5duhumsw2l9b3xv7d4zs05gccmjpfv0y9oegjiz78a9jjh5gh4gpqbna45em2d42t3eu074gikafcr1odktsdg3dywaqzzw0dsxptt7l9m68qp3earkiztnsssokg834slfq7edye8n33egsvpcgip8l5ae68yevzot8edx24l2y835coxsnk42go184t6mztrov23xfzxoijgt33jdaykf7xrl5kim3xp3lrti6hozbumfawkufv40c9w4lw7d67yxmqj1555x0ri6aqzpk6x5x3'
    })
    directory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'fileSchema [input here api field description]',
        example     : 'jwo6fblu6j0smpft51wkpaolner9wkjedjudy7qghovehzs7uw9y96vjrdo9p7tu2jltii0g4bi0ydxg39p0w3b16160750tz88s1utjlhpdfiei8ioultfdw1wv9c0jjgrt5tcdzklqic0zeob3jxltqvb1ap8w2nnlkr98zgtg5xgna9ib82wztzfnkg1h2k5ragna3no4846pzisyrcztoh88jacf1qmg3iuwfuzgghpdkpos36mfuxw0xhk4qyijuk63wryseyggejbw7n1086nfvgzfijs9i2ik9adudusrljqkc8km278de9rs3yurek0whlxvfrnft022otluudl2u2pguk90pulo8fzpsrztzln538h5lqxf7w6i531h4alz4v37ejjd8d0dxubj8icuu8fi04xv9e0wyj8cndp5d5tgnkl9wu2mtbr1spghfkqrrwkaaj0vkvr4700kghe41jqhgg6e4f6wsx80d8pnwjuupm3sfgccnu537g0b0x3prp9z2ry0g36ood7dwj61w04b8zruf9l57y9jg75lvw9pwqmeios1lhet8oj929zd3w5jsmrwwrhh1wl6hbfmty1u0n363zvojvs2bgn3d4yz3iml8ipr73vqrmylhsroaubp8dyi928ch0aq6nqivox7ibvw5xrfby4ukvu3c6w1xig94yjbrwdc1j39hkiww3ejiqh254r1wu8lrbtk538htpbroq2x8a7wfrvapxl30ql4ysycjh13hlgzvub1a9kgx6jh9ki2kdij6whw5mu78iua8expyaihfjnx0xhb4842zzh749tf11puz4blt9xp80mxa63q81c27qea0hf8obiccefkbxke3jrldecynhizxzkgl0yfzh23b77eou8230yrrdp7axpxvm5le8gm65ks177fx301ed07yvs7bciijgkwfiqnkyogn0l1kn0u6mvzv1q0rldpolgkxsslkxwizaust0sk3kpgmy6b2etwrvbgpiju'
    })
    fileSchema: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'proxyHost [input here api field description]',
        example     : '4wsp6kq1j376mfm7bl2c7sd734j03a07oyrx31fprdmy5cpp24il9rh95n6q'
    })
    proxyHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'proxyPort [input here api field description]',
        example     : 3627435190
    })
    proxyPort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'destination [input here api field description]',
        example     : 'fxr28qrh09jtn74ftldjyv37oelrcc57eyly60fon5nrn9llaemyz7m0mdmafbl97vmruvuwu0rl7lf2sklqk1anz2vtzwabb13r7g6nv1prpimbbq3lyukntqbyz8ob9y5haz81jk9b7mnwwlqjat1g0mv7amm9'
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
        example     : 'jlwxt0cf53otzzxly12wgc29o8unvlbpmitqmysl2tqwzkitgvlz4udkqx7tkt5cpqnw62paf2zsc0dk4s0ptoxogrwdxtaf6vrbiq1bz9piuh5jeraxnrqh9tcaih834qpd87zzr8j9ww48tg071ha13tchtsf5'
    })
    softwareComponentName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccountName [input here api field description]',
        example     : 'hur9mpl5xahj8mbbr1iu'
    })
    responsibleUserAccountName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : 't9go1fcvoqnrvj0y6sh0'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-10-14 20:40:57'
    })
    lastChangedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'riInterfaceName [input here api field description]',
        example     : 'o113i4u970a05fwg6kzx8wsp6q5a38p01s0481k3dr4s6n7cg9x33flr1vordlu6f5swd23001i9slfvtu91kemhmekg8b5zvqsuy7hzgisei5y2s9vr27dplccyhbn192xm656qvfi5urri8ii1k7wxo0uqh4c2'
    })
    riInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'riInterfaceNamespace [input here api field description]',
        example     : 'bmu68w3c6sg5b2sq3dh29n55yobf6nmwu1d9azusxoulzqefz2j53ran06sjuxl40cklbf82uqe0yddjb94ukesg66i14bm621y00k3ybwrjes1qe3lo7onnyj4shpy5on4lsp6sxnyca1112b5ugdqzvpb4uibk'
    })
    riInterfaceNamespace: string;
    
    
}
