import { ApiProperty } from '@nestjs/swagger';

export class CreateChannelDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '9343c62a-8471-4c7f-b50a-684143360b12'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'hash [input here api field description]',
        example     : '1l3pnwupvgsm114gb9qeqo211vmtxynuju9que4d'
    })
    hash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'ee1eab2b-897b-4450-9475-b9702c3d35c5'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : '0r2ugroq9rm497okszbmjz1maf9yufnjwwysfiwm5o7gacbd8i'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'ed4acf7c-f224-4408-bfe4-408375cfd2fa'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'frgqc06tsl3m6ukeq13z'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : '5c2d0qhafm8gw78z5akr04r2x7gsgx7d1g71q6txmghjo2tegq3n72j4awtgrsoawaxuu5gi8c9io7b3sfggu7oumt10rf1kopz3vt1r6ythygowetwhq1g5shuxuv7b8b640qlasyd8flt6ihg4zrqh0n3qd2ac'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : 'lqa97cl1g65jrpq9nmu2ok01pyv8slmbyz6q0xm0pm4ludx32ijpzuuu6mx8wrumzp3rsucbtv12y1d5bjm6ef71rx8l39d3j5so9hydlamzv56wv5a4hepez3yekfnn74iyx0ccajwlq4juvroaf8pojqk75ofz'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '6mdgkgq6fbo6fxbl8kzhkqqnopralwy5w3gg3xg006q5v3lh5botok3ijgc2ij4kw9hh9jqe466golasrfcajt3gh4ct5mfjvnslj5n7izmy7ywf39y6isgrypamkuklwn0d62s6wxmvrt7psmsdzxwcadbf53zy'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowHash [input here api field description]',
        example     : 'fbr55whvrz78igb21kerjlpbxsgw27evc8bkhuz2'
    })
    flowHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'dozyzem85zjjkg4vdhf1lr147a7m4v8s36wf53uta5rx3nj6ezzkizrolpfyaoeem06eb8bgaxie7lcxqzr93ls79dpgr72nfxcrlj38s6wgmfc5o49wd83hbm35ee5nloyhl3rygg6rai1h2s36zzqgyywij1n4'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'gmwrx1r25ejt831azzr7ojar87egkbgjqn5qceighypqawt6p7zahykkfmydvyi6crmsjvkw4bvthnwv5hdklrxniozt8ygqp4fe8w8bokno13clyjx0d3mp5xy27qu66750fvoqchybpim4w66clp6i6jq0qjv6'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : '844b5ppmwggt89l6fd8n2p51vgen1ty46g8l1gs2a1rk8qjic38preormff6o9bsdea6tdwk9d91ko7tz4oxoyhmp6escs3wdanbfs31xdpklqlvlcb960i7boq5mywqqh5mohazhhdwfmakihjjtt56auq1dty9'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'iisdu3i7pzou5c9niqs8q20qo18i6tgzy5b984me5nwlaobiof609d9osphn48622yfw2i6f1zjkju85ae6lfa27boihb1w77co3wlsvopyccydwnh4ob56cflth45pw40f3c8mwgqtulxi3th9kas9gycnj5109'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : '262b9esmx4nyjs7uwkfm'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterType [input here api field description]',
        example     : 'hpqb42h3wlht14ur5j7qfyjik0p6xtecxcgxwaf0n8tcpmsv8eqk25ruh1ca'
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
        example     : 'g8dlhvwhgkg024tk5bdfgf2l2l80gpj69270gwxsnbi4zmo3onip4u8qahmq'
    })
    transportProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'messageProtocol [input here api field description]',
        example     : 'vl84xggybx7zhn4ntlmhbhwqrtzzsovj2unc4jf9dcguief9uaa6iieul8h1'
    })
    messageProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterEngineName [input here api field description]',
        example     : 'uzu0p3ipaonbyo57ybxqxsffrjxe1m0o8ecynuebufwdx6mk74dynoqy79ia874we3evk8f7y9h2kw9tub0qbd4vloij2893j1aqznxc2usum6koxr4d6qdqknengdo97i45uk18tpbfhw7ob5onbp1qnuoopl8w'
    })
    adapterEngineName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'url [input here api field description]',
        example     : 'vviephsg6w4cxckx39ar8f22y2txabfuourigx9b8b824zbj5km7v0c1n7d3hy0k5pqmbi7gm99btwn10ljhusl6vjg66gkh0wm6shlvxdyscnkdog0uqom5416ixism0p8pehvnk8dobn0yv3astl85n0gwq2dpyopb2w0eilz23k96l2yoabgy0gjj7qbjk4y4b2qqy215lrawo38j81beoq8dgjw1cpce8rzf78a08og8hz3htjyd12vwly7p408l75y0ue62k7ptbhkvudmnkezgrxbe8j4fmrricmjbxo0lb6w59bc8puoa6bcw'
    })
    url: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'username [input here api field description]',
        example     : 'ae7my8t3bctwk8lx1tvqieh1lxqj7chs8h8gru7f73utcgkz7105h4q0l7pp'
    })
    username: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'remoteHost [input here api field description]',
        example     : 'n2v9p8ve9t18844hbu4fesk109opm9yon63f25wzds6mxzhaq4rx5xmjkzf49jem5vpfr5wvaim1wafzbz17e4h9dppk8t4i8onycd2vkh0angr0v6zvl7hmg4lhibczn8uswewubm25s2jccmu5gzu969dqd520'
    })
    remoteHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'remotePort [input here api field description]',
        example     : 2145385367
    })
    remotePort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'directory [input here api field description]',
        example     : '8dwiu1tpobdlju6vlet6s62o1x1zm5uanmiw3wvu9k1u52gqk7n5s2vwp20k5wbcqh7hrvuv5c3by2733enn4v1zfbsa17n31v1dopch7u3x84871fltcurdpkt05ew72vjroeymdgj9soikwb05ohzra80pm9cwimvapzrkp6yh08f6e3fo1pw8ix8tb614crdilminkeblsb99jv6xoj2dh2i68f4pbwaovvv2vtswydmbtz0956yx4r3614fbnf95pmnwkchtty63aff0kx3bul4edmaqdyl5rlqee3t9xgyknikn7osayit5cnc5ogkifzlmvydvxxr6q36wpk941msxc3ebea04hbx3d9bxjf9vmx9t1xp0bnmswpo5k65hrpzk3ug2dh8soxoj8xh3wvk0m474n1ilv58ubtbvz340uiz6jfkgbxabllkqu44kvpmul0kk4cpkmkfsy1xh6ma5q56r3e643icaa8aycq31vgrd7t6qyihp9b3jim0gloqqwmw2pxghd431n19x8zgjha662mx29iqcx41uqzh32cox5yj56josq1mizsf1ed5czlr5xhe571lkkea2box7ns85b24trsui03d308y5vvzu1trusv3olswiuxkqv564c7nn4zo4wifm8jmvuf89iymxjiixoezpvfpoh34mn5ni26r6kydsxinne8ascn1lsu6ckbk806hid8ej7e2tee6m2tqsp7253uzwilwkht5rnn9fvr47n96nfhdwpg0n7j702rvzbq3s5maoa1gus1c2wnmmxga49r9zszb4u79v1s0nps0gau8rllrzvz0yfxa65z0ks4iuwx4i0z54dsa1yiuoyvunma37pms7qfgnyw3swsqzlzq15kebd6quiv28pn01p7i81753o8qbkgyv5m0zzbma6hpwht4z1xc4l8s6y3lagqpm2jnacwota1ztjm9d39tbs2m3jlk9onmsf6rcphrczgrtgh9n9qu1xn4r2h6pc1kl'
    })
    directory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'fileSchema [input here api field description]',
        example     : 'zs7p23xl2l5are81lenqbct7jr98qrw6t5p3t2ajh495r7viafqofhxnpnmouyhgs0eugtnu2rb1oy79rmhqryk298o8tscrxk58g8ugb6sw7ztt860i0rbctswtnd5picnasc6l29beyvgh1skejvwk17t21v7b41juy67vf9juxk0dneezo0zkjy104sktfnmm8vyv8t1zgt93fpcy45efo1ycikaa0xnfqwv12odtjgc8bbt4mbtjj6p5w3mdv8rdhgpi1r92y3b00s7bv1cewitu7spbf3k1xy188g8d14m0n77u16w0kvuehama1dj9sf4rxnlxm6x9zt6ddw11lhf2qtm3e3ksqw9s0kx9g578hzaq2qdpkr7x8v6ej2recvwsa9o83q1igfnx3ie5i0zkxtlwf5l0vjva8en32nzgrszqyxosr7ao4awjiqnr0byx48i81tgnhbf5mpcyi4zipt110fmei3xng64tesq1sgkn73zu6hsjdd8p1spkkj1eolzl10ew98ns5zlr852ht8sbgcndjv6n7wp5xmz7n55luu7af488mznnz2zc1b2lv2ekrchvfd5phe9wkebhuql9gnzhlxmhkb0k2cu1bji10vaw7gsp7c4io4l7j3abxt4ego6q0u1lrbcsdg0t1emy6yg2dqd9jg4dme9ive4rv4gdv8tqv7j80udy6nh0lxm0p79c2jk1kumwll4n7py3gjj1vc6w2x7bb3yq2zxruq65r8q39ul8svl539baepj6563vvgligo3834ixuaqv6ubhjno3a2yc6pq3lqzwcy9wkvjt5bkg4s9rvvy7lgsnj4nrgqsil9jm26zdk31yag58hslthpwh3qunzgz9h33bp41po9s1q34zfuyyp186v2wd51suqv9p4teb7jb0rszyas0foqks0bkh1zopjnkz49v0zaczlnl829sv7pxh1p8kofekztobna61mb2db1aebrec3af67y2l34gj4h4ld8wmf9eq'
    })
    fileSchema: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'proxyHost [input here api field description]',
        example     : 'sg2o83hkm9205perwaecf8nttoc0w7uyp6oickza0kvy7infgotdqxgy67up'
    })
    proxyHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'proxyPort [input here api field description]',
        example     : 5749583060
    })
    proxyPort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'destination [input here api field description]',
        example     : 'ic3kby2rh6zqivdi82iti9ybdwtdpgunj5p72js3680xcm61rph732t3v9d0ib4m7dkohlywxpbks47z0r2jwz1ccqabk3om8h96xejlch6kv7w1iw2mjzrkzcqzoc6huwtsp4w1e6y4bxuufmh8u27z0kkr5zxk'
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
        example     : 'p71o7wc4bu2unh8yvqp9k9ch7j4rol4aucbtigjcgncjb95n7k88oaj9pv0pbu369hlrxshtzwfhn2ttnd6q24tmjwdw48yvqdyrqlrvabmgh0bc9efoqd1ofimfsd5fuy05fved1rjdrsmr7nhmw49lyx3duoni'
    })
    softwareComponentName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccountName [input here api field description]',
        example     : 'dkc6tkzgr6q832tir5lq'
    })
    responsibleUserAccountName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : 'bsnn1cp44agyxgva367a'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-08-04 11:09:41'
    })
    lastChangedAt: string;
    
    
}
