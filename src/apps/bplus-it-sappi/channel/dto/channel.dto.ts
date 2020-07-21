import { ApiProperty } from '@nestjs/swagger';

export class ChannelDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '86104897-a469-49b0-bb4e-ef815dabf689'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'c06d84b1-8c3d-4989-908a-8f1ef53f1521'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '74c4b385-c908-49c4-8490-79460d8816ca'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : 'ndxreu88nwfm76glrk7ocadn0bl3iuvnzlofy8ms2w5sgiw3jw9cy829dunt6eae838zljzacx7tq49660gkdgwj1jbwd6xjaqt95luaf50zkalrc33qex4njk9m9fu0gismbdcyt91a166et5lgl10g8v5s7fms'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : 'gzd5b4c0zkabdg96ak9m93jll9s8xrsz8sryh13ezm3gb0xwle52451c7aldsp8yh0an18i0ir7epphdcz23l8klpvex8kubgkhl226r6nj7snv34u501goadll4xs9qfbhb48anmdqs27cb6d70sf63nf5iwig8'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '73eg63j1e3rktvhebtxa0z7beiazk43odss7kq6nk7zksauv1ma97hy1b9gpfak5712p258a012mu6e52qsn4virfgt3fhpx2flurgdo1lxk8igrryu34mavmz4wwroc5cyzs1wyx11cwz4vm4d8utwvvpoah1sk'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'lujr710xthg4h5rsq4bru5x5ehm55onpo7ti4fvme47ksn24q6dce8q390c4tw5hxs41cnl482il6lfxedlm74twb6jkwzikb8w3l2lrh83bfbyxlx3xknw65abdi9j0qxz97ebpw4uahbzc5scno6j1cmdiwc1l'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : '326spu5ai0nrsyb37lvvjtksam7dbb0nb445yz43q0yr6gn33ypswo77m73fhmm0rh67uz3nhqr7ynox9ggnprpecdq710kw2btp7cdsvn1tg6yo096gnn81smobebldos4rvekax2l132bz78vbd8e3hh6g1db2'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'd5p6eqg7w9t9vkvdl94lcchxxofokvs640zr5kz4xxcrmp2uli3vdjb924xmk524l33xryqdk97w3pj2r7iqefbtwcf88euzc5whojyjffa3jxe3f4hmsmnb0alljp0mexrulj54vz7miqe6ozercf7evgws6aro'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : '3k2y2u6lve4l09wr9rdtzfmbl5ta8udoxbaiklh6hai5pcezgfivu1ifaxkwgf5xdzr3ynzg2hb8n7e3a2kcfc6ouxmt0vn8ev2520guouyfwy9ag7kzj9wuu5m2tsoxoc2onl4k2tms2unmpph2uis6gdul5m9s'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterType [input here api field description]',
        example     : '7v4x6nw0ir1qa7qzrsc80mgbrmn4joy8id1i6k6f08slc9b5bqmt7i8clz64'
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
        example     : 'kirulbrufibzyszeq2hfbdb03i4d0geqp0dz2pmwiwdb8mc9s3vbajlqwnkc'
    })
    transportProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'messageProtocol [input here api field description]',
        example     : '2d8nivjniwqgt7pqrcyusyhb3ukncmvn7c56uenpsm502ep5q498pedl4d7v'
    })
    messageProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterEngineName [input here api field description]',
        example     : 'm2bisrnz63ozvdesy2umyn9h7el5vf6pdv61fjq59o6o1fxzbqdbu7ncz48giilvmf8434uxnxsd43xlfbu3oez4vc4f18xw1rgj2cyj806agzpiheg6a3uhfnm7hzeo0n5rk17xo00yfxajsrrdbumhwkhce3gh'
    })
    adapterEngineName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'url [input here api field description]',
        example     : 'dfdhqmz125i0zseidb1dl7s6pahltv1omj44mhrhcrv3dqtgeikroj8br4m2rk33o5s5vguojcokarvy2kyhaxj9iig2wjfwyxtruwk6cgey722mlqranpjqw7x08861dyalpxseepi1dog895kjes4snbplp3rbggk29wy8ftksimb7w0fkzk85kdp4010qp88qih65w0p16exkl8762ya9fh53htd7zmtwwjjiqmbhzk9lm2ttxid784ec8qwq0zvm9g5gqtbb083k72ylrqkjcyq0w868cb1pjes9qw149z49gx41uwvm0s2c8zni'
    })
    url: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'username [input here api field description]',
        example     : '67nrprqd8myhd5nbwqav2pgywidcjus7v6sl5czdgrr2rixfmynyw7emioec'
    })
    username: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'remoteHost [input here api field description]',
        example     : 'sk3d4nd99zkqq6jwdsvav0awibjqyjgvmvlx93x5k7n5v2xizj0zo02y4dqhf3ijgucw7t19ukgcqo4md7koyk09ku8ydc7ofv6vdd4ive462m7bvp7fwjcuagr0jxruodekp62m3j084k97ym7sxk7kjikt55qc'
    })
    remoteHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'remotePort [input here api field description]',
        example     : 4338741732
    })
    remotePort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'directory [input here api field description]',
        example     : '1ljve6k52e7838gxeegu28djmrsatawo9bsyycf552pa0wgmxi53rrrz3t7mq9k8dvtdt4klqwy8ozxiermzko3zp0408h7utv73ajvkx72o6ckpiq863gx2cb44jihvy9pvgnjm840s0d97tv8piiit83q2eev3xfwde0k1bbzuujmuwzp1qiob1wugtrxgopohza7kumd76qviykwuwx7j6l63q1n7ge2vx18qv9ojih3nuunt2sugtycg4xvrqnsaj7g5lrv5fsyz14yo9n5pd541u8c7nj39m4p1i7uoldrv7tuxao4kfw6rdbf08ei1yx7hm2afj8bw427jg49bcymlu7br1aqbhqznadpsurl2vqdq1k6x0d9wzveh9bxrzcem3jlw50rh32hbesd1pl56fhfp4tkfkvs5lqsu0x9eomaj2d56rdsly5c9pivyctqbvqsc56gm9yiuhfp5ff7h07ohwmzr48fztgjwkvg0yanbzq5kaadgugkkyq2wun3mniidj1flxu8qmsfugchp2txcn5ofdoy8ltssxvz670l13l7ltd9bt2zh5zqwm9s9w06ipp2tghf6k0mjldrocqynwvkpmmo55tq3u2j35626va3f6y44g7llt93vubvsijyylq5x53z1dkypbxxygbxxl632e0ho97ctwaofjgdboutzqxxwgdqgtyu4rav4hibynrfa5gjxqishlqa3tfx8pud2gtqlpkjz4bqjdsx42s3m8wh65i5lx46i1pmqxx6p1br9gkdot4ph194bo387meenw1zkhyd0tyfummtav12o1e7p4v7vh9phvoezzoovziiveev94399uqvzfjfls74hmzyiios1m8h4uy5pdkcg32j00x5g7r1p9g7frtkqwhjp967w357w6pz2lrng8zk6vo62cmu85oiuzvw0c9irbu3r8qkywmu04ee1k085ybtyxffp9ueqpnie0vyv9vyv3tkrgf4yee9jms9m2e3yc80l6ibr'
    })
    directory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'fileSchema [input here api field description]',
        example     : '2vcjf1zba6rsz330pkkg1huwgp6opsoebpxvuhtxccc9t36va4cwucx2ouhxs2r9201mreii87qtj68zyyx8njei7u28kjhftqd4bofglezma9ztbdxi50xxw51ng4a7k4oppvfpcvve8ygq7306njek5r7udmmvty53m6ujp0iy3j1ug8kexsxrua15oj97uxf0fuifpaie49mtfzmq80lqg5s17oqbrhkwp3bkr8b83rkgd0bunwsbhbyod3x7qfjplra2cv6koxpx6gdywci2dcs1bxefm49g8s5c51svy0agzc65aly332nwqsrf3vh1f0m8t7bxzti02jqhhlc8rboenab3cbf9z1kr7i7z2getye2ip4mnc0fgpe8ja468k9hql5h4rvsliff8b7a5puexe1lxbeqk83tg05f9ua36m9xbyzqxyo9j524h8p9elcpd16g31h5zw2pjzfhmq8rf8dsmzmvwr8zf7dgipgd7eu7ipur5qrw07af16pk9wfnscqnrnekm9slyf3xikrxecg4nsgg417pwexoycsjaie7q4rximl8m1eighia3guokeg4ufm1murzahxttu8eyyleu0ajrzu358qt638rtnmwthk0zwgflx8sxa26y7j0yib65mdbki4yij2xkurheaeviqb92vigvkoli3v25b91viusv10f83rcv06psfyrz1aacznrzq13bxuhfilz3xnddpjgn4q4bio3rd0c9ia0b1jjg3si3nzxr9w3quycvdawsy4gntrsp7567jbheknqzy3tmlimllc4j1s7c6d2kam7a5m6n1q3pow79wdop3893t02dceza6acqplpiep1z2j038qmfwl8we2xs1kz7labsmkbmgdxjr7y3jnwikjhxfmxyqowradq5mulsvifcq3q94fcyftw11sw7dqxskhy0cqva1bd89yszb0vvwhndcu6zog3xqmnlvihjzcwptak5r0pcliyis2n8zuqzlljgjxfg2lir'
    })
    fileSchema: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'proxyHost [input here api field description]',
        example     : 'dz9bmpqz64565ry74ex33o1q7ivluhk38af4n25c02sjcrltm0aq2u5bb2ss'
    })
    proxyHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'proxyPort [input here api field description]',
        example     : 3639450689
    })
    proxyPort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'destination [input here api field description]',
        example     : '3y7guxza54tmtoy01ghe1f0j2las019q2ym5ldjybfv3aza211gkw428mtq6rxx05a2ijxd4lscgp8zsznhmgoxjh05ioh68mmsb6q25eh48zz84qhbfyr3yu045i3toebbvztbchjastd6bkg3a2h1yiga8eehy'
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
        example     : 'v4v9y1aj6iycurziwobonnws4tk75v7u0j8kbjacjwn0z3j4y6g6doddp3319cq1b0pge4uvpeapuillevq9qjp7miq8jxxzlz2c1msu9pj3r04jzz2k6tmt6igrw4u36j1jz46a1up6ysrckeax545b3h0zwre9'
    })
    softwareComponentName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccountName [input here api field description]',
        example     : '4ievvtr29xlhhuazxjp8'
    })
    responsibleUserAccountName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : '1y4l1g1a7wkhcdzkn0dc'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-07-21 19:44:33'
    })
    lastChangedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-21 18:52:36'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-21 07:58:40'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-21 03:04:46'
    })
    deletedAt: string;
    
    
}
