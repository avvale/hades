import { ApiProperty } from '@nestjs/swagger';

export class UpdateChannelDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'f56fc17c-d8b3-4a58-b054-c72bcd5865b9'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'hash [input here api field description]',
        example     : 'yad1digyzhmwdorkbd4q16225qpyksphi77r2yj0'
    })
    hash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'e80df54a-9ff6-4112-9094-2d34ab64415d'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'n3o4iy3dzqyabpul4fwn16k1grxszxkxlay9tm3z2ztl54vbp3'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'e307b2d8-00c9-4fbb-85cb-bb3eb105fa56'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'fucydtodcvhgwhzoix4k'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : 'b44pnksm8kncr2xzeyhclmt3bvbibmyctqvr5gkw59z8hn2i5rfysgzo2mpbfa2qc36hf2q926pl1blh6jnuen0aaemw5nkh9vfrc21jydnbl03rhlhz8tsfhyw2nm0wnzuecrywdukmtfdlglufs2u036ud02c7'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : '31jp320f6eg12ojcf6keln97j3cd5x7yri81sf3k9eb9ynmm59xe864jp470d6qo34eomxpneqkkbvz9ppjauwv0ofm9l5nw57zlpntfd9b814hnu0cywin7siwdzciq6g1c9dnrwetokvy4loili3ivnq237m23'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'd71arjffaht81nd7pxz8hn2m1dkyl2zily9o85fpf6efec5m8sk7fupojb3uklg1a6mih86z233a4i8r6fv9wt959lntq77zu1rakwt5egt7gc8673fdypodn84hcwqnjuigu8bzxtbpz6spslfte5djo0it5i3t'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowId [input here api field description]',
        example     : '81f10235-4988-46f4-a5f0-8dac59da6d6d'
    })
    flowId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'wc2sdj1md0nm127s9y4vlbvoq569focqj2l1mgs4s9ir2zknk4v24lw6k53ix0yhhm9sw5b1oxjbm3c3i2dd41ldgrcb5kuezh6vfhvgi3zfx0eqdvf3e9l2zilrcet29jiv3pf7s723kcijw67ytiyvtcxufcb0'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : '7atwv2fk4u5hhc6y1sy8vzjci9els6r5xryespdo9z63y1so6q59dyww62ym23z8rbzl3msivoqojg2zhr2mlfn14jid04uochhz38jr34g2smdodf0wqrzo45pdwc5wsa2vwlvol4jkht7x60qxvk74locscto0'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'sn0gns6xodtwlvdf0hm7k7mcxcf8bbmdy0wipmzixi9vy9wm13thfjp0f76y7b1k0oqes6qxnzt9cbh3rp7x6crz8x0bu9dlxhtey6qg1f6xdvqe67918oz7w082nof04793zn268lm5r3chrtm04buedh8ovmo3'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : '0dm816cozd0013ci99hnctjlqmu2g29mr47xm9ag28t6lp8xnq1hczmov6qtfjczf00iyaojoru8n41puma7oz2wxqqrjaubux0cnb62u89nm4mmq4l0mbeuwdmfd8gqysj5ksd3cnxdfnu459bwxu5ijk6ugq4c'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'vtzshbdbehhqu8rutofb'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterType [input here api field description]',
        example     : 'cdoglwa8cv5a6a463fa7gjjd3cl1voi2tj1fsf0xv48jpklpi7pmakq9b003'
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
        example     : 'd87qti22se33qu8esl85jla61ls9ql7d8w62ctdxpn2z7n247kawguii8uqh'
    })
    transportProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'messageProtocol [input here api field description]',
        example     : 'ru06l6opg5ioeiz0wo8uv4i4mp5f097s05977rgwnjuuiguj9o8xz9tvqyto'
    })
    messageProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterEngineName [input here api field description]',
        example     : 'oqvkppxht06aexznx0740xi0hxa6e5fprvqed8o38vxohzvot2f332gsgg8j6k82f832x7o94w2bdz1fjifeezbze2vur9x0rpn5druo77doon5adb26yls9wrpe002bx6dksl9ap5e2a9og3pfjtpxlnzic3xy7'
    })
    adapterEngineName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'url [input here api field description]',
        example     : 'rup1osr2dkjzs4dzdm0quyht75zknre7at4y3kb88cu40uei15gdkq0m6v22xkg2cbgx5tbqwrjwyfnkocqvf1m6msdafwhqylr20ro74vbqk786rigam24e5rh92m7me2117lt49u2xfwajqnc7b0xph7j1fcq96fmt3a85hdyavd6jgzr046ctx4kbad1ep1oatjxq66gi8v9e8r49ebnlkz6bf4b88bc2arms9enqqc2cthu6mh8e8jmh6r7qr218jxokmzkmbzon5zpryr3lnf6m31aiy6nwiyaga9ra5edv5rtivs46o0a7qq3y'
    })
    url: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'username [input here api field description]',
        example     : '7wjdox9m6swouw8lon6ojwhbug7f3l8z8svo3w8d2ju2ycyi84dcmq4tefdd'
    })
    username: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'remoteHost [input here api field description]',
        example     : '055pdcuiuk5fpo9zh3im8h3yb5owhof7r3fnvmk7ym488zm9bjuurl18ips9oqiglkd1db4w1lkfh81cfiyiehup6jbbtny78ew3im2itwd2bxiitbufqxzon69pp8cy36a3xt9affmmkbj8fxv0hhw0r6nj4iqa'
    })
    remoteHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'remotePort [input here api field description]',
        example     : 1158130635
    })
    remotePort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'directory [input here api field description]',
        example     : 'xw64rlabowtf05do3j0jvu22vzfdqi3mdtalnsj6pzw5c3orj6nz38jvv24hd8irg0yiwhhl0qt7fa3ei0984ceniriv830gtns4c26ezthdj3tbjbms8wpexj9fitczjpuy9nta9rgrboxcpsmbmjfo16fcej0211v57tesfgdxpp0o0e6ycfraaub1h5ds20rr8a6n69zk5diityxy35tmyzoa0r0qdafjpzscj1zyr4x4uf92uouq6eeztlvculjh69tmkdis88j6tzlpgh1bgsb2d0byflgx3jwlo1yslm0jzfs7ilmr0l6gkbbtw5jl8b0nxsfecklwi4g5hcg4n9z6pl5l7kc3cwn020yi4xh7cxd3ab4ab8bzbrasnn6nwqc14vjfbuymz56iso6idkghf1rlyfex1j1qv1w1yhh7edy11qsw419f9jwkp9apfvgcf21e842ykts7jziw5dacz7lz43rw4p78jo9sdphzfdbdmh97r7a81mft5dply1nis754l71l3f4rxpfwe48wr9wt27uvonq49pes18vke9pgt5c0ps9umugumo47863k862c0qz01goskpz20glpikgcaa2m4v8vcan0crz3dntxxrve7k1yhpcalb0ckile5vqt9bx1jaxiafakknbx2ryvp2mtacc0vqxw1ymu0vqp4yozcexvgiuuyfnspcidfmwzglz40741hvg0vkfzws2gxb7nqc4igytud3fv6ii4uw79khouoydvz1rlg23cf25cftnlvjizlvjvlf9pyap9p40k7wc9nq352f2lt4n1hog1qa4qbqh39wlx7k204hq34eillsw1dh5dzj9oi4nhd5lfkflf31pw0vhje1idcg8a9nwa36camh6jpwt9okec1dfemlkjgbwosxi4ifbk5hsl4y8ulo2j8efvkchxglvmr5kbr1vq6h480dacmdu95b7qojtmkvc6d05mgvssnbjahimz2vqd3s00xpj0fd5hpaqm27e0'
    })
    directory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'fileSchema [input here api field description]',
        example     : '3yzyitsok2mvk0f84dl30y3wou6s3rwn9quix0b30k1nb8w4j6wh06j3f5o6df2h7uxk3fkjdbcwh0k1ub83721idh50hysmvno32os12gnf1cusny8e5muzhmgius76us98mvlfr860hukg0c9ze4sucnuc843xnancwk56it50wgx1xxfltob49ho0bej7w3qkch5yipjnqloiu8aowql4x43pk3rjzrjt91gagr6pcrlgx7kyy4cxm7x4iweei8jf08olgz2rk5pdix36wo1arv4dlz7im4q63baxoo7bo1jol8lz8aiceu0zbqz3hc3dgmpb19x9nfmsjnyp4uixq3pfaw6j3ed4lczu5jwfiej28mr8rntqjxugxgaytsr726kvkoh6yc933vpr298vztl8kyupx5bkgjduf0ch78y5veu4nw9mesqzknsxgsrop2h5am3lhmmef47ur24fxtg0bwb9wyhcr75k9bl4n6trpp5n7vu5j9wkd24xs9g3klvqgizfqvou8vxv088e7kfncvb89pdwku7at9hwuvo8lwr13i1ha8xhu0a58kbko5l8qxbbluavoj55vu4c45l99u6kg7taokh12sb0xokwl61o4sq6wrovodwu2n2c6xautmhwpissn7omcmxcduzcsayjcztrbx0kr4hndaery7tbgrf0tvh9zbquzdqee1va12ablv3afy7mq5edicokd4yfng70a1vikc7buw2gacqnnh396qv9oa4qnbiibps163f16egzzj1lwb0nx6lgvygqyjzu5n0dby5auziq87nf6b337y9ber27otcbb08qjnk4ptqmtfif2d5tc32jz8udl8hlfdjvmrgjoabd9d4nk64k1mlhikqdmuaif7thx6ijtdqyckglwohjqxzt0x0tgyqdjbcuepvngf297c3wyt1v6twkyye5cwtoxx3am9wgp0tz7y2kzasevlxdabiqsyov6jav4pe42ypeuebfdwflag6i7ah5'
    })
    fileSchema: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'proxyHost [input here api field description]',
        example     : 'd7poi3qjvpkl1mgaoup9eqvno2cyhw5g3kdzm93grln1hluz9m4et3b22air'
    })
    proxyHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'proxyPort [input here api field description]',
        example     : 3770078661
    })
    proxyPort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'destination [input here api field description]',
        example     : 'yr29x7xzhjdxt1z5nodc1eqaqlu9ddgo8ngg8m0swtf1mm8to0e51iurlj1na1br8wk8omuejbj2y7bl5svs87t40ibeteadd1ooibs32il73i2hgj864k4l9uomjv6rtmdqeq5i3e3jnr9wkpuxsx18moirt650'
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
        example     : '60ns74q8p2ho4mp3mwxgrhapdakq47efsjswieca6460sdh9d63alto0lwkgec96wykzba54vgu132huayghfsh9dvudagvhjuaqigxjw3pn07vw51k6ugjpadeqmupvdnowky2ry52iaiiw4kwsj0lo8xfcrn05'
    })
    softwareComponentName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccountName [input here api field description]',
        example     : '5b3nmhq47slz2br65330'
    })
    responsibleUserAccountName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : 'kygjkoz9umx6lm7a0qtc'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-07-29 14:36:16'
    })
    lastChangedAt: string;
    
    
}
