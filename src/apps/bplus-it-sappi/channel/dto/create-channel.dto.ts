import { ApiProperty } from '@nestjs/swagger';

export class CreateChannelDto 
{   
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '26610baf-b32c-49f2-a506-ad321f68998a'
    })
    id: string;
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '64b53c23-1ffe-44dc-96df-0f3488af5681'
    })
    tenantId: string;
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '01996283-9bcc-43e4-9963-a18831786df7'
    })
    systemId: string;
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : 'cwqeg40gcy9nxyr44hvqagcggyfef1tz9q7e5yufugkgp505yjj2jx49vdjmuzs1iwg2rlqst71zhkg6zwykjcl14b9boczx7prjprr0pnnj8nt23g1i1q79of0t5hyb6edt7p4n5faf45x9qr6atc6edg4dxaty'
    })
    party: string;
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : '3xzepar1jrbki9zyhmlvjiknz8hlfhxoszkh9sk4xm46gcm76ud5mfi7pyip4ztnuub6hfy3chrolz35gkub3z3kxrzvw0pm99999u2w6ac9oy5wp6xleekyamxln4kkglf1ufulu3f9xumgnf9vbox82o117az1'
    })
    component: string;
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'bcs5bz8nku1lnv4lmrzy58782wo05ay2y6vxgy4r1c018qnyigmpjt9fnb64njtkp3c892furnajz20i1zygrsiihrp5fe2sd3rhzw1t9p1pwtgxq872cr6vq0g2hrrgrvsbav2h3jclw1dv90j3g5qip7jk9voq'
    })
    name: string;
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'bza1ooed701uhevhos3n0nxjqusylcdrwu7fjep8rstfdw3e952jyk4svrj5zlzyaa8ywfjj7bzeqvgovu8x1b79x9qycymb2k5iwaiuo2h54j7lfrenr13hluni8eyisbzxzs9gg8okktddfaeaa3w6ixt3keyo'
    })
    flowParty: string;
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'unp81xwp9nzplgwga9t1hwvvrmjdixt6g7qkywtwh1wssf98h8aghhto3zd3b5ur2twbqd9ooffd66ns3bjfjqaw5odo6ozs6kqwpzmm0u014sf7xbjkw3twncgnen4936m3zfgo7i1n82ar22p11cupoxirbo01'
    })
    flowComponent: string;
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'gxi53qutcrhqq18vu45znun2n34uph87jjufijgl6cpxs54l0y93ow8oavewx50kpmk4jqs498hf6kg4z4d0s0hq8utf6jhs5qa6m8r0zoedtg8iuaizgiz7z724bgtia8gf7rosg1klstuo7mdnr525dunpeivp'
    })
    flowInterfaceName: string;
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : '6owlgiap0ttg21tphbeig4qx85bwmidenx7vn8kod9kp9d0miciscvech4oms3uivsc1krf0rkj2ozj4pwd1l64abyjs344tt6v3j6j65m85diwl1zygmay53ba9fjhzo3912kezaevxka5hno5qpfui8mun91yz'
    })
    flowInterfaceNamespace: string;
    
    @ApiProperty({
        type        : String,
        description : 'adapterType [input here api field description]',
        example     : 'y9c6xmxtvnhlon4u7puhwovv9i93pzy8p9dfhhewx58lye91ibcr5dfg7o33'
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
        example     : 'utelse5t8a79cbd09mfyrq40fzfrziuxhl5b0jyeqgu4wv836ubvw5hnbemc'
    })
    transportProtocol: string;
    
    @ApiProperty({
        type        : String,
        description : 'messageProtocol [input here api field description]',
        example     : 'b59alp42jmlm1ik36hemtb16dpjui48vw8kytbc9j9zitqat53hhhpup9csc'
    })
    messageProtocol: string;
    
    @ApiProperty({
        type        : String,
        description : 'adapterEngineName [input here api field description]',
        example     : '8h020irhoi2k8lgb6c7227wv0q7dbul218ls84f4ojlx0nqpdjkjmfwqqwhh2tbq438nkdc658q2s3bbmhmhvfuq3e8mhnuht06n9zb4ipquozri1porqwzcf6cqm5lenee71fzqsvrfbbn9555bqqjcu6ygyhbw'
    })
    adapterEngineName: string;
    
    @ApiProperty({
        type        : String,
        description : 'url [input here api field description]',
        example     : '674p5i5koqm0dzxrga4omc8j2t9dbyxmk2zaxr5hjoh4s9w6r58ckiix2f4jaibrcefpsg7tyt0e67qdzio2ipd17qkemx28mv53xe0gbooak5iii1rbemshq43sks7fn7cst4u1pwgjhsl0xzdml53k8si68jev602656xqpkupo8temikrdkhjzxubla94iphe0rtopv3phwh7u3s12t9zoylqhotp0zsz3ybpqbmiwkh1vm3nuup3xru7icz916b8on7xnuj2w7xa3at8q80uzutbafngw4p1an6eunuvvbs2a0gabxtmtxbfdnt4'
    })
    url: string;
    
    @ApiProperty({
        type        : String,
        description : 'username [input here api field description]',
        example     : 'u0g5drf713likptalft6b43v4r04xvpyfh05j3yowqqkz6nebl1e32kaqb48'
    })
    username: string;
    
    @ApiProperty({
        type        : String,
        description : 'remoteHost [input here api field description]',
        example     : 'e7r8mszxc2qltlceas83swzq7nt6cht2fmqua5rvdkbx01pzsest6qviksh77mqeswp2s4xc367s5ucw74n2kbzejyv5chx55nsr2ex6ya0ljqgsmk8dqb2qh8oq3vqffe2rq35289gxvqh8u4sv7ws6xsrw1znh'
    })
    remoteHost: string;
    
    @ApiProperty({
        type        : Number,
        description : 'remotePort [input here api field description]',
        example     : 1965211201
    })
    remotePort: number;
    
    @ApiProperty({
        type        : String,
        description : 'directory [input here api field description]',
        example     : 's41wtnqy6kgivcd3n862k28qo1qc8nekli070xvhlag2yw2t4vxh9b49qmvli3gql10mh04noo8llpviimw6matelcjiu9nxs06zgo735afs6z936nqmj23smqqkga608seq5jx0joddvmub7mu14orotiihrnyjd0671bpsvxmssg24ztrbeney5iup7ru2v8yvs3ejdmg5hn4m1jskopn0pwp0p2dpwa4zbuzjnr8x4axpu94rfle4r4c7d863xeawi7ei5ku1nroyhhb4nbjm24b1lyb0o5zzhefc9ms6h5gv8g7kw4by3o5fs1ckmdv49zifg1ekz38qh59yrlcqjx8t5qmsadmqls5eeyl1uc7hv0n0ek41fgq4to2kmrfbelj8ianzm0yzmegp5ghkjkfuxzcaerbv9z86bet04goag9eg7vg5tg4dfpvpq5oljm4orewgwi1tpfz1g5qwah0s2l23hd4ce593zlg2ofur2hmk1rjtz2orzz18hx8t7ceuhvazvwkoe6m0qvk1ozze9429zxiizrrt6f2a42881lfh5ol3sp8t60xh7ker8f6bzi3unu6a7dicvt1swyjiunu8uqdq7h5aq4sl3r4xexq1siofchpneswfz9rpwuuiva71m5bar2r5nhpk5s46y8acs7lhzlxoylgc1vd7adrxs9biilshpxv652ryumijv7e57jpv15fpbtjxcn0mdh5a2gf1x56e2mhk5d6hbdd5vh0klnmgxp2wg7x5gmnzgyp4uwg86dmbhsl5jp3p80ganmds8gc53pj3lz2bxh45qvmudf6kqofqm8rhqu1ctl10h4hp8oiwsd9ehh337xqu3ekfzno8bpylnywefqms1rg34oz4j8dw6jc81w5kq0fcw0a17o9d8v19jn0sjapb0eyy09bkrvz6fxgwdq1dxmeccne92x7yxje1vh6igpnvjmrhgw9pxys2oa6si3de9gdb7sqeg4s3378ioyw92gjcu7sh63e7'
    })
    directory: string;
    
    @ApiProperty({
        type        : String,
        description : 'fileSchema [input here api field description]',
        example     : 'zfmak9a4flbe9t6expr2sb3goswhbbwcnp31a4qcbyu2xd770aqitdloso1tyq4fw81434zayum177t8v3qw3nhrfzuh47m1g8ud95y0y5zw5e3wnl41morc1swnxgq9q4n1us96dc0cu8nhmb4ssea79q61lrft9c0xzsquiqncka3j6jp44siwgt22n3kizzwn3hx2e5udhf8ovhrc27ld6iyytc3poo0dgvjah6uwlhv51qp82pp2kgcgl1x7hij3gljmaj7j7cx162cmb4g0y8kd85lhikxt1vc8jrldhk9qd0fjwlq9g305942tld1b250bhpm47dcpj66jen9xpt1jbfmyajtmsfeqejhtfuk9u23ptobuskhd2yszfbopowobpotl9hc19rsjdo5z4v1ags7cz1tjdpvho42fsk9f96u7db4kgdohhlmw52iwz5a0h94ogfr18xpk2dyvq188w3f1c1e55b0ew67o25q81d53iynse9txw50kq88nuhvb1chp4pzacq8842k9mzag5emg82aokyjx7juzncu3vu2pozw7xrm8o7it96ar0q9elac3xhqtfz8z9fdr994rg5e1gypekx3l24zdkn0njsjptd7yzq5i9ukb452ouv4icsfjqi543ichsmf9a39uliuzp2geahqnxr17ki2pdet57de5w9cy7mqwfwr2jdrmivuyvh1lmg5oj9ia9tsbk7c4noctmezkqblimdujpwor07z4pm51w00zygu8y751md0k7oe6bnj97j1ngv5wdzm87xrucbm0n5c5hdtts5hy2gkvxtciq4spzon485pdneezs5oy24be5ibr28u9h1fe6horoxkujki7bz0vj9aegt100zkvrr3dt4a6t1wrg16jhoqn2u1ud1hfl98j4uhulbm0uee7x95917go0en77zo32a9ymkgcpbtf81gqo6s5msujx5p9przdbv4zt4x9npbnhydrl5x52qwk6ixm9uu1pe37nu1w'
    })
    fileSchema: string;
    
    @ApiProperty({
        type        : String,
        description : 'proxyHost [input here api field description]',
        example     : 'dszyrvqzdd7rho4ro2pcu5p3cs07vuexz7cgygh89c6x6mcys0uemggqju1c'
    })
    proxyHost: string;
    
    @ApiProperty({
        type        : Number,
        description : 'proxyPort [input here api field description]',
        example     : 9682572708
    })
    proxyPort: number;
    
    @ApiProperty({
        type        : String,
        description : 'destination [input here api field description]',
        example     : 'qtw4xchnwtosp7et35z5l1r63yczrmnmur43r4qt5onoptw3xqh6cqnqnxwodq1x783xqqf24m1v8mcgkdebogdthge4wzw63i23hriev7zgovhcdkv3grwb32btnwany3floqkzw31bqw5qkmat9xsd9zrk1amk'
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
        example     : 'ybbis9je1z23nkpv3ke7277u3auu6wihrwmzpz9wcsjx7h74fu0f18evabf9yt8tahr384ban217oxk15gvxkwqe5yb0h54t0kvkia8p3ccv2w8qfyrh4txkuv5s5gmvrblv5liq89s1ll65399d5r7f075erw8p'
    })
    softwareComponentName: string;
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccountName [input here api field description]',
        example     : '1lqyav48xn04m2z01imk'
    })
    responsibleUserAccountName: string;
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : 'vfvzs3t00vvdina57gct'
    })
    lastChangeUserAccount: string;
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-07-16 18:13:09'
    })
    lastChangedAt: string;
    
}
