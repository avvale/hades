import { ApiProperty } from '@nestjs/swagger';

export class UpdateChannelDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'bfe1231d-0208-4a1c-a449-fbca0ddc58ea'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'hash [input here api field description]',
        example     : 'lxkrtdf2z3sjufj493wg1f8zv6v8is005wu0w86v'
    })
    hash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'c6681410-5384-4b59-bbab-a166f5e8172d'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : '9rioz9tfpbeklryv5je1boxdse44l3mrd8n1svx0t12cq0loly'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '86cb3a36-e830-4290-a4ff-4053ac36b2f0'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'zpp77ojszi0wl3bl4e8y'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : 'u2opj537lmx403wsfjsrl0rt883glif66hycv7ecnpirx2lwezvuu5ndxkb62srubp2idhrs4ga6h5kwe125ufv4pnk1d76jcwb3132d3y2cfeizeqokir9z2z3258yhmp6g18rr41lv9198vlzxg7ksd364ii95'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : 'h0b285t7q1t7vp30lir8hx6axv696bkmmzlft8k2fj0izzzeak7enr19ogu2wdgimyk0nch4om39807j643arvdxskl2adpz8iyg0r2e7houzbjkb8houe7xad8wugvcz6no9ea8zreal3fnrh1vj2z1p4toxe2x'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'uo9c9dpv66ojr2f36qmvsr73hrfnfvd1e6zgncvzt669p5vjtc53w7lfyok3u4fm0wvldqqgubdmj0m0ocsmpyhrknmlmlqpmidriohe6q6c048yx58e0frcjtz8hclmwxtxy1nb1jf6sduf5noi17a4qiu7sfou'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowHash [input here api field description]',
        example     : 'gqa64xfj2jh3xly56s715f5dlnhx10d3rcp5vcg3'
    })
    flowHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'm9ufzggi36gup3igcb4fl3r3fpopbr7f5wf1l7ogthkzaaez5es86ik08vkovl7ztg0xxxgltlytpdmpxlh2o5p0bv6pu7rspugn9gzvb2711mwj8srb6kk8s5n5mkc4mu1zzquo58v6hzprringxdxl3uib5vgy'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowReceiverParty [input here api field description]',
        example     : 'gvej1p10ujfnebw94kw4tpnzk7kshwx5bl1jw87q6wv3xdy0g5fhxejcbiud3nyxa59ym5coulyfcf9x6ylmnmmb0unxag47irp0nijzfugg13cgpfaflgairvfbgh5dsih8xp8n74oj3ah3ewi7wcsr2hiiyzjj'
    })
    flowReceiverParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'nvwcfj6ohckxa3kgoikm0feufxub17hz511y97mg316x54b7hznyxhz0cge2mulr3hhojtlzt7dqcw6av3eq1fjvduje7edabimnt2ebu34rcwumaotd6gnw5eiv0orohmfsfejq4temqtjutkvo1bcp2lpnk611'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowReceiverComponent [input here api field description]',
        example     : '2bemmlfpxb28hra3rstviuxlext28imlfil0f9hz0mfdy4jzwj6143dqgj0ebbb0vsswc5l24w3f45314szufwzzhuakicmp135autgp12rvsp9e1cdbd32js7fv72flixw7cy0ddsswg1b7q65y2b9agzivp31n'
    })
    flowReceiverComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'tlpkqevp3g317t9t4bpo8mty2233snf6rzqp872zmkkgktpln4ficwu56eyzuzycnhx2ehnx6itfwygwdplsrgenvkpbkqnhb8dyrfjbjh8pdzequerpd3ly31s2sv7fzg3rjzfej2u1v7d8eg98ww3iats19wkg'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'nboybhv2o0iwt2u0yvt1ydeupgukxiwzjkcsjk4xa1m5obkktq07uz0k51ixfzlruc6be80qqrmvz2fd6yb7f1e4lumwoqq8ttskbbm7d6h2ckch149o2ci9apd34i74vstgfrqixeex6y4asp18aeo4twf200lz'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : '6y8kblnj6zs7h3nc4zrf'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterType [input here api field description]',
        example     : '1r3t599wun7o7dxjnyq1vwfpmaotp52oq3qmh7ty4jucf053b5bn0edf96m5'
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
        example     : 'c86pxyyemoucr612p7tm9vr0njpgl2n1sit034vaqmnw9i3hf8i7bc658sai'
    })
    transportProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'messageProtocol [input here api field description]',
        example     : 'drok19k95edxi6zrynbwqz1mscwci69y7g2ch7okkvvtlll43gmruhxrxt2h'
    })
    messageProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterEngineName [input here api field description]',
        example     : 'dgtz86x2232jpnioxy9gd0diyrg7aa55o7mqpm4cifydkeqm90y9lk8gquxa5yaqr25nzlzymgf2f1rl9g2gc4aif1h9yg8yejmsb6y7hdbamqfain6bs5sl9r8gomzwof382c5r827mnqbf6my2ff4mfl6ef7ff'
    })
    adapterEngineName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'url [input here api field description]',
        example     : '08j0iiigiyp6i18lppz6nim3byn9c8qm44rueks8zmo7445hgcerweqjapvofma4inphctepuj2zhnmy2ji1dii518jlbqwtpegn4s6ja5430tsozq9gs0ppabciaedx0vbug1lpee6g13jvyzbxi0lwn7b30fw15pu8ey3759g7klwdom48zl5o33z68u9g0dt9l1n7zwn66f9gla6b3bl1jzl142b9ntomp19y6bkeinabbdtyh8h05hjpxbvp6s4g0098tkurzpqdn6ii2azli983gtam2sw4t0l6mahidu5k82tt2mi88iic1bwz'
    })
    url: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'username [input here api field description]',
        example     : '9rhe1hiq0tzpxxa4y55ndaoqi3nui8e5i7vgc6kyv4eiaw2anqyla3icljwn'
    })
    username: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'remoteHost [input here api field description]',
        example     : 'jgfnh6f1uyxos75kpxkxccbnacx8egpsqgwzraymdouxssb3txswd63fbfeq9ila18miwjg0gd02sc482bz703nmk0fkqutjtw71uzrbzkjwhkbnpb8ggodi6yfzktyctl3iyeb1ybbcyq0jyy4w00f6vgxqzfb1'
    })
    remoteHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'remotePort [input here api field description]',
        example     : 5683451183
    })
    remotePort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'directory [input here api field description]',
        example     : '73bs0xnkfiatb1jma2hf62q1bvs1yftl54z6i0mqq0z72cytrh4sarxtlbj2jwzv2g8n4hsyk0o2xt6h9ychk95fs1eay5k1cq0as4jyczo8urrlkw6njnodmb7s0k6w85osgop5q9hmunxchrzejcjqwplfoajbwajc6ntfqgo1ai7xbtyatx6jwm14tt00vl5sx5c2gua3p69aavu4eqkprni0kqvidqsfxmscd8odz8qlxrmiq21smqbx5avs0e47i8ba2jyhbehzrl3zcm1kfpc8kenorrsb4nawtm6b5x904ltqhfxdi7defbn4sbbz5dxeaf7r6cyjbvx7ak9me7cgl4rr1gk6mcajszr29g5z4rbp8wi05u6b63aqzjlilpjfd4f752luca3xvlxvzyirja19jny7c20v54edq6kv6sveue1fz15b6gzgunr3nog6acc3cqpfy6b2srnki1v0l066d80biyc4q1y8zzz19gw5aw1lcgxm4yx1crno6wevri1omwfnrstbvye0ndpt1ubr0lv43zpwexnqvx4rzm0ez7lk7sud81wx1y9pauxuun0nd2po3mzih8fizg82nz6fs5igaueied5qlw8bmy3uvqx8u6rf1cp9jljkwl37s9ax8fz2wep7gfxtujckjxb60hpkio5cs4drcmyp1xn4yow80xjvwx7dhngwgz7lgdfocb3z3rvk8mmpb3177lvd00bg14i9gn8cf0uqvpwvjp68yzf4jaxf1e2s81evw9bq95nw7wxr7mqjxkht2vt218diczp0u0d2hbrf7atenrrl7ewkkfbdusu68jmts6k038ux6txi3iwcm98z6htzsftkwea8f2q0dk6zgdo3ox1xuquly92dmhe108humcp1bm58o5acxcdp54ahdary01jt7kd8z8ma5qxoy0eiduguzk3308b62lwu9n91xsbceipcwx60yvfzmyi6tp3mdk8rclcfvmqfi0jcba9nxp0x5neanq94'
    })
    directory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'fileSchema [input here api field description]',
        example     : 'z8fzxfl0jeyqas2cjputw7rys6dg3d760zm8q4dsg9zn44a6pimqppyavpqi6ux4dqzt20nd5mnhjzdocf31eucc9o4mz2aye1hvuv07zf5ho3nb40hc660ll0g4e9jyzym5gmshu1q6mmpeju6e4vrq6q6bma95e6e0mjt7lhdpx0wkln0b2d4pad78p0tqg3e8vdow0zuytv95ypskakjwtgr33ly7jo5p2zwnwxq1d0e2eu3jwgpeanjhkj2rrsf30of00ashmolazk5rl3w9ct8giix02prj4q04js6s1g42zal2f7q3sv1vt48g8a1j5tthoj4jbuwzdcqyjriytxrly45aa86z62tur02jze8gw1a1k0sn6leamtw070j28wc2uwaxtid5me7qba1mac8utx6ry8r04w2n7wpqrkf89p9staeztkrdvqo48e424tsnpmu1hqn5z8sgi9e1hynaunv5ts4eof4m6xcsl0o60xtzsc763r9bsuy5z3cgy5l51lnhoek3m1703fe3uxkr22uqpwzjqpof82lcqwuu4j0ahtagu9rnsr5dgcmxcuzfysm0s9np6tof5bolilfwlxwfz13m8ih38srhakiijijrrns6cyxoa73pjf3cr6qa9q6ezbh1tstq7uwkurvdas02a19n2execswelu1quckph9ki5v5zqy5vql0mae7ezwic4debiqc0ift4nwcmz2fet840b8mlcwfs96rgp4r9i7f8yhpexhpylvupcri9q5o35etk2jh9jgzpccfylzkz8emxqozb7gyhyybc65i9tt5k08vgy7lvld2qyriuts5waww9vzm33pjx5yo7ype5bnu88e6fs33z779h3zq79md4l7ac7vqh71rjwfclre9kc4le11lp5pw83qgcxywyh54sp7k30eartewlixqagik1imf2o8vlr5bc2cuvylfnnzgla522ofriepyd8uad8hhe58kier3jnopd3wr4pye4w2t1lg6r'
    })
    fileSchema: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'proxyHost [input here api field description]',
        example     : 'rgv3gp1wt5g9b68emjn5x2cpkngytirqtjsqw0qmrr9g5305nrhac1kshfxq'
    })
    proxyHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'proxyPort [input here api field description]',
        example     : 2525037697
    })
    proxyPort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'destination [input here api field description]',
        example     : 'dec5k97vi1t489fstsqtlvg5v1rhd3hci9yoa714uf8ubfeswmu6b8jm5m7yeqd4f4ro4p6pnfo0tia44boygamtw7amciwwqmmnopd6twm883xwghyeu57095ifr698r0l73hqu4m55qjsjdwp6nyzg5hprvz5g'
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
        example     : '40mmtmquh2apv2psxm8u1v5c57y8dcl7170mpnk0e0pc6vhlj24hzdxwc99tcrpgpkmt1lq6bbfkpkw3y6uso380xp4lxu4wthbxckflhk5hlz6i415bf9arcde8vgmnhg980vbe2jrpzm0jrs0ww24sofh68jdx'
    })
    softwareComponentName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccountName [input here api field description]',
        example     : 'u6uaqckpvvv70dcdnz35'
    })
    responsibleUserAccountName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : '4yq059cgc2zyy3aks87f'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-10-13 22:26:10'
    })
    lastChangedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'riInterfaceName [input here api field description]',
        example     : '2cjkb0dhoj1iz6dc6vdy933gjsvn26jrvp25y35ftrwl2h4483zgmlvl2wvuh3cqolk2jsyu6kp95tgjgna7pyum2ugpkkxq9rwcv90yxhb0sq1x600n8epz01sr5mmce25dedngmdahgj9kq3r3jp89hdwofhdi'
    })
    riInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'riInterfaceNamespace [input here api field description]',
        example     : 'vg89kgi7dznfppbr4cgb0a9or479x9l0xqdy0y08mwg0s40q8o1q27m4adofqzkdixks8g3lm8r9312plnvcrob6c3s89jwq6ejv8a5r27zmiddj08p9grvllqdxd1vp36lch6v4x45qso0ld4z3xd6vq3jqksmh'
    })
    riInterfaceNamespace: string;
    
    
}
