import { ApiProperty } from '@nestjs/swagger';

export class ModuleDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'd83d0bd5-aac3-426e-8876-3a39768a8458'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '7f97c247-d523-4863-8aa3-3368b986ba27'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'cfx2j4stvad5tvigcrqit9qmq618qqru676bmova9srrrcpfob'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '1930f027-5eea-4303-be76-3c77630bf4dc'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'isl5oo6q89v76jyqrnq9'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelId [input here api field description]',
        example     : '271fad34-5cf6-407a-a7d2-eac8da83f121'
    })
    channelId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : 'j83uh0j46tf51zll3mw5dwib2sslidc4ro55lq4ayp64qptiqmsxmszmkrqik38703k9emwy5zmcj300ls1tzhejk12mhbbepuk1lnt6vjfvc1ebu5w8ku5p2o2i1ewz1qhfaqttrsofl3bglow7gv9wffxob69i'
    })
    channelParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : '07pr0bval1y9cmobn6zwwck2dxt806y6fx3emkgxaxt30oct4habhfgpsmglnp18yy9yci4k1vo4nnf811yumfo2u7nkpndm0lcqxe3diusvdlj5xklrkwhmw9mzkawnkfu4bot1y68vla694rj4pgn49gpzb3qz'
    })
    channelComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : 'sm4a0bjpeoecm4sezekyl4afwmjdwky69d22kydh786flfc6cisnyryxuu10glgzcjq4ljxkpy7xd29bg3oyzcajp9lz9c4y8e3aefhhm95rtzhtzyas13e0scxem2pegsa2acys4zozp5wi4s2rlhtn46aesvxp'
    })
    channelName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowId [input here api field description]',
        example     : '283c0249-2de5-4b64-b08c-8cd0109680a2'
    })
    flowId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'gdj9a157zpqy28jbyiagcb0qn3khy7bznfwvvrgrdi7jux3xlse2lm33wcpkjyn94lpjqyk2gewjcfegbqxrk51rscdhg9acg1db72xsyuyj4x4p16ftjkeiozjyyqqkhgb98v02isndfa09m7zofpw3s3dsl3gp'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'k7upyrf2uwdkd8g8nxubo701dtoptztnydbihowzd41eq5qkhdm9lpo626byl51senl3trgzhnvkemjz1v9n7388gmv35f45w4vpp2ax2we05hn785lv63topxdyw2e4uav6omo55uubybkcatc8o2y0da4uqbrg'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'itopo3md6l21sjdnugxxqc5lbl1ikjfsms68yrl7o1oe57gtd7riij5pgzza3eqq3pkw76e2ix81qbp80l8ouqzvzwmjnpp900gjrdnqu332jgeitjexavjqq3qubxfd9fdnmiuc00tedb8frkd4hx2cqynklzhj'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : '7xeeivufp5rbn1ftse0u3zza99337a65cou02b0ydy1iskwzs4asdy11h5wevxrelyldl4snt2teqhphxd4n21cby5s1hlr6nixlyv1a9393rksgbb1q7iy3vx22knmcbeckl36ks4tj0adijlychf7jcw5icv9r'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : '0rryg3qdhxn9gqrm6g90'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterGroup [input here api field description]',
        example     : 'xue2r41a823agdht4sdplg4pkbwmckr4e50hfv9v55o4cv1sanmluvh8tx36n1hreaem4dwevmnjoxorccasxnuvkokfk7q144ilm1trb1jaqau9cn0yscsivp8lmjfvhxpj49bg5cgtw5vrwvjb3aby319ghuyisp3u62tfeqfbpz7eywxhd5oma840pc23pd9xs3wkish9a15l5k70lz592uoddgrg2gyu87yg4jw5wyjqrgvctfog4qy4t9k'
    })
    parameterGroup: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '776mp3t1xao3hnakqwuizm5664pc5lsho8f3qrc6lcb9hgfsvokyu53abq5eux920ms7kpp2j2cytv1hy51z1sai4zhnrrnpvjb7128xv2jcevjed95hzzot9ez5ebxrvc51t6sxk6mx1xy9pihwesp10ejg378g6mgoyi51lobzk0b1jpj04m83wk517k3r3khstgiqigtv6jx67g6b0td8rzf8cs766tq8ab45qhdvudsj66gzixa1w7q5etqqzvz1xjiijwnih0gn3jfc0xl2pqj3ro1mnu0lfrmw4oar6t38dsvve9doqyzgjau6'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterName [input here api field description]',
        example     : '1di9jtx8q2t35gqvcl4umio95pkzveqf7yrkuw6aqaojwj787rpqgillzz2w352lden4gdp34tfj3w4regz68qqz13f83z3bcscppxy37h4y2bqheclm6mng3if9a1syyyzvfpt4y95nrhvr01fwos78z2yykpge8694td3uo31iq83d61js64tvflvhhngn6ocq85z3d7xpe8ta8huj27h25fpcdr4iwzdlzzkvezs8d9uhpv61818r704hdlioiuxi41tndad159qcdnbgsq2ueuj3ivgf14hd6hnyk281hjfwfo1hfemc5z4p3qmv'
    })
    parameterName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterValue [input here api field description]',
        example     : 'b1x7jafgow80k3kv62qr7myhvyspoc5dvcw8c2r06853mdm8ddfanoi9tgqx6yzz7ohqd8ampfhf2388hgb1fqwt65t9hvdqj0feoe0usno8qellwgjqtwef16jcetohqtle6252oe22yxquqlhb8ma4j367i2xzvkra91xe73pm6gdsjuj4vne7amyzf4r55lrumnsvbbytryf8r4es2iyyebvp1971zu63fvt01dsgl6jwjcbl0c1shtjyadh55zb73gvqdbzk54f9lo86h7c1pk04gkbymaffepdq0kcx3km56cqn16ni056ka3mulybujqhbsenjvndbibdahm2h99st2c6oeqqek55bslhd0p5qh7h39zujrw53mjsiia59x5mawa9udnvkvx1bf5uptkrc2cc544sthplqxfcjg5n5owmfaluxfv31x62798g05nbdcyltidgmx2ujn3xj0iphi3eb787v1lop5pdjcjltz8777opstoi6fk8e5b9r63lvidezi28oysc0t4u67hqaphj3nzvmvmrkwcqddqkfni7uclszcwc8ri9utt2srkgp524geijutj6ocwfhsniash3w58jfq8qoxw5in1sy2h25v89v2quow0yvb6nxclf32wzfy7fmjum9gpckvhqox30sun36dtr313tyxxmrnk5gwwewp5ijkehh8g6wkbf1tahy99l8y66rfoxn3z1uerzgr8ntqhkv3dium7ei7q8mj4t4bsgb7y9c00ze8kkkql614p7bm6pflefbjp6dejrlxl3e4cvrkb4d5wegtvg9p448x4b02cjv3hbbbeias3k6dkwuw6oubsdykirhzsw9nf7g5gp3aaqc6fcsl5xli8x45cpjbmm7cj9yuzzm4ecoov44fvv3pvxkdcejcehv1s2w8q32mpdl04qw77n9hk7o99smn6j0k45h0jzipzegmeu3mpdjtwv1g99v8bpk8u3njxw6seihb2rldwmlb6javero72o7'
    })
    parameterValue: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-29 07:27:19'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-29 19:21:03'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-29 05:59:57'
    })
    deletedAt: string;
    
    
}
