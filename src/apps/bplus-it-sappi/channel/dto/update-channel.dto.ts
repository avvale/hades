import { ApiProperty } from '@nestjs/swagger';

export class UpdateChannelDto 
{   
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'bc9efbb1-2b66-4f8a-8b60-7125694e1a40'
    })
    id: string;
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '5e09071e-30e7-469e-b7eb-2b7feb8e33a3'
    })
    tenantId: string;
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'a29ef734-eaf8-430e-b44a-b57db72ed4d8'
    })
    systemId: string;
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : 'pn9tp2bjazcq3o1y094mv330zcn5s1icxj4nb3le56tctwzywxzwqn7csp56dc6bxej4oa45cf24qtdq637c890t9rfjx1o2km97x29kaxl02uzijc33zwx34x2j0k4kes2srk2prmsva7352f3fjd919eibibta'
    })
    party: string;
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : '1z64jg3xr0j9q8la6t2tqu41ph6w4yegjlq1mbrfsfoza9xu7s2ph70lxua3r9m27ombw8icfhc5qfolr0hcy5jgn65q67v9dkwcdzuba92t4qgbg6bvchi0t0gctj3hb4zbwnslp9pqp9g2dqhfuewbilw4ibvu'
    })
    component: string;
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'bxwur5fomrtdqilzlsepa8slru8wzonuiahoz0hbsak81006t0c7ctubntmuc0vfe27ilx2181gjm7p86w4okx8qku18y2yxxs25nb6s0f11navetcb43azuobaa8ki8u9gyebrsrkgskbmwg11sarwy0m856brb'
    })
    name: string;
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'hpudk213s780yhkol3myjfq0zhc74zun2gi5zbbfikm9d09tz3rzh8i2v43pyolul33ib48pr3n5j0358nov6m4hpuhy1mqic7483ved9571cykxqu4xd3rae9o86t0ssgvp1pr40rywsto602xyihajp8quyg6u'
    })
    flowParty: string;
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'g29430rqcb88eqoz3won0tt76gzlt4e17poolrgtu6v1n79waeapyrmlpjpdvb2b95l81xgs2e1pv0zcbb2l85fo9imwb2n7silelr3npcygymo4io2g4stnenumjo4is5kuvcqf1so4xrt1s2y72mawbwwzipfj'
    })
    flowComponent: string;
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : '29p9j690b1w5s0457x06du6cadwpewrtcwjt5q3gjo1dqus13ovu7o1ynts5fjtw6ry4uou5udhftzftf23ralh05ag5afius2vlsstxif5vlu6j502t8gcfexlvv4jdfk4uuuscdnkg1vmhf6xcyw8fucpis97b'
    })
    flowInterfaceName: string;
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'au7isywn7ty24eiya63kv2rgq3ggrc4x13b7dgf341mlw27ctsv1aws8jl1peipo4ykgj0snb46fyqkfutcifhuo3ecdrqyyf2o4k1pbz1wq9d61r9jflvinqcj1x5ve52sjmeuvo2ndgoxl9q2rhempvr1rsbmx'
    })
    flowInterfaceNamespace: string;
    
    @ApiProperty({
        type        : String,
        description : 'adapterType [input here api field description]',
        example     : '406yplxj4uxxwxkvt2ocy51ysq4tjtg7oni1kcg9u5gsig13yi0cl4sxjkxd'
    })
    adapterType: string;
    
    @ApiProperty({
        type        : String,
        description : 'direction [input here api field description]',
        example     : 'RECEIVER'
    })
    direction: string;
    
    @ApiProperty({
        type        : String,
        description : 'transportProtocol [input here api field description]',
        example     : '5iw3wuumygh2pkc3quxiidmt9fhqwyvplk6va6idkqhnn6tzdmb194rfrwuz'
    })
    transportProtocol: string;
    
    @ApiProperty({
        type        : String,
        description : 'messageProtocol [input here api field description]',
        example     : 'hyyef30c6fa3xom3kun03xys72c3fyqcjz81fgn68hhyufauzhmn1syosagl'
    })
    messageProtocol: string;
    
    @ApiProperty({
        type        : String,
        description : 'adapterEngineName [input here api field description]',
        example     : 'pokk61iobre8i21knrjkelg0l5r0ozoktjzeav58bhqrzmi0ejuv713slo19bqlo3w6vrvwd0f2t7qhtp6w9mtki5iy9fugcg3puixnpsruu4ovavjribk8p1tpasl249dmb5raj738829q4zvbbq6p4z1h4iioi'
    })
    adapterEngineName: string;
    
    @ApiProperty({
        type        : String,
        description : 'url [input here api field description]',
        example     : 'mg3cnh25o26asxd6t2pum7xhfjyi9p2tc9wpbrdmb5s6akibe9yakmhne550eoet86p5m1t5v7fpyicbxx011p3qvujqux1tpb3d79gisogirkbxu9l183cwfw87qbzeh7qtmnjjeuevgdi73bw0gn05tnl6c50wmn3c1lcvsmfgr2n6fe2re0f6xgxkh2mdyrkpsjb952n52dz7kfaqg54ne3hkoze7a6se1ogn0hwkbr560o53t3qjw5aved1dgnay5p2pdxt0e58ae5s24pfwkdp2mrus71n8f6slqzq2s8pyfoj07cmltpkh1wf6'
    })
    url: string;
    
    @ApiProperty({
        type        : String,
        description : 'username [input here api field description]',
        example     : 'vejz2tbdiqkin7gs0m4epme0xg67eta80coybrl7et3977abrngea37t3kxk'
    })
    username: string;
    
    @ApiProperty({
        type        : String,
        description : 'remoteHost [input here api field description]',
        example     : 'uxmtw4qouznbwp37dgyh9bhutgelqh98hfga0tu7hz75knmwwdn46zr8wd2j4byw9scj6vusa0nbntichms6balhrsp2qm7b3mrdixijv8jnkhlp5wpstt12wqeaqiv5uvsqn91pybbkz9nmo2ibwnafb5ujelny'
    })
    remoteHost: string;
    
    @ApiProperty({
        type        : Number,
        description : 'remotePort [input here api field description]',
        example     : 8471907380
    })
    remotePort: number;
    
    @ApiProperty({
        type        : String,
        description : 'directory [input here api field description]',
        example     : '2ju4ownn3026tyvpey81qphpndiy7o3ar93727gwqlwike5aifh3tpdklnrogqrqa95c5pljb728w65viyh30brqztt6m09ci5hmqja060urgwipap676qhjkvhn4vgwye2aypy52uiwbb9y2mnrwhytqivcq6d5omovxvbsdanoptdc2ce61vpoohy33i2rhogk9l01z4aban7vmw580mwgiyrv1oqqzyy9ybf33n21tv4t4gtifarn7tnaynnjx2rtny6eh2got75boio8qmzixhnd3u05fh5idue3u3ctcb8mecklitydbfdf07pmkjmk2s0c8twla3e84941vfuq68muxj6d8ddbm1tia771cbo4bmm3zojk8ub4g290cx1a2cfococfxu09g6f5jde9f5wf3wyx8j2ft8lpl20tloi5rr322qrogtk0b87ohlqvvu59zojlnwvmbqgsfuqa1kuftvqs86jnvpe5nwb5uk8zeityq8pc8ykr4c9t0gnkefwhe348jski101argtws51wzztxgz2m1d514oyk1wjqef82mfj7y7gmozr8as81m92qzjre7vl1zlj7or23cyawk5aa5sdpgx8eilxkicceonz2xisqkju6qyx6k8cplv4ctq0i24mw392xqa2479h1ryt9g7h8v0gmaq2vx0rorx808fa90y4ox5mr0umin6gz9rynlldhsho579njpsl0x10lq8fa2tf4b8t56kglv4pdzbo6sc4o7xyn9oooo23f7hw3nz8gqumaylrmcubsfw71lu6h3wyvmou6yd6rhxp0ami3yy61ignk77mh36ykgqlvrhj1fd5tuaqgxrrj0hl2nyph1itmqsmtgbbdf2spi2051w14axi890w5yivxtuqawjz0q74r1ymrh87n6xsysrzurmt7toabeyatimbj54cg2x0r0nbdtxl92yy5ltjfwmwvwy0wvpnolw2mb9bdxq1dixwfpvgfacnkqqy4n4cm9jfhwpzc'
    })
    directory: string;
    
    @ApiProperty({
        type        : String,
        description : 'fileSchema [input here api field description]',
        example     : 's7a3n6inrs7hulqcvdh4dvdzy33lr61nx8ygag7oholjz3vdkf3y4udkiyxttc20tgqg7nff48jl82vet6bxffpnbq0tueheb59qm7w6ewed0d7wszbe6f4um3he3wtyctqxfxzw2x84hp323hcrx7vu4u65x4bcku01m4rxivkf5rev8npolmefplg5z97m1xgk2kgxgtqaxji6pavmsc2y1xv5czlx6urd785yvq6kdfpsh7ll2l6xih34y9cakiur0ipu9qodhkhixzdw40iqoiu151znbwnjm7diuwe4pditwulo5c5sei11thevl55ipvexvluu3sw9w95ovk4n5zxku7gqxmk4z5od530fu0bsmhnud8gu8drst3nx52bd9u5h8oycuihhc22ib0193yn9rg3rcy82gwx2ps7t0s4rt73fj3ajd9bu3lhnnzfihoutysxsw7seb6u8iltd805bjwwoovda4qsfoerq3x7vacdt1s3t6sej524pkep1uav8rx9tmmig7j6gnt5oe6pm1awiu5rep7s9ekg09exhvcuxqjpj588rdvkjc43y4nepiszja4ic9a5i5h4igqze39eumut1cw0nsx3qp7f5sgtm8c65k7m6cn6m8y2dok9r8julohooej4bgzq1bp8x474livu2ua5ifo015jksrugaw63g6mo83xtgw8e5bj7z4ppevaiwinj3vh5vmnbr3a7bzqku45kg20jtjjtbs2jgeo2vg3j2i8x2syitfqclfnrw35mxafs8o96pdjvj4yo9t8fbzj8xvjo5yzvn4pjsk8a3bxe8yk2begfsltdncg88uo9xplnztbb1tf4mmw5atiqoijn2ids92qocfzwhyzq8kcnt94atjiy1ihmk44icce9buapo15usfn3jofeazsv18znd6f32nwm4bi83jg52noohoxzeez3v1h8t6qq5plc2715dtxjnuidq7uh7rea3698b40zzlf1kxkbj9onef83v9k4b'
    })
    fileSchema: string;
    
    @ApiProperty({
        type        : String,
        description : 'proxyHost [input here api field description]',
        example     : 'liplzfyyl6aoq4hr4d3flc4v5dw7rotss2ld9kqn2xa9ifbvvt1zjblkcs21'
    })
    proxyHost: string;
    
    @ApiProperty({
        type        : Number,
        description : 'proxyPort [input here api field description]',
        example     : 7058270477
    })
    proxyPort: number;
    
    @ApiProperty({
        type        : String,
        description : 'destination [input here api field description]',
        example     : 'fzlt0glg954h3fhhlvphw8yvnr56guiyb2gu5tjqlqvgp2x04sr3ok5apnu91y646qrbg0jrs5iiryhbdbts800w16jx5f02pfj35wnrkf0naplavv3ii8x7l5p84pdewe5y9yetmvctr6eidde5mi1e7tqevvvt'
    })
    destination: string;
    
    @ApiProperty({
        type        : String,
        description : 'adapterStatus [input here api field description]',
        example     : 'ACTIVE'
    })
    adapterStatus: string;
    
    @ApiProperty({
        type        : String,
        description : 'softwareComponentName [input here api field description]',
        example     : 'zrttciymrgw41e5jfj0r09wdl2y2duqc6th8i601zxri8pdl85myajj1uduu6oi71372y62y3izx70omu4lmclda2w978hiopvnhdymmk3mgx5vfx823eaopfgj6ks5pdavlysj3cswfee0ii7qrlzx79l9ijmcd'
    })
    softwareComponentName: string;
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccountName [input here api field description]',
        example     : 'm96tuqeer3ril2te3lkz'
    })
    responsibleUserAccountName: string;
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : '2rdjj63n9ckh61z4xwx4'
    })
    lastChangeUserAccount: string;
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-07-16 21:55:06'
    })
    lastChangedAt: string;
    
}
