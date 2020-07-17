import { ApiProperty } from '@nestjs/swagger';

export class ModuleDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '0f674ca1-3cdb-4a61-807b-919d863d4c0f',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '436770c4-6933-4d1b-ac26-537708dcc61e',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'f9988556-2131-4373-84cd-e987a0b26999',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'bo7pidu26uosqkh0j3cb',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelId [input here api field description]',
        example     : '02e94267-39d2-4a9c-a6ab-de074832770a',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    channelId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : 'vulmqr1ce4vl60q3l7zttras0904qars5fku7zx8kznewfmmqx1lpsqzdp8ksbfhfam41toy1i0im4hpo9dv08tlbr2ul2zblmerb7cddp768t2trzi13onkydt615vtb5r4lvfo0h4t7wjypi4u6fo1vc77avk6',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    channelParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : '9jf765espgcgdncgw4m2x7k7wbfzr8ql9xmhs5pst5udx9mfh3iykk9dnh7vh9i49whsvpbnl5uwzjd6fzqew7vxm0mpgh87oggffe73vmis40kok4yaeyyacrdwfommk4yd2qzt9s9svgacg002loti8pmbplsj',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    channelComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : 'goousfov5myy9h6um9rwr1ydqqq1ynpx9a5oymf53vg62mysi06aeaxkb1n3jfpbgyx813cfkrrurng6meebklwqigyrd84ticsbkg2yyyn93hlmu2i5dimi3m3mqy1y9ce9e55jcwxdl3jentv977bw5fpupoiw',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    channelName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'z7e2a5la8s4e4zmxnojsgnzxdehvrppp5yiaspy8h3zc1bdqat7b5vansk5oejb0s2w70c86kh3rj5rgzqdkxj7spuriepy0xdavkbwg6j1s95as3iafawpwfhz65wb2at4weqixkxqh5f83u8idg4mhqkaundav',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'tv90mlm8zy7fbmmba7e1t8vcnttvk94pnxd26lh7v7lv5gu2vczne95ll3krq06xllofwlyy38s7dc6uaw0orvybynrlfffe1ij2ldklgblz5vqwz8n2lx18o4bsi4t5qtj9qwrlrpthpsk2hpku9sfe2cinvv0w',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'iaxoj20y3mvfqvxyxtqj3frv8yyto7swwqv79xl3suy0vaiulfhwn3xpi3p8r0517d18fuvlnsihhy5on02bgal1bsnlyamd9z2nyvbafzht5pu8qrq8mqznnggcqddh0tdo2oie2vy3uh2bv0mr8s3dn0ihwil9',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'zh8z39ul3505aubsjl99cpj9498qbrdtenof0g2t2brnk3awehf0hplaa5lmfki11cz6wworj0rkocivwhzm5erx6hzttmzo1u78ri3ye4qn79tcto1453nl1p26km6vovw0lnhq209bun06auh9giiplwmk3siz',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterGroup [input here api field description]',
        example     : 'xx8aynpls1xvpuwksxrkeaoejl8g24u8g99raatbh18c3m6ftkmhrhn93hklu1g0zi2s26d3xctg62rluhzbyk155gtebh8vgvz6ro63a1lc7qquz9m8i920t0c84izjzhxjtllhfetnbyntncpt8khcpl28oz96e0at2g5mr1ld8dwpniwsbrqg3qsq0vqf2k93rdu6yzuev2iniksymu2vow1jm1hv75v6vx2h67b63xzjmtaq0mgp0438gxb',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    parameterGroup: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'cd0nokl9h2igepwl1vvgd2z6au6wpms6isoertoba1js429ans55c47u70nezkudaqvoz014e5o1q3qizlb4tjh534yth906czlsedx4yr2psefqnyo1njkpcr9h4z8r0z4ank5mz9i19j4z97i0zfc9gfc09lpyf70qug5iuuicn6cbf614jvzlild04jlfpbxmrjm5viqu7bl67tn5rnzehfoykk62zrpoi1fz6rkc7y2ksrbu91ay27d3xrxlqiu86u5j0kktb2fxquagjf9j2tymsnv1m4xq7ql2nevpjn89bav68w8196dvme2f',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterName [input here api field description]',
        example     : 'f8yp9fw6iygqr4gmxjq8nop2npiadrxqkrj3sw64vsh530ia7v1uotomoba639y73uhqu31v7mizi7ot87qyzcaqobdk93s6rzjhkgfepuqhkxc0edca81vqfq28zehg59glq7nth2izyi4d7zp7vi8tcercg42h1pz2itpite4s1lv3ob297shu9rjfcpt64qp3oy7ph7p6z5bmax4a4opc7hvmn5ilsahdm2a09mb33xitb2me1dpu7ucv2eq6ml41jxnk191xmhzkqklrcz9k41mnawafva85h2z4ah6zgjj4oh8xgqg5m5rbrbn2',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    parameterName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterValue [input here api field description]',
        example     : '6voz8ugkbwd34qmvcxy57u0uztri4uze4gl57quk5kjn0a5qr61mwga52iaftlmu64sv18fag50andvvw0aa4izq2wysniqhxgu0uuabccd766eqycrchfuydf59qxqkm90ybz7ahh0w7pxs61dwjj7xsd10kikd47vz6vj1dypiv10ckhab4u7om59c2rp8rxvlwtlifkhli4foclwygefv3gf8dbcw5ttxewknbuast05kvl6fg62bvq0uanoslx4l5zk8564kf5e6nqq6twe7zd9dnr6gbcszmhkniynlp1hthpw63sl0mfpln8vb11z7gms5pw5t7kvvuga5ja17ejoncobign821wuxt8nphlsskdb0433qt5d8zpqby1opx32w8o2g1t5l8n1mh1twt42znezds8ne2biwec4l4dg6l9ndw4eeaj4jetepoufqvhbs4elk8b40dxzbj8zofjk8glveidabgdq9nq9uiiop5s26r2cuidke9n8ufavjta1vueb2lk0yhubdql32289miut2s1ve2swibfisw9r2bydckf3lsrewffd4z0m46x3ypod8diqelyfiyr1h5bh2amjau39rogfj85tv5j0vwqp222410jgi0e3pdohta9ik0ajzkxt282ppunl2otff7asy9y7i62v7kc597njzca71wccg7wtfwmzytfhxrc39d7pnrzybpvhqh2kkmnd6zeubhpkkd93iqjusboicx5ksaxpbvsk8vy2yrkpipx601or3d3xmnqe13g557goqbypp0ac89qmbero6e5el693hew1p0uu3nd7itmyl619muud6buywjw9gczxf1jvm6f1vc7ozma31s55m0943n1eszt07t2m5ps5q2chcr2y14b2qm06q2jjpkpdxirlz54moxynvmkn7w8aq1gtwccrvazuawdccm3qpxbkn3yudln64hrjwcicqoa2912bullxt1dwgdabj7yp0yi5wjf7p9560wpr1cux8',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    parameterValue: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-17 12:03:02',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-17 08:06:40',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-16 16:46:12',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    deletedAt: string;
    
    
}
