import { ApiProperty } from '@nestjs/swagger';

export class CreateModuleDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '886640b0-cb76-4cdf-a92b-9037840f28cb'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '40c0f04a-c005-4825-b83a-ce7b7138b826'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : '93gsqiucyru2sb1d0biqhtn7zghd06lkuhogapnab363ueez2g'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '4fcafefd-49f0-469f-91e9-9caf55ffeecc'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : '7xd7e4w6gm803gbqe2sd'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelId [input here api field description]',
        example     : '2ae86aa4-f0bd-42b0-bbd0-ab786d92e21a'
    })
    channelId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : 'y2k47y780v0dqwnmd1bryjhd3x35k6qsmq8gto2hlwa1hr8oiulzum26qy58zt0xo8u3r63rqqzk0ms4ga46bnoh1qz1115xpzq6nv5s9l05m0oraacat75pm58nub2xag2zk3ioq4aw4jczsbwy8afywdbd14h0'
    })
    channelParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : 'y9l1079l0bi09ofbmtnllwk852tvun51xqhkzjszdcl82t18deglfj028jevjdh7qjp6yegl0t8a5pvxymomxjgojfpfi3qs4w2xg5e0520e0u3xms5numytgo6513lh9nsh4j5anrht04rx827g92r7li508ddk'
    })
    channelComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : 'fuh8jbfblt13dh1pq2eyg4va3h2f23hw1sctt22yvnfrxuqgo09992rwms4dhz51a1mxw548xah51xli7f2ui2lzb5kh5rocff7f2wgd49uwwno2svdyo6gyuze5jsamyk2wcd33xdeq0vxtr4ctzq7sz1jj7hnw'
    })
    channelName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowId [input here api field description]',
        example     : '8428b521-e3cb-43dd-9aae-df4c68b9de73'
    })
    flowId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'ipk4y9m4sex143t2iiazz3o52x6tv2w1lmnn0c3jeuwukyjeuv4dv5z8qb20zo16u5c5bxvyng7mrdnzdqiz0rr5bgweg63nlzltvcx4b4kkn5goqke0dappvhav5ga7hdg3r45e9ce83a7iqrh47dtpueqn6bnq'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'b3z12muu06aipxth8xcsy0al8bfz4cn3he84pw5xnnkqaz0aoj7djrceao0iydz06f04ru0foyfzem6f7zbto2rvr1macwuz9jjd9els2x5hy7k6vu4u4p9z6mmn4uo6917w620imnpn42xgtj360o27auz2dj9x'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : '4gg0gna44osbw66wjvmcdvpezw53nzh1yuafzv2tje4sw4punuktf3xgir3ydvgdfzka9115e3h5ppcgtrvxny3vnjxupzbe5gou0dabhq9nomroh6mqf9ihvg4foujxnci12y15o6464xoo5lz5prb88hegfej6'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'h1r0ibdl8pd5p98sbcrn9ireun5i8knduzzqw05ef9mbp8z91v21kckyf68z1yjgfh6qhnod5ivrobja0akhashgt7cj2355w4jxp8r5rsrn9r0qw7gjxjunyx2itau1baqk77nrq11y5fgr7obyupvrq68b43hs'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'wv3bry587h1l26o3t8x3'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterGroup [input here api field description]',
        example     : 'w6kcm0aj8rolaqq1srn29v07nijjovos92iztj1pohkxs09ynkmw7ek1saon2it1kogt40f1rvuhwi3tolzv2rrrrt7erj67fc4t4s71hls6q64dsl6uq633j2bn115rtco1nr9bcm3f246y954g2x83dtvie5ifatmut3aj482xg2mv5x8kb5hzfcz7a9mo4g16kivaa0jpkbjjsj1i8m0kttx3aa0weeg5fy2kgjy8nt33tjd2rr5wz6102az'
    })
    parameterGroup: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '52xtcwvd54axuw11rll87bqtes40iqo1he4gi4pz7j190jdsmhu9ir5vbrt7ka6l4w0wlwza98htugrabim0a5xaqreiyundiuyuy9dkhd7cxk6bi3n7teovc9mn2nhbc1tnlm5z73z790tsbk88v7cup1y2ktz6yvfh1my0rwg15pja5gx1k8cn59gbiwllf7ws0yykby7be5l16z3pgen7osywk7ryzhvjsxffds8g081z6qp84xt2uh0kpw6o5vsp28vvnvv4bf63jko418n2hi0k3iwr8on8r704xbnns10d1bo1a5v5gv3whl5k'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterName [input here api field description]',
        example     : '0olz401a3a5vf4xl5a9drlkqg3z0pewt3lx9biajoy6kq6bp5p30dn6hdd6feshwr1vv1hly7tew5tw3eu913lqfc493y2qz8o4cj584z3c88gniil0tdl3zb6uw0lok7va9vguudgp9ven8ucynnyb96fm2q1ydo0zcbls15kblldpuc8z0s1ih0mecrtelx03ngtmz1t9yc04so8kk7jeuzwzv7rxj5rj9ftbkv3tapsc1gapl4yy7e4xp977pjpr8ja8eon7rabtetyn4gujxlcj3skqs9i5s60q3z35o6dlmb7wqwqmejq1opq1k'
    })
    parameterName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterValue [input here api field description]',
        example     : 'a8dmbrsrq1j8nrqyqzrjlndgumprs4bnnf4n6u5gv0b3lvkgtlmv7b1pj7ejrys9s8xxr5jnhajpew6cnlarktqqyzfz61cnkn1g4a7yg0agowjczgfe5pw7qnxuaapfsioosypacrbasotycjw9ifeiher6klug5sir6farx4q5j62kcjy1vdc330ceswwb4q34ub43t3qdgutxn3jwgfkgs4ke1sjpfy9n06xr42k8vuoimd1fai178diceocylgfwnmiydb6izd9nbzb7bccbvfho09iwski4khqleyltooilnbr90a8rzo3g1qfo9l4xn65eip916o5rcg58qs0t0tyylo64g1z0ftqmdtkinhbecvh805po7896zf26myglm2u6swc54uevetb88jwyy1y8tvwlqwj4rwv4esi0c0jb89to6bqebeir1daj45z9krqgzyk6rzq0r9f0a6dj1kzy14dbzr9q9br1irmt011040jll0lixkf3uibkg5x5h5cwv0nzmk0t0l8guxg6z4lw6fwky16j6k04eu3z1evsgdyduwihltnnhuec9iq6loistfx073r7soj8i538kb24minm8oglr478xkwncq54wgf76hv2gqingt0xyqei1q8h7du4l00pp15ny1csir990fplm6c5vkwk5iot2tjls3vmlykejs5smhtbegi0e7un3uff7r4ggnbxn0zeels6icppe3rgjw49zkwo0blb44ctp2xn4lin3n0n0bx2onfmpn2dm1gxadrts198ytxdtdnejn4q48wj3su6o78b06fupvrfn6qwxwwg6kfe6tc2r84mym70su260b7jzdic0wafyimkzx27o1xte19148oqbfkuvrectr45010gstjmhkf058f1zwksmqsq5pu797denh6nfh3s16gkwu2d1nnl8x21dc54a5i24szmaw07j63ks8jcft4tn1pfwgpe7sryw3xknqj583o7aok1lauto7ak71vi6xyl'
    })
    parameterValue: string;
    
    
}
