import { ApiProperty } from '@nestjs/swagger';

export class ChannelDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '9f5e68fb-933a-4154-9173-ab92121320df'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'hash [input here api field description]',
        example     : 'x2dfs3gmrg53jmaee2u18wrvy7z5khaxslfyu9n5'
    })
    hash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'f15f1df0-54d9-4b60-b607-eca015049cd6'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'jdux64odu84j8tv3q985km8au43nwckphnaia2k4zye0udcym4'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '2fab7672-6276-4b3f-ad9e-15af490846e8'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'ddeqn38lfjze20ucb2z0'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : 'nqi1e210ab7nn5xkoq0gi0cszaw1fybzpsiroqlm76owbsl8oh6k2gs0pymf0bt17voyzushm6m8qejh4ft93htihhmshg9g7o15m29knym9fdv3mix4e94x3ugsnxz9slx1s3pt2yghy9joopm5y4sskx2j2zg8'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : '9lotzwd8nq157jbv1jmtdkzojiu263fxlf04850r0t668tfk0x19ksjfpyk9hs0frujbjv5e1zwwnv3w2wgxwogc02h2ovkp2nbo9p4jzc8mqt1nnmh4o1flnvxn3pwgl3dl61itfn7zvxr4rklm6odc214jzvld'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '9f0hqosgdhn8g0wqtzqetpo54nvwwazaum6vr5dzfttf9o75dz1f5qywpa86ccyqj7sygmunlsrosuonsd9jkmwdlfy8wue2ebhbgleuir9glwo8u231mbrgid2nvkgxjt96013yadpnlemu78nscxnpm1azc7uf'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowId [input here api field description]',
        example     : '1fe511c1-b25c-4937-97fe-e56d441688de'
    })
    flowId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'cjt4qc0cssnmuiih8nx90kl1zqkmte7vfg3v3wjbf7iamt0r57n3z0y36lolbu357jlw6iquxmii8oow1f2i2hipm2cb06ogesn3ryie09opucu3a63izjrcu7rmka5rqfu4m1zlg9joz0wzftgtg2ttqmpy6vy6'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'a4748eevzhbftz3r9rfbd1x2wu5ry5vwga3zqc03gic9kifmwpjf3c3fs1molw03p0dl8v7ursga6gqalgn8srnela69z0mnfny3202wrp2nffy8hezotw11t305jkhilpxs1k5xc1sloqbgucg5vwd105spx484'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'powzvxm44v4ab7vgpn67np9okocoygjd3xtj7gdor4q63k0gwg2jtjsmykwbu781qpjr2s25bc2mwcs0jcr3br7zw9i5pmxgkejala3wb6mbmagoqp4dj34g36qp3s5nvoe6asgb8383m4656nogr8x1qpwud9gt'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'd9hoxk3z9l2hog5ovfpsvc44k2gw2drxldthm7im90ivpo9zl1kmc9txktrgh4jjwduih4c1v859lcksov34qhegabcqyyyyruqhrc9ankmuluw3suuiqz55c62rtl9dmqtgikjc2vm6g2ttlgv4kn162e7pxypi'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'ctot14t11vm2wfiqnsak'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterType [input here api field description]',
        example     : 'd8xl9ls8i655erkqvzgemzih8lr5r592vsj85pvgk38uwqggktllfm1gj1s7'
    })
    adapterType: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'direction [input here api field description]',
        example     : 'RECEIVER',
        enum        : ['SENDER','RECEIVER']
    })
    direction: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'transportProtocol [input here api field description]',
        example     : 'm4bg992g965lpvoo13ce7s89k9i16xch2jh5qfoj7nrh5e85gg7e63ke25xf'
    })
    transportProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'messageProtocol [input here api field description]',
        example     : '5thtkh86xn0u7t6evpfy8l857nhr9yl0215d9js5tphapadm5bcbuefdk5o7'
    })
    messageProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterEngineName [input here api field description]',
        example     : 'c3721ir4xi60h04qor4hk56e8djjrwmycha9jph9idulion0ip5gjd8cf5kd7wk044owraa9vu9vhbbc11d8fja27itgjrqa36tbe007qqu6v3gr4maclwvjskmtprsdizzuofbxoyy76vu0ont8sbvvxqjhksql'
    })
    adapterEngineName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'url [input here api field description]',
        example     : 'yjozuhzufnaj5c45jjex1iaext96hzi7t7ldqc1qgexytt1dudn7busj99b7a1kwnspyj7h1jh3x3j1riem0mjkw9rmullpackm3rd69l0a1gwyu7t2bqgckqnex0jr4sgdlebt7n9ohy5j8gxigaso9pjci2wa58sxbh46scg415j9t0tqzzfxacpu8zwbcw6bdxxdfrfroo9kd27vg94ioxcpd7impl0bedzjt9rg2ufrje3nulbxrleyxxupequb8c0zdamxkrz0ubebb3ys7fmyhgxsxp2zppri7m746ep4zxj5d2xyo4msqaui0'
    })
    url: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'username [input here api field description]',
        example     : 'fhd7h7b6hvm9dgvv2199zrpkabq4pemk4wfrn70gtxzbpholgih18229ns15'
    })
    username: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'remoteHost [input here api field description]',
        example     : 'hqx48jdmemsuri96hggiv909p5r72q4uwqtcsnzsnges8m7e3vt4qaf94ukwuo5ipnsx4tkapn0oadhk3enbzbp3fbsc6be8e6qb4x38xl251o0o84xbjgj90o7r8wn8v7vshuc0tryfcwt655xyah7iez52upug'
    })
    remoteHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'remotePort [input here api field description]',
        example     : 3977463016
    })
    remotePort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'directory [input here api field description]',
        example     : 'cq9o5s10bltizsi72y8seiwnh8i6pzya0gpvpbrie3f76jzzvwt5z0r4gyayudm2u177uzs0vavrjfj424wtd0mcrl6n1bqcl3fndklwl2sizbh2ruliigx6care60t5ni94pai9t5e1fuwxmaq795l1sdu05hrtdjrqfs5iuditsq8gld49j97xl5dfbyl5v5n3glaw86zyf8kk8t2h51k5017kgdiuxuqq55iddg4wzxwdpi6g1wrogla1w7o6gtw9yxra3ayufh45owp4yayygg39fl84ynwpm3yl3kruqzvib3efduuf6pr5qdqw5xhp2b4yj8mwkk23mkcvvc2l0l4pql425fctcb72zznm6hmgppmp56o3fhm0zj2t38xg7a8xondr37sazoob4qz041ibcgrfmwkmi9k13se4g2ep7v0r6m8z2be8u1tc3p51l0tv4r0zwn4b6pg8eskyh0lasupbwf5c6j6dothsyy76r18andm4vbactva4uo0sl86ptz9omlj3u3mi9op7jqdg5xxwtpkanktdik5mylvpwew8z7so36lke8s5szo3lbsuw9mcmv7jl4z8v1thdo9dfralig059b7awjjw40irjrtii2wd0dwsl2m6e8cb13ilq8bku8x5w5f8lfrkv5fi2i1uc0oec0ffj1ko8rqlqvv58rfojj3wowk65ex09nyninmuugqyre89wos07jv4t69esyev9fi56ts5c8h7th9w973hac48rr37la50f3lbyz8ff65p1qlzqskdp2u90aau7gx7w442ofzt9i9iiqojzwbjcdm2wupg5sduczjbd8oqpu5s3fbzp3ndfcshbfq2c72x1arwctqehbwijs85pwre9k1miragehxyemuw6cvipojtbxrjvkjk23v3ryry6exkrcd76ouyuzpsx43gea1fiii83k1v8zzgi1cdpcl36tvtvvbakqgk7lweggi4ad0gv8pc4up7pm228np7h3njepllae99'
    })
    directory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'fileSchema [input here api field description]',
        example     : '7m69hlvgh6ppg5fm0k9elqimgamfqg54k05wzrsvayyr5hw634ow9hqbbe1d7faicj1l2ldyaq9t6ngu7zf8fahw9lhxviaivgnhmgqvtkr8d7wg57q4m3sidqtnk3373baxmm24uyfie368aif576qpdbhatv36cmx8mf9nvo75vlfdseo6hgjqscc99toxd35el34lfrcavsxtpna0x30qtcpc6h6z5ow2zooliye01wearvsir5mutg4cihlujnwphgt4sernzsb3txrso5veanrqi3dprffdjm13mqtqvquzrd1pmcmkq86kxrtw2nrn28kk5b0uj0niux6byz9z02fggmm1hmwbefcm8y2z8m7pmkq90gem6kbdmsfepabrhbcnsjr9xqcrq9esih8dsiw5vodzm2um0hsx7x0n8h90jhnf9cv1m4bapehfhwm0cduk7n1in9yz9mhmzt9cirtn1x6kdu0v9t34vokv5cn311cv1r783u8c685x00fhdfj14j8r05qdhp1lw2j2lnmbqabh4f7eu34h1n8gy3gn8i84l2c3hcusef3sswrrhhehg4fp24l77e3szxd09jpq86mca2jkjo8l0bu2lxeqeolfv09p4yqlcx4az3u6htto5z230qmw0mqkx4p23rat2rgcvvxcmbftxlm5xs1ljl5bxm38hqqzu4luvwi7k4yulvawl6c5xp14y0c639r0vpwd9vbpsyhkmz8jms45q6zi6ue3r52qlfqngv6xm6wzsu3i6n0hra1d2u1k89szpkayrrtjibf1lf9q2gwecj97m695f18xsladigzt2vq365vxvjvftquz1be8gwpulgku9pny0r9epd62jgodvx2ipz34xxdd6ffc2k5yoyo2s2r4ov7qcrf2fyy56cp4pv0r4udfii5ktdg1qm3u8q4vmcwazd44vtzhs7wk0s2c0fv356pf4jkav51enxtpnvly3yjactmvzh3bpyfi3j0t8ltpnbidms1f'
    })
    fileSchema: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'proxyHost [input here api field description]',
        example     : 'q16wkbwln4fctbz75p3mea06a634wfu5ns1xj7hhjde37naxoiis6jh8trvs'
    })
    proxyHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'proxyPort [input here api field description]',
        example     : 8420480276
    })
    proxyPort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'destination [input here api field description]',
        example     : 'sgvx4abu4epqd5moobgzkiufsltnkgjmh8pda5q09vzc66gtd83sbqr3ks5xq6d1739h6d5tz61ghzutpi9863vx0yxayxjdt56zsp8tm9w30nog9s35rflwhpsaefkmf6d3ljxt8bm5aifq9yz3h3j73iruc0hq'
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
        example     : 'lphhhlp4xr5f1mmgs1mzxy61lpt0lazccp79b6is8ys1e37yx6ns51eih945vdbp2mhjx0hdcat4a3o9h6qljl60c6vhq6bm28h7ljbwfyjgux37ad0gf856tjrllxx3o675oxem1mohypvn5mfwa8ts4arvakb0'
    })
    softwareComponentName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccountName [input here api field description]',
        example     : '5k1cw815fk9s6tatidnp'
    })
    responsibleUserAccountName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : '3fronofv83sjnpoi9hsi'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-07-29 10:03:25'
    })
    lastChangedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-29 10:47:13'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-29 00:41:32'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-28 18:22:42'
    })
    deletedAt: string;
    
    
}
