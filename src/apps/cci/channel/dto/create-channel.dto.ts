import { ApiProperty } from '@nestjs/swagger';

export class CreateChannelDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'eeaccdeb-d348-4c26-840c-3ec824b712ef'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'hash [input here api field description]',
        example     : 'ei2pb7lvn156e8p5wj2x1tjseskw9skoin117xya'
    })
    hash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'c2e96b90-3bae-4c59-baf5-751d4363afc9'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'ar4lbmotqwxk7tld6ea1qjgm6mp1v6p9t9t4c9iy4rxbuvig35'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '36785ee1-b5b0-4748-9062-91654b880438'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'v3z9gxpe44dh03ymb4qw'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : 'b37bp8tnx9gxncefvwd1my1u0hma5sho31s2qg072rikn1awc2737ljvbh1gechxvtp3p25rq7pcku3vpaux52ap8bdsjhqkmd2nljxg2ivlln9j5t4ghzs7pf2rhlbu1huemeos3skf11z5jg0rwo2poyurb8rw'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : '3xqiqjnshbhz4oovvvy8vvk4hpmlfus3w29qiuo88pqo9r0tqttiwpco55rf6qimhmm3uvml2u0w1n2lzts18qmcj0v54j418214e8j73gsk8yacp7565xxidsnzjndee1hbzpslgw626x29qmndb4c7ijbenitg'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'zf77xct571o3dedkj026tzb7dn1ka8dczym2j8i30nvcyxz5bxfgctd4x4kuf9ljo0mb2o1k8lude46j45n8yda7nx1iesfnmv1rzkifcjzh14zsmqlw66s8bdukljob1ibjerw7hc9hbf1iscr57x6dvc630c2h'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowHash [input here api field description]',
        example     : 'faw382hm8asjgzq2j621qh90494o3o604xlsess2'
    })
    flowHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'u327v3or0av2m6dq7lcqbjisx6zm9wjgij1zktklw7t7t7lqxeoepd65c2suy1whsuh7r3tyf64qiyk5ovo8lyo2tf1qhh5aakyiwu36oed9dcd7j0kwcx7mfug7jlxzd8pthitxxdd93hyhvmrayf35bqzyfuwb'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowReceiverParty [input here api field description]',
        example     : 'yzl815g4eybhx3x3ipkall69winc0yfc3qqbp61tsp3mbo0lozwp8auz7enmvkwzkbd660ae1lne3swmbokxn8d5xi75jwi44a2zaol42f5s4tw39r1xvejw2bv7ibotwrym0g5b8jvux73e352g2etqglsp68ql'
    })
    flowReceiverParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'ydupd0iw61j4vrq605n3jxs2k953qtas71h75t5sr8fovl3t8xfwohq15j1ovvf527wbse5cn4qxrt0wqcnf1v486y585ms3lv6ws0q515w2z3hcq8jwd3ppgf1hja7gpir9vzxp73bpoj315sx1yew3d3r3nj72'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowReceiverComponent [input here api field description]',
        example     : 'qu5vylpmf6y49vfh5ikd3l8lytf2edqap3vorc4cifnnkwt2e85utbmtjals60wm957xjcx3pcl8c1vhja7t2as6w2sfnknluiyuuaa1d74halkale1w93pqb4ru1hrv9u7kkfpo9sr2weelt1sg58yn5yagic2l'
    })
    flowReceiverComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'qtaawj0amit8uhtaobq6qu2kwfxsq2zau9bi54h5bo37eajrqhx1y58c6r2lb7qwhlzzbk4xz0bqxbufnerfnmzedmcsv3du9kor9usntin7e8yfxig2tktsh8tgdifleic0r58lvlynp8lfwdyblchlkdvhb6bu'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'pdfqtj6cuhqufconww79qd3om4tl3pdjk58kkjbdnt2vok7ah5ih07z5wfdkmtgafz2ha6lwyz6vnpgo8errnq79h3gpbe1mf9tj11y53gpxtprlyp0ha68sm1vpalw5u1vc6ky8i622pwrzrs3kuc8auzkbh1n4'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'j8bnjmxqrgssbxohz0m0'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterType [input here api field description]',
        example     : 'rr05313tf51wyb2ni5amzo6fyu6ridw5gyjiurkpczdtwjtwgtwto0bexo9v'
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
        example     : 'dq0cpexez15scxd3l4fvs90yrnuk65ao9in03k5l9sgd93c1adykx60k4185'
    })
    transportProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'messageProtocol [input here api field description]',
        example     : '489ku1w73ncqmnfcohndmhvpfmsf53l6kc48zgx25dcli84vh8awnxnu6iez'
    })
    messageProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterEngineName [input here api field description]',
        example     : '4aggzehtec5g66ec9t6umn8i1v50rse0k7ngdnrzc21i1onnn1faisnb7rxk3i4vmk6im083mgzhf0iyab5pmupldf3ipsi4n2t198q4xmtiseoc65qop2o0rb633nyhsmw27qrfot8xx1im9emlu69jlycgql0f'
    })
    adapterEngineName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'url [input here api field description]',
        example     : '6l5w6cr8gbfbbsbjj4q3bwdw5u8zn9va1q76v86q2p7tuy6udtvc317e7au44tte5fhag5xbs4bznvdsecq1co9ki2iee9lbgcmas1mx83d5or4x8x25rh0675jeh7dnc2s2szow0qxvtzpecqsqjgk5dvoz1wj86a2njl8ceo3e8nxft0jxkzr3q6zi1h2r9v9h7rv05sxryz652wzs9oucj36rigebgwyx6lz2zfnlx0bgj9d6grmoojunoawwwu44zyz0j3q546flnfyzyb2ti85s8ml9kpsvapc8lu8oyzvifqdc0bwpisblve2s'
    })
    url: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'username [input here api field description]',
        example     : 'qh504x9xpef851zlto3tssopk6vybz28lmfuiquyn4cv6p0d82pqozu17z4u'
    })
    username: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'remoteHost [input here api field description]',
        example     : 'w7rizm54g5n5falsqftr0gcma600v8dytedilmwag9lxdz74yvn3y62chl3180qkhtzqch99gxo9jshejov89f0hhpvmhxpdglg6xooo8agjl6i69zqezze5nn8byf8dxkqmtrih1juaaf8lbnitt8ycp93imv8t'
    })
    remoteHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'remotePort [input here api field description]',
        example     : 4895987537
    })
    remotePort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'directory [input here api field description]',
        example     : 'd0kebqbawtzrnejutnjwniwppvhe7hck7d1jpam7rl4omgbtk8kvd04thkpzff6wwewixc1bltumc8la2hxs2mmzu3rujtuf00axwm7l31y4c3pj6kyv2bo67hxpqbgwdkscnm8c2pulm65hbs7htbhwn5qhlyuud3shnkuhge8safzrq8pylwqs0tfdqy24y6gt7zxwwbwfjl9502kx5j50ajyr9o7pyegeqz51crjiccnwwnl7dfmkseczzb6e3abqgg3qwi8juhw9soqeqoehuzua3f41tgxpw2b04hac7rpimio1fwwsgaq6kbfwd08lx97qmj56kkvoiotbzu2s7bso762h92e8wklvasyipq2p8e71fh7q0oebdl9gznoo6snav2smhdsgwevgrnb6elr3ggmykfi1kphmu5c8vh93oiy8ukmlv1hqn52vjfvkhnd7fnf5dj61s0rgjtwl7r7cyadyfszjp7jkamvrdjtt47dkelxojse1t1in6azlvep9q5pzxpws4kbd2ivkc4rv3wqfnysueytw569lupp4r6gnj0azpcw5709vqljad0rgg3rfjt4ur385paoo67d39xx7z2ojulyjb1b1jr1g12zztzs4j9dk4i27qg4nyvbcfeyzo6y83bldi3fw4jcberldzf59e25oxxgum2cz4i5atv5spdqjoc3o1vbipbqspuejd25i0irtaovs20fh9i88r2l27f2pa24724tteucy9it1cwq1pdvpzuozw4zdxcm2ysgqkzrnofk2t13r8vsjdbcedvcgeh1k53l0gpe02bqvi6b2ncrbnw4p5p8rx0jik2okwxej9sg6bxc8vwpq5vc7cp3h1gh22m6vsw66seupl2ener83kk2baoj2kzisbmi2xnvuobcj2i7cc0fkvpuk5oj05igkx0v93kqz9rzuewlcr2yvz0fc8w87sw680xq6e6ir6g762p80pi2c2a7ecvdmi351izyor1vueauajcjistr5'
    })
    directory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'fileSchema [input here api field description]',
        example     : 'hpfsnh1ugukf6avqy501a50jiah0pyjndkp1lijem93o1hsnhsph7dcnuw1bbdobdgqqyp7k3vtnt2hr5xjdqj2d9oue97dxpwwvxiuszr9remaw8bk37s14bzth7hdx6djgni1w5qsksrftm3pfre2i014wbd441mivgdmh6bdc6kog48tpf1v45x50pxfthfgsphdwfvblspcwafpspuk1tst2c6cb6ayzxzwpew11uonfu92goy6uvsz67vu3tfaujo8ksa3m2iwachn5z96qz0h8x4mdgtffxnaga2q3co9v1ot2y2x7r0b92jpd18a8qzywii0p2pznhnhj06z82pp90sw3t882cmlxrcz8n7v3ge2109foizufi24yr1b90z3x33lsvfwve88bv1a79ped202llf8nc8vm11n251esqs515meuh8jbe8wzhdwtwwijiheuxvvntf6kwzbgcrfel706zgqmcgewpl5mj571k6o33548n31wwa6c30z4h9pwodg3qsjxq3r8t0fywjkwc1mmro9alxxnr1qxyibdvbbbivj9jxw77fornyf0dpvcruqz59zj2ugbn9pqmf2vx3ylussus21zqfdmravcvm3bwh17j2lmuw2l3ya6xnvyih27u7b35vrj2o8qmmi1yj1i0lsxz5tv1vw6qg3n817xf474vm1oqa1zhpan9cnlnx343q3kag3vdn9eandij959i3pmnmtzilwnc6pofo5hwbi8gashr9k2hpd4by6ffcj6ogy28s6fc3v2f4cmczu8uya8i8qw0x0569j03w6m0qrk2uyxrak4eqqp44qfxelt2fe1fkobk8o8jemg32f2y0007u7aict20i6cmgrejmzv1bthol04i5tj8i04plfedfns30c0qd7ogoulpzyeus9rzgavg5e6asamcl0xv29pn29gum1xkzg8rd787sg8vpt0jxga7b5ki8q6vynxnd7bjgq8iu0hjeyt8aiqnb8qv7rg7nov'
    })
    fileSchema: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'proxyHost [input here api field description]',
        example     : 'a78l5jl7cb29qmkwtzyll7fo7mlpadyiotr4rtdv9iksbq8jrp0t9jyn9amc'
    })
    proxyHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'proxyPort [input here api field description]',
        example     : 4786357024
    })
    proxyPort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'destination [input here api field description]',
        example     : 'erwzm8mc57fn7z4bv3h8fmgpovl92bjf57w155f8t9pwuvcoyn1nogdv3x0yyphppqvao35iudb7ccyemqu8v4rg2tyd8d9hxfxazayedig448o0ltuhdxt6sfdym9f741lh3bwjhastneayo8uvw71h4vrwf6ou'
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
        example     : '5fxsszin1gccf4jxik2dfx0p3phv70qsxoyz4guc7csjjyps4v7uyssc36ksma5vqm63o2n2ffq5gvkmkoqi195jl786pdz9j843lee64gt8nk35ke2luw5c4xyp0okxz21ryalbnpqq6kscg3yxhu8aq47xegvx'
    })
    softwareComponentName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccountName [input here api field description]',
        example     : '3kst6zb4e7d7bi8m9nrg'
    })
    responsibleUserAccountName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : 'brpxhkzd2reamf4kaglt'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-10-16 08:45:47'
    })
    lastChangedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'riInterfaceName [input here api field description]',
        example     : 'gec1ht6jeie039nii0633gr1r1cpuq4tiiinlvrbvvxiguf28ssxc3axs0h2cscjfdzdz9retur2w9q7uglvq7uyeamysdjnx6epsyim2qv6tc5fhut9xnkbyv91ts6h8ifr6epg8g2wd34qpnjf4kdicnc8dpbi'
    })
    riInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'riInterfaceNamespace [input here api field description]',
        example     : 'q7szhrj7xp0yghvalkkou064h922fflpnsuio95krmgt9xrcqnr60j1epfv65m47m0hjjxqmjip7urg4b1o7ks0vab8w7wtmthzvys7euhtdhnrodjfhul17jsjfozuoa7sfwlyyyxkxgmxrz8yyn1j2vze838g8'
    })
    riInterfaceNamespace: string;
    
    
}
