import { ApiProperty } from '@nestjs/swagger';

export class ModuleDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '9fc6c034-941e-4237-8561-9c0d549b37e5'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'a32de94a-766c-4f44-a089-18678c3d49ee'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'v78jsfxt8ep1uc7g1n8wifv8f8e74ccumzcgkgvi392vm88lhw'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '1a7aaf01-5e7e-43bf-bdee-acb54d74296e'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'lxgpiofgl5qijp14axpf'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelHash [input here api field description]',
        example     : 'e2n6h29ebfd0birtb85c9ch42kwbxpjnecy70ykv'
    })
    channelHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : '6gimjg0q4vtlxeq4xfmhngxycef4rhgvkh093tl5axaymq9p72k3gx6mjyhmyh6folzqp63eyu2yxmzbzm9s6iuw54yoi8si1006jyj3cpslx1p4xfuyccva49eogeyuyro4xqstotyuijwvcjpd2hyxpmhpwnp1'
    })
    channelParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : 'bf97xi2fvn98x5xe3866gjw2oembc8l53vv0auwudky0u5aek8o49nb9vomks2vktb1jimnpy07wcinghz3nxmgf5xb6s0mpmrdrfq0zgl239lz29fdkxm5wt72j57cww4l0iv6ga2q1tps8mtz2cui61sj5kcbs'
    })
    channelComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : 'ijlb75itv32rvtz2230arm2m3sn9tbt2q6ctw8rok170k057fb5rcco36ezm71un7bh0qkwqb5w7p5z301h9wa2wxqknj3nwx8963ohpf91350kzlai3dbsdtso8wbnzovpgmz34e4rc2t9nsblnk8b219p0r36s'
    })
    channelName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowHash [input here api field description]',
        example     : '0j881fk5k62wrcd1fcff81jhxubess16mtne898f'
    })
    flowHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'pud6tkc5uxlno43gxrluqr120ciguqqrc8txop7vwgq9oe4e4rcd4dg6ro2v7x4tu2jwanewajgort3j238twusb36mkg1av2c6ly9zc6pzquajhdmrjb8663hx0bcmjf0ozavrdjxrqt2hl5oye1pgls3a8peb0'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'cmtz42v5q47ax10yza08turyt5mb31z7jxox9rp2z2qtl24wv7mt0b7oepr9aur8ahpwtgrqo1ofwemi4ki75h00poxcbo824n5gi63lbjvu9sqq1w7njabygm5yuuv3e3b761n6him2a766o134i7rl7il66hfa'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'g0e4usvxhwrl2nf2tvpab5rv35zyrfrwvo4idwe9si02a8pgshdta0ky0mwu3x5uw0hmpupfe97m7uypqq3udcn1wacdq4kjg8czznlofy3spg6r0cjil0f3rrqu2kg9j6zelzedmtj87sf4pjlrfkzqwnszv7wq'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'vq48xlas4izg1n0btagqmevlivrv5d12lunphziokdvvhdup0b0xlhoxkoj2ggxjlzdz8s53w9my6guo70q39u5p3lubyl8h6b7x9qeynwd022wih2dpkdskhpyc1qgqd1alzhphr0lwd01x1vcpsxqjenab9h7v'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'syrnx4bnyi5l8ug0x9o8'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterGroup [input here api field description]',
        example     : 'tfmxhxz863slwhndhqdl4wgpvoa996uph8spaxpvp9hgytz2w24md3alu1mxkgu2sce8uzlpozsbnphhif7xndhtbvz8lkvnjqimik0h8zm89aifaq4d73objrxa5rsgwk9iw7xv5ofz4vdtxuo3nroheu6xfrtlm77fgmx6er1qx1wxtcapsy36ira6mzqtax311kkyi4r6j8t9gymerjm9ogxf3lx0eho76h0iqzysj394c4irud9h039uaoh'
    })
    parameterGroup: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'm5z1trpm60ecr21lu8ix2iznrydyopl8q1z4dmeac70y383wzumcs98nrobdimg701gyvki3tezmffbdgll8rem9n984ue7jcgtk3kl9c1dwsc9truqao10a7ri5orwevga663gsvtgwxpx5v79vwo3onyyx0p95hsnncb81p2ivg1ukqkc0t7869c3n30xxjdmr42m0bc3dqfpvrs9oolu6cgfxy87hhsdde1p0xvqbdp4yf4xbr40e33r96crnkn5dwbzlgso3lzee49kert1gz9vphzbc9rni1jbbpke3y7yal2vxoid7yanlieps'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterName [input here api field description]',
        example     : 'qtstd27t1rt4bpaklclbl8a5ozcnh7ns4x7dfzyggh9llp913h5vr1ozhvz0yztr9tppw6tqhmesuiwd89l7xhzmqnn4yfhewkck5ndlg3sdax13hyffyqhvkifvfxm50sd7sybxezpfdwkkm5fqztzh8sgwtkuwayvf06eif8aqdmrpmdgtflmmjwrgsxd4xee0337pg9gilb64oxg9q6ml8dkxl1o8kp1ks5tg51l6x0zj4kgcscetkmss5lxqv792wlkzxg2vry1592eiyv9vz13ll0212rzzqbpc7jrdy56k4vx6j79x2pj892at'
    })
    parameterName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterValue [input here api field description]',
        example     : 'd2myz48er7j57xnn0k4kcm95si5njc6hq02imnnpwild2yi0500lbqxbftnm424j2l9tyjbch1axmwh2jkhblga4dwmtcejvfz8d654ji3b25b3ip8gppvm5sihsxuwmc0272n9kcpi88rvs0odpgrfv76txebovjftyaw2a1dx66yzv0ny0k3w3um23ksuw8tvcjed5y0ijemxte6rnk41etq2dmxnu711u330c4ubfbk968ctz0bt3jgn98pg0br2v7nebmab21ss4swli6hc3bp1p24yn1sfghjfmx6se20ypsukhmlr50rek3k606y96mw7ogqbtbaxqkifxhhm7hy2mzbrw32ju8rr9dj150ctpqj3lslq2bkl4z64ytt8wr7c7vk69fj72vzzfd3tuh0n0xrqhcqdf0sy4fihetbzd3y77ryr6mil3yzv4ezoloo9kcxb7udumum52nw7oh0tog7ewh7h9bfkpio1d3v97q2m3nwrhhipigxhjny7se2auhc4yvqayfe8j9d8zck9wbqgjp5q58jqcog4q3bg3or3bcgsh4vmutjmhxt3dikcq0hf9sxiulefldfl86qys0563303lk88yzlzlaljnfgku3848dyqnytaxlc0agnvl1hkhfway97wmtlc6zzsfpyxeuyh720m250pt6th3d2ih9bfuav22ydzqsi3s86uw4ecb5fg44appz3l7htx0p5krmsqbeboaneiw1tle3jrzl95gvgjmntrh6045ewkh6fy75itb3c5pwu7ebhrpbrd2va0i0o4wftbbfs5moocltww8zi4og4b4imicah2zs03f20a7gbj2aeiprmw6gfl0zg8vt8efaow701m2abdy63jk2o7t9u45hlkkf28gdc5w4berbawhhhn2d7zwjisfksylyj2377bwhvhbhz9oyk0r7m8efn75qgw5m7bgxj2bghecp47fam08hemp084zra578as10o1cdggzp101169ewzzmpope'
    })
    parameterValue: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-08-04 13:48:04'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-08-04 08:48:38'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-08-04 15:27:35'
    })
    deletedAt: string;
    
    
}
