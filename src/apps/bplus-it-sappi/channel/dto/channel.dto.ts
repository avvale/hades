import { ApiProperty } from '@nestjs/swagger';

export class ChannelDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '2f3308b9-8169-4361-a5b4-8d1a0d57e67c',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'd6827c53-6bc5-4159-bdd4-af4bded6c1ae',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'f25f22cd-3121-4c65-9930-f5dea13a6019',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : 'dv7r7oddwge5xropp5rqr3qxtxocfsctf6k1qqa2qj5wx19w03ts809ilmueu41ve867qgdf741znxupef0g3gu31pusbzlhk8ubtdgtujr8zn0bj7y1eynqafam1ax17pks8b786miaaespnfzdii6mf48fpdna',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : 'cc5yvjuinviluqc41wz59asngl9at3cnjp4h5mx5bx8a3g7prhjtgw5f417ygjopmhvf58t1k13hy8v2rxfrcc0t8hp4e37hqngzmx6iykqomj9fm8m18kyqi6srwooqfhvq5eou81tkvcqvr337nvq9fzlsrmrj',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'qhgj5qldo3x7iislc7j3yqlywyw4n3pfegyncitbjsz6pck2j9k2uw3labq826ayned4u4lfwpi22yx51bbcltwxxpgcwhvhheh6gduv5h2x4pz5kgf440mmeebghif01158hpbq8srq4hof5zhh1bqm1h34goiv',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : '2la0x16ovq9gxws0ia210o79jwat8hkkrhzuczk1z937ihs1sywxrhg78w5rccoqf65smag1ytpc07mrbulzv5cn2qfshg5lj1rdibllnt4lgt2xqxbgl5eoaxqg3zy5w6wvgd0xl6414hcqcjtw7ao8ia8nd8ru',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'ofvqc2kfdpjn9ipww9y3blj6g49vppjdistql7mpyiapm1kj54u9ixge12me3myk14k5hptg7v8soqgkm2ri4cy8e482ir3vmy5o52wwg5tefu9ulmvdmu7nw9hv8ocenw02ibtk8fqjim85nlo9jnv1uz6vikcq',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : '1wo7bsxhrc8hzkpeeflupa4xcpmlyenrb648mag191w4wz7n4a04q2rf19egdqosrcbz11nylm7m46q0rz4iw6kmksv6on3nwd4730ee57fecexko8rxxdruk76s3xyrihy5yypphyws1m2y52sabbe4yds6lryt',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : '4j0feq1fhmji1fkeuoflv6f77nk4x36st3d35eccvkiphx60l0wog30zezgwrqwaz4es7zubbzir622630cvml4jzhe6j8k1cnu6tb58pwqob01n9clkuk6yawmfxpfw3selfchusbw3gl8srtxs4uonqds6qpdr',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterType [input here api field description]',
        example     : '1ad84zrpopumebldy70kxogh9n63sit6a29lwzp20u00vtvaqnq34f42kc4m',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    adapterType: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'direction [input here api field description]',
        example     : '2mv1rq9hu5or28nrh7cv5ih5ja0747dvio75pq6p6gip2ev8g15s8uy9y3vu',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    direction: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'transportProtocol [input here api field description]',
        example     : 'efzkp23cg2vqqq808q4j6poq9dgwd6zu0ei9ng6derap82ljt7n0kjckwuoc',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    transportProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'messageProtocol [input here api field description]',
        example     : 'i4bv6f7h8ob1ollj32pluu5urbebgw9sxblwq226mtow6sieqjt7lghjeqwr',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    messageProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterEngineName [input here api field description]',
        example     : 'gw6l4m5la1aq1kcs3rda5oli82pko7rkkjvf8g1fc5ogdeqjftmlk2rc2i6fkddfhjgcby5dlz1lcobhqv10hj07g9gku0owvv5eansgck80bk1equx3nxkuac1d8kcbxc9zx214k4f9bgebznllnpdzcrwnklo5',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    adapterEngineName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'url [input here api field description]',
        example     : '8xwry9ju4932cu0udprdklzctcnua142ajq8t3x1x3275goxddmkfn4jdf90gk506275jcedf5f3q68t2uduqed2q906jiasx034v10oj1wabw0cmwc423ibiovismzjo6d3q34w7fzvcvg2yowpd6r9rnzw1qxrw0hxbk5i9aeu73r0or4i7wo16tytiz3ut8za6rwyhgmdhtgohlhoa4l24v9ryfpj7wvuld11ipbshqhuloo4oj6idh2cddbtq2t85utk7fg52kvfei9fuclkrdj410pcnakhxug594i6pj8mnxmgg4lujgds1s2c',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    url: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'username [input here api field description]',
        example     : 'i8ovqp898bf1n8iwgqcqp8canyhn19zoqhan7u584qncg4dlu8guk3fuzmtd',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    username: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'remoteHost [input here api field description]',
        example     : 'ihl38i3sm3k1wz2b9qjjx2ic0qeyd3xfs8mnon8alh91yqbdt54pwsvp1d0vo5236mlw1sfvraw6vu20guxg20kjawelmobm0neathlqd96f7wlbp322x02l25jqc01xl4jet24oou25gv16numpvw6bjkmnea8h',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    remoteHost: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'remotePort [input here api field description]',
        example     : 'w694oxixgtfrwhn4oo9l',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    remotePort: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'directory [input here api field description]',
        example     : '2ilwpmrl7q9djm6lcyyaigntstx12wqd6faaopg8elz1vngkzroy9vxjg789f79prc0ipt4lch57afvhb86cksnctx5afu81ro16blsubrq67dor960ljrv4ndncepauxf5xh70wxgro5yum33tzsgiwtmfpmvle2yjmiatgmtjt5uxqj1x0x4x07lrv97jf8rs3ngx345nmw0xbqkfg62wzetgf106wysjlamcbtp7qy1h9jvn5p42l8rz4057cza6iver7j0lror37ecp1mnqjwwofqi8sn4nbv8zh8twab186l3mb42o0636t0chmuv1edcpnvrl8eocqbtqlq5s4j822l9czuwjx9pfpnwz5qwbj13tfmjwjahn63r2b7vfgyqtniyju9w5r6fxwo1o36rphv2eecd8o5uf95115ibx1ngjnctvxscqi6timyf5mz407osd0vb5tkxkmkufmr097j5bx1vyhzzut55w00ea8chv2j1qtptqlf3jz4xckzn25ziges0vkh0431zr6b6o6l78qhsbrr7ay33lngaxibc20iedy2ihwyb75af1rm0k65iycehvpamug2h7vxk4ay5wnf0djh5kkkwtjh0xsneh98oh6h0e524i4datgo0uhpug5w74cftggs20eoowo4ka9vo8h2bvc6l22vsqed1euvla7wacqwka5lwbnalb4ky91yxdestoce5l24qm52lcl7nm9cduw2pybg2dma4ees666u0f1i6zi4qrxu3lxyms7egcmpjalcnztawwlb4uiiwld2hdh93iamh024p89lys5sgnwgbecf3iv5l8u0rmx6ydlytlgzao2l6jrbozft6gzr4fwg1rmsu09homto2wadyctmcw5b743wcatmfl09xp46wpehycsb56ppxp5c3epit7lpvbf52zq3x8sflcu7rv68b6173xifbed7lg57rfjeu2408gptl8luiej3syjy5li64byyyjef0w27fc22tnoqg7',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    directory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'fileSchema [input here api field description]',
        example     : '6oc0qnu1cm2r7fqo1ek56aorvxx35jmei65mk38jtbp6xsth198srw8kzr9tp3vlzl6y4zhsrmjeg84vehgi01n0hz79s5d8hsg9jw7204wyfogqi0b7x6i4rjtr6426vrzzztjovqh6kp2yvvlcy8cwwpi6d47m9hlqsblilhaqst425optvxodp65wn2od6yn7bwx0lbug6mkxwvmf5gvzggomonjdxehhi2g3dy5pr1kv7gh3wjn27rz8zeulxsd9b7biwj25qxvbwrb6qb9cmd0ln22lfissxw299v3xvwagm7cx8wkav4tftmrjnqcs73ivjmrwm5g9z3zltngzrnis0dc9vkmqut4do5jlhxw953lrs2tylmpv2t7b3x2o9ebtxvvev89rx98c903355l9pwavt87tyzx5z7j9hyhkqtgq1ok5f2im4cucbimksuajydqpx58ybqs5uyr6ge0el5q6lmp3n81291m1oojh3f007pdsk3vqps2844bovb07tlj3ldmror60na4os2hb2avu1itsjwz1pyqofmfycx52kyh49jw0aanwlsc15ej57qkst5dleaa6voab1m47wdek003lmwqb0d1apfie619jjm11w67bjl19m0s6lti4bv8307u6c5807ydpbzl0r5pqz7x4b1h6kcftwqeqzwf1vape4z88weg4lx7b1srflarjx1sre42d3a99oyx1t1k2emc1zgnvdnlofbatx8mj58kmnn4dinx8t6leqil27k517xt4p3ko461knbkwbhwbcrdg4xkh54cppbvivicmrkkbr7i4qgthbotpo49tl3ieeho7kxctpab9gmxdtnzgh3e2x1oubsn54mo7l82g03mci729pj0g5hzh5yv8w2e8vpwlyevcw9sutkljf6uzo77nvyxxqda3jqacypu27vn79uyfmswhi8k4tbzla8qzosgpiqyn1s789k674jm9cco6q7iknifdr1ubzwhucrexou1kpj1',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    fileSchema: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'proxyHost [input here api field description]',
        example     : 'any8o0co85731gl23k5mufy3o0msk4c3r06p1ky7tawy2xpkf8qwihlqyje3',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    proxyHost: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'proxyPort [input here api field description]',
        example     : 'mkvzj1vq609l4hxlydrc',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    proxyPort: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'destination [input here api field description]',
        example     : '4fsymy1qx7m33sa4mrgqdv9zkr44gcze8z5jqzr41zldgbdoq82dskz4blk79bu9r4pgujn8ki2s21k9cafd3oaw1snfmxeobr2vqaxsbtwxio4xaf9empsi355wgejg10kux3720zt9wkyxpai60eowe3d4v3c6',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    destination: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterStatus [input here api field description]',
        example     : 'wsfbx4l96f1bbp4yknlu',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    adapterStatus: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'softwareComponentName [input here api field description]',
        example     : '36a5zkj63tk8j7lscmdq7qks38gutwp0m1vt4fktuzn3wvo8r12n27r86v3oi0wodzglskqpdlegky45r0kda0qbu7htbefbbu03ocljptpvvy6jihajzr1vvmh0c6zsg01sl4p22hndl6k343ywtkeqazokvkwb',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    softwareComponentName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccountName [input here api field description]',
        example     : 'qe7q9jl7wg2heovghndw',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    responsibleUserAccountName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : '8kump2eahsa4e8wplv24',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-07-06 18:05:45',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    lastChangedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-06 03:51:09',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-06 20:10:01',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-06 13:23:47',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    deletedAt: string;
    
    
}
