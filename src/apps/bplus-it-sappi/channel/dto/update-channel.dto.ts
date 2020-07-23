import { ApiProperty } from '@nestjs/swagger';

export class UpdateChannelDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '92d781fe-5dff-45a1-a3d9-59fab62885c4'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'b107a288-9138-47e7-bdef-4256be7b1262'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'ecxbhm7akidgvqwu1d8modjk1l5khekl6wvm6rxziuuk0vywcb'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '612b7549-36b2-4d13-822c-f6f1b68a37fe'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : '77h36mnet96xv85d34zhwxrpxkss7i296b09d2wwtrzr1s9txsxrmhh0m7o7hpu0u1mm9gm1tgbzmqe5epwzas59klg26qvil0n5z0kp08pgoob2dpu1mz6tvduyy5cdfjic7xq5mgv1k8yz1wnpo9nxrcg71fow'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : '2keyjo1s54qz72psindo6lf3ko0gvc9nstxsdjgo2t5hxab4s79jt0gwfyykkm989p2kckm0nzspxnq32wv7z2azdyyw9k6xx4oqo1xxcdlbl4g00xyu0rmbciftvk90zl5q6305r7wp049rrj0jtlnb59i746l5'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'edrymusazz8hr8kxik93ffthpbspfa16u2dq6atfrcuuy23gxnnx3czt6a5qr5v2z67dmzf7n8omms6kjpb2szislrgmrb2u51sq9z37glur9usih6po37t8dlvtjhv9lj6g2mi9kkf305uyusynincq8sbde1bi'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowId [input here api field description]',
        example     : '46a7729e-8058-4b17-ac43-b7f2a6a1696e'
    })
    flowId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'qvi89id67037jogw6b9lwwdttqcil4h9lvoxxr53zfxdrz6hmwn0bwdkql1f438hgs8swv3a9l0nwd00jasm1l0ulmyzty2ynb3c844uxqptsvtie8smkswbsun8yqd49dv70bn1cas4f6tlo6h9rm468eg6cnfv'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'qohk6wlxwe8ek5g8vbd43hnfryo8rfzsq9jtg0t6fkkhusvoloiwkohv1czd42arbjpzt7fwdrml43k7df21p3qxog7wsa5hvo7as058kuw2ezs466bo2meojvf3bt8xqfhnu4bf4nv39biw8lf81nbpafub1ds1'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : '8d3pctq3yxwlcbjy8gvv341orvoz172l2jiyqasb6qbhclyp3iu6wmdkwsda9k8bavfui764jchmcoxwzri59bxkhm6iivbu4bln3u6s39n5iq87f62i4ez52xptavd5u9e4s5noi5cn26ph3t7f55y14dgjgkqg'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'kgqv00nvoojvcotzluvwh87n73ecbfqqn2fgk8g0pmbbm79z44fqbjew4rbln6wwgt48e7o41a05lk06t6rip7pwfokaz7hhwiqvkvx7t8tsgv1uto8gy45qxq5p527o7gjtqwjpmf18oygyccg3c2z6zgk797zx'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterType [input here api field description]',
        example     : 'wzchcnwqkffpoa6hll37jemdmxu9vtcjv0ryvrjpuea5ajnzeggw7vfq6h5m'
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
        example     : 'v8ms0psqc1budm3olaofh4rf2j3yhd06ottmrpjorcxxtwls3k53slaj9v3a'
    })
    transportProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'messageProtocol [input here api field description]',
        example     : 'oghmahi2smqunyxbrqft9z8j4qlb7dt2szdukcmcctp9tcaasl39t0hwp2gh'
    })
    messageProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterEngineName [input here api field description]',
        example     : 'sosyygqucz8vl9b8mmkaqpn0hqxmsqdvngji4khr8brvkqz0cd32aguo0o05qv4dfhjwq73mlh9piqqcavqgkbsteu8yu204w0vrhs0e8tb7xqhdono0dr397f4lplh8iow8ijzhwelo3bjma3ajc1tchm3q76ps'
    })
    adapterEngineName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'url [input here api field description]',
        example     : '6pzu6l7j6kmsojqwhwgdnpubcbab7wiuyaxkxrvvzlic3vsbzqcn9iddek3r2uhlnbyths4hkb4elqi5q42ix1vumelmvmexmtqp3iay2jmmuopbjilv77beno9odm0b7y058gwotj44mx891ei9xkeotnkhdlbl4w6rbhxfrndbcp9zc4yni0perfaplontdydb4oh344b9s4dqufi1q3igh2in7w8et9qgofxigf1jrxp1x9e2cmgz8rl4ifou3aep88u24y75iw0x6h4fbmjidnefviz989zjw486g2uvlzv6nkj8414lfta6ktlp'
    })
    url: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'username [input here api field description]',
        example     : 'j6pam71jtbdfarcexnj2rawck4osm1z4kcnayvy04rmithxzpk8wqcsh2smf'
    })
    username: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'remoteHost [input here api field description]',
        example     : 'n3p4r34fhrlfg07xko09zxj146wefcczdnej9jmwrbjrvqztmw1od9o3tv0lftlvpj73q44gv0xyz6k3hp9752znluob9ryqm20q480gcqfz1ek02wu7hps5khx705iq6zs3hll6l95t3v6vkokdp097tt4h78td'
    })
    remoteHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'remotePort [input here api field description]',
        example     : 4795908233
    })
    remotePort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'directory [input here api field description]',
        example     : 'yyt4qfd9cquy2z4ix3cgrbb20tebxjhy7u76ptkh3tn7rczxebv80ggqidqsu7fguhzv8oh8ojjagb9ac6u8xi07o8hlz9c9lyn0ihjzslseuryb39woe3v0kp2732c7uae047qlr7itt9fm0a9gi8rzqlz7sfy5ptgbrceup45d04q60vodmzknpmdie93yy17hoh59zlpr6tyxrkj46r05bnhcy4wkcssfq4blt4270vvbaa7s3vajpderzlqkfh2qeano1z3r4o1xq0rf1jfvacpkqtltczchpxq8r6w95ozv2ffvqymltn0b276uu64q3aoxf6d2kpkyl0zt0foxj1a6t5tnkymbw0hdk6tstyzcnshs6rfhaef5ht5ok9p3oyx2uesipcftnfgh9g8vo86r6fu277qdrnq7keumit21c6akuc45ks2moohjw4xjikhzsnr3jpj1x91fswdrdir8ic37ky299bo1kv0r80ecwuao7f5420hjscuzprv7z0j19a6kyrcb38ukdxfdc9m6obrf4p8mrg85ehl7mxiubjjn0r5drzakv9lceoegntsckmruy8g21ryfop7lyp44hge4lohigy45pd8i1pjh1unnyvevbzvdwlovg4dk5skr6b1bsozh2nkdh9wbwkth1h1wwgi5y8mclh2lzglnptg34tjuskpvtrqti8ygt058vnkc031l9jrxd4hz31y2k5i4f02wfyg8u45cvt2m6vqb0miohru0dv0cuqnvfyuscr49lg1pfzdtidc8nmxfrb5bnzf8r0mosn271luxjk8ul7ff9arspmgld1wjzbx76qlorrr2o2clmhoaobfgciil5y2ss83qs40l7d376gf2dwjnyeoo9hor0wipmsw0ibl80j03g2s3asuc8jlfrp8xfs09iutw62i292yztivr21vkr18wot7sypt9ceo0n5ijm8djw3vn76a1105l10najmlyizix5wihovxvdqxykc518a4afo5m'
    })
    directory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'fileSchema [input here api field description]',
        example     : '2gzk47va9717anw3wz46a67d93xp8bmultn5r1qq4g7vqxqwt1nlldqjmzqr44aqkd22q958yrjkvjkkjf0che5mv79vof11dpfbt058623fed75p4bx8neuuh6int9p6h0fui11e1iwxow5l3de33hm8631f5ucrc61nf7xcmh5voqv697f8cyusy4129j919mpn3sghx514x2f1zn3czed95tej9u5azxude0w2xqdp7qkqmdyzmzxpmzicwsjsd05wgge26ohlc2l4tsqwc8eixa6yliv0djrognm8e058am12vkmpohwxzer4c1prr7uhs4kd1d7gtscvsrkkubuh5771lvlxfjjfq3k72spjsapdr5316eivnerj4za59ojxkcc5buwpic500f9tqsz8yqap2zrt8mxpvse03cdyll4b83n5ua3cjdrggspycksxaknv1hckojp4hnch5eg6px50abbacnazsc1ragi2s8bb9s984ovydodjw67b4hxnmsj3f72rohz4pktnw7bs365qahwl775jxgg2184bd3t28oy4h5vozcag3z7e97spxcdye2uhp8kjdas3yl4scfeu3dhgsp73twv5z8y6cvw3x2l6g61551qunrhpsken06oy4zxb8fvlxlhuud877idf0et4v0f0g1x7ps3u2tkl0ybls0nel59wz0xu3p857plmfkuercx6sgyj4elk6p3qi75t4ucck3hq0q6id4go8kd27j4fm4docar079xnm0nvze9ofs6qwz2ej3ge7plce5sxctgw57nw2ahcjdrzydpf3a94x7daqtey100ygrf9yu1zq92jcyguhattmol0xht9nzu2d6jc3goovxrfub8excs2v4o8yt565kp9g16tmtft11iy4bd5e95travty6o7jzfhg7youm1t09s0k0gswihwdw9zjetg2zm8qrtojcn75woxneerv90ox2sctuiotxhl9xcm3ohz5xse7a4fb31d3xemdkq'
    })
    fileSchema: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'proxyHost [input here api field description]',
        example     : 'ntqxcd6sq7pebu637giqz6in5ijunnjpnmo25sfd5jka9tg28nivwj8or0n8'
    })
    proxyHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'proxyPort [input here api field description]',
        example     : 2140834129
    })
    proxyPort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'destination [input here api field description]',
        example     : '3vhh8b0p02x7i0l7a61vjgq8ujg07mtcj6ww03r3cvwzxxkk6wiyhbzhmw5n0pfadt32zyrjcmj7xyiwiuezk0l19bl8j9aw8xcqian0uj04aa2h0ixu6km1dyzuhifeuymj54mfa06ttbutmelheeajymgle1h7'
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
        example     : '1sbi2zwzw7zhseyj7iwe8tivhj4k8odg58i5xq46azfebhvuy8aguh94ka5uod7maipt9yioq4vn79ungfevs0uozyysonw9h7yz54ap1i23h1bwdhgex4o6ka82toz0e0h20k023nyxkcmkra8mwwte7ifht768'
    })
    softwareComponentName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccountName [input here api field description]',
        example     : '1j11te7enuv6ojppou9w'
    })
    responsibleUserAccountName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : 'dmcoc5j9d1ki3s4t76wl'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-07-23 03:20:41'
    })
    lastChangedAt: string;
    
    
}
