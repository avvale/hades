import { ApiProperty } from '@nestjs/swagger';

export class UpdateModuleDto 
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
        example     : '6qftblwewe5riavii9kvwghqli931c481er1jhe5kwnn16jo77'
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
        example     : 's2uecgbwf3flss1bjchz'
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
        example     : 'mynavp4wmryzin40dgsxlxp487enqhmzumch5hv98khmbeplmldthdpymywpcsf71d7qeioeysak86ql03gcbiq0chubfiodr0y7er9i6w47q7olqgq6x324i544i9on1q4nhmkhtuqws9x8alep47o6naut1c7a'
    })
    channelParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : '9ax7d8tat718dxku8q5nvhbxci5gneo4m5a6wrk59odagqp0x7cd4sxgzi4qgzbgrszj70oi0crbfmvkwpnt7inuibtbc9gvr7mhll542bhzkdgms1rxsj0h7hgw630t41ti5mkdatxh6xa2wlne34tpx42703qg'
    })
    channelComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : 'rooamjdbpd5opgm3nvohyy3wb2g8q8ket6pgz8jcyr8c4ihkulqil16hyeir9sfismx2ikpdhheh7118xarhaopyfb6nhs874i05hto4rikdobtpz7knf5cxzx95s6zsacctynmewf4hupra7pphf7pwatp6e5ko'
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
        example     : 'd7m9q66qrncs2lbm9al9bkcaq8r6flytlwsef7yk9xthtvr54ofeyfh6mnzkqjoxfizv9vrlch31swkt85epwz59zc6avf3pfp35zg4k9ychxvaefsckviranth3ioq9wc83d11a06o9mkdr4mom4wtlj9gt43g8'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'ppfouvqcxr2c759k8a23x3qf2zcxwv3de2uqnscw83f14uhkbz0d82toskax0jtj8m8jqga9bb2hmh54j1lru7qxdeog2hjbab5d4qz307606nqx2ywt9jbqbexoak67yxl790jybpbo6eh6cea5x9jqf2nxwkqa'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : '2ojfywu2eddhssmm42dyxhra61kfjmusq8889vqqn9fvk4wvq5egu3zc3il8oloks202us4byt6t2qurywluw7icciio6k8ziogj7xgfho4oibp8ol3ve70rvcdpk0npyqmtygk48gpddg4wv3tagb2ygixg37o8'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : '3oqkdprtbbgot18gkh5qkzyrrf2pcrtsaa69c51nn5i1tkvnqvt1fipqjuyjcfwsb0fhmxvpy5lg2av9qg96gtztvse8lwjrxozf1jp515fut07fpe711jniw3mm2qbtwe83zk31k2b5fzdu5ry2is2cye6yn4yo'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'enxr4gxjf4t5of8r1bn6'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterGroup [input here api field description]',
        example     : '45ghgc283aaqty2ofzstob72wpxg5tcczbbu4p4013k1ivzfuoitb436mssyfabpc2bxwpmit634km7ovwkpqrfbww97gmjryslukgttki97jvj00vz5ukdhhgqi7rfkp145cinx0ssqfltgfbqbow45fthzbr7fwxdm44cz1ovl2qtgy2u7iatikk6z46ydhwsh92kh0b6ynytoejz40k9m9zum4wdidia88cgfme6v4akdvzzpzogy9flbcp3'
    })
    parameterGroup: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '1tqiupfg6z0619my2g97lvucoksr6hucpv820owf591ylh3lwh2x8lf45hb71b9qtv2tptpaq77kbsf3zfl50kbm1j94fpk48ixi1jcnfsae3hkh5z2y1initrlwhe3icp4c2vwkewa0rbvpnx83obgnffh5u10vls431rpeie0bklc5yhi0hgjzxntov2gm6bl7hezn40ekqmmhu3k27fj6u33r6n2i0wmov3kslodtmugb3qf0dythg2c89qxk62iusy1v47vaytbqa4w4sa54xv9phww1531ynh860g85qzmuoyc63i72r4wskx03'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterName [input here api field description]',
        example     : '4uhut4njuduefzt3iheefrk84wrllvh5jy3c8cc6tr5jxlrwaexymfwmonsh4lucx1jenb5cbuw2tcrtv3hpg1idi3ce3wotywwp7l2duke2kvo96oj91l7p1uwucckch3rfplhykjui2bqeb4d93rlgp1s8aaf2t5wb717nl01lyyn38giginunpuqspyii2qiq04pw67uxkm6zl3j62cy9eo3oe1s1c3y4e00nlrqbr8zy931puv1om1z2i7rdi3ikgmr8iae4bfgtmsbkdiyn6bcfa5dxolyc4narlz1itjspxgohr5ssrgoa65sr'
    })
    parameterName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterValue [input here api field description]',
        example     : 'j2z7dv693pkkksvjmimy611og1jfkb1x7l8d79mfaq1sc9eeyvfw9z644tvumcna90d7jj1pnlqewyl3iig2giupqb95zaghjhmmwkoa8upazih38370awr1bbn8owijg9zsh4ypi8v4jmeno1hbv9x2h3qjef9pcfpaj1gxa2sfdlxiqfu72lhvvb5kdz7h7hhgwfopcyz6g5m5f35c8hrc5i79jwgu8ofu1g6901tjuva4yofretps8xptnyxurdw7jeps202r5dyed839tb93vbe9g5s95wxysgdw76ysnmqhhcb0y80nfmwqenji85ehjb9n3p0b7svq3g5bg8xqcpvhcrbfxgfp6oyi9mem063pm0tf9qryochg7ojbtj2p6t4svtbxovjl0t4nt8r8r3no5cv4jlkzm9iz6o75ijask0p1nfeh4h0e80m8fgddban15fy29yd765yfk8d0tqinxqkdsalhc0vpsu2moazuzvo54cckf9ecl9b07gftvbvr3rx693c7ppjga4epvj3f9zenpeq9w556963kk15uakox4y68tatuodl2en3whxvdyvr66jb8dvgkszwl8rsedtev5wjmuq9bij42leuuxymasfhy07039y7m8a14ep928mgjnriyqvwflhyf0x6r53ii7du701pxp98c1e202u93e97vanigwjr912bto1pb3chw4wchod7voqq9ur6bddlpkws77lozwzhjcpmep8fuw6h41g7b55nxh7lnche9yphdhlwuzqnjg09yc9t3fn7h0r5r37cgsdvebszxf6fs7eijtdroa3sqm8dr8s61jqcbvd7uad8f21rac7xlabfbjxgq78opgsf3piwbcm94681k2cdz598u04b0z7knsw663ufy5cgvmhrt393tyhe0stuzf03e608vkl5r2licvk5oyzctn79ouimx3w92c3dtsoihs9xoos1g0sen6wukamw90hb39whc5cpswivgakj609090njw'
    })
    parameterValue: string;
    
    
}
