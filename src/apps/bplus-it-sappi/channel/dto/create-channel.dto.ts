import { ApiProperty } from '@nestjs/swagger';

export class CreateChannelDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '660772cd-dcee-429b-92af-5ff08474e25c'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'hash [input here api field description]',
        example     : '913ffmy86h01qcxxzzwkgz10ap7fgzog6171acwf'
    })
    hash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '6ea71f6b-0947-4dc9-a586-42bd86710713'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'z1ceq52atmr5krqu363pj6sj3qxov0rfbu53z8blso07jygqi5'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '28aea7bb-5ffc-43b1-97b5-83e8fbc44c7b'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'txgv27ehptmw2hsytar9'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : 'ocshmeyu0wlic1myiintzuhq3sw1v3by4morag2dsh59nuyc6pa7puah5fymr85jgd3h7ko0n4o6k8leflok940nn3id887qog84eb29i9awueg9ph7z1xx23tv4br1flrfzglmtiu5wmo4d203i2fsdwrcdltjt'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : 'npyonft52rpl6ww0kaqnakr7iu6l6kgqwhj0aeq9ezcm8p4hkoj7wotz01m0djpjb12fhqhf1mveteqof7wx6ueqa5itse4vjafc1naibitavxcacum35dsgx0ixcv5pl6taplw45p7jadviixwglz8n8n850rnn'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '8gslzicygfmkf65hyc90dmhts8lntjh4pxhqyg1cw4wzprnnltp7mfszvf4anvlz8cbih1bw0xfyf8djqxfqwo1w59wo1cqcmqoymqqb5burl99s74z1meombqlsmreipthignxhf2peznh5w3fndelfvpt315t4'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowHash [input here api field description]',
        example     : '1h51vcudtphloo07sk68l7w4pbpmnerq69elltq4'
    })
    flowHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'g7891jzrznnxa71tmzrbhhfn1cbn9c6qw6omlopbhsg2dhin0toep1koo5npcuoprt8bs5dp887de6bvviliar3uki3yf4lyq0cvscmm5l6rtcqc3pg36k0ogpanmkdj4zmioyygxl2tldt2q7lxtajd809rhfh4'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : '9aczozyj1z82dbh7zixm4eiogpbymsrdng00m94ikx067ft81bcvw2zsol5yul2vvoqtr07n6wxhc5ihgduvrmm3lbdt9eqskvo52pj0ajxaek1fnvm5b00qwwm10r8z0l9ary7aqzei1rqaek0940z34rclg6u6'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : '3neo0wshbj7wfllinrf18kc27phe8bh56elgo0m6jqwj8mn8hbut347k41cl2u3wxgypluh046hp308xtyvnp2cyzt5z15rwv7rqzg6nywdzh3zilyh5cxhgmuyb16v8aau3bhllz5dac8klxywvvaqe07ps0u97'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'xbfuqqgc4hozp59yl55yf9aii36vmngzu5ily8j5brjlrztgoj06p7j50rz681zx5bckfktdop0o6x6akq1xf0ighxt4zco8vhjdzpydweu9y0001l41u0vgzm6cnddkvrtms0h3hcas92l0wlzmlgcne6kit0sd'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : '81qpfbvuq6ml7wo1weun'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterType [input here api field description]',
        example     : 'lt3eoci913w6a2762gisdbntllo8629v979k5zl6bbnvqcpoopwx8n7di501'
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
        example     : '4aleelvea1ykcmy9yu587571lc4p00o4grv3rajlbffgy1nu3boyh6t0nbv4'
    })
    transportProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'messageProtocol [input here api field description]',
        example     : 'lmv5q5bjg76hcf3ahq6zjfmrm2brf6y4eaom1ul1bb4pbj3lkjp72ouzinfl'
    })
    messageProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterEngineName [input here api field description]',
        example     : 'lhggreh2fgm8fgpwpicy9c7tdtlw7tv7sz8s3awkxi8xucrz78yp70xeb94iusmfjhttc66q3jz9um9xc1v7p81085mlrzyiirquun9bnfx1hwbn7t3s7mxs482pjc40qdhh3jgh2ycswekev1s78wi5c0yqbrxt'
    })
    adapterEngineName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'url [input here api field description]',
        example     : 'dq5a5r9ie6f1lg5cwocxzl283vhxazc2ya5s5j07yehkjha645q1r1883l44lhougowleo7pesr52j4uow4egdygg3qc9mj85ue17c01ouu32s52gmazy47dywasakvblccixfn7yebw1vpeqjpb1hpzrgrwdnfn2ktpmti7v0chp8plpgemlphf8o8ltr73h7fdgjs2nkk4mmi34r8ckugrqdtjuhjhuhc2xsgn0bt57dph56gqx0c5c5a4n3tw03uwzqa12yf1i9kfwdvq2thrc2q3j3fnjbxdnw9sr7ang06af8qz2xrtiuz31gb7'
    })
    url: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'username [input here api field description]',
        example     : '2buv0ftftr3ow9n1fkz274lvhhaty1o0trka6sdxtjndzov6j4er3q4pqxca'
    })
    username: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'remoteHost [input here api field description]',
        example     : '6lt11n8p2x2gfciwabe42psowkejuwy2bc9pqq47araaymm0rsg79bklcn27spsq01jw1h4cmtgvjolzkpi7yf470cflb2fzx21br23u5nyg2dk34g74xxuh9l9xag1bl69m5pq0aava5rowo9ifm4jzwwanpez5'
    })
    remoteHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'remotePort [input here api field description]',
        example     : 8302396126
    })
    remotePort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'directory [input here api field description]',
        example     : 'm1hkpsraq9orx0qc2kovorouscap9gpg8k28ar27hco4ldwqnthpv8hcq1h6bkh3rxse0vfrsod8ngeaxwvo8n8ncqxmji8w2plajn4mis9vn8my4ihoh8d3dvyw275thov62zaljmpugz80b1oh3vkwrr6euxnpl7vx72d80au6fm9w2daqbind25h2lkeqyiwv2fw93s8et477uchnpjtnrpdtdx3jxjc8m4j49ik0md7ewhlgnphhg938gs69aon3vd1raxntzvwweo92ruifbbh6cf6otvo99wuyabcxcg7rxm77e4kqixkzl43hdip1a0lgdozo0uwd3e24438imkhamrvrrfuge3fjlkut9rs9h6ug82jf1jo7pc9qoih38jcy2rh4is8y4ul6zjbtwlz78xkq9xj0foibk1wsyyw75wmd5eybd188rucmz4zd9c8etqdqzn94t402bmjx5n2zexnpl9j1atuewvjo6kgi87dc3qmkwrcrg11qvetou8rbwo97f1z7jtl6qevmejblzbqn3h07wupd9zmckariu7wcblheeu8z7wves87jmv4a15dz03gqhtnhw4aw07o4skzbc4oy09c796dd9qgw3rnpnssw3xfr47a5v6boijdot4jngmr3ddx1rxyvke4xfijvnb7rq9ld9gofpv75veymjlx5ksy24bhzvm3vuxtjlhg2q03yy7j6eyd8bngwb1nodbuf5vhatap4tb53fpeijjy1ya0ay593bzx0abj0dy5tsktegy1mf02jl54u0ts2kjx1hjtc51pkut7h4s0mbzek9t0otsxqehktbg6mqaj0im1s7l2lixp9nrqrosx6m6i7mn4z00y0q3p36npaby1ogszt7mhllviuqare2uqahq0cdasozy4vdflbleemeh1jiprocg23049qu326rlsqht1finduvt5j0gs42bsrw94wbllcyym1stxhk0qziy741qamkyihes718tk7ewb3108mofsh'
    })
    directory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'fileSchema [input here api field description]',
        example     : 'nezx109vrva1ybdgwavaz7pilrbtn28u1a42b6njoibw9f7ijrvrrupl0lh8tuycj6vm7mvvkaq3wpi7c9r0cid7t02z6o3quecdqeehecy2aw7z04obm3sdmu4bexs177axxtupdulud08vl0yt9zbadbbdezupggougs0ep8fu3czfn0ab32qar3f0x5snyvq9zupos7y2udhzc5hve6ypyqcfw2totfajep0tp71h26rxnt4o749diwlv7yyu4dfy9csicdys1qcvr9nm3dymmm7hytdazk2yywzssgbpu8x9e08l3ajxe6is8ja23wmeh72ijsgw7yzmdg143u86wioaw0p42bfpht54woj3ws08feh16rn7ibipo4voii64yvbc2egpsi9ga3y6mfbfbnn5o5yhmbfgcxjkg0euq46irq6p6o5dhhpi1ar0x7aykdh1unpn6t7v7y73qyzq894oht78he4kdiwsfmforgwpu2krzq762t89kk80psuuqyk1bdvdcccs0sz391hksnpsrpm74uripapgimp8fgnqrwuedbmzinbxzewvgqt977bp4k54qv1tgylrgw137nhcg37fisr3n3kqis1gectv85fkssansk45uyy6kwk44qakv3j2oqvmb2a3rpoflruvhjaont2azo208st34b940wqzi7kjrtmfn8p87zc2dnci2e35944axugi3jdy59tjoc5xnr9eoc4dvktic8fyhew5tvz17h1n1v22ni4wq9752e9is5pe3vfpcc0o3pwey8tkhz5oifwwapgrhc4hvecuadylk6wauusnc1fuksxyrngzvqpe0u3f6af95wrp5bdt9izke1zvuuio6uawmicp7zuzbng3x5dqetpl0nrc6sybnpiica8kr8libic7qaqiz55hx1kis74itvw40xfcl2p8gsg0oiebfsm74sz0405wbuseo5ncn7zqx8p1rt9t3wat4epc3rozqe4ruwqmp7feig2l7vu6'
    })
    fileSchema: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'proxyHost [input here api field description]',
        example     : 'ljisbznj3sh7a6hkw2nk25tle0q5oz5242b26l3dswqoq7tpjdhhq6v7ihzy'
    })
    proxyHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'proxyPort [input here api field description]',
        example     : 3485170080
    })
    proxyPort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'destination [input here api field description]',
        example     : 'jo11fuo53iym642hjr0vd7i0pladmnmpt5jw695zy48cq3t7ecazfp94sevlso7r5pugzr9v5ashf1vyv47r57ii2atsd6o7s7lcte1ki87ipswcdqdnspb2op7gzeffogvn94mvdrrggwzdl6un8nrne6mqd14y'
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
        example     : '338lgrtasqx7f16zf42a121of1o5ipi0zj1ddd72ftk5emhzkqlj04a1ueefk1mduxd8x97cqconum23v0w9uis5xon035o9otondzymvx7a5lc7fwsfuy3vmn212rapd8mlolpp73gach7ec8ll2kh9i58kk9pl'
    })
    softwareComponentName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccountName [input here api field description]',
        example     : 'z8nt566joznr6dvf8kiw'
    })
    responsibleUserAccountName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : 'h9wrrjwr4vcl3xhu2nim'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-08-31 01:06:33'
    })
    lastChangedAt: string;
    
    
}
