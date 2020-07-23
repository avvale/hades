import { ApiProperty } from '@nestjs/swagger';

export class CreateChannelDto 
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
        example     : 'l2yzyphn1xrej51otbeyq38ozcgzdrwb6kcdm6cjcb69j8mzx8'
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
        example     : 'xr1xpjpbhvvnnatfvpcofxj2aexd53onfek6veu4j6aux5ue3260q9lxime3a455sbt9wskq98v78jh378z0pjv5tn7fl1td8ploupy0zjnlqfe3vnuuonhqq4orq1xzgef1n1o93h6eb95vhb30ubw00ss0ogo9'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : 'k8a40mrva5ew7145klmj7pcjlei09pnsi7p77nbi91fe1aw37lwbvufvg4fumqlcegcxz14bscvuns00lpamwktv72ks0tqb7gf0s6ww9gs48vpnjq7nd6ffw7rc6nbr0zvd0qc9reg98rjnn9jt5yltlg4pl8j3'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'kfnra5vu6ac4qdilqno3m8cg8ohli6o278v3ueu6ot34am3m491zzjj8b9rla0b2uw8je7ng9dz156ehfprpvgsltny20d5k85b3xr5daq36m24pqm9rrgyn5jypfatpsk3icsp9qzbkx11tq1lxj40s93hitg7s'
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
        example     : 'r4b4mlbvai6y1viux7vsrq405lzdarwykhpm20yqaihyfteykr1qmr5fs69jz5c08jyzctd7ljwydl22ysd4c701eh44ybjjrawsivtuleacin9o08s0lak6g4nq0ho32o37guvt5h5qdzbppfr0zs4ikdvgl01l'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : '90q3o594z9a22m5dx188m87zf1xkymalnza1tkig7tl5wzuf7g886u2z2bxx8iezbhyh9y78qo3jqdh3td1ckw305a767m1kl6fhsxw1sme9svagauyjoz9j3epo0b5wl1glmpep2nxcmblimlbwsh3mnfrn50jd'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'rq1s3sn4rqqugntpoehhasbhj2m5jfatvjb94ot8thxbrex0pz58903bke4lcwyy3s1wu4ic1vjl0lgu5x395si6mjmrxngqiemz83r4i278g3jms7hc57epf9eehr2rue8o6ugicswu9nfrxddbw4vsyc2x19hw'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'c8rbbhgi1rd3qzu7oypeyz3hwwwyallsvksk2l95rdsr0tmwczziitcpypcdro68m22m6l6efxlt0cn30p73of3t0ml2aj9l35e2omu2uup4ktx2bpelm7dlct9sagkj9e3tgear2akccwothos4ad8lo3o2mzn0'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterType [input here api field description]',
        example     : 'xoqj6or7cufkjivy77yupinh6mhbho0ms93ot90r6v5i6u6m8ijf4x5rln2t'
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
        example     : '9ehgndqx410xgole911pmvvts79nxyayexknwnf36vmszpu1rvx288hgddk9'
    })
    transportProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'messageProtocol [input here api field description]',
        example     : '4audf9y0f79ye58tkra96ljbfzd6rclccy03xajx67rb3todlif3ra128lo8'
    })
    messageProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterEngineName [input here api field description]',
        example     : 'olv53u88yll0pvnkwrolt2h15knja813lojbezh91yv58qvp3xiywtkcrii2b5a8fgbk49ee8ptifra7ksv8u7g61hmtwojzh6hbz64vba88rkb369wu2pazug4bab89s0i0s4fwbkzbf0v11n1pute5c62lpaku'
    })
    adapterEngineName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'url [input here api field description]',
        example     : 'zkp7dwdtjoyz5e2j8jpxbygklb4ex4g1hhiw81hub7qtk3jx7yissoisjrnuuca0x3que21czy21aydy7b4q8au1f1scoi2umdgw6h9mrxp1e8as5wsg0e2nw404tzvtec0t3rztw3y5bw6mp1c60mjanni90s424urmwceqaa9opx2wu0f8g9wqsmjpgb7i1nvwuajusnjndjpumct4w7dwk7xt53chmnm7z7qynjwtfcpb3fodfl0j6y9lyigfp47tha8i53fkm36miep7l5vfagley1r1s0z13ahuii4osdl7omrgus6oqiefagyr'
    })
    url: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'username [input here api field description]',
        example     : 'fljreepffvx67yggb5azg7mzxjm1lzt1ith1hfsyt60r3lya7xr7a4cnem8b'
    })
    username: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'remoteHost [input here api field description]',
        example     : '4i5fruu7y0awm7xyqnsmzwhso9cxq4or6m0nnz31264als8hv035dicedyzgb7lh7p1z6qeb6zfeu8g7k0tzqiuqf9w8iv6xsipkbr2b2dsoartwz0ri2uovr1k8u0x3fnm0op0sqytnmgclo1tfdv1r05xnq2l9'
    })
    remoteHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'remotePort [input here api field description]',
        example     : 5196512074
    })
    remotePort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'directory [input here api field description]',
        example     : 'riqihf0hscquhx4vv498a687l44hsqkxqvthg9ukelaz6lo85itg2u8zvxbn84je0x5inm6pit94ffiozn2cl7vhwalvehlp9vx1k0ne47nljunw3yqexwzefixielih1c3fgz4t9dl6g3dov5dgzfliefw7hp0ofhttqn0l1kc5fqyya7zziqnued3e7zxamimf423yhonv45rf2dczbrs02w407nf3p6wsj3smx6r9cqm6oidtrmbk1j0oj1abmdgugjhf7pupcklukuwqzg8knbrsxv6yqcxnels9jxqvv3f7exfvdt7ne06bh0u1olz5i4dmm89j0i2hluyvh9clkimsn1y9os3bl1ea45tuduma7jamqqtzza5fg6uqvgwv1syw4e059t18gjretklhbmjebvprrfvkqto58y0a1ff65l8ysqbkolp0817ljvn10g46wk0bcz9re4c8r543nii7bzraz2agicfi9gi8dmjmujodm44saz7l230ci68bv7g3ybgmawbjej12gw66rv0dbe5rrp823cjhoy65ai0fuh0q1tl2yhxo7q2otxgn7qdo1n5l0sbpnnaozqvlvtm7z8vhiyvvbonb7txvxzf2ft77n9p7nxxb046hflrz1r77uszuouu29ts5ws5ted21l4m5qjusuuwzq6l96yh6z3v2esmgdm8lv6ip3fhb68t7ywusae4vdl71hl5958yqeuxe62k0f70ao9qtqqb8606mu0kf6nt9pkyne98337fraqo2wahaf3eo3yqc81uny77dx3vy41vth0pt3ll1cvxdr8r0iev7ye1nrbpr2k5p9ggpb0xrhiajdcba6vjne8vb721uzpbkdgwcuhi5h0rt45sl7ml6426rg8uil007iahrpnexxht34cp1lynkapo5iwnvhhqlpfwawnuw4oqj2e11mc69fgwinabwwgoj37r9ogwec8khan7c9beyjo2hbc965e49uvbeclropimeneo09jbqjdxq'
    })
    directory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'fileSchema [input here api field description]',
        example     : 'cpufzpxt7545j87ndt2byca1ro02k1s1r7gdcntiyo3uxcmuom3jqt9zeuttrkfdc7nu1xg995jqzkhbz526o385hl3i73faaygudu578m2ifyv8a21wt2arhaiw0s2zu8exbxir90sd4ie5qb29bkv01rvnig7oxck8g2opfj1qngntfzyx0vktpsk381b1mesz6tdqcllik48aceaua5qpi201supruqfigmawv2e52bddyqnke8mh5tx7aj7usawymkklc3zwk3j1547yxr091cczvtuorm463kaiiar0489u8lzyi9rht51zafn66rx85prsp9a6wuafo7mtvpevkkszoe73bltruv0f9wqrqu0x7xl7k5hfclw4nw143qsjgos9zsmv3i4vnt0x1uxlolm1j0cs7a09ewaw1khwoblbbm8o9r4jw0f4zto507a7sts80r12esdpd95022o9iyanyz10kv6zs4phih95jtjwkvo3dzp54t3btcskbafwqnp37wxvqhkaysiavoa0luy2ve4cq8eiepyuzholfiqlfbhehniouy648t15c65s3tv8ktu5cvelnc4qrq3kn0no0pbr4x2pz97gny4wmaol1brlh6l0ysnrldbb6d3sr7h6g5riqx9a8o0lit7hb99mn83bpnpttexhuzqmm5gjmhl6jl3ryoaffzaslnwlw3w92odjjd90kjff13eopyd5146adcijudj7bk4w7fp981g3miwid5rz4m5btndhu23oxeafh0lzx8fkumvtk3i3u7ian576rajs82u0l2r7c8t80c71nypxd5l6mqausjmog52ezdwwcduwj03synhdz1mowsfpgql7uqcnkvskgoko94xavgllvhgu0wnb018myxd185w5l5r120qe98madj5nsuqg87mjuapu0imbv0yax0a2ny5cv9a8p6ytjotihmff4639lep53nsdvtdc9r0s9ft7tmrynp1iz3rq15tgvxbvuq063sa4'
    })
    fileSchema: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'proxyHost [input here api field description]',
        example     : 'pzuhicvhq0wqom73y3ogrk7c9wfpjyrx0q63rah0lj6qiwfgxbnvfclyoobt'
    })
    proxyHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'proxyPort [input here api field description]',
        example     : 4469851008
    })
    proxyPort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'destination [input here api field description]',
        example     : '3vst6hub4oineizg4t7e6vkie8zc43jgky0jvew58q8zrlltiid8d4akjo7snrh72sbrqe6ssmil2cdrvp81a87t4r4jjnb9lxv0tkfh9439dir3pjyviz8tjkioq4yvor03e4axhtuz9k8ppa95chdjjv1gzx9i'
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
        example     : '42ftgxtfc9pnw37d3quq3j9x38amaajk1ifr8levnynbqvn7ax9ndflfktphzgo8qg0m0mwkab7pshvin5uxtgc3k124uponi3lkwxx9tbuc51kfnmc56fjw4u89c9080lwscq6izu88wt9eafcnqvimk712ukyz'
    })
    softwareComponentName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccountName [input here api field description]',
        example     : '3q9uaa6ksha1j59dkdir'
    })
    responsibleUserAccountName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : '4b8eyjmrnn0qgrpldb0m'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-07-23 18:24:24'
    })
    lastChangedAt: string;
    
    
}
