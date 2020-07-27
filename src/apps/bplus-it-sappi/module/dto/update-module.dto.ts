import { ApiProperty } from '@nestjs/swagger';

export class UpdateModuleDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '8c122653-36d1-436b-8270-cb3e5bff6f19'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'bcc034c8-1665-4250-bed4-f9613a1cd2d3'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'm6rq6x6ty0phy4r6zuqnp1dgpmxqkifw0pzyiiyly2nvl0sdn9'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : '9kwi1az63f64nyiej163'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '948e1709-2ab6-405a-acf9-6a1f1fd943c3'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : '47j76vyxm734u5qhszch'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelId [input here api field description]',
        example     : 'e62e7fa6-e398-43e2-8be6-6b576b589dd1'
    })
    channelId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : 'h5ncb9i05t6rpwob6xj2cggb3f11b5b8dgb81aa702yez57yn2n6sejegfw2f4fbffuqas3r4bp1rdr1nwmhfrdsnjtfp341s2vpagal6uuvw91ur5cqv7o00h2dethcm0xvdx0cloz72h9552s5xnuhg382tibt'
    })
    channelParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : 'xce83iiqh0dx46u0g9kf8m3o8h3coptdn6ft7g82zjiuczg2drdnd36iifmawme5dnnji0182ummbbuoqfo8zhk03tnm0psy9m0wc2v59f6gxshppy4m9qzhmyn7y1m7cy6rhskrppgfm3kw4hk8ldghk4cf70px'
    })
    channelComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : 'zer1it9k5xq01l9lbuqu77lj07sdr621cziwx11x3dzlvu35l31v2l9248jtfw4o1btwsi9juh2btkx3otvlxy87y3jbfqg6cc8d614pmm5bkrdrya78xpc7d17cy6czh93qekw5kxn7eq8ykp6fx5dm03c3b87i'
    })
    channelName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowId [input here api field description]',
        example     : '29d414aa-c091-481c-ba72-a0bf9ceb23b8'
    })
    flowId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : '9e478wwqko91j9a3co08f8vge9mkwgkeub1xsil2b5z877x44w2yj3i9pqxcpngl2xlfl2nnn40lxsijt40p2j6atgcyyh7hm6cpou4s5z71og1qrs52yat0wzb6o5xgk2vj86ra9wejvg7kpjzq8bkll4lbxk9e'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'v4lwnj3mwfe902zc8c3a2yo03ymhitzt96rmxunyia7s5ahu18ks86sfa7or8zk2wqzxrdtjrs36my91rdfzo950o8kyi9fu183lfa6eprw18it53rh3jyu8biytspf0kwfoqnmwhsr2pqbrblyuyi5xr3n8eftd'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : '0u03cv1kl8sg0funv3us5x46yjqr0ui8d2gk6a319g3gthn7bwr70w18qw7jltbh5w7soz93vlfn2zn6novfd6wq0bzh4yllu9dkzqpz00h0gqv33z2zdog4lu7x2m84e6n0i92qcpizbpx5tiiuipxpbwbr2g04'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'ztnf8kbvkjcyw0pvyb34knt0jr9wvlgqbsz3wjo8q57essz9v1fx8ci12m4sie0of9ik69tg9zrwq9307gp9yrlzdel2qicy59se8uiw7h85xtykbjpqfptgh6eln55tayuleai5dwf11otz6rai13m4xvjxvpn5'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterGroup [input here api field description]',
        example     : 'grje6n58vm4on24ms1li48ltvlpmbvy0i8xkxvlcrpfmnfrclw3sq1wyqopb8022puue24sx6rknkhlu1ckn8no4c7cztvzgxrpmjyb1iw7ohwsud3owhq49mkmmar3oct65bbyvo3lieqez1rujcf75p730s0bfm61o984v1ml9yy0e6a5mbulfwebzoxetslsd8bvao0p85n5tkk6ho4qyihwh775fq9fg432m19f431vugkldkd45n08ncxr'
    })
    parameterGroup: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'eznr85zws20gpog862c5gm20odim1vgq5os4b6xcb3jxn3z2r9yv8m1ywne1yxakbhjibm4u6sdlyawqvhv7y6syiuhd20c1pp9dzvp0jefz8lulvtxju0i9a3duodw1v5pfwbf6u01qd7zbyvj9ak80anpyh01cabsnhtgjapb14sj9ez1xz9wbphdmyvrtt0mcxoec1rpunuhgky4i70e89et6t1pp3gsjw8peab2ebz7gxbxccr3ygsfbg596djl65rjdhap1t35en2xwa4kaehl7lh8e9w3lwbiu5ujhjyd803ly0of3fkt58d0e'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterName [input here api field description]',
        example     : 'h001c41sz3e8ccdpjabizeej7kp37vbmplayvi8shiwdjaa1ckj2sgwymtt88qkbavz9dru83citv20sak96ni2af78okpb3acpvdlygphbavoh44cok90ndz8abqtf8y4s68nebcf1wrsfh4ofzo2varmwalcrewntthpa49t8rtaczc2i9lx1ee57r90lsj6t0oq60u0d3t5kwlpws3k2fnqy6td0vmpkzwanjs5u4xz0nwme0iwv60kydkqqxknq7slucfm1z0tvi3nxum03f1r88zx71deo3y70hf1g2l962rlr6xabxy8ezmol2'
    })
    parameterName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterValue [input here api field description]',
        example     : 'lnga0973p2jaz2gg9djhor7460fboazcug7tfbvckzmcqhx1qhov4k94je53n9wviruh0rnuwwvic36pgvt6gm7t11htz1mbooujxcukt11h8rged6y6btjyar8115e7pz17bhbmg4mnj1olyn216z862p8qtoa3cncau3xmz66msq0rljhuldzxb88iy468444gutxel2psggr3n1s4r1gtlfkztfyapo4imqvonk0v2nj356xqnruh8173u7wx46ox39hni47fjp4e785qy915cvp68j0qw6oqr2bm8lmumgiu1uqyw0x2ln0wd5unfqsxw754jbwo5o9wsc5czuy7zwe7oph7n5obd6xelca2upju6c5mdlu4lbpfpysbg3xykdhvkx06mo33jbf2m94p8te9tb7028bxe81zbtv12hoy6fe9y75kzys4ybiyj80to716sx3wwb9h7hd2h9pjou2jwjqy7umi40nfid44qeocxv4qc1m4t0m3dj8o4rrng8c7eklaj3xrwf2n1tg772t0u703qc99mceykvdnkdudv8h3e700lkttrpdm6ky8a8wnby979k97q215lmlrpagepfopbzhztn93qd3m4liabpgunq7uw6o25cjemmuhov6mbiisghvj2tnglrjr4oexbt9lsf9dzjwqfcbjzo8gt2q4334qqooktreiiya67xmnhi45tgkhanxnzc1w8n021m1iwqzho6w6ls1hy301cz8vp2f24ur79uzg08s466ee7kk99298rg27sd2x04vlqsvf0h57dpfoak9mdpaacct8l5qx3q82e4k6q7mhtb79gjog3neji39xrs71oucyuananfv0rdlfclrjpsunj4al6taru3cgtbwgf6hv9zw1kk6lrkzenzvsq0qjwbync98grk25vct1qcu75b44p7op3vqtpzvevvwk9fgkdj42bcr8ygai0mfes5u4xs4v1iqpdnu9e3o8lc5iov25b06g2hsrle3kfzup'
    })
    parameterValue: string;
    
    
}
