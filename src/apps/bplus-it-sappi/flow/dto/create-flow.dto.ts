import { ApiProperty } from '@nestjs/swagger';

export class CreateFlowDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '049dfba2-c985-4a0d-9349-eacd2961a92d'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'hash [input here api field description]',
        example     : 'hgjaoat0lt5gg6intfs4a4s8995mx8uvcl48xyfh'
    })
    hash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '79b12cad-c428-42df-8f7b-411f865c3f47'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'TECHEDGE'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '62c34638-d7a4-463a-a635-5f070479bcb9'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'jfwgt6nju00tpunyey9f'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'h5sbqwthbjhlxbibzswk'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : 'brgeqkcw1q2cd39msy71swzzxaflv7hkjfz7lu948yid1y6l2co9vb7glyyi'
    })
    scenario: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : 'qn41wjp3qxkgwvw581az2bb44n120x2efy5r91xivcd1qjrwjhizlp9sb5hsyhxxeowwlfbctuv1lwsdnkijziddfheuwpkp6jcu2ptry1b2qx7fiybsv1nqxwe5as4vsinlkcpdvky1il8ytusvmn9e91j5jwpw'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : 'lw0drpzujbwq4ap53nj6qumle1jrh312gq9eoocmif5478dpsgxuswj7v7siuordidmcxjaj0ydmap93fj7e2rv4ai3zp3flgfkyay0c4vrzs8kgcghr46wi7pjt8w5sx0xhov0lodbtt076wfji6scr5t7i722t'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceName [input here api field description]',
        example     : 'mtyaf7pep1j9lsfdjxzdjepsstox5vavgn9uyr4eg3y71x55d957is8p13y0y5ioqe9g3mj762t26302417ges4qg7q8fsc7d5y6dz2gdl4pk0g8o32hfsqr5qkpb2mdzl5hktlg0qbt5o4guysduyakggjbcjg3'
    })
    interfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceNamespace [input here api field description]',
        example     : 'njcqyhijd828amayqysk4cycrde62gmxnplemeamsqjrluzp3s8s1wxme54tb7ftyhp38qo75pl1oehvchtmyh2n5nb186dzlx3d862ozczpnujkwf2svc5ccanmdapgwk7dk25kcfu5cv250ja59lhqyl9lpry1'
    })
    interfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'iflowName [input here api field description]',
        example     : 'ds4t44sa5fxls3rlndmorm1r7eq5ef8m5jkb059wf0mr2mf0lhjw8if8d0p70tt4x7omhycf9o2sy0fhpcnachfkovrct9yg591i1u9sp9g96b2lyyu6wx4g9hgp63luahdvplmymb42sd5o5jb9jxx836n5afld'
    })
    iflowName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccount [input here api field description]',
        example     : 'st966ds7vfjis0suj0x1'
    })
    responsibleUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : 'xhsgd7ndlnf6diq5eyt9'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-07-29 14:51:17'
    })
    lastChangedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'folderPath [input here api field description]',
        example     : 'ywkgx6r1a9gr1en228n9mwicaie8fgrehcti2fhu9bpkkog7ejj3150w41xx4e6aus9oodnsdk0i5bz0r44nfgyaouuere7r3cdn6qwzqhuka5qrjg8gi2etezlfz2kii5h096aaguf1d9axf3b9jshdanwjanq5wqqk6rf9pzii4l6l7te2wfc0t5m0w6zq49pzqj825a5ebcbeh1wjo4cejggibg7xtcyasepb2iurx0xy3aizlyz3v774o1d'
    })
    folderPath: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'description [input here api field description]',
        example     : 'qcqe8uma6bxcbuuy7otb7lsm85e0ju5bjc2bh6onbtf1e0ipb1g4aes5ywe7pkep2a1chdm0knmltwe2z5y2gbnt5r3apff3wgbgt0uno66ieeld4w338gh5eeifxfztzvw4hh1yrqe6vnmchdeqob49abucdtb8cpwggn1i2e3fda5sg8ziad9vqu1fatftileeqk4vtd5beoiylbfgh7567pmptt5e36kas9ugfjbj01ypbudlfwzcsumhzub'
    })
    description: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'application [input here api field description]',
        example     : 'ka54or1zvargiqwd8dofqzkeyx7pzy4ydljuvre5s6j7nmhz0jkzo8af07h7'
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
        example     : true
    })
    isComplex: boolean;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'fieldGroupId [input here api field description]',
        example     : '3eef28a7-6bce-4ae3-90fc-e9b5f58fed2c'
    })
    fieldGroupId: string;
    
    
    
    @ApiProperty({
        type        : Object,
        description : 'data [input here api field description]',
        example     : { "foo" : "bar" }
    })
    data: any;
    
    
}
