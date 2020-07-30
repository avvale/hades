import { ApiProperty } from '@nestjs/swagger';

export class UpdateChannelDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '998183e1-57ac-44f6-9d00-f33e013e79a2'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'hash [input here api field description]',
        example     : 'pos9f62rue0z8f6fgc1r8wviizde4a8ugmuoil6a'
    })
    hash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '0b5f0f9c-66f5-46df-bfc7-10eacde76655'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : '76dq3xvzr4qtwudy8w3jlyq5uqy82eld1ajjdpsbsj1g38zi7j'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '7c344791-dd35-4d43-8dac-5d18b8441767'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'bmj0a8dyktjjs2putnic'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : 't8iyjho55tsolknwyfopzomcj2txn58xrh2caqrqicfo6zmmbizgbo0j4eegtqryczqwd07h6r1amjywh980b6cuhmd4zitvygn001kt13bvn4la8sqvozotzi8kqxq9scgdxnumq1e25f116pf3typlwi6dl5tg'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : 'i8caze82ldie31xgqv6y9k8ye3xdsnrt5kl3ku6x3bkftg436bf1g5nm92xx0d0ml2sd79ssyijllirkos1o7b12gids90mcrv7mhkbbgh3zx6vqfitlaovgojrm337at2603v0nh0q1zq77jx8ri51809grm6vd'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'cv8qooks3dlaybu7d2hv72xhx241i9w9by7jy8uao9d3778alh6z0abqwuvic2iexmjbamr8rcp5te9sxyvknxeljrkb1oueb5xxu443j2jl5w47g9apbgk93p5wqlsts12px7x7gthrr2t13dna2ay8p8d4oh9v'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowId [input here api field description]',
        example     : '6b9d32e9-acd0-4b6f-aaaa-8d18e243c2bd'
    })
    flowId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : '7mjrljx1i901181bfxntk3fvycxqet438p5p4k1a2adxasyte50qxbz90d5chfsc1ucva5l06x9gkualt93xg9cpekwegwds96yt9vhlbsttey1zf56o6z2hvjgidi7rgm9vmmni05p4jzwznrmgtkobgm7x6h0e'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : '7onkq4mn7x0j7ykrzseiu8p6cnrdgw4mbq7rr2hzts2u9rt6bnvu7ez7u4yipdsb9xzijnu98gyod6vgudy1nnnx9d7j90ghurje9gm39x8psnamc05vhqejju7uwq5igipc0fkgoxgmbyc97rp881onhibphsru'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'm0c6ye92bxof3pi07i7p3jxw9udlcwybshrvdncx4gpgqeklol5ad5ipz7th33ff675vprze0tbax3d5qojs1uiqffy1w2wbl9nni9pdxvnay9cjqv3fewdtp4v6qr4ea67dswx5jdpm35m3c0byou1nj4v6sw20'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'u1jr7xa7fg72upsps0kydypguvs8j7ofumvdkogq9q6rt1b9hl1ks1o1r00vogxdtojr7kqrfq6chk0nhj0xygrqt9us32233ekv2ri0i6pb39skylznwx8gmq1yz3xnmfeqzwprp96qgqpfzjntzl26vaxz0z71'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'ieabgy40wb79b2wxrayt'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterType [input here api field description]',
        example     : 'or2cgz58p9m89ntvd09jsrnicwhvocgx7miewrwi8c7heekztksherttq8ou'
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
        example     : 'bacvsfrw6suwf3067y2mpf5rew2q7b13hvw42byovyp5qadrjuznsmuaqh27'
    })
    transportProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'messageProtocol [input here api field description]',
        example     : '2xf7gexw9arzu8evp72va4a6wzj7r8q74q6yvrfxt35ocd4cacrp6gvgzu2z'
    })
    messageProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterEngineName [input here api field description]',
        example     : 'z3zjo9k5zb1hg8pfb15knh0npjbmz820cgqp21fvo7ekh7wr1glgyayk1b8fmf2ueqhyp54hzws5ka0o782cmsnlq33hngxwieb1nwtucsm0qu1mgn3q723uu5nevat6p3fg3e5g4a0asg06vi2adsyx585adl90'
    })
    adapterEngineName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'url [input here api field description]',
        example     : '7gu78uqbnpc29criufug0hu0sgtet461qoikw9wpm4an5x4zoiellu3dykhoisbdfmztg45stqmi2nmyce4jgihttr82xxflsaavawov7ntgfy2hhb6ugv5f67c8gxbpnmsw6tdi0t7kk9ky8vqiray2xtpys43v7bxpwov2xxgk07ittzjualevkm0ff3ut8m3tkq245ltozbl3d66e8wcermgyiknf3g8vccz48amri3lgw7cdxsdu4q5kczkxrfolpd487rqgi5vovwg3hmf6kdbvpbykkh8q0c8ceucppshafankukxg8uq8vhap'
    })
    url: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'username [input here api field description]',
        example     : 'ilzxn3gdh79s73i8hnl9f2bhtjxddgszflmraqtpuemod1b1jia2k6y79lil'
    })
    username: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'remoteHost [input here api field description]',
        example     : 'otoj1cx845f7qt8f6nd50eyiskd2t2napd1ut31hbbx69gdxdrph4bqtaa65zkyagpclrz7b3xpay8392ew0ghaeg1ajn1uhevjhbnyjpjjwjkz7fqc88vsoiddqcuwm35ootfy49najyqlvpztc3t1ozln7nl53'
    })
    remoteHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'remotePort [input here api field description]',
        example     : 2178190087
    })
    remotePort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'directory [input here api field description]',
        example     : '00fsmtakm2gvj0v6r14mfbcbnvf0fq412cru4ifky42vav1xtvg5v3vsgk7lohptgmb85ga23o75h6j0vijn5rs2s55nydkxnwdjl5n464bllki8uuczy05e9zupsb6s9i8qfv1pzhywgfd55k2eur891g941014xcy14cgvvanvdc0ozfcl4eir7leoyz5a0kd49acd3wgnbj6glkmoheca8599vph20dbk6x2rph6cd50fim1nrpks4pahiscs1ycnkygosg6tv1u50x6in7w5nsg13swfupd3s16k3g4sej8zbmn3wba22j69mzvrnouynme6gmnqx2w9fsv1fq3khto9v68h821aw53erlpvdrlvdvyui53jqbqb8876cihfaafk2m7h6prpc0gbgj4x81pq7f5l6f6tlpszjl7rxa8r61nydi54rcxxqaytc4ln83tdnzj2r2c74udh56rr79kjsh28arybpj3ici04vkceb787gxyqlyael4ren5zgculswm42qbxpxaiwpfyly0da2b3hswgq185kve9zs8fcr2q8vk1vanx3jzraimhl9by5t6f47jilmpbbsgjybmqjpo523jsoofm6u3uob2x0r56nbhuciyce6t33waajzdjtcw768lgfiff1g25f8xqde15sllefqie2omtufre9voeus8p97wj1es9x4mehspzokaht3wf5luaxzyk5ruptqf4akwspsv8d2imcpe9zn7edpr12xg5pfqirtp4vhvj8ogzl0ndnj7jpud3mlwv98h99f8oahhw3xzqepf6zsjoqnsopqgmej5s2t1q47iazxx4nl3mu1gvw9nei9yko3euxjtldc2vqcn7xiiq3lpv0nwdtvypulf4aunte7ui8khiatl4n3jq1nj13qej85y4nqyh9zm4zdh2cdyyso2lsd67d1vczpg3giy80qdfj17xqlxstzwjcpd7ar8ptuzkg5klqi1in4w30nl70wdlnc71de29vfp7d'
    })
    directory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'fileSchema [input here api field description]',
        example     : 'jziue3ir1ck6gakzo0tu4c058k5bpl0vauf96jv58g71egxyopl82lv0gyy5d1088skydvh7113k2y5w2gytsqun6g02e0yblp8f4fynp2r8tcz76ha4kg5esm1ps3i295uqodp5e2nk3vzggg28r8mgjmjougi5jj8kedwiwnzpzxpxhnrey3wsj4tx13c2xjgm1aps9sm30uncqh64q8wn55aoqzyr2tt7cuklw1zl94poviylpfv9619g5jpk2w3h3csbeyfoartyfrs1uldgqzfc3lak6azbga88v2vpecisppp4dpw8nzrzuvp1i6ax0rtm2g1si1pd9hj6m7teh1pi25zzrs1zeqxaiioioshbdi8brftfnrmynfb8qdo4zz5wnjan00qe47vmuf8c9sywdsmlud32xvvuuy96pf380fy9andqz6k4brfwry38c542u76ujrya0n48r7p91m6f0amt9gmvmd12p4gpq5rz2jcsswwaerxgmevkszahh32anqejwv5mgaxlvv8rseogqkxnuo38q08tafzg9rz05xursxf6528czocqg67p8ea6emhpg7gl6mr6rsmo8j2npgzxuy9quh8e4du1kblsoxgezf5h6u3cmgmjl1ckl9fekmuh48puo7sed433wowf4qg68uwtpul0s1zwt9o09nyxgto347i1jx32fuvrtug85h9gowqex80tx6zcxdl22cdybwakkd2dg9ael7kgpjb3nqr9idnlf02y7ujy3edaf0691zvlb840hk7qrbaz5ddwgkiwe7noml9t7u906f9l1prggdye2u0ejm7qfdsricxt6joaqh6zq357tx9js5340g5uhwtuydmh1wvua0n2aj1r1fepyg4bj2mwe4aukk4jw892uf44ww7v89qwux0lzgsyt5a80nznx85up95utr046o725vw0rk0jm6lzdivk2tact1fqt6zvpeus11u9bv5q7wqv19arfhlqyo4c6jsbp11cm3w9'
    })
    fileSchema: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'proxyHost [input here api field description]',
        example     : 'jwtd62l2qlph56ps58j95yivna51q3ulscqb87dvtnqk9t3xsewqc5vtki3t'
    })
    proxyHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'proxyPort [input here api field description]',
        example     : 9709522588
    })
    proxyPort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'destination [input here api field description]',
        example     : '8dmit7uwtduy2nl2h2matefw6ywc18ltalvteb7gdya86v3u3r1514qi0ligmdvn0we6oexczs7b4195kddp3s5h8q9imsi8kptswvxocygaxem66o79uuj8qy8zj3bs86wr8834hqkcp6dbuopodxjk2bwpbeie'
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
        example     : 'trvj9idp4meu3yvmjd360dtkezizxuri8p5x8mub3p9e9tfrik5kq2sl55t5ym5sy0vlr89hvtczyd7a7l6xbvuwjvhgo22943951lklw7j8le8y2p3chk9wx6zu2xylrv7qk6tporzjcmcq7ncosstpdfyqearm'
    })
    softwareComponentName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccountName [input here api field description]',
        example     : '0q8rbbxuqtyts2h3qfuz'
    })
    responsibleUserAccountName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : 'gff857xytzlmdbd01y25'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-07-29 10:47:06'
    })
    lastChangedAt: string;
    
    
}
