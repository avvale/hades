import { ApiProperty } from '@nestjs/swagger';

export class ModuleDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '5ae73a8a-3de2-40e0-ab2d-8356c9845b13'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'f9eac505-2b8e-436c-bde6-362579397dee'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : '2s3dxxkivt2ec5k9rfhkpvuibx5aij7d7amm6hca8742l9rwtw'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '3fca352e-b2c9-420b-ae28-cc3b0180d0e9'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'xx2lg4vtc65f7u6v12w6'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelId [input here api field description]',
        example     : '89d14c19-c13f-428a-ad32-e192517b264a'
    })
    channelId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : 'xulrka44gzzjj6kilpx1f4z88v3wu9qs8xw59vk29xocnpiz977h1t5d60tz9e79skj0xk6djpshv6s408drsdujxj62e0yctiwyhpkpy73oybu60dczq1agzz6qb0sxi6pjl16dsgvu8cxpjkhhag01h6poyczm'
    })
    channelParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : 'k6t2rtgyh7xe40k3j4oqootoae6ublubkhxkp9ksd5e2gifd60ljv14o943wena6gh6qf6uaaofku61slvna67zsqtccwik1uvns8e2yqxemg9rjov44ach7nf5v48q8u7n9y7gz7xps74kuxmt6o0o9epzxrx6n'
    })
    channelComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : 'ojruxq13k6o5hvy0swpmgpdl0xy0xg283y6fcdepy2gks8cjtxthvl63bxar8ekn05lpnowif4lxpbvt327fuquzyew246lzbpmke9i3c9e7dy18kl27klya55cgq0m9ieynsh95np30b5d1ekdiogmtb6n61itv'
    })
    channelName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowId [input here api field description]',
        example     : '5723aaae-200d-4be1-9590-951f2728fbae'
    })
    flowId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'bxwqf836gmsi84xcr6tayl4wzbxuf2rba9aqtz4vt5r8i3codf1vmeilo4sy39xzj171vphk29g4mmfxk948zvj9qb5g1vveoewfobanyxbm5w1ymqdexakm2xiinrhz7oc60wwo17eh9mcennru192dc531vi98'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'cqgyso6d1ebitn4dkjkg9732mh64360hkyeh83mn1yjd5hek59q28wgymzurgzucbhrhpsygksqc7b0o6xckua4bzw574a3ucj7txfhp0kex7wy0zf69xfakio8hobblt0eu4zrogtpzgvhxtzcye7ksl45xt6at'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : '2avabkp0ethncxvglds4wl4g82seb8xw4i97xestdqcmxbajcobrzbg9o9aklw8kp9haisujvnx7u4ep8o5wdshqizs876oljysrqydnemaneik93qqoy5zdoagl3xqy8b4smbmcak6a8lim7rll2wvxct5k5xbb'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'csfm41ppvmd4idjv23dgmcftnqdus2tfp9thcmynuo79j9237mofwixss133i3f1oqm61iolblqu5t0nlro8s1yv7hhq0gc108lzizg6iubbh7yxwaizb043bedyhw2wn32daacojfklpac9c3m0rlmensd6qtq7'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'rhfovkwhraw24n8k2pfb'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterGroup [input here api field description]',
        example     : 'fag9iyyauf5wqgb8av45wx12q6fn9uwgdl1c7nao8xop4w3s4xqbwp2xedxl17tk1iuu0as1lb4bivt4rl29jzit556n4kyb41e74k36pqc3hqai4xto4v2m030rvg3mzlrj8dvinw4ch34jq6yqv0d8gh8v4ic3nxblsf54wbssl7xkbpqgkv1fjccd4o87b2si6a2c137c3sldrpulpya747s6rxhqc3qwgtgeajp8894aqht30srwymipn6x'
    })
    parameterGroup: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'byzdo921pzbx7gfab6h8w3cadf418ar00blbjm0j7uo8g13qtngqz6y59v95vl5bozo3bqs5y6be71tzzez6occiugqt0hb64j187c4qor3j6y7ds2lr52hfujhyw2h5cdff2r98xrz5falvy7d8cz1u9gapzpzpmap9yiy6cn6nu8wkj8xsxlhqswy1kbj8blvwdqz1vfbzls3o9sogwd18z0m0oxkvr6qbqdmchdba2cmmvey2leqx18lvr4q3q5jqp91n0gxmy4x8rona4ceusgodhe4cpjgue05c98hn1jcu991oc9r0qy02bnxe'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterName [input here api field description]',
        example     : 'u7lml4ooc55vk7ahz7bh48s4ebcds78lsrw2rmw26yuwch1yn12jyrzhkj65hxfgfbmc2b1qrhrfmdc5riqy2405bjuk328m5tim38b35pzfd5gtje5aohwjozh9h42tk5g24jqoez3igbsmf0eiusd7mxdkog4dyoh1zny68ko1jfaw07ze4n7szq31x6kcrl1qz2ojno8em1fiu83yfq1p8fsmptcmlfievudjt5rpj0lp47nida4ihku82yqis5pghbr5x7waii1o5ca94z5du4qhqobjj70h9dt3zasiwfy8sqxwnnkzvxwjhoj3'
    })
    parameterName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterValue [input here api field description]',
        example     : '4ih1x1x0z7ow9ldz86e8morn6lubseto29jh8kt1r8p5zu41xuqusggqcakqprzefy837j7xl720kw4w3jeej3rtwom14cnr9joilrnnd2zw53k7ubjii01369js0zzb7uju2tyva00gb4a5jtnvne9sqpvv69hxju06gwnkgcr1h5fxsp1ajqksqyh6wzy58oaq5vohi7f69xzkx3rgh993gyonfd1r6h67isgxvo15sv3eg0wduzteu20c86tlqllt1ngafakgg5d7amonnzmtdh12auvde8o5pb6u2dytxz3rs9ailk9jfahxj1n0hg3d5d443sq0eo8jnoblk8u8xer80piwxe462xreqqb91rv78y55keck4oxf30hw29spr06g1btar8vwc0v2kdwbd0yt2gcpag48pqm9c548mczg2tw2g8cdj4gsv9j4sp601q0vlhoszt8m96rt1r4asrfe4q69ce9mne5crb685zdeno5tgc3eh2yuff2ni0vhujnf5x68ht4nok26t00fc51utqopyg05hbjfzh0264xx0qnjrkggpxitk2k96tjj6g9dsoaa3l6mhtm0p439mnjf5yuixoba32tu3qfpmpi04mczxld48yltf0504wrd296zg35q5lkhdsch8rlqxxb5ud67r8figm3vfcn1wtn21aiuq8m06gnc0zawtf2hu4u0qvyvr8qsfl61dmfdelnoar5vgan2n1mqnizji04toznfj5npfgx512wuuoqrvtx6dubnxmxcz7uxqojz6yrvrl34lzd49zh5u9tqy1oqbsoo6n6cqvdx457aurqwbvacev30nmib9ewl2y9m4mhcm9s3egvlff4l7vhtbk8sa1qqt58qe4am4ipu6pswzwwfv4tnxnuf1p5l4zufdt3b3b3prdazfytvbmr6ypuevhte4m40bm8p77ymu56wuevmmjw9y8cuoff0ptvhr4xfxgpccksuothqeaqegqmer0385g0tcpl8ozfa'
    })
    parameterValue: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-28 15:58:55'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-29 09:32:00'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-29 06:47:24'
    })
    deletedAt: string;
    
    
}
