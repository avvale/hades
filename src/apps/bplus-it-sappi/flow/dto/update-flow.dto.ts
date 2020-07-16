import { ApiProperty } from '@nestjs/swagger';

export class UpdateFlowDto 
{   
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '7370121f-7db7-4db1-8d18-f949b51bebe3'
    })
    id: string;
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'c13e8197-55c4-4a60-b7d3-5061e48f7a56'
    })
    tenantId: string;
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '6334b1ff-77ac-4635-b471-fbe50e95e21d'
    })
    systemId: string;
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : '9p52g7al84isyvdoj0zo'
    })
    systemName: string;
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : 'm2h9qy27t8pc5uaia1s60qalcq5x88gcbw47lggpidyqpolz9a0em02a6gjd'
    })
    scenario: string;
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : 'pc0jeiug9lepy6ta559wfj6jsfhdeobdbg7ts7r1b1tfkg674n1t9sgqbhfccqie4ebko65e7ph04ckobn8ehij8bxc8ukwyxobz45ba2neu3p1fz1i2pr0l3mq2ez321kyuozmrte4s72k863cwnztim6mioosj'
    })
    party: string;
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : 'sutke4uiu996lianzxh4wjgmo0gpfm6ver3d8m0gbetbly8qxbhjcxjw2bq160oqfbp5piyxvznk9baakwjub12xeh9foor57qvwlxe2kozkzzfej8a7kqeeg4lvf6kcs0r3a09v26ar18m8np4nc7avqwhfajz9'
    })
    component: string;
    
    @ApiProperty({
        type        : String,
        description : 'interfaceName [input here api field description]',
        example     : '1di3ltiw77d10f0kmg1e45rw4ghosz7yy20u5ozwabyqjbpvpy6vec2qw2aykvpyz9iey21vtqp9froavuq288rkaxd21dl1kq7vubmrigdfgrs3nniastc8e1lsok0jl5amsv7umsdkmqxo01yb682z9ouj7o0g'
    })
    interfaceName: string;
    
    @ApiProperty({
        type        : String,
        description : 'interfaceNamespace [input here api field description]',
        example     : 'skr6we4ond2rofyn1focsk893jv1o5p79pgxw036j75xbcmuatihg8jlcct9erpg9aftenhupg0paikf83g8kbnryq4hpp81ke3dohrpejxdx1fbwb09u9rkkoggb9vjzh7uwcg8uck1zy4y0gqq697br1gv5n86'
    })
    interfaceNamespace: string;
    
    @ApiProperty({
        type        : String,
        description : 'iflowName [input here api field description]',
        example     : 'e4hoxctjeovan2hep3f4uifewxx7ffgimmrfdaj8syd9hetdyfx20ryb8ldunplya3g48pxciwg66jof3bpc4njjshh6977ja7rnhk19rqzue4tg3zj405wfizq0gghpo5zansrsya6avuujswrfmznxj2uciari'
    })
    iflowName: string;
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccount [input here api field description]',
        example     : '9pnlq2kjqs7hai7udz5n'
    })
    responsibleUserAccount: string;
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : '498jtyezt6tm0mdvrm39'
    })
    lastChangeUserAccount: string;
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-07-16 09:50:05'
    })
    lastChangedAt: string;
    
    @ApiProperty({
        type        : String,
        description : 'folderPath [input here api field description]',
        example     : '460jz95a83pozei4tsn1si51mvh98kbynfeymltyqyqky9xiaefl664dtvwa556gjoioduiubdlnffm4tq1bipnhgu8ze8ye8pjkzaqbe907mk2u0n33uhzgsdlpwxfk8zkbqevvchm9hqlgan0awgn5bhohdu3lgi0cfyc93c3m32gdno7zgngpvijhg40x2zno6bbpwg9ob88674au2kn6ld0zzdjo7v143sf23km4rlg5li5uob04uidk4uu'
    })
    folderPath: string;
    
    @ApiProperty({
        type        : String,
        description : 'description [input here api field description]',
        example     : '7bh7uuxwgz9jxszd1huubp2zrbjb75dtcu44n1c6y0jdr9jh3m5erq6tu42sm83lkbvo20hufkjngxcfzgagpkw5eu0nvx86vtlyzlilvma7rzg9qa94l4r34mjodrjiofxteo4ijzaiwb80rxkp5tmk7vmxkp7e4b5ir5janpr2hsayobs2ki8vijjn2qcnmtx8zt4fv7g8ohrtsez84sy23273efdiafznp8a2g5pf56oibjkcx2uxv8m3mp3'
    })
    description: string;
    
    @ApiProperty({
        type        : String,
        description : 'application [input here api field description]',
        example     : '5q8dy96bivu8zle9r2ph8743ylqm41yxjfew08q5m2gthwjie0kpvwfcn3x0'
    })
    application: string;
    
    @ApiProperty({
        type        : Boolean,
        description : 'isCritical [input here api field description]',
        example     : true
    })
    isCritical: boolean;
    
    @ApiProperty({
        type        : Boolean,
        description : 'isComplex [input here api field description]',
        example     : false
    })
    isComplex: boolean;
    
    @ApiProperty({
        type        : String,
        description : 'fieldGroupId [input here api field description]',
        example     : 'eb72687d-b23d-43f2-af77-153dbbb6f19d'
    })
    fieldGroupId: string;
    
    @ApiProperty({
        type        : Object,
        description : 'data [input here api field description]',
        example     : { "foo" : "bar" }
    })
    data: any;
    
}
