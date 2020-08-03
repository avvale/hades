import { ApiProperty } from '@nestjs/swagger';

export class ModuleDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '64685734-cd17-41d8-b1b0-96c34f75142e'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'aaa34636-2cfe-43cd-a83e-651c47420390'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'pblx4urjmjgz6xqxrg8zzscde6fcsaw1ayuip5vl1nvlto2m0y'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'b8609cf0-0e90-47be-8a34-6be9bf537ed4'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : '6og1ndieqjw75vrxtl65'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelId [input here api field description]',
        example     : 'e8a2dfbe-32a6-4185-bad6-e05196afab10'
    })
    channelId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : 'n5i5ag6lhcbd94uy1nxdaomjudq42hr7ha9cahaezohbd53lzm6q87kgb8e5by1pztg45zljbk0qytgn9kf63nvgnzakxqp2h3i77l8zopcs5kmpnx55qgiwrldk5bzxlmjqlvxt7sb5y1t0kavy9yxzmjqpv66d'
    })
    channelParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : 'u6wtj9u8u42acqfng0baoiwp1vrkqapvbu7bzdqfs3no56hmqmfxs10txr3zhwvw8yf4346z3vvnj9rh2noclyzb5ya58z9aargxw9rj04r8f5ue6wuskvp6x6x3ccpct2j7ui8vtcst0fhyvelfctab4ndn6f8m'
    })
    channelComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : 'q415y30q1mzwuuh1pjv17y6up0t1wq32yk5usocyovxs0yazf43mgz32nh7g6eojanqgjoi19mk4v1aidnpxeq4qy7a9ij4ekut14um85q2qjrzyux1ucd8mm8gwk39ygxkuyuqqdcfy6ysh17oxmyvit4czvqdo'
    })
    channelName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowId [input here api field description]',
        example     : '4bcb77f8-2248-4717-bf10-697efa4afa2f'
    })
    flowId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'i0zz5bb6lxp9l0vinv1d5otx771gye5cxjh92x70tv1k9wg3oq01a2m5qmpemdu3thg77n9msjbuw3fuom2gfyzogwedts5rtm46zyodcicb4jjaodtecj0u4wk34o1qfsvvx7mc2vhc93zwsjeasmaapft6ig6q'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'gzf23o15mfxvtbelr3bxxref9ehik6ndlff11gv6c2yvagtimrj5e8nr2jx6o57e7a9303444l73mkey3oyizyov3bdq24459jmwv2zh1qwv6dcjhfim5wg6y6i2czv8ay7ii7dw03x6ixe0ss9wn6jonvuxxmxv'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'bqbmfyskuz29xdzbeptrf4027awxq6f6yvhrhwm3e70cf5hytavmj0aqpioq11xp35soi3jy48skdgcr3daqdqx31wnw7nkewfidkont7deixacaer0vbogcie922ir6er4839nsgae57phw26paigsf84gpv9n5'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'do3i1o7zxx9mf5xovf9j7km1tkyx9tbc7w8tbfjojy0ql2nio4dqau16kd25p8v4423levzxrms0nwws3p7thw8hulzg76xzhw6olcdowex46xndmzdd4ma4nop6gdouidi11kj2a2xqwyhw7n57utjuhepf01of'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : '7dv1lqcxftjwslxvjlrm'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterGroup [input here api field description]',
        example     : '4vqr34mwys9ushciw6zt3wz8sbov1ihk723w8as8y8uc9dtml7wb8i77cx9wt4vc8l0bicqlrtqwfz569l0bd8u5u3pvj7j1746dp8t9tda6sp1iq4t0sqf3srlh56emj6i3qeuccd8zmgntvwbw08ck8gqidyqair48xv6avxw9pzbzbt5wg5mb58tql379hwtqu2rars44cs65e5xpbmpfj776r7jie4yxlxol9zpoem874f0x1j92y16d53b'
    })
    parameterGroup: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'gly9aedafccursgq218tpf3wwk06ca1ofsi14lmpzpdijzco2k641hzru6czlt7foilynzzv9ins39dn2f6ezc56babeipwt7eyjixz82agb31d8wq4wa2kyyxe7kq6d8dn8228er7fyh59dgef4v3lscmdxyu57gh45yvjust2o63vm9o301661872dmdh06yh3up35j0oas49qeeflg7303poc7ucrnmugp6vjdir6vhbgcwpsk3nk7he4ujupzm69pt5r94s7o24eo0w3tkodpgenp13t1ghx02lbrn0wvrcmnoeegvoz70oem1ia'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterName [input here api field description]',
        example     : '3l50uugulmirz8cfrbosdj7t7258m878o9y19fx8vo4bhe10li0apk7epbn3mqtommw1mvylfwxcbbelxn62ew2ltfy10nafjyiai1psj4sv71tnpexafgwlrlsbswumcntpvafidqvtylfi44pk0r7t3bgv64v8mfc4rd7n1zvnzk31kpce3quycms5swvv1cwkp65df84y1s6oq21otwppzomyrv2ifja1gnnvl1tr4vp91tiskwa421e0ln91slw2wifbinfz6ny8o9u6lw62yv1pdfkuu7smm3bwc6x9tbdg0fompvdlithf64gh'
    })
    parameterName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterValue [input here api field description]',
        example     : '7zags7hyuheh1z07kji8ddx4n6i6zhwaqolapwziw7hcfu10lzukrpi81y6fsnwwvxokb67bhoj1mjc9o3lqpr20n019qvlz8pr5d7isu4ztucis1ukfgjvjmjvyccyl21keax59di775qxvaktq1wml3w8yvuwsuzw3ududql6fwhtla5ussa9h4vg2puxr036t7te2ykaa1czbra9cyqqigxqz7s99tbf4x2kfoqkf3sl4bw5d2gj57vdxxb65kflg37zxt1j40igdvv9pci89wgiwm28nu5mg1cqx1jhfsbzvy2s09hx9i5l3ao7jga3k487vvei97mt83grl66mvssv7w9hz5h0aw15d2hgbj6qhypjxwi8i77ggsroickeojq0jolxoxfha6l0grgsxa2zoo9dsl72bhfj3x81kzifq822z11kzsi9u0wz7zjf75gzcz1pmqzidchksnfat7xchloths6oebnujora9ypxslbj02kphoxk1s4rt5jssuqv82k7uhrh1xi2rkjc31uec5mupsq13zrdw7hb1f5uuo8g0z8rtouzgwzphptb665tc04st45fz4a32e4x6kx5e49jnfwbccdzkte4re110p3k2cv0oxqyz5tijazj8oh02lhlrq7ynhols517cd51vntxf2474fr43wijoqgvxskufvahdckf7xm00a8b2vdk3n1v56vmv8pn8tpugq71x47cardg28bwmp0oaev20v1br70zalkto695pajb77youybdvs24fuaim1mij5uvrtkmgmdqsqt8pq7lee1gg108gldylra76225n4abgnoeajqb4jmo0v7j8dp686xawyfzu1e08zlsrkpkse4g2co3anc43awr308ejfr6xkib9p7l3j3e3nwz0otw2heo0r51qlkmkf1nazcbr75y0ibckmyz3qondb54lzafnx85idn92aiibv8jkwzhwn3v6nbmr0456gba0ifzkgva358f8avntokunp9ag'
    })
    parameterValue: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-08-03 17:41:44'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-08-03 03:48:22'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-08-03 11:52:52'
    })
    deletedAt: string;
    
    
}
