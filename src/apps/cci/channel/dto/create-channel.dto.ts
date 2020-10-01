import { ApiProperty } from '@nestjs/swagger';

export class CreateChannelDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '65b01198-a4ca-491e-805c-9f3080dc8d28'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'hash [input here api field description]',
        example     : 'li65sqoghlc7ab37jw57m743agw1m6h6q0hivnxz'
    })
    hash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '613574f8-e566-4132-8abe-583acd7f1736'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : '2wurv63h0s6ugrnnpkf22aqg81bjvgx6bw0bqy04l3ng6jejck'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '3fdee952-b453-43c2-9657-da6214583579'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'y2w9i5nwf1duvnm7o1fl'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : 'om8xo6l4tpqxs3rbpsix5qegp2dh9929lfrbzw1bmqi727yefm1hymcsv2t6pf3g9h9496uwr28zzn0lz9ece2oo4d66qhkdd0ovw36xalzd2a9xbtvd6xor6hjrhtru907ho9i80ntz8tkyxx95gbjqyshzxbn9'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : 'bcnk0db03ho3h0437xyuzprey83e1aalj83eqvnzbmohdejkv3pjx2dq7vwqj6pdacqtbgaj5ta0e0a0a6mfg1kvop3ex5qgjp2l0uweawtpi44tu7c2uznkt772jlz0avqhpxsqx7akchykwwjl6onrpzkv0lfa'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'yi733fnnf53pgqaut0kaqa0ob31ljg4uqwemxmk9sxby7ehf3vcvtg8itg68dmoo06gnb1diud2iauca45rgqomm2vt537r4wtiuu7dtu28d6umb05ws0gzl3vlinozp8ugegfn0ozzmc9l6aoyawzd5xs45b39a'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowHash [input here api field description]',
        example     : 'o2t9v7mtcnpvn9boa8d81d9fqhps3kyt9dz824o8'
    })
    flowHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : '47u6bcf4g275t6piiu96bt3edy1d3r8zfiyycz9fff9yy56mtgqm2ufzyynfluurvt9scx6zx46qj8gt2mhp2w3i6uaa5dke95r3g7e9yfmpl0muvx6827k8mju1zi0hyy716o4sqvsbfasi1lzzofgt6njws1mw'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowReceiverParty [input here api field description]',
        example     : '8f1ste9v4l9xtacygoj1fivem0ne97zvxmgrsyc75t2ro67j0m4pbswuph6j38bcn93o2twq3ow7h0r4bc3231ndh7put4afwbky8g3n4lpkm0to1udluhd9jc39x1matgt8v7gics23q73yizcylvcwmt795hde'
    })
    flowReceiverParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'drzbcpzqewl32ko2z844vo8ncs76uy2rlkfau1lw76jtunpfp8crzueqkqc7oect9xo9tsq958xc6qxq9hry1m6y205xt6z8rnmhfr2y5lcxtqxtqouo0e0sbz9mbq8jk9azearxfxm9814hsz17z9pnxyk60pci'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowReceiverComponent [input here api field description]',
        example     : '588d9urkq83ob2dyrwxrilxycc6uillz4ijgquup1t6m6ocxs0o9x4nz1nchgkp1dgmt9jybbw89gvrwzfhh7u58wbgiu6mowzojewm9wjcsgfau6qdvqahxfqwp1n8ynko8pu7swk3yi9she1zdg8susswad1sh'
    })
    flowReceiverComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : '9ts186iw0tf5fn70p7e01zr6ffp7uafgbem54qps1ige72wrsylon7cug6l7sw30a9wu9iecgt22foabcjbwbx2wlnzy841yn7h7brng09f3f27046w2h0yvlccliglkhnsbmn2mnv8nmdk4ynhr8kj29itqz3yj'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'eeey36chr694wp40v19378p97grva8kp5fo2gcp5ql57ifluq94jzcjx55q9uiazd1io2mx6k9fysmdnrb9d34vr9frrwmqmf31phcu0vi9c64rhpuxu2paebh96h2zvxhb4tsb50jz5qftwqlz1kjj6qauvskzt'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'sssg9vwnil33uhszmdqe'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterType [input here api field description]',
        example     : 'fbz5qpjt2h79jcaszs74nvkumf6hkcufb1vclsqtwc6ou2s4d2723uagjthl'
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
        example     : 'h1v96171fzcvr7my58us6f6fxjv244zjfb6tytoqqs1cmxg9qf66vidxgbq1'
    })
    transportProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'messageProtocol [input here api field description]',
        example     : 'nn34lr00qzthuid4nz8nyqkuskzi8dovpmmiax4hbud48m5azqsk3mrn1e7e'
    })
    messageProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterEngineName [input here api field description]',
        example     : '1rkkb7n7zat1uthe0mfecz1ky7n7souu3y993myhnoiee6nd7usm5c21h6mfz4tgsk95oqs73wjkkipbjv5ud1t9r0yqmotdghbut5wvc5czs51jc890bpfzjihfs9f9qamlesl85qtg0slp6wjjlz1jey42vpcr'
    })
    adapterEngineName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'url [input here api field description]',
        example     : 'o2ugzbg3qhpaiokl8wlzwjl8ztyfe6dyn0ydvnu1g96pswu9ypfghw5ml4mquw6i1jr906x3bz8lqawkwcnbs07x8oi8d8o4vik1cfxrgmtrvwlcff1jrft697mbjemtckxbf0ios4vfywt9n0zm03qc965wdbpy7czb63sufu8zzld83gqejipsa3495psxdo5y81b6c5belp84k0sujf0ff8l9ubll4j8xbyv8tq73k45iovp0nze75cu9fs12rse372s3oz3psd64im6720zldfybda66w180n194o01m9kzabf16delckedymjld'
    })
    url: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'username [input here api field description]',
        example     : 'yown20zjthnpuo1eiuik274jg0u5su1xr5io4vrotul8f1242yt1410cf97m'
    })
    username: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'remoteHost [input here api field description]',
        example     : 'm36mf6fjansf59a1v0gc5sfm35h0fybh80d2f5nbmodvvv8heysj92tohmh2j6yivxhhwdomcvbomion7j29zggslvpy49wgip5j883htahlaavbxzme6jzn77b0lo1jzglmm60gzg7xvwegexq73ynzg4oifjdl'
    })
    remoteHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'remotePort [input here api field description]',
        example     : 8953735724
    })
    remotePort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'directory [input here api field description]',
        example     : 'd4tnzdqzju8fsbr5o45dd8jfz5ceqx425j7lpc1kgvesxl0teq0j0lztm8awvmpt7vp43kmadg04a1jwpe64v6faktakrottzea6ovx6tn6s2irdloexh3a8uajojcwx355ucrktyoqpikx1utb2drp44g2fnym3rxrxspj4s08dqj8dunf8zlff0xrgfi5hu75mo0eyx44wdv7rdxv0cfzdjokrer1wswf5nx6cybxke7n99qpsxbng90ymiu2vc2c39bscdo0zp8777pk73rloygqhbbe96do8aqq568q94c80yhuyi81alogs1uyadjqcvqk0kolj9imempbdoyc4j433f2ecqerjsbb6tc4g7ra6wpiwln1t69hgcp0jbdu0594ie8v8vx3hf8i4nn0t581wildydzsv9k4euv7b9u3akv59xlalrf457huw3nk0zrdzci1nyoh4fzo93qa0hx6x1j5ycvm2d3hn0jyfwq6kh8b0c9rruwy9f6ms4p58auuho7qo1snh1kx2cc6qlz5dctfaik8uhht6wcak8d5vgiwp566m5750xstowffxxegmmx39jnwz1v7syl4juxzvw9jk7jml7dtrtczlxgbtm6jqx89wck0375obswohh4fbbnhv8mu8kc2akeq2jn5hv2lqdvxmaa4t6ytj9q7r57fv44bti62g0l6klbcrx0jtnwhjabkrgk8pe2e89rw2anc9h26yv3v7f88dlitgb90nusbd7hs3jdel9dty97jq0v5fmfsh6y7squh8ah5yg8iat9l63mdgs156q3jybyj4uq2auvhs4eiw1cao66s0uooe0py41cpi1juu9daba62hd8s57tawkdj5a88be8h6stu1y2avvop84h35u31b0gohil2qb7zusogtwqmgj7tlhz61kdxk2oe0p1xtuvscx3lveu9wgdxy2yc6n181or4tbawd9fk4svujml4mxzuvp76naoqhrdlium47um20up9sh6umx1nv'
    })
    directory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'fileSchema [input here api field description]',
        example     : '8voggh25e4diharpjir3vd3qb12po8q61h5qwc2lmt38uhnuqpx8jbxiksg38k10dih5ilfpifq5ialexwesm2ah23869zy978a8sbg3fgiw59tk88k1pk6ial1k9d4zef9x5hrtp7xb5wpyeytjnen1n8c9nd1bqkr0nns91kshylz93k43w7bicw1rn2t0hdy8dugsr9am357ddogwjq5qcjkfmqe8fyhaw2qppquo9348c6h9yig4nn6yfythwwzmcusu5u4vrm296zh45lmrdckzxyk3uk8ytbv3223ztpqc1ammv7mwlteqml9x35wziomtf31ojar3bmmpavevgkbhv1y1690nl5sgmfidbj0e1aorcqo4zclhllbao7gn558exd3l54prs0otwdkmyxes77z17umrdf3v01yvf9aub6ozp74ert9n1yn7wo99he3nrb7s4s55zskww2t1qyz1bdqwmbhkpejnzt39rpycpxk57n91j1qyt41y5n27yzb7kxicmxxcmkwcrssri1xft3hgs82r1dvriknijonnxynoovvajokddgh5g7dl23hr3j68mbd4ww60h5eqvsfxloqofew5lio13w4x0lwg0gsk2pcapoymze1kidprn1nmjv1u6xaqj7isxy6e6uozqzl4yxeng6b77a34twwwm5xxnvlv7u29vsug0tzxh68heym6ws86hjjgrq8unzn61ji0a3du3p6mqm7xngqhavcjrmg7l90yhi39g7nlmqobmxrws9uzqx3phu81wul3ojez2p7zro0uan3mki4eprn4p2aotxs4vy1mekzzzygzxxzskt1q6bmncq525m41m9wy183sp9vvosm7k3zurhmz22jmpkeftsqjb4diytx19vipibd8uyhrf0eqwgvgqdfh5ryogc0ezb1xlqmbsglb3988jy17sc25lbcht7uex5b73xstqb2pzomqzjz7hb59qbaf5jh8zzkeobw868lmqnhcvkqnyomm'
    })
    fileSchema: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'proxyHost [input here api field description]',
        example     : 'jbtunuu0ia17iubipmetsqp7zpeurqruph1b73y02jxp5uomomnkl7tpbukk'
    })
    proxyHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'proxyPort [input here api field description]',
        example     : 8912527088
    })
    proxyPort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'destination [input here api field description]',
        example     : 'hhjkjauagxodmu1ocqe0rc9bq9jmadn75y42t5xkyhtfgf07amh01mo5p3s9zj2mn4hc3qqmqsn4yhm9ihina9qtvyo48e4refvvfxpculw3zrdn063arnopcrfu978yu52tkr9lodanblbppqhjvub96va6wlmc'
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
        example     : '91axjh5uqi690lfi5v1bytpendquvjqrt91hji3i1xwfdo18c5yo41niw1r7x4zmq9ylnpclxa4m3qo5jicfw3d49ct1db8x04qswbjka8utch1c7kaxseeziusl8l2g2lbk3vok9bbmvst75od37rc553fhjmzt'
    })
    softwareComponentName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccountName [input here api field description]',
        example     : 'gtner2f9nhjk063llrbv'
    })
    responsibleUserAccountName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : 'obedq3d2l7xvwtirvn6p'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-09-20 08:19:13'
    })
    lastChangedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'riInterfaceName [input here api field description]',
        example     : 'lq1ic9atn942j0v2x2nqpix500t6fdkjputgdhgru3kh19xtnezmdss0oozc7vgbavwtak67gol624xg7ow8gfwkhljrwm6935u554o1h1w5aucpq76ea7ruwv8gj35g80gxgu1bhh6dzh6rivd3gmrbo3avhhvw'
    })
    riInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'riInterfaceNamespace [input here api field description]',
        example     : '8nrftdt0qal63nzyrdyvsfzu00hnuczggzc8e2kw23tl2d22wtgyninv7kfd8s9g6t0wmdb9lvhxyddbmz0aesz4d9z1xanm9aa4q50nfcxj84ibn1x3m3fnwxod6qtcvtz4lqixswevf8lj9ta1qginwobtxkpr'
    })
    riInterfaceNamespace: string;
    
    
}
