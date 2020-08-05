import { ApiProperty } from '@nestjs/swagger';

export class UpdateFlowDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'de0f6cd8-466d-4003-9d01-84c94bbf9f40'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'hash [input here api field description]',
        example     : 'ztkiwq9k67kvozghwdvz31nacya7cxovznrcpqmh'
    })
    hash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '425ddd40-ebca-4a69-a093-3a3f40233b07'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'o1ihsoi1z4nqypbdulhafvrnls9lzgg0jhw56fgn65vzzjj75n'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'd506aaeb-0823-4cb4-8dfe-9cc06ec3bd84'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'ld6a9d4cvth17iszjrd5'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'i31knm6jhz55acu6wbxg'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : 't9c66fc0w1fmcy4mzmt8ty326brizttzy6swwv16eik27rapuzvqhusb98lr'
    })
    scenario: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : 'n3a3hrz0n96qznamwagyuk83hzye259p2avuo9ogoqr2dz57vhdhyiyhz0jl0enn3id782zero4zdxva3kupkjf5628qslszra2gfxp8xzvdmh7yasxvdo46np1ewiyztsezgi8drdqlkyhz5gce7025m0gsa78c'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : 'm5bou3athfr41jbdrcnbeihy22gx0x76fwbc3e4e49slyr2y5tsfzj0ozrbo1xtdm20d7lrnt47u7ojfwgg8o1x95vkit1pti83jf233sxy83gxfa9nir85l6auiwuppad1jlx4iqc3yjkso38px7v9h7p42ctcy'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceName [input here api field description]',
        example     : 'g9xkd4526hyrkrjss5s5ipigldhtyjitjs9nr690t3gffqzaf5worcij8dwgn03dze6fsckbciffm655woe35syw8dcluojc9qh67l4g1l2igepdpdqpt8mjztmna74mo4tzw16iwmo2rhja5m0t9423v21a63fo'
    })
    interfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceNamespace [input here api field description]',
        example     : 'shwhu0nw7lc7ye1ll6jvvzstp3mt8rxhanr6joj76qnu2wmc9h7tjbyy2s3xte9hp1qkc656i1na6udolieop8h7vvreczali57wtn08u0dj7dy4gxu9gmwtzd2tuin9zzcf32a617t30rcdvpkx5fp5jvpjc7if'
    })
    interfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'iflowName [input here api field description]',
        example     : '4xghkn6f15mt96a9s0rdrwyqnk0x6fpr8md3om54jaqwo3t6h744xhjnkffcohkuzgfytn0ve06erseeh3v0yfcsaa81oc3w3tf3hpb6a01liw1v3jwmmbd9boxv588iii4gxu08rafvxybngsim2s32jr16h2j8'
    })
    iflowName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccount [input here api field description]',
        example     : 'nemg0mydf1zcmoosgz7m'
    })
    responsibleUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : 'se8gsy6xnbp3zbrsuwvb'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-08-04 18:17:09'
    })
    lastChangedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'folderPath [input here api field description]',
        example     : '4wz46zjqwq7sufyi5nc40lyyuiicwxkvwfflqjvil12rg15p75qmhpgsjrm7v1gryhiysystmw994689uwxto4cweu07dfw0tcupionftaesmg8wqarsh3uqqj5ptr8av2lvowvxnsfdq4ynwamtmloee8ug5dvd1m753my6wfwabpcyd7em4ek17taobnaad1eb0oo7rr4eo39fhxxkhiw4aejr804ajr4b7mrl5p5scq1oo25f39o709zv0r8'
    })
    folderPath: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'description [input here api field description]',
        example     : '04sce0h1ri7cnn2byji4jye1m4cucdbtnu38p31rxisa98qd7hjz72o02zxrm2gzvknrbeo49xot31w127982p3br8l53m7lfkzl0loxzb6ogfjd8sq07qj11106rhof57s50zu01s1glko0z2xz28dzfcqulp3157m5ipbuojsnikp66kxi2g013zmmfhujsg87t6btsmvjutdlb8kx1e7w0n3j1tj35bsrwpftyod2nfkpz5fgehsv8k5dm45'
    })
    description: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'application [input here api field description]',
        example     : '6w0spxqgb6huz521oxy0823j7apngivnwul9kn72hb1k5dk5upu37joafc6k'
    })
    application: string;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isCritical [input here api field description]',
        example     : false
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
        example     : '41263fed-cc67-4ac0-a672-06fbd28045ed'
    })
    fieldGroupId: string;
    
    
    
    @ApiProperty({
        type        : Object,
        description : 'data [input here api field description]',
        example     : { "foo" : "bar" }
    })
    data: any;
    
    
}
