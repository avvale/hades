import { ApiProperty } from '@nestjs/swagger';

export class CreateChannelDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '2bcbdca9-66a4-4aea-bb97-f8b9a1d8ce9b'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '3a8e29d6-9844-4a64-a555-c2f31e8dd07a'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : '3rvmjdsabda47xt9nktdcdq6yvctplg6i8t0w8iissbih8ppl2'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '2dbd59ae-0bf7-4f26-ad24-fecdddcfc5bd'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : 'vu9ppl7fbzks6b01obxnf1clx2hryxvrn2i1l1hhw0qnfsfh120v9n9sd49hdraklftzt80riq24ebgwq2ynkjukn9ut12sw4hqhefg89h3eowm5kqzvnhr25055w4iozavt7xgnwkckkkcnfoyx7wnovbialhof'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : 'rs7ydp4eoyr9at8wgcv3qvw3ba0au2zaam5mzendsc4q4ytcjl1v58rqj8y4iwt8w0fccxg6olk5o9ca35mc0m6txi9tad1f5omqx5w065bzgu6g5ta49i5atoiojgb8163asvb1pyoebhs9px6lejo4z961u4qs'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'x3t1xujq26xvcx77gd2peitb898ten968iz5bgu9poq8o39jivt370m8jc98pe7oxdkax0olnxy5wpa4ql7w21d3bes4f1o3e4tiipj8hv6gccku5l4olshbg70aptmoij4phuyf87p0p3xee6m8gqe21bq3ov1c'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowId [input here api field description]',
        example     : '0fbf68b7-c9c5-4334-8024-cc56490e0298'
    })
    flowId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'rd04pye5e9ornjh7uhbe49m2a3o127yxr2m4ozgs1wpdesdxvwugvvp0aob9z17od0zxq0iuwi386k0prczzubh0t53wt5af0eekic95e6ftwwq66v5mjij03c7vzc8b08209umfal1j8h5ueli29og9724gpopo'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : '1hb8b0ghhk5apz9026nwrw820etpvgzfar7eq8qk4jld70z65d1alwahs4ptn13oqaatecnzu3treqqsiszfa4st8155r2l14oigkcxrofvdcj16tuj5qvbzeo65c2uyxoiha7bpmrhukgnv7mw6wjvwc2d8igu9'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : '09u24vgdfu6orzut3zs7138puxhto2zxnsf842ytnh502elcftwrthcjr2h0xb3t5r1xwr2g494wnl7s6kx507y9ghxhuekwe19i2zvm71y9vipmuwtymxlliu5ye8l5r90jbzy65z1pkvtkw7d40m30m7r2vfva'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : '60skcj7icatun0v1mfndgbzkf27sgs44757rxu0pqtzaajbohtps2jk5nr81rlb667v0e7ntrbq8wpd5gw8unassky7z3fyp2s88pvn7s7sucdsouuaagavehiwdnesyl3xyzdzpu20pf3591tovyq74r2usjfz9'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterType [input here api field description]',
        example     : 'yjl48l2j72espor732m8j1iac5k7f5vfvxzz3esg9k5ojio82gl8mfm8hhdz'
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
        example     : 'lfbkh306l22rfve4tehw0mlsg7vivn37jv32u68em18afzsr9oxel2mkpyee'
    })
    transportProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'messageProtocol [input here api field description]',
        example     : '9ji049dnf9x1la2tnct6xz41abnhnl9bv5imevh3udvdtjrwsqcyh28i48m4'
    })
    messageProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterEngineName [input here api field description]',
        example     : '8hwh5or3r8ixsbb9p12ju82uz6flgejyo9713jnju4jzjhzn5djsai23ybc7ngndaiktba4vx9ixlkgb9wr2zn8qk9qnuzl0p2funrgeulah85clc3x7e6uzrjido6i1fn0ray8bkpzyw0k2j2bvr60thuinx1b2'
    })
    adapterEngineName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'url [input here api field description]',
        example     : 'kuj6a3nc6aa5pehubptm1n47xtgocbkoqlzh5y1706xfuqg0np54wqzh3s82kxiagl6ani77bzsy9vioqe08ykv4uafm3jq271mhhzj74v4fox5oifxmxifvfj09pjhqbct08anscuekoeyv3kia18zhvat2g5qd69b2izyiiorvktpbfofel2tvhkdc54vgyd4bouclkascyh3r70ncvjdl7hwc3ozfxhp8quuxvkn4m9dnp3nuzma4yker0zvrnvxz0kv9javf070k9reut3nlxsuw6ll0ny2zsop2nq95brp28qkbrkva7saroeag'
    })
    url: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'username [input here api field description]',
        example     : 'mw677uu4dflc1unbc5zzzovz8kotftkcw6kwf97ij0e01hp2ruphvh26i3fn'
    })
    username: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'remoteHost [input here api field description]',
        example     : '00h1tebqegtcjd9rtg0pby155rws7bxqwy2fzxcfzoppbyzvdwchmk59ybk8wt7kgsrbba295ggp96ug28nt1zxbwks12qjbonl2rpvztxbaimypgz8xmn3syhw1v7x2nfil3onr1s4stmffv1zmeptv01lipfy9'
    })
    remoteHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'remotePort [input here api field description]',
        example     : 4993584274
    })
    remotePort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'directory [input here api field description]',
        example     : 'v09hab6u7qvptbdng6fkencmncxx4hmv71ahcmtrqeabfznn7z3okuhodjvg63fwzmv58xl03ge9peejej4tb0vkd9py2ij5zkb8nmkdb39v5h2vr0dzwr9me863kkhy6c4yam0azz9a4nvfzkw7s73ay6gy2zlteavnztdxpdvtec7ev4mn6ielhttmn7h10ii4r2jecejsa4jal3avofbtomcszl1yyjdgbke6jqhclf12cfmyczfpahqg155xnctwmiulgaf2cqj1nxcnl6ppe3zzry8quq5p34jqi4g6xelwx3zejvel8swq1nommgw04o0m5gxwuig32074103w1i9akbvlg02v492imxt03l7mipy4vbdry1hq09yvg3d80acijs24csd6mmpzr7e524lh27fpj1sgrnvyb9etc0wzvcj7z6u2dzaygphyuzwh341a1f887oxbliktd49eo270km2t4v4vrro0esjmanaoiwae1pol8g54av31jmsp0rg37tc60ykfmz22ms9oc59d9wh0rxbh525op1pzkxd184ak80occv2cv96qdj0wilde4d3iaym9o4t1wpwow8rjd9zb0zkpfwxhgncqjufivcx1l0s4q3t9xnrog39saysj5uiw8t4vj9fncurdbrxslw5lmg8ym7as8e9dq0gi1vu09n82bciz4nxcyza6fhv2lz2gl6bxvsre5qc1lm92vj6ttxxtrlxg2y34lo8ao23ozegio71blkm8gfa0l687h4swbxn9ticj45jtzo19doyn6pif4la25lohyicamgypmr17l9rswfkilx6wmbho57e6p89e4hphh3mzuewfl3jvhmxalk9td02m9ld9y0v5079xj3ldv9ofokdpg75etia78cyu0q0nd26q3gmj5quf3n90j5e6zbfo6724orsqbyuxw4hp250j2tra7f9y1qppe938nkp6pbx4rpkvrny549gpbzgw33oj7bka7jwzkrm2k3w0wgta'
    })
    directory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'fileSchema [input here api field description]',
        example     : 'wljgekutjuglrd0xuhin0oiushjdwwc9k3t0s1gpkxex3t9vw8xq0k8d8ewahvnf7qb3fqz61ewzinvbjxayqv5m5e2lf4hi6fbtawh31h8ywlfc8n97txvutpdrfqr0s0rbcc7lzwzzau7eqm1qam8etv0s5nopn39sfq4dnc13eyig7n0m8l3krho8e0jl7yh9k1zyujbowsiwu5fi36bhyi9emzabveyrjhyqxiqzdz58v7gjdhz1pqw4al7d5x14bcsq5kpwbgrosb6v3uj6bt9sknv9esxzn0gg0hahvg3cckgdg1zk1h2vbjksnt5dhbc3pl2drwdclmrgkh3d52phglibxifg7t0528orevmh4v6sca5ke9j0zeaoto3xw9tglsmll6qvywvqfad0531slpha0mc27h84k5gm5mk4cyzzmb3mnhyltyfygucom2de8j2u609cvbz59zlv36m4jjz7xrprew0pebj9tb59bs731ghs44y6eyv1ya2uqiiexkwwbgesf1nwciiiu75lfrwc4vyk43zk0uavpkgvx0jywchv8df3dktx5u04m9m96im9biwm8si990pcbqqk5impzmvqqgrnrgnrv849bosq0xonbn9hsawnww39u2nxi89r0xcv500yzam0a2unix2t5oadzg415jrmt35nyves8ul9599wmg1zbn5vfd42k8wib0gdsc3kzyb8o5tmhuz2ajfyfmfqxhyt6z3b8b5mo4fodn2l6t7ibeg6k79b78r3o4vjhbzgyqq68fs2zzpteopf5i492g6gqc74rnvtez15yr4d9ssbhvzqkegspb2dkhjq5hf7vux4oomknyvdqbze04kgy8rg023863krmggxzcqg9kjd0nyx9okguvxz18rfa6iq27csvuf004ki8iqtw2rq0lnf4ar6x0i73xmykssjjiozen2okmvfq41ajw90fcimkw0nqajx8kk8e6mk5qzgll8ewb29uu8xgzoh1z5nfjdy'
    })
    fileSchema: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'proxyHost [input here api field description]',
        example     : 'yyvfgakb6qxpdu9ha45fz2m1610mhrqdrl7kx0nwgdzr4g5jz9fhr9t7zppj'
    })
    proxyHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'proxyPort [input here api field description]',
        example     : 7918888722
    })
    proxyPort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'destination [input here api field description]',
        example     : 'p3xldumxsgbmlk0uo42vl08be7t8ym7e75jy3y5cg0hruwyfn11ju0yc6jpt6t225oupu29kr8fczv556fv6t2cy2w4dynsjza839wm23y5redaq7khcl362divk68crbx91icwh1vzy6gymmwht47enrcl4xai0'
    })
    destination: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterStatus [input here api field description]',
        example     : 'ACTIVE',
        enum        : ['ACTIVE','INACTIVE']
    })
    adapterStatus: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'softwareComponentName [input here api field description]',
        example     : '8vn245qg2t0wmnvro9kldst5h6ov50sj7pnv6fzlc66vl4gkj3bfatfp2ifx5of6kavmk5wawrxwbuermqk6b3z576h2wzm9unf2f0v5zxxh2t3wi6tw2eaccl83dhnc3axik5ti1osz6mq2oc1dcp42mxi17x8w'
    })
    softwareComponentName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccountName [input here api field description]',
        example     : '5y9uldocd8tb7rkna65a'
    })
    responsibleUserAccountName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : '0u56d1p1ev8xwqq0s77q'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-07-24 06:16:48'
    })
    lastChangedAt: string;
    
    
}
