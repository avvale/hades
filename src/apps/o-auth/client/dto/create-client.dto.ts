import { ApiProperty } from '@nestjs/swagger';

export class CreateClientDto 
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
        example     : 'PASSWORD_GRANT',
        enum        : ['AUTHORIZATION_CODE','CLIENT_CREDENTIALS','PASSWORD_GRANT']
    })
    grantType: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'c0pb112e5qrvs7rjqrejogjaomhsgsr16kqhdi54msb9ap49o936vvvbrrll829cet30cbqda7srokxdwjmm9ysk4l5q32nzrse5n6y1zu9n1hkuwe6gcpbj43kwxlz4o7zxgnabjumvycj29pjfr7qke90z6vrgn5r1f399tmjpyfvr79wunu8urp3jfp7yds32yesy59cmk1uoot2l3ru04rsntzmee7rw494df2v8bdkbr90xe30qpuoakrv'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'secret [input here api field description]',
        example     : 'hrw3tm0t4z2mmpajkilxl2s7dwqe8q78nm9ocebaj7rujrei0564d75o5py1mr0jk1arbz5fpii35ivpxy47uu6eul'
    })
    secret: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'authUrl [input here api field description]',
        example     : 'g8x46m6or9j052kfvdg6wxqdi4ckohiobww5inajtgi60m8k7xq0xc7i4fl47s5gwyay9vsr1u3rzkgve60hso912srkibqowa2l8jupr3fnhhe143le9msxbjr51x3k7bpcwfjx1dg9b7ppg2m02u1vtfw9vmiwfklpe97bs2mj54gvcrsjy58mawe4q8h0zgm3au6dwoh4amfs4if1sykw5s4jykqvhp37a9njicsrv0v6d4q7mwq6tue8f1wgbheugirqrtytjxkeshhs3q66zyrts5yj197ybb5ns0cnxzapjywsiefn9fjnuw5nrfx86hbqmdeyp2xv5g1amekaro3h1ingcbact3syltvwk4a3dzv3ac8a86or5o0g6gpilvqrgz7ttjmtnljfbsv9204w920nbggqui906vqzaqr8yctv36kp3b9zjkdww5ji9ntz70d2pq18s5egvxrstfabphedkdtwzulpk4hkv7n7cyz0mmg9oel6gona2g91pxdriu0j6sabvtsgjpla57fvmqmssok4u3q8z701qtrf1ty5t9uufoivudicc2ox6j9q0rj27u6sz10fyfbaft2eobv4y6jjvv1tomz8rp6yxpdxgm89meg8i6tmivde6ip5dhadcu2y2rgk0ulz76f9j8u2nu5qzdwzel2fv7bvwx6spf58861gv3kxat7cv33pkgz0ahjuqqllrrhdyuv9np2fy7hwq08rf5s0dbi4r0ch5ia27w46nk4m9rkkhhdj47qfunjukn4m5mp0zji7f14g8i1qrdqralmnn8pce0hkmr91e2k5bngax2g9gk5bbf9yzrhsw4wt6uyviultv84um9qxznk5el8b98tkw34v8zi6rxyevxk4sbj82j9qdsqv40od55erhog3r0nuhpxu2osfmvm63mzicb6l0zdlxgnzsi995b99w9i9uxt2rek6ryz83so7d06z2elow63yp0vxa01upj0sdskyeqq2aeeo8t4ra6dh01tit0inp8edor968f5q8j6fod1tgkkw1mlo5za3q8ad5owpw3hbcmajqj4fdovblp1kyq8p26ao1gxati1izagy5weg1tvis6e8p3won5r1e0jotejxfaq9c14j8lfdnmlywsch5o1y61q4czq09wmc7mqhwoaimep8rxbadatd0axz7kcmftp6sz0c4wvaz7rqqqpaanfirn8ssvc9kolrpup37hmzhpmjsrlb8sy58sqd8v8trknc6f77x8xmgqfwz0vukk7wdr2gtrlmlyz281ujum7ysgtax1ljsv1p66yoboodmmgdlrj0d0r3jihz3a9aiqgrdc2fpucplwrb7838opuoc303qmo4ozrcyhholvchy5wgjzrb8x9zlwgo852hu7xrb85dvhgu05xizw4l4er5zps5mwkzer3iwlmyzuhkvm7k9w4rvditsfukyfolia98j25x7z7f7vhy1od1o4azdsott4h9o5krdwvwu7pg6y0mnne8z99wfpoyatlk8x0pvipead9lr5tp407oex7h5z2udajharnzssawpxp1fsxgi6dp826a5357ct123ryd88bjlxrckelefhyab3opg8hf4kjnmkug10nrcnddulbuq45k6bqptehwl4xpmnk8hvp8j38jv6b50sqkksdux4u4utxhvv8k84svbngwwcgqb8yqpoaovx65dm4swjzoq73jxox2txgipqbs2lqsy6ba7fvaztjwuocnbowwywjb9guw18ufnyiwefkdf948bgzr8lr00x4hgbduenq6s89kw90fmk59y9eg9vbathoc7vuj4fxft3vtqu482epajcqlqnkggunm9tentda9ugsc36ipcodt11k3shh8lmox6zlqz4yxc7qtun8xpfkmpuab09deevnn7al1qcmsj2ayxsyk0acynkvyc6ker1x6mm2giu9w9u7kolokzd1wx37wexenaatt6wes2gtqeztn1j4ouzgwhj7dsm7ffm02vwtdq3eh'
    })
    authUrl: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'redirect [input here api field description]',
        example     : '9lw491qghn9eq1vfzner50zbciptg3p6w2m6up1toq7xv67pn8erahp6a8tftc1dbe5me2dyuyddbsknvy2fukhy8w88kscii2jt714rt7ck83hiwx0jsbfrl5dhjr4gmowaqzfg625otn3p7vl425mbvq7ks34py43ba8q20d5rmqqtlaf0n3yj83kj1p78r85amf4c1c5mdtzvb6sg3su9aa4qcvm00smqy1cl0z3zstahmq40hrf74395wzy5l1bn3u48s8kqwqj52kgkihb9hvxqxucuzxz2geqrxk482lc4orno6a7rr9ym4abxt839uhx389wat6rxhu795y1eoiscgng6lktjnb736v7blmpkct8bcupaqhtq8khui9met1hrz8cfjhsrf5pim5g89qed5klziz6w8ppkwbjsa97pb08dknkna6ehqxwx65dl97jpcq4y526c9lljx4980cq2lsost3hfne028mx6gp0maa9hxmn2xl4z9c1g0ouzreuudnil7jkdicwp4yhl4nmydl0lszfahibwhk0szzkfuohkwc2gutyfjjdo6y310t1e1jtguxnft166cpena7w87o2k34uvfoljd3yx2dphp9hintl5xagwd1gq26qp2yrqpepekb0m7qeirr7lhgf93o63l5yra1d4wpladar06vw4awfh4ff87knnzzi0441etquv06nebmd73zth1jeowjbb24f1n8hv6x1cd814ftvosl8akhsktezcen1w6fzcyit1maadyejjcoe8n48clqx9hc2lnz3y4iprw8wqa3rygiqxmlyq63kws9fb1evpuiy69gb6fnrfin64dyiiua2orbevteqptz4v1ft0favwp6glmevgwyumbg8giqjjrma79z98l7k7rvqkiixsu53p3jit4zshjpkjke867a71nk7t4lfntdwqy7i3xpfrjncoez2pufbdysieu40rsgpdpyhj7y58q30rxsum3wyu62icsdr4hg2quzkdmft4lf1nrxk9rw4jim1uewny5tz0vpqy45m6jzg8fu3ye3vbmckqkb7jcomh8o29pipaebcufxo6fedew4gd1iyi6w7c2150syhquydy9rjlwwxynpnzuoin26nonnd9nf12f2tp2btpdxohs1g60juhkbeycwzshzoaaurji109tqnhxs5vbm3kt0tbz7wt4j5yefrs4w6daq4126ijvwwf6g8gx56v35tl7wy5p7ggbflxek7c52ph4l0q2fqgptid02r1f2qild0jvia5k5vtgj5cz1e8cacdfpu6quyoqzn7qy3ch1n7rzommtmbhndwor11fvchkkyhtq3js8jhu6zh8k83cn2mdadlj972omcxhmxbl75ltkk8u61ci3ilp33k6x7b3s415qmm1mrk8vwqipkxzsgi7zdyz4zzoo9608q8f7wzxoa8r6b9evgpiyzty0faadl1b94ba64zwa4k3vfxn69gfpl5f1ggx7ne7go8g0egy9qd75kgp4btufcyy54hsm49cl1rdoajvco9y8exiixkera3rya546btuuyuv20kzb7kps95q73top6odlo5xao9elvk4qg1w3q0wyfl6op460hn7j42hb3eib0ksgv71u0p6g783ok5z0j16vzfnjdv6zq264mu1qdlorrvkh4ua0poqwagb0d1ui29u4ncbg3kwxpluvzzicb12z5fnbz15ay99ofyjzkw7pi5d41sj520v2hrua5t3celfao59kjowipy6e38ousnqdpo0v9p74bzkzxh3ejnm9ti2ub07dw2i373kkfa8mbawqo4lulefthlphf3074d5pawrx3sz0lcvkpynl4v14pkm4l50o5tvr7ri5uw0a8iofoa3qee069zkp0ybntqu1h7cj59vxzlacacznnnkn4ov1carxih9mji0ltmylbsub0rdn3auq73fyh2xgei9oahttubdn2ahu2iaslns9ipk0zocbhiixojw56azo6u6a91wl2h'
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
        example     : 7106031728
    })
    expiredAccessToken: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'expiredRefreshToken [input here api field description]',
        example     : 7983189546
    })
    expiredRefreshToken: number;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isRevoked [input here api field description]',
        example     : true
    })
    isRevoked: boolean;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isMaster [input here api field description]',
        example     : false
    })
    isMaster: boolean;
    
    
}
