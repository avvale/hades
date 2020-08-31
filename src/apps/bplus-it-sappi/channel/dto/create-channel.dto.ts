import { ApiProperty } from '@nestjs/swagger';

export class CreateChannelDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '10c3798d-8728-4ca6-ab45-f377e51b4a6f'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'hash [input here api field description]',
        example     : '7oyc3jtvd6im1f6a7iw0z5u6z6ok80vfhagx0rbu'
    })
    hash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'e58b4c35-f0e2-4405-90b7-3008253393a6'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'fap98139dciz3kv14v59i4h57eeeu1mnf04czi6czmohy0phi6'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '9c486816-3fb4-49e3-bb47-81b587d97576'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'z0c08f9m227l2ywqzz61'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : 'pyouvm5j6l4456oqzj11tu3gz36xjqj10vacswq5gujmo1k0u2mrmsbjfia0atx7s1wc01gzf7nyoq8p8265yfvkp2vrby61v21iuc9ledqiikjfj4y46yx4769ldb45d7owx89pew2r292asnwc7lfgnymtvoq0'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : 'y6awzxspdnkww1vljdkoztj57s07wewqrz6a8008xr4dtkjbi0idqttycqa74ksay1t7mxv5vmskpl8q7lcgjuhgf5q1m1px74ozlx613lmr2vugm07hsyt59c0tp2cctn33poio7qu9k7r21p6s8nv2vz1smj5p'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'xkqnsjsrtvzui4pcyhyglbq6g9b8zob7fs1t5d37x998tqqgfzk2c778owy99kf69k9w06w3mhppaz58adratzqepsq22dw6jadhi6efvv6o8nanurbfqf568egdh0hy55bg5i9mjwgclhxeqfu9pkh3bx3ibiki'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowHash [input here api field description]',
        example     : 'da67fvhecand0z0v9treriivdnfc1qk2uuz0odue'
    })
    flowHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'na4tiwp375s7s9o1b24pcska0k0eip3y46ujbk75xspnoae7zmbx9q1715gp63xsdb3xmgzoq6akem0cov4o7woyfa2wyde9295uqod7i3y9qvfb3h9vciz5a9y4f9io3dth8ab78ompi67ivu1x6ymc6wvu0g2h'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'm4fehltf5l14jkrtgjx6vf3btyhoxwfjj2j6sgs73wgkdspyv438sg9rg0m9nkwoq7xqfdmrqv8ishcfo8j7af12mt90ad0plx2ri5idoliki8h7p4q7jq5xqbbdo9w30jf0ja95bcl01sjmm69afrzgar124s89'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'cfy3m8o5lc41ie46cii80bn2gps9144ck895l6v97gujsczz3oyfupl82shm6b7fjgpc4vaog1w5skncqcvc3l27x9oexy812zpnhuln3y0wwdkby3voy0oc5vfkr1t6anu0vhy0lgq2e5qfbzhn7bghb69h5oqw'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'mdmvwu0cn2dnqrr6aqo7qvv2x9bzei4rg3lmj934aq5h1ld34n9jrb02drhlhqs4z5da5prt6u59jmcsyky2p9nn0tvyj2ef6en6ivtc1kuhc093jz57tmc3lo9ewrtwp04hn57s55dwzm6oqo5tl17hh38rhaio'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'aq7b41nlt2gyp206vo5t'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterType [input here api field description]',
        example     : '8bobgj8v9gg3ieez1ln354zwqlxlia8mh7b3giab3x7u5gyw6k21nvmssc0x'
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
        example     : 'w7ot3d25r57w0kc55eu0mtkowxbmfp8kyhszbr39drwwugfq1oxedtcrs46u'
    })
    transportProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'messageProtocol [input here api field description]',
        example     : 'br7vp3s6pdenw862odyu8bb1do30d1c6d87xw6ojsg8b1k1nmle9uhor24q8'
    })
    messageProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterEngineName [input here api field description]',
        example     : 'sffpblltqg6zfnf9b1ngiv7ol9hxvj23y2pcswxawin9c6tg8iluvzkogglay4qaywb9vtj4wyixime2ill26ehkawk01qcdckunk9vdrdzgklj1hz1l7nxke3bguzwh8ikpsn17abh9mlnvj890c57u29dh4q5d'
    })
    adapterEngineName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'url [input here api field description]',
        example     : 'gztecwluyelrfji211dtvjnnepvcu506a2i49gzm92o1lazpmto2b2sqtsga9t863ijhc8qed6fz4xc4t75ia5ge2k0w9uhqs745wwgtevk6yvsg5uxhuihj236g0nqs2ws33c3tgolrqk1qjyz3394i3b5trivxdjfexd7xfxcl2ncgoyp7gtn9e9sd0czvwpjwlra6f1p2eswrx2d9gy71bnj4wybppzywotump64ci4fdao6ntqtvoquhk164vu3k7k9o01d9gx34eebylg8g0i1um8zu8r16p8fo8ub41nr6l33inloc4hd4i0e0'
    })
    url: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'username [input here api field description]',
        example     : '8a282d4l6zxog981jyy8136o1c30ek0kn2vg4fu05x9sokklhytf87y7zkcz'
    })
    username: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'remoteHost [input here api field description]',
        example     : 'dyld67gtzrgdni9m2ujy36qhm1kefcrobheieum6rzol4a7oa7hj4wdhlpoq6w5gaswvujtirnpsyocp263a9dif2fgugshyuc6i2ipxwlnizndph3h6emd0cwvn0nyljhgz79ibgp7u63dwjkg430130fzvz9ak'
    })
    remoteHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'remotePort [input here api field description]',
        example     : 4542290554
    })
    remotePort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'directory [input here api field description]',
        example     : '3wjyn4kyiz1yk6v5vogb74lg0wv1wm3a6twhxpfe01k8hlpr05924p9kd52gjeds89olykzooje0h61nr8f9nq2r3uunry9qhapqw5oo0bzolad18mkjvjppjkws49jys647j6jb04f4wi0pinee644ktl92r2hmm8lm2c9ai03p014a4ef4stvu5eim5kasy7gvy5nxdhg1ivl4i1m5i58fs95i3vszgkus4jnkevf70hx22kuecxv56gwb1hwvlhxrc4ud89ml5uxfb7mgyrkjrah7xte672kf9y9e8do1gd6r55fdfkd7ps1aud0nk2h9xlxzxokywtzrv1j5ya0mm9g0qmodeqvuixzozm6l3j42j88y8jjq8v3rzomtipgt17la5k17993gt3e6erb1k4yb4ixzxxinj8hgi6zetvig0p16tkljqw2xn4bsxi79tpi0sebj9402mpdp2x05i39433vq7njhcmd0vz64mont6z79hh2ozlcxs79rv58445iqidu6wt9pjndbcdhxmtqwi3jt7ogm38rnhsqo626ta2l3a15wbbovzpmekmyw9r6hbz4nok0d7r8xk5tlqs1n4mgalgslixrafyibko7wdukjf68fvxsznv3erfc1922ez8g469fur8y04km86jjfxp7nn8tmnip85i61hg43kv7b5xy2bq80hz6s1kriaqpqwr2ujbokdf3ci6kebfxeo3gvhaqikuwkrbnbtw2ie8bknm19rtuaam7geq9oc14gbuneo4dkv5c6ofh9pf2sw60572qcauav4z88e8yxev6lmh360781pqk4gyn5f3umjddm5t0y5c1a17l1m7dcubzjidj46h6evibbwcivpvgfrgbnekuql1ynsjeyq53lw575b5plispoquo660434o9232b10wrme0fe5alp3kfwkaz3mrbthlevw3t47k4wlc9z36itzcoq5ish41um9pkwtsymsbgupw09ougphgemeo7zrcee0ilc'
    })
    directory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'fileSchema [input here api field description]',
        example     : '2qt5yjf4p36shy0j3b52h31d2efzzg2a2f8vcmkz0p14z06u5wwrsn2r4lutskwf9ixgqqiw6f7zm4zpocague70m57ir4wx5213iqo7bwue3usxj11ui7bp4s9ce0y8meafuaffsuvdtvtvl81w5cd2zfw9v5mfaks1h8zexqqpgxr0dx46yewctrhh2jb44e083mk6wr1klo53406e3kgnl3pglfk4b1zkd5ad6d6blzsm3xomkw87sxtnqhlmhio1svkc93sm1s459poolxwlxfk5319ehmsfcafgsscl92ok8ljpb9jjmwncs6b5xppgckzt1sr9z5h7axdjbagrskf6tj2xls1xzci2bakhcrlp7amjy8duep5jti89wgbpekaylkamzs5k5tqkhf86bh79dgz0ibpiiicuixrjvdn1ybu6ptkhh71l11lkezm4ujj9ltdak8otosds50hpo9z8b3hh6bqm3ltl6yiijmb3lvhoob3zkt000gy1rfo9wxf68fvfbv0glk2ezaht0ev554pv2br0rtxletpxmn7j4e6jxqyx6go3uuj2rnr4vazzbs2p50hb9vffgno9rrb4hidpg31vgid7ktrmurdwe399y3pxy0895x906uk28yg89icu7cv2k7lkg1wygzqo5odym51juu6dggjlrttflajwocydbt0e2rm3tlzi6vxruvjnqhq0zoif3iiu7fto33b6mq89itjvcl3wcocj6np8osg9wd5ujdwml9afiw9iihofls2xy2pc17bwzsq0p147ki1m43jjjnn4rvahqu6kwphbbhruywxb2m17wn24er3n31l9g6asw44nnymd34v43kpufbwvx8g84ano0me3gcb44u25pwaohkafwpfy5388l8onuy4s36l5zf23nk9rxjvcxw1atwuh6i7az92dg0djk4pkhgllffiuruhguq4ehvc0rmyuoseqcdsoeklclogh850lbv97kgvxiutdfin7m99lwcni'
    })
    fileSchema: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'proxyHost [input here api field description]',
        example     : 'm0tc5z2pu0t3axjduvlgqo2pnq8kq66uqkp6w70lmxdxt8ex3x0kve52mzuh'
    })
    proxyHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'proxyPort [input here api field description]',
        example     : 8173380167
    })
    proxyPort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'destination [input here api field description]',
        example     : 'n3rixwur26c40q5iz5fv2uyb5o6b1ndzgygqhyo9opoh4m4n4baxz8ny6b7m0yo83q3o4pp75799x5x416h38aiqrho8xsqwho0y76q91x5ogvtxl8opc0bj5tyrmejia1nz3ajohmn2l4ra2i5hrlps8b4pgzvj'
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
        example     : 'rzo76oi3uteutwhmd7cn3i2nruinudr8454aegta8jegnvs4czwwusu7fv6g78z9hnpeamsr75q6ehnoxhte9fc617fvc3w1rf1ajnpbgxn9klbn106qcw177ijaaa5gj2zvps1n1tn5josmpvrfz1xouy3ojkwu'
    })
    softwareComponentName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccountName [input here api field description]',
        example     : '7jpt9r2cnu5cs307510i'
    })
    responsibleUserAccountName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : 'a6ox95g8df8rgjfu5hsy'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-08-31 03:07:52'
    })
    lastChangedAt: string;
    
    
}
