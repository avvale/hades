import { ApiProperty } from '@nestjs/swagger';

export class ClientDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '404d2cf0-0044-4be1-b316-7b4ff5fe41fb'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'grantType [input here api field description]',
        example     : 'CLIENT_CREDENTIALS',
        enum        : ['AUTHORIZATION_CODE','CLIENT_CREDENTIALS','PASSWORD_GRANT']
    })
    grantType: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'lgvhwv2fjmjp35owyeedy8f1nc5jj7yle7fctukbzongg96jcusyegcxvqyghx8bwx7s57kgwt346h2lwdz3qewwz0a4dy5pqi43ws30sjmcdd0bl4t0cvtkc2nc7vs4bucyd2f8ekzo8lwmefiv9lc5x6l1bgnw1oi2a8a6bbvsqqlefmjjxzi3dzujqu155b2n1lgprpahnzxvqpj2mrscngb2n7k8pi5lbk1cf7e5d5xxlygbn4am8dfsly5'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'secret [input here api field description]',
        example     : 'jginsf2cgqdeqfkuuxx3york4ww34rsl0t617ppndzuief0baa8w6rg308carsmuaddk9agcom1zwkx5hnms9rqctx'
    })
    secret: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'authUrl [input here api field description]',
        example     : 'xukqccmfubt9xxoiyupt1s2dn2630n7uvxy3zsu9k7wkuq2wn2hx4wbh9e72bahnqk0a12klwjd29839f4o0ojrversw3w2wlrmw420tqwk0vgn5sggh3y8sh0i07sh215van0mawk0fj42w2zjxgt74t61l8f1x4muq4l7sl5w26x7j39f70h64rs96eop0ac2cyzamlgm024vh2tymp0qnxgp9e6bzazo7p6t3pfzdzqr7blsx4fg9zzl5j1ml5lxnrlq99znxz3wkthpge4yruq9jnl2ls7fv0rf2ekgmh8kyd2mac6ce9fkey9u2ke6plsojqi613nh9quglmg6spggkzx1ktvxb6gtu8ac3yennzpxhlhiz0bil2r07bdcq9dtcxbwrq4nkh7rpqib18xfcpy0vtc53zjh0ut5aknsz9kkmvsrr6xjbc1c3qapb0duc0fvsnr25jtp0qgnqju9egtzgqpzc2v16xmuktgdj4jn4wdts09grixpnfo735xcm1znck086jnvv3fu7e6afpbi40yjcbl8xy66cluhmaks7qg3gl1nj87r8kabq4zv5nndjhajuf1mtn6t9tv4f03i541iqg39opakr4204mijhvh8zt1w8r804etx1g9azqljlelukk9wooftty20j2v4amahpc1z80lxmz0npk2jo11vjmgbtubvy98n8xgo3oy938ol5h2egafecd1qhfcm50o3y583r36iizdqktkjyysf00kj5j9dx4380zbkk4jwftj3puwffsu598exwveq70513zye7bo42aban9n17gn09i1xasawlya2thkdp38u2zurzcda4venty789lrvyd8mlxl1ydvq03u5olyrzjevntcmn7gdzmo26qqid30h90b1okq7llngilk69ks4b4244zf1v77dz2kecq00soaofh6fodtr57hybfpdd4w3wryljp2nbj48h0fnn791kk82yhewo9gzx3p3tg5i5obzy1fbs5iiomo6u65449enqnu0hmr2aknt9oy5ik786gztc38ux37mynhmt95sd3na45jr1lhixwhhwujpyjxcwo34jyue2r4fy0o1yf3t2wbbhpfn2pfbjhhwe9qn70fr6c8ibx4rq99zaf4sqq8kujrt180nupr23xi2fqpbzbsoa6hwcfg4ed55ny57979f1apaojx043koq6z8k3s6nt6xjbzn8rz5wcdryiwu6ln4h11k2ew8q9vkhx3uqgv0wx0khe1bpe2c1bfxjztlh3nsmhy3ls30uwck75udls2a7oymq2o4d6sj4486b2l20f4kijqgo998nlaulk89unfz93dk80i4ss0k6z18cjluoodkbwecuay8ntsja0zxzoteb19mjk6c4es51skm9kl8jwbywmxzsnqskm4o5ipcrei8euaqlw3t2dz0elsklw6ewao6qjbakpr0yegkcn4xxv6x3ry3ehymrsxl67cdt4m8vhwcvfmqi4o3irw3ivwfeihlt7ea7qrk4jeqcrc4655oqmtlruag67ld4h3ih11ml32zlteo0feew0kzbox1voidwpacz9uecvcpcokpmeky7j0v2s1vpr5vp8dufzqn9tm6n2p03qe3cq0bz61nu8w5co4wh9psxx85pxyyfnd6ofr5yugxhlb7yqpyzzdndou7u3sw4kro4a3bd6s7x1rfbb7e1rpmqkbpjs7890jsf9o5grjy9e1p6y5v7wdydj19louglq4p7bo719n6dsv3jpefetzyhi6omtfqpcy0s3et6t2ym31idw6ybqfdsadgw2raweutot6bccxr5pl32r42ao4mbqo9xahvsp9pc3v81pmx5j1p935hgm60qln4taqvd411m17w5l9yhym6ecbrxu39rdg2iiekx87xvf1xbfhjdxthn0n5zb8llf52fnqu5ul9o21gb6o38q2gv7rquzis5iw6t294dlztlcybdfwayr06ebzy882cl6iqcsdrmydlqq4ym4xxj10bo'
    })
    authUrl: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'redirect [input here api field description]',
        example     : 'n8f58xhiy9bjnijmw61s9a8jtj2j13a8d09tn1gugaeqpkumorcg2tn8wv8929lg5ocow79jmbhihhiglgo1raus71l9742l1pkjo5tc5u661lfiqj49cyik7mps9qisdk6fjwysotgkyrn8yftyq6juguhgfj38lu0txse2n1sds1nhhk89zuuprplef1u7zaigez87vc3zi43cjhlhu75trbb3l9gxxiqr2k4uuvehesuui7ncb580cwaft4mslscro1gt5zs72jn4sxtohyn16cmq62tmycnjperf5phcvsb5zn3gat6d7qy8g1grfaj1dbz0nrv19yhihx8hx3fqeiyb9ijh039ambw8bvj0b8k3a0p4b75ymjtjutqql5pvdbyjqgxef34y7swzr7to19x07t1d5nsp8k9ommdcqu3abm2wx5w58srp8atrjlymikesekpdf6lr54o9i6huty36889t0ltqays0o4ddvoagho0859boeevxskjxxtbvu3pzjf2us2tmb05ec7moa8dg6gxipiqqclhv2pgbg9rkut1zxc0bjairbyiv9g4gjbgzlud30jkzo4rz8cg5y8lhs47ewh5u5rs1p8b4zcwnzh3jyecm0qpj617xtk51vq4u6ph8hzfbwzh7kyhmjvay7caszehqe08v2qf3ujk56pnqmowlahru9wngivm54l0kjv5x8tjsn5cj1lchmj90ikv7aett7etys95if871w94b2v18d70ircd7cbjvfw9yosdw9n46le55b7kfqbkvaqbqtsbj8tnf2h1at84tcmt8hdshp0bsl8hbpgv0rh8juq2no05w2ou7agn9a3nro5m27guh7ngesb8dlho7oiolu7ze71h7c4fsvjr1ye4447elhewqr86940fjvp1zs1rxl9yx3s9wsfwh2oj6mjg79jd778ibpvwya5zhpblgz2mabzl4clym3o7hpiiosiumsida045npqhknwytl60degz3bccztx5sqas8k96hgxdzww2xrd3c8zai4kgknh1k3lu5048yq7c0rs3qyw8azggojv630ss84u0qjj6cjke8mhqefm8um3o5fn05ol08o9tf7oqcjdmag7w5rjo2lnngo9hto4zd64rrbdii9xmkqeh89dcyo310dyh9uyu67u1o7aysrquylii0eh1ztym223qlu785ov9mxwcgg0a5h5oa9a7vxekxvbfx1ozwj112amrdrjqial851zc26kd3xserpp1jn60n7e7tl9osdct2qid5djqo2yipgau8isab8rcjbeg7rdy3iyoc8gpqk58rftkoyh000kmxljxol7ydpz9y49d4d47q6rtpm9jkvad8cl8o62hshb3mxy1uhsxlrytmdw5836r1tp3uazsd4kkssjsbqdonmvyy0fm43gxqwe2fjpxx0y4gix91j9ev7vdgztr5hpler8yv5qcebszevyr9wfxbj7fktm7u4qxxd532xxb8h8gz4xg84h36mt8rn0akh6igznvmov8iwvm2rt0ci0yat98v35auycgsrrz0amp11ykiyi035yl9offp9ye5jw48aiw380pqtgnayjii2xdpdcn0ac78zmcyye2dsi4fcy2ts7n7cctnjsm8peyf1gsccn53dbpzi4dnslvha0tzn6vqvfxlkj9ikkopomq6eo0irs5dof1l66n7odisb22iz28j9gqzcme7h48h21l4r4guczbc2hjncrh5fzgfly1mowveanxj85mnj1jj2gw4lsfoc7gf0dibb8cbatbuyhkorr0se08rmpvww21136xs7vt0qyangp57290kuvsv4mwzfq97fxm60ss7k9w1pzhjhp6lvqsklfgtm9018n747qgq4ouror24ra50svctzbivyrpaxi2j7932aan1u7af5jwuxb6dibb2fsax0wulxlrsmd65n5tlziyudgkms105g8jvopy54rca6f9cohopmrc5reh1150c5bnhvnsh4ol5v1okr53o'
    })
    redirect: string;
    
    
    
    @ApiProperty({
        type        : Object,
        description : 'resourceCodes [input here api field description]',
        example     : { "foo" : "bar" }
    })
    resourceCodes: any;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'expiredAccessToken [input here api field description]',
        example     : 4553025961
    })
    expiredAccessToken: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'expiredRefreshToken [input here api field description]',
        example     : 8833424504
    })
    expiredRefreshToken: number;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isRevoked [input here api field description]',
        example     : false
    })
    isRevoked: boolean;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isMaster [input here api field description]',
        example     : false
    })
    isMaster: boolean;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-09-14 14:25:47'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-09-14 01:44:58'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-09-14 05:28:50'
    })
    deletedAt: string;
    
    
}
