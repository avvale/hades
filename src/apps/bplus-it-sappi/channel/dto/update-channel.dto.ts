import { ApiProperty } from '@nestjs/swagger';

export class UpdateChannelDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'd47bacb0-494b-4d76-b008-ce74da0a0ace'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '62d866f3-920d-4623-b3d2-6221c5e15c1c'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'w4hu68p30k9qhfbxpccdirue95f357g0p83zujwns6gukq7mye'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'bnj1vf0qbb90nil5ze0i'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'f321d9e3-df8e-4659-a1fc-a47234e36929'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : 'w2f4sf3uinlp5nlc9rukeho18nq1kobhvw0wsqilim45hozm5msa5zcjnixdjgg7n6d9bqrgg4676aiktycc9nzkl8ckp8mb85qqadz1fpes125esaalek2p296kww54bdqfs8idlmrao619wio6oc6xcckiwa37'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : 'z6148buqdimmpxo6zo7q1b0ulle0yxfgw274rgenixeq97yidmrqhkyu5kgngi06p5tm3wirf84xcz97m5gt2pdbym9uesvnqfszx6ka0racbmfaidm84cq0xd0w7rbiihssbult0v0qevq8p2m5quta9vcn13ko'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'px4fo48rq68swnvtobg7r26gi8k67b28ql2ymtvxsr3rvazq7xvw8efkdiz9cn3g4b785903igtk3vo51jncs4rr2ya7r2sojpr2ju89e2m9w0iv1g3exs8ehytxn0pbfy5xkkl8xdkieu97gufsljv5yld96caj'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowId [input here api field description]',
        example     : 'c3e04e66-ab57-408d-a5a0-be80e24aba84'
    })
    flowId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'ckiam88nrb5s71lalgn8l8myjqzqlf5uwoea376hr1k58eginstc9khz9uta3pminiup4mo07j4csoqypw8l7gca7by29fzujztzt791uvfbkyssf72f0gdqjq5x0ud3hgybpt4a0xhiose9l2pfddclexnz6qc4'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'a3j9hahznlz5xtw0sacbgjoufrxijt2zol89g1jx81hot3562vt3aiya5f4ygbez0ux69zu45jouwup10h4pqpsdrqt4befea9x2ypwa35sxsppqaqn21cdlmvejt50tlqkpa6w6bukdlyzmzpqxpsn742wbn76r'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : '2yzvvbqnnxsmecamk9ovlc1t0chv8ue4kxf9ruvwwgx1mm6dqhi0fd1u0co124kx2nwk3yg2p219chy2chphtkj8lu8gcq1un53r3kf5yynz0fb242haw22eqsb2penve83cdcg9kvp1vhjn0fukhdtso4b5wlt0'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'f6y9x3svfojxui29opuuc3pm6wimo0juubnitzkn73yhc732i07ip9n93lnvhesn3f004cyna6zdzf1fsfy7kfbexijcsmi6fpf0spngssdrwnlosc33wwvlct5unwz1gddigdkmdrrhlj18kr0rarmahaw2aphb'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterType [input here api field description]',
        example     : 'kpmq2n8mfxfve29jrnmc6bdw42ruxg2mzphvuyr5c5kwoebuc2rprtagpg5z'
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
        example     : 'xdns18cl6gpdidpeidv1gj53mcsx2vh4qqv0sdzfyu6yvru8nhwzdh1zo55u'
    })
    transportProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'messageProtocol [input here api field description]',
        example     : 'mn26q2yn39oio0x0sqxntbguke0gdstlsxknvogfb2e1kwtb48onbxaeplqd'
    })
    messageProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterEngineName [input here api field description]',
        example     : 'du4fvl0t0nwempxdux5zp244dwcwyguze3hcypwsy6cedkkryqco0z4bwhmr7xlvay7r3nxw84xda5jpqtyu0jt8k0kfsb3gxv4atfxste95orgr1oykfsmwc5raxnitaph7o5x6mdia97y94mbivqttns8h5smm'
    })
    adapterEngineName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'url [input here api field description]',
        example     : 'pfoainu6pxipo6bsemxf406647s8v1igd9trvnvc1aiygfm95nwtity4qb29grqab0159jffmo2lj5np0hn6269foc0ziewg364xyl8jm1e5e2b4rfvhhizek399l80gq95v5jp8z62j1r1t9vuh2eyf9l98ujgotmftrn4tenkpmalb6ktuoqrvyoz33nrkuconz51kg9vt9ahz7gfai7igh4kqykgqnhjnbq0rfb3z0o81fiopnx3u893mj3rwn8gk3mtoe7f6ajv09hx3vqrt6d4vx4vxie4o4uxhelz3qcv4mupr7nzzgl8tipj3'
    })
    url: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'username [input here api field description]',
        example     : '3xkvvl7on2xanodkblrhtvv05bgryfgwokb4t7w0oubrcrzfixpv9engs86q'
    })
    username: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'remoteHost [input here api field description]',
        example     : 'tfoj3y1w70v2pc4eon5gdb8t9mobjczd9o7t5u8dt6bvxpacfcev3l2q3ayu66p5bzukqoy2i9ccq08guvkibi6pc14nx6elsjnnxk730cz0x7mxkzvc4my20h3jdl261wz50jabhnlak7la81gyvshd99j5qj7g'
    })
    remoteHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'remotePort [input here api field description]',
        example     : 2078481075
    })
    remotePort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'directory [input here api field description]',
        example     : 'n5q7gea3b2am6xpxf69a7hmp33yleg3d70ulbql3lx1q7bksl2ytctqqvc0w0khj17eojht6imasyoa4jyjyeefk588v2fk98ipsd1zs8tj9podaow4xac5qwugpd95rklctzzkys91hj29x8cv55qzoz8jj0h8zwg9b82cbpnv0yc3nz4g6qwvf0938gj4f1i4vu8hojizv991tzgn6crt5zbd23c6tffb7m4sjqimtr640jwz411k5gtw5pg4b4jl2x9thrqcmroijotsmkutbqimul3mtptnmoyreur4bd8dx5nti4iiznp4t5dtmsp6iem5og5elxyyvch3pfohr1kankfnm3smm6jdn6s4avds01k41j9roxkhjnmkpjeysia1iz5dzpecpun9zxnrche76xv004cg78i10dn8zqik7kiggwafw5njbc06fbw065wq9dfw0jac7ig77k7hvz4960dpm2xle0dqagiwp9mf8twh33nswl0ijjxqze1vbbph6sn28kpsamgnvn81846donc2bjit36ggo9jkvrvby5mhxm9krqesjohotpiyeett1v9usaebi9eof0jhypvsw5cgj9eewu25gz2ponih0st7sz6s1fd2m5mcbqhzveyoqy0gaajd7a5d8yeedebreqou0i4p9eij046gbnupfomt5za7zbrv3pe0fsja9rg5u8q876h6o0qtlhpl5lu3rhsxnxbnutu8i5xz5jrhvpcdkkjjr8cpgxyho1i2ncji8nhjtjehbih8e79u0hkl4kqf86g5p1xhqilvm9ow0zygngi0z4e4th3gbjn1oecuq1193naginwx0kk44clbk2x79ak5hwchzgmclkg7tlrzpy4lerrhhwxs7j6o5z5d456grtgva1k7aleqgsnnty8raz9ody2ipx2pkm1faquh1j5b7g8hrqny5kn6j2sfo7tmltq4y7vl8frfewqukh5nv5m1qd7tjl52wuwzj84h1tzwsbyguy6aa'
    })
    directory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'fileSchema [input here api field description]',
        example     : 'c8r6xyxh9y28qos10h5ifu2hnbdiifivjptji5xhheeix1ba5ctlart8n3nra0z59q3itai6yt71uikvmdb4oj60x1xwvorrlczotnzl71fkc89azjb9ek6iqj27ep7wvfcrwwk7yew50m68nmiwyotwkbkkjnc1iblsh35iek9dl54tv4gc9pf0gizr7ys3zwava4a4d7jcgw30tl1sabem7mbehkzmzgncjo8vqwkgw2ssizw9e3ukf4viwaogz23l0xwushqo53w1ui868jyoa9bsbmvzc5ondoqr8q2tp39o6v41o8urk3iwk3bon1m393foic5fwcm39wuvoyykm32msfnr87xfl47a0a3xupmd44pd7qyinrkyqt7frzdw6k30eyql8ofnmqt4htcgy55hoaqqsp5mu9tddbybhkops78f7pd2uh5jx2dnsfxhx1bs5wsx3kyvasfo1k2jgnxbqoq9lyy0ntga0n4v3tz2x7ls936yqr4ygui9d0d4wlhjfjiibc6d1v3dr8v8or3c37zxewxsfx8jmc3faez5c3bpeh98a7i7xc5pmesuysk9dikvelxjo86o5vyji9zdk5z8g1z2yg8b0p4wx5t8fohh3zm9x68b0s0hm600ztrt4x15kdvuvvmpnn7k172v17w7w5s2dkhwh93sh6f9h5l0smwsggvkp9f64at8x3kym1ha3hl9m90dbnv5gd397la22d0n44f62z9r43l7g3qzhri0jp3vukp24cekktecleqgv9qrh8jlq42llx7kq51x2937b6zuxz3n6wv5958d3jhz6x130017tgu6vbl8tb7wdrkd9yxgs9reisohdbf24lj36l0dwdp0nnhgq0sie5dpb1d9l80bg3n8nvw5uppw936hev500oaqfef54nsjpg5zzdlnbogyirnqvf93moxhcfa35r3vhpd34535ev83b32jomac0bc3nslgb39advypp33eclshs74m6d5iyhwod4tx5atm'
    })
    fileSchema: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'proxyHost [input here api field description]',
        example     : 'oopbottdng80xk9wd3w5qk6x1gsvziw08lp20nu4wka150jqu24hd64bk7nu'
    })
    proxyHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'proxyPort [input here api field description]',
        example     : 4649863940
    })
    proxyPort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'destination [input here api field description]',
        example     : 'vj7eav37h6m33s44vpso16ig40gnznbgmte81q7shn05emukv7sdcjdlxy8sz4g80m6aifya00xvf9ewiiicu0chjwt6iexhec8cfd1cfwde4eqm80dnj9mlsin2c1l3mgbglp1h5dqid0qb2jrhkzs3gabblnlc'
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
        example     : 'yug5ndwgm6x26ey1ynnfsde3i345f4uk4t364idu8fcmvxeqacqt3x8hz6lgzav54xr0k7bk63dm9rdnaimayng001ircui6mfe5q1ch6j78a1sejxfssz58ff6b0daph6kdh9n3wfci3qavql0f5gqnpkd6kiv5'
    })
    softwareComponentName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccountName [input here api field description]',
        example     : '1db8uh3onzsca588m5a9'
    })
    responsibleUserAccountName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : '8e4tm0leiikfayb2dyh8'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-07-27 15:08:49'
    })
    lastChangedAt: string;
    
    
}
