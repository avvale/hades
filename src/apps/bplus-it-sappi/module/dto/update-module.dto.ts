import { ApiProperty } from '@nestjs/swagger';

export class UpdateModuleDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'd5f22bbe-d1a2-4df5-84cd-5544ae6aad73'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '772279c3-a5d4-4f55-9e35-3cb8cd2a9ac3'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : '26kf8cie86poiku5nlmpnrgzarblnbaca6ey2boxbsz7sy0dfy'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '64f1392b-8c73-4389-a675-00b624624448'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'rxk918x9y82i7vq7n4r0'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelId [input here api field description]',
        example     : 'e13ed62d-5fe3-4d96-b263-eea94907ba86'
    })
    channelId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : 'qj7tkufdpity15xg34bpdw99oziqtuk798nz3f002sh77yt2n747nkhkbbtcx0kim5t5llag6jalfx2cbgq8odsaxfoxz590oobh5wi6n76j99firq9v072ymvafv1x95guejypoyx1prd3mytt4i9pwh1bf829q'
    })
    channelParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : 'oz55kfcbp9bw4shmtjpumeomn3bhvixqt3f49xceegj6obuiicy8c0jrvn6b6fn7b4paruxdbh3wwyh5sgu3glagg2zzcorplvnqe0s7n9xvkbamquv7ea9b7e7wtjvzyan28gmy1cc0awqokjh6ffo7atqy4i2k'
    })
    channelComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : '3u4frrryixad34c8g6ue2r24x4ojf9ajn8jsa2080v39sz6akq5ff9jqdqju1f4wkdsalin378kgb7h3ivum60uiaxq3x6n9b1r4g26adyd7cnyusanomivkqahwi8uz7ourpupvg164egh8ltxxoqounq4qfcvz'
    })
    channelName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowId [input here api field description]',
        example     : '7f69f1d4-0667-47b2-ac20-0fadbdabb42e'
    })
    flowId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'e60m5gng9rth7wsjfx45qosdtreb93hgtt7rg3qf7027vqbe6cm2pthwzz3j3dtmart2rl1zxsjm7nsphd24sl15fg8hoep1zx8licqz25crthicksq4ev6919k216blfufs4wmtuod284whuwx01yi4lguevqsu'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'c2vlis7vy53d045ehk54ka1pfnjm5umpxrfwmjjs6z0h15vhgn01gcfv82ty0v0p2dccsdhes347h16i13d8033gtl1bd00l0h07hduy6ne6653622wuw5sj7kx0ul9b8yo55u4rxr14fxjprwla57ug3vir6gcs'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : '5c15sd0qsegab925t1i80a1c5t3umlw99xo8t0vg1wqs9yh3g29pmdyy7mlxx3z6w4d8mj71gs56rcnavrmx4xdxieblz2ml67g3quykdmdnrvcg5j390t619dfq7bo4smj92i9pejdw5425iegwog4u6villjvh'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : '1y4lzjupv135a1thx2ablhurqmttii8r4lqmtsq9dqbh6t3qa7cagnfqx8bhds3vhif339a04k0foeves0l617ts3fxzdzpbqxrxw2q9hkw4gbrq64jfxzodxu51k0szbv7e2bbwjf1oqg2iszvke788q6ewqupk'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'wwmiwovu1fyc2zdd8r6m'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterGroup [input here api field description]',
        example     : 't4o3413jtqt7zuib2bbzpc2pb5vfaowq3sw0i6y1k7bjgaehqt66z9q6ycld5bi6eofua6r8z3s9ozfwg9kr72dy9w6l7kegmd2m0b7ijb9ltdecnwdsqx7hghufn6p608u2xdo1438thzmtxhdfxzvi4184c1yycada1dm9al1wumrbyp4sqdbsqi49cjg441g02xip0k9g8mvjqk5uomiddviwq6pni2bgy56jpc1k0oi8saytg40b8sz1drz'
    })
    parameterGroup: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'v56zsm76g66f1lluci3crs646scawnypmwoiblgbhl70oc87hvlxrglqprcjuyktkdhfswj1zlauoh7pcnmp1feoo2s3casp5xrk397677oxww2mbwdqvuh4fgf56r118g8g40anrsy87gi0uh30z6dee7a5w7wyjz4k205unewnn4f7d6i2hp37z42er9axfiluhdep49ibmip6xgij4ttqa1ryzm6hzsruhi7e13n9e0oslyczch6za288iecaegmwp7f4a35doeecgsr80w7ylvk2z8jtb4grvs88n57wux1db9sm8v5rhkxtrmn3'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterName [input here api field description]',
        example     : 'bjv931ahk0avfr67g003h518uzsyc9q07oa7v64cxx7x2pp4zu6hfm0jmdwr5a0i36byrpjil1iim2o03r3g4zdjsmbr6lu888773hpwl266gbx1v1wne9sr5fhx79r2z1x5dit54eu07m6lxxxh6sqy81jxyhdq8nwherezo3zcwvbd6so3mqsdfh34yvqv2oymp4vrojga1sj0lyek4hizfr1jju8flqhlzgobmpoceemaw4ejedi9eodxr98z0574vw6koikom8rqu8g6kvf898v73u4qokruqgchdmu8ez8avmth3bcg82cuhe7d'
    })
    parameterName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterValue [input here api field description]',
        example     : 'o8ac4ib4sx69u7pi46sdzzj69wlkrwcdhq3ua3e6hef7clmmsngowpkowxpu9619tch2kx8w115tyqersn3m75nr0alu2qla2eg9v483yp460g2tzgdmxpsk8eawl8fyq5gecgac8lwjedbk0ntldfvv35c9nxt3eg3zr81d8usemamzicf34eynbfbmg0dz9aqicgiqpq54jl4t1x1uafw1x4pt7scj05wjvtzwfvfb0419maemb1ipsiupq4drs5hkrww195a07qo373xgv9o074ma36p6bygps22p5k23845d0i4m14lolpf7bcdhwe5ovgh4177kuwkfnkv1yleelkxyc3wzr68fxd9qrghqo2nol7vqsfoxpg5jk3r81sz9dx1x5f1fkjmmr8abjq8s1j50mmvuj035vgtp4vldziswd0d96rx2c2jcge63x7mmduax5flcnr4l7rcac7r1j5jbdgff6o8htvmwpqa8ppx6lil7h1bq4jy7u05d0dptivzc57bqfnxz2hfq1yy2a18mabhe1lu0067n9yi9agif0g34cq3m1qk11bkprtfj3bgzgtezgsarb4polppq93w9cdbx6un14l7l1tqoddktv1n7qjz5a7gropkkarjg1puk4prodwsb3pnpjpspmnkamdtzzh3jukc7g0pk6vm2dmi06bukvszx0w0iyt7mejc2qw953489buobgkg782g7gcdh0szaf5ins8oxbwpvatbflv8dh2ckj785f0epm1o993rhm3ysuocrzpy8qlca70821ckafw0e25pq4jp14xtdjq96u9uy8r2wc7zujnf6mzekjk7imz52efrqjux39rjkll7frpyedxd341hhv5dpuqe5diz2vzvwjpduans2vpeoy96j2us80qgh6q8xmsv1u57jhhvk39pq3o826wwbq5j3t8ak15jzfy6o40iiw9cm7njsgek4iotaru9d8iot4qy9s1byoq4jmj8322c0v3gz5q794i6p'
    })
    parameterValue: string;
    
    
}
