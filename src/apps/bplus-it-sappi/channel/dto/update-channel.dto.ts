import { ApiProperty } from '@nestjs/swagger';

export class UpdateChannelDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '10c3798d-8728-4ca6-ab45-f377e51b4a6f'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'hash [input here api field description]',
        example     : '2zu58huk7cij83po6tq62uxbie7g55t5f9v8m3b6'
    })
    hash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'e58b4c35-f0e2-4405-90b7-3008253393a6'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'rkhhw8o4w7s1va5nf8cz0ze3pvdp4w009rk986waja21mghi3e'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '9c486816-3fb4-49e3-bb47-81b587d97576'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'fue6cqo4rtorx8hzzpn4'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : 'ol88s3yab9bgp0zr09nu5f85lxxw97y16xn7otqomd66uktf9gzpuv9r3hz7g4u6yw2vqkhz14hamwyohnpx7izr0zbu8b8mk2c4fdbcgnv7f4aw22bifsjuvbozbvey0zvtfk02mgcwtuyzg5s7h7wdu7e3peq7'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : 'jb3hdc8jnmp79gtegd3z063susefrxg11uq3755x4wb5oc5q068l9wuk0344gjujhqrkovmgvtt2wehpld0yt2vmyxagahn5v1cu9cj2t8bjzkduekl9ilzvsur1euztm829z5ea13ygjwbupktd4zgkw4vas4rz'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '7xnb7yz6v182dmffclipcid4s1a0a5qvz9gn55i3ukfietzsxod1simug1ou6sv1ikz1z55v5uq5qbw2xhw87o46dsdjm7bseaw97phj89t4fb3u96r3yxmlj9ihbrzx9j08cfhb08pvbbp5k4ltmorrdciey1m5'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowHash [input here api field description]',
        example     : '3uu3cc9730m27g8xicq0cmqldgymv1951n8fdjua'
    })
    flowHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'wf7bo80ssed24gwopn93rmkj0ky30kkbaqzn3ofbbwznl6vnhdbg5kpkf5u3kv9cn1vjz9z8e13t6l2j85lqom1yo6j1m3ybsgwf7kmmcqwr9io29vgxsgjhebq5h1dqf9chux04wdywxc8x498bputwwqyb0i4i'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'yhxf38ulyquw31j2p6m465kksldubrq68d19lg30u4j6bwhk0nl1d7r0l0b49yz85nx130nnv2ixmdq0qrcuiyxz13tocoytikx99u95vok5o6ult9f89opjtfzbrvt6gv7b3k9hlf63ogn4wypaybjqfh14zli8'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'e4kzfi13c3cywt2akhl1nrsgkmx0os6f75qeg6xj1pha54zsms1zojn8tbyer3azrmluhs866ns5ekmt7kzi23mckz9518ub2a4en3f634gkpc1um3e8ldky8s8phyooyrgcarixkh7pq79mb1hnk0l7ijm150a2'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'rpnzap9od5h8gdytsf9b615dmwykpirmt0tx11hivgn8mq7s9jfj46xy5ipate320rbrtg67j6uk0xry1w2zikzcmxrssxt4tcyrd5ibkdlu4xdnjdr49lqhptk5gaun0lffz91tjxurvvtceguatt8d5pygaxtd'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'zd3nit05hac69xvmwkhp'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterType [input here api field description]',
        example     : 'dibybvbfw3w6cks4ilh9dyo9b18mpbfz9rbwoq14a0g1hg639innfday1d4y'
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
        example     : '08q74nfq5jtd1yb8e40yqqeqr6dz7960h3mizcwakstqzpod23wor4xo9f88'
    })
    transportProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'messageProtocol [input here api field description]',
        example     : '5y5f1g05zb8ihez1xvn9ephrnbchh8scngoysyzcn9yrl710xfvk6stq1cmx'
    })
    messageProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterEngineName [input here api field description]',
        example     : '5oujcudx3ncpsss5y3kjc2yjaoacdgtxxwy8n0vv1jgx6u30qga32uiuv96oe4qzwmvd9f96y6g40axusmzhprwgviqr9lgoy614qsahy67m64nhynpvbzrmqaug2sv7z8hqh1e5zhce7njlt2385w24xz8rv0bz'
    })
    adapterEngineName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'url [input here api field description]',
        example     : 'k92x1op9khf4joorfbq7pj4qmoxg6o95s3hllq835vw5anns0dlrki3pw6yj5yf6dsvivjnszq51rtc6x0awp22tefe6208y9nk53igdfi6dol5gf3ewywsiixdl5vgd126rfhf3d6y42nodq4si0ih5y8jkhcrbpy9lvqaceb21ch2xy8kzf38ic7m4bysdx6121zebawp3a2oitxe15gmyzp8xm1d6cbizj9vcemzq7s5707pkxfw8qle4labhvuinmpglkge7z5yfyy9p79l1qgtfa762u8fulqq8by4v95cmwlu0q1sx2mrlhi1q'
    })
    url: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'username [input here api field description]',
        example     : 'y6o9w8zx4vn9w86wanhnt74r7ftn0p5qea58nbuc9wklgqdanibbozsg6ux7'
    })
    username: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'remoteHost [input here api field description]',
        example     : 'gwyjolsrzrayeobhnpudu6lgxsoyrxr18ux44s96b30mjk9xpztqy8ny8hsz3lkjazegrhqq9y9aagc63lf1w9riu6a6b0uos6p2cpixiyv7kehczs9oi353jdvermmyfg4wbfqzqygnl219h1clld7bpb212rri'
    })
    remoteHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'remotePort [input here api field description]',
        example     : 8550264608
    })
    remotePort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'directory [input here api field description]',
        example     : 'ssfsqa0fxv4lpw4as5iso3dxzylipvbd3deox0n2pj5gcl5q7hn1y5onyv02sae9s6pxp6up49fgq76l0vived6lz5idcs0qf0zai2283d8mue4wvh1ewxn5isr4yh6ehskjjnowys3qg109fvsj38az4725pfimeszdepr5p8z2773truzrc9w1kf5hu8bhxbeymb6kpu1upds558m7zacjbeiedd5u0pyo1o6adorb6u2e6708f8vlhiv0yv14ua5de3iqjlt8xqhpyixw5vmif3040bpzxy374nwuqkbfaruqzr58v1et1no1l91c32ez8p931vqayzb9ipwjx1883wo4tctzfz668x9wf01hapeeodq3rv6tkay223o9ayegm7xi3bg2yav7biq7nnnuqn2kxc5rhxevvj4fye7zv57eme538icfsi0xk0lhiz73626emzgfges4qrxestah1ln864u54ozfxx9b8vo8a2z5f9yzr5uvg2jetut2g26aksfxx63e7z88wjexy3uyfdidnkdz6prylrqjokcggf0a5zvweab3vtx09tk09mza37jb69l56c98qydz5qd6i8z3jlquv8axlwhq930chg5ege2xd6kkqdmitrq8trg3bkdc5ua9s6wghtvhxmlisqlrf99uv2dpcltyfhd5baucnzckx5uqtw4bgnvorc8sc6thv4bwb26pdje11rjez3wpzy905vcta79kq35ad7pn6ec7xiffuie9g52cbqhmmm121b3xn4qhzxwlw9so29sna2z92hhd4b23zs4s89vk4pwvwf5gws61d7gq57ki7i01g96vix6xmsyoyqb4wo4g2q2swui6q1t55cgg3hcwnylruy7455d80xukx2qnznyfe2fn1ks41ryt2p3hczdv4tc6s2k364pemtowq4mz0dwyrv3px9k95j94i2fx4nxozpmexf1q9whdz1rs3t0t9j5oagxsw4c0dr3sgn6vegt6y32y5gv0zro7'
    })
    directory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'fileSchema [input here api field description]',
        example     : 'e67kukb9kipm9ps4y507kgasrixwunykqnkwpa27mdrkajbvlgjw2nawqm36s6j6ah89ap27zizay42fb4q910mgkegvj4mze7hkk6opp0g1wmqi6ldnk832wb9hqthnkj2uy43pl83hckp8xq3gyk7ov7qfqx4c0u5lzr7mhsvu5hnjw69djjt0r9cfdtcf4fkvrpenrrlas4c7m24jpiy0u8dw1i11rtz1cxb9ck9lzk7kms89g96g0kv6nyy1jg89s0vvfpb7ram2tabhmms46xmv764yepr5v90jt0s934u6mtzd2a3p6jdoz8z04d8c4tey7e7eae72og96fzrsgjf5e0i3u3tslwuunqhx1f7bo1pz7b9x0tlgud5oc8q059xujcvuilrhjizo4wsa59c29t9oxa1e42p8rk8fzfewetazhmb4s3j5l58o7b237tw4ki5bdv3h1m8lb7u19d1ntzphhmb9go4a18dwcf64o4qkyzexe4omkvnvr9jg1b1wq5kk45u2tkpoza1aluwt6k2pgenimo61q5nw09hz2cwrw87arxeg5ohnacx4dde8nm4uuim6v2i1z90dl90u35x86rhn46gdzohdz6xxey5dqe1gomfwamx5xjd1hp3m8nnqh8fj4md3u8crpxnv637wodvwlci74x9kcih67j1lalmtzwq1f94auy44mjn7gh6p22o4q1319csnz3szmmbf42lnucgsyb9lz3j4vfxe8qh37sfyajt3enp80ner8vtpbqnvy1vr2urqe5dxthhwxe4dewr8sio44afuqsabzinetilt42zhj9j86z3ebv75s87r4ur5sm2c33j6ik534dzvou116s0qge6k61rhy4bj2gmxmyeq399lh1xno98du7euxi2p1czsh2v2sxcso8lbg38mu1inh9znri6ffp6a53wa9jqcq371jrx44fw7z2yata67tumc3bov41l4zjbvdlvjiuff2c8bw71l9uoqw83atzf7'
    })
    fileSchema: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'proxyHost [input here api field description]',
        example     : 'ecsoosfykufpa7455ee7osz6xwzhk9gh7gdamd8ozq9zi5lmql2fqx98v3so'
    })
    proxyHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'proxyPort [input here api field description]',
        example     : 8054588626
    })
    proxyPort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'destination [input here api field description]',
        example     : 'o8hp035hpolnbxcln9qs5spajd3t1adwdz7wjiya8kq4zoiy9tk1772mjo4584wnv68ajc7o6kbmwo56qgv47umxgjxukihoy8k3s023peofm3vklv1cmro5frht1hzlerdhat33tw9qgei0s1u6ljoefows51m5'
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
        example     : '6mt9nr2ekmxr2f4wxzgy45zenoi6omlk0p8gq2b7bjyarget7mrjirkay8paexdq8hp41kyp3gpt541vqnuhlvx1ae5lb7sm3gwanvlj7k7ng2hyf2nd1yaqaih20ehmv5uynac999fapwzmy6vm0jf2xorc6jii'
    })
    softwareComponentName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccountName [input here api field description]',
        example     : 'eabm3epv8jrbzqa6v6pi'
    })
    responsibleUserAccountName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : '2ryyxg7qtebdu1k6jwj7'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-08-30 14:49:44'
    })
    lastChangedAt: string;
    
    
}
