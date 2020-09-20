import { ApiProperty } from '@nestjs/swagger';

export class ClientDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '2d8bbde5-e0d9-46e8-b0a3-13c4fbc91028'
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
        example     : 'a87f9wm6bsavpz4bh02e4r6uf0gd14pkfqtnj969bnol222jxaej27wslc2uqy9e7vzv3go0nm9kr3yac1pzol3qqutbpd6rip3oa8s1oi58n5cfjiiggycnljybkv45j6mfuua3epg9snksv44adf1hkkhv9dl7le0al3xm118tmu04d5wmdz3ztijlg2vx5fxxuqfnqd0txmfwk4uw85biidh3vrgsuzw9rtlx7ogcywlcyy13sn3swwtucso'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'secret [input here api field description]',
        example     : 'yssc91vj13xhhw3y1uraqg3gm8ua5jvwi3qi60g7t5ov7q1i8do8p16w1k4inqut9233gm78a00q72mud6pvxzclwp'
    })
    secret: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'authUrl [input here api field description]',
        example     : 'rfmt1s4xsopgrnyrh2pfm95wx96bny1yigell6pp9r388hbao81blqube267a53ih665ggpi9um23wiit9umr0tybw22qytggsssb41j72c4dwnb44pfip82v47g043fuhr1k3yvv5r6wycuioiep09q02jl8k2y11ldunspedflcgi5zw1urzc2j84413gfz364d82incumeduytip14yaojvxkiix3to0t4rhijy8r1ljvgqg6a6hqy8l62b8wua4hwi3jpe004nmbddj5d400pdazndlw2s6ovpctz0t9ddqb45it4h8p793i3hb2lpq33z15bdyre6jiv5utpxf611s7e6yy52zaf8jocdky3kf8s8yu75ybu8lcaif1m8qkdwkhgxg5me9534hb24iy740nrqt5szzoo3r24pmdo0ec05f8kfst43qmn8t3sr1btaa7i4guj606csfi6swuuia9k18bkivt9ue07qe128qrfook1js0lmql21l4s5a38a4gshuzsrv2zzjc0lp8b4sywqgnshze7xpym9186dfsbida2ywjb9m1zcgxyrcm9px3izngb8a5lo65tz6i9rcls3lvqz768o2jkwb3w582bqfes9xkunhea58ovxx9fqdlbq8f5url42a4985rvclz165pl8e6r18qcw24x5g7lz229p1d1n19djfrnchl49wi6xl8nk8wayy001sogvtmoels3jvu72ju5vieywsp425yuo7i4m6851w6si5vhegkyug1k129ymnde5cx3esdtjqaftio2os3wau6zgbagxf0gfxjol0lyth760lbcvzz338n7x9hz39xqecjb6vejkih3pg8sx8grjppz2q2bfzyar3arq9r09uz4tkcoj4syii3ziaddeb1h91vtwyaw03pvu68ghz8o4louyc39bjb5a25evdw2rbbtuyxw8vna513oxnrg5xqv01wc09z0xybkla6vufv6iso95b1a54scyhf5muaypqndp0oi2mlsn8tkpfajdu8tcyw5xi2680n5vooviyknl65mzchkgs0fllcx6ev4nv62t5fbrcu652qllzahgbrk4lp97n5nsfv9fv2uxudshpxsko9ajyqea1bzy452c4atdsrfr4drgdmiy0ct657e2yjlrny1g5f04fh8ypjk8fcjun0fq5yg4tofp707yz1msdbw2yiwb2d264z9k8liuq7lazspfh866eivxqrwlpt6rc9i7zb75htrj46z9btc7886oid9tooxb93htjotqs3hqr1kmw0rgn3z3hv3fdc2tr5stg2g9ymoych7p9z8dpkq9kn227013hn0lw9bvglrork44oonjsdqz35lynuray5et66rh3y8emx5bz2bnjtbbidn0ujex285woqn99nrci4jnqrd66xm8husspsy8zh6lwh7uplcecgf0xw3q6mmbwe5d4u4iru6vdpyfazxowesprc6veb9aqc22ouip0tn2lhmcjia65z9l77frwgzx68czisyqv8w4jb5yix28y5cgn58nckeveeprggtshu5g9yg9nlwnowpic68ozmef2ug802glj55t68748i3eecmh7jmjds7l3b99psy4pw94wvb5ba9u7qu8fizs6nwhotk009wosdpxjqmqphsarhtk0zhsl0kyhlmv1vy7hrlqd6w1h18gnf537e0p8h1pjmlxf7u2heswmzl15fgkyyk6646sut0dylrjkao5rzl9580whhimlb5xzqd7qvjiysmtailhtb7l1160ovbifzf6xovw5hv0cugg7xecfczrxh3hpp64311ha3udh5rv30a65om5afd3slqc1wimlp5objszhg0wz01j3p1qd22d9q23fo0e0wsjssnv6uh35nc068p41a8ns3dbx96fgkus1vyy3ujlkrspa9uprnsyjllo1i2wgwim299sy4i36480oxqjzg707r7uy77n5wobtrsneevh757smo3tht90wrfxj66r3pyhal'
    })
    authUrl: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'redirect [input here api field description]',
        example     : 'iyhx8fiv5s5euur4l6qmckn14ml901unp5jbl5p3m56x9q2pvj5rrm5qwh231lvyx8d27b0owwdg5o5lbxcrg6earmbwe4lr9j8sj5uwesnspkm5v81p8ophwiju8cc9h6jrke7cy8vivzstqtqx2qqm5joy56gfjc5xz9pamg4qlzofqgi4rauh9ysuan05jwvsnqkjyk2vn1m21bcxx61p23mdwpgiy8cp4nd0jlhhrddhhorgzkkrjkdnmdyaol6nqgx5gg5qdvmatq588fdjj2in96e96gchu6a0xvsx2p30scda4bjlyil21jq6x4xawk14u7cdce9sdstjpujf5jmoj3udcvb462iw1rotjsj968i5pu60q9jk9vws9cvv48k8c68ytl8lsmbjc5bf6cv9drugr7gee4rnrv59yqtja6ngpuekrn7iqufvgy4vo2ql79hxs5hyglts1qyb09emj9boc3r4kbi4y5nfoxbcajgm2lhpg6ujivygzb9ie52vgjdo3jkyp9n7hlqoan1s2p4ga325tnkby0iuw7gpc8lsa6niisrxyrjjxiioyh3bmrxwf49va5uazwucpzoiubbxlumkg2xyswshwmnnwxhatdwoq5te1s02p1lb5tfjmm5zyp0qx03d7unomjf4j3tq03t1cm03gsm96ocfkm6o0yffzw1bmtt6ej1ei4aroklxol42esyshpfo8jriqqbf8nk9arb92ndn0hwpxv0gxrsbdyomykb4lzhcqkb4wb7v7hizp1gv5kko6z2xf5pc5pq7h4c2s299vfrlmwvcg04p7thypi5kh5m0ycmk5ua9g5hgkgfobz1j0ufmzgu6v1t5dpp5vzxocnvi2h0zicdbki55rcl5noxq59kjinsx0u2myr4rxf47b5dyibkvblhwoab0sv75xdnxw47redov1b0nq3poan9qqq5o9znefyd8zwf7x73i3jmhjs0exve619axxu7ifxk2prpkgzf1jteucip98qxlbsumh1oh6qtfjv1kfl9ihzf6yuvxmrc4pl7nnqvt2icy114vaobiqakj02h3vm2r4e61npc28qexcuua0dltdevpcje6lvuf65ld126yw7vyeevwd4skwl2wuluhd2hheu0y3zzwiieve48grh8sd834otvwidm9jcuc9ets8xwrvxchy1plmui6jo5dfb7el3adrptmtkbqkzo5cisbkcej53ris5ajiuamjnfzdqxzl46ed4nfvsulq416pqxoowjt23caimn211eo6milkui29l5amszxmolbvvfnamqon2dh7dyphit0pi8u7a53mmakgeh3cr1ogvsehft6do8vqxmhu4rkwgzwxtptitjdzq0pp821kyji925s878r7hfzjtnfpiv2bspl1vj92ek3gm3rb3vm8z6c31lozorhd6wfli23pv8znoqcdrcul7kxvmjkbb093tyx1l6zvjs88g531e99eab20tnw4yzaapcp590wg3waulbnbcac8dv3nflb5d4pybfhyayap96vuabeyl1v45y1nfesw332vsdg7tn3qcacszj4oir8itgjujzoz39gyku5kczwxce865ozjk86i0bl16p9ebapylxqcr7y0zlx60b3gwddqxf05sh3ir7aevyihxapxtdzvtc9923h18a6tc7h744mwk9nfu2me5vm5sqrps6nfrapu5spcuo8f60rj1joa5yroz539pw5s43j57ngjwlnbc20t5vjglaan3vorpvzkhewz26o5wg0p29qdgtoauow6jr1hin2smhfvq2xsrvdz561ss7bdiig9pmzv1s0dv7kofq1uuivyu0gwdgr1ga3xf5w0h31n4dzvj2sxvemraky9lwlqq08819i4rhh2c35f0vx5ffbdz296ox8u0j91hl6dc1n8z2bcwhaevzhraowly026i90p7fwoaqrwkic064p9f361094nepk0sss0zxw8qc4dkxegoxuq9e5txujd6an9cwundsv'
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
        example     : 1990723508
    })
    expiredAccessToken: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'expiredRefreshToken [input here api field description]',
        example     : 5683212464
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
        example     : true
    })
    isMaster: boolean;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-09-20 05:30:36'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-09-19 19:07:33'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-09-20 11:08:55'
    })
    deletedAt: string;
    
    
}
