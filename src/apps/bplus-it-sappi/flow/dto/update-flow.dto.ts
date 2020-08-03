import { ApiProperty } from '@nestjs/swagger';

export class UpdateFlowDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '7f99ad84-70f3-4ed0-b44f-2f821dd07bf0'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'hash [input here api field description]',
        example     : 'vo6zhpcg6t2jaenlrr83l238on48k3viiiece5fh'
    })
    hash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '19c4cd7c-445a-4c37-b5f4-f1eb4f3eab1f'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : '0u79fsxn1b34wvcytqh3dgu4yy9r98n8p2n8jdmdk2419dl1px'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'dd3f8c37-7778-417c-9ed7-0c0112ba9cec'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'd0u057hir0xz8wbwyjxe'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'tes19n4ei2wx1ji3e33d'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : 'zqlqtfib8xxkji0spjovmb6hdtyanu1m0pzyq6o9hyjv1z6e1vf7mnc8zpgl'
    })
    scenario: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : 'ms9bjfyyd9lpo3x1m53qwf01ym5i82ruzxi5ol82ve9mnhxqz0k9fig0f80pnvv2f9njsp70ugjzaic4ihzp9ysa9f5k59yoeibl757yvk54vco3yrql52zg6qvdgra9rgcw15uxra8p7yp2kgyz3vypommcqle9'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : '2fe9n5t5cy86dowrtz11e8mkdxjct7yf4vvu9e43wpc7fs0fdz0l68mmjpnfxyaclhyoslhmxwai6w8pwm6bp8qcsaloxcxjunm1jh76wsfrckp1hs0w355w88gsz4m9o087wojc2zvicybfay8kg24n4vkv42k4'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceName [input here api field description]',
        example     : 'emovfgpk1vzxm7ef7z70kok41v53gol5jcezngebjv3mhrb1lrh1g2ahziod11cxk9dc85j0sp1x1byu509mypabvrvm7xmc2oo2oqxxifoj1cxtszta6y7faeksen4uxywuox2x4413pt2974vihkmsloarw9dn'
    })
    interfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceNamespace [input here api field description]',
        example     : 'k0w1q02ozmaquvolm3hcdeg6x4hf534yfo4z3he9l8adtp65migfwq4qlaqh9n9b45sjx9h2lnzos43t0qodwv32bpin1szd44o3ewsq4pu313wd26nr9m7fz1rsq0nb1eqimvr8ijgzceevubo5mybogqvbrx3r'
    })
    interfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'iflowName [input here api field description]',
        example     : 'qhhcmonsnsrap48jgrc095jyq2bpms9ir1wasw0kx11mdwqx6knv8h9k49sq4b3jo4vli7uhiwkw4c7w22uimr13qbr9sytjhfhzvuzp7mn9vpzaembskkz1ngg2g56ixxsplspdxin9eb5qhaq16djuftijeoik'
    })
    iflowName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccount [input here api field description]',
        example     : 'dm01x8osrecy81jylrz0'
    })
    responsibleUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : 'j1gs91wn7axxm09wm21q'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-08-03 10:36:54'
    })
    lastChangedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'folderPath [input here api field description]',
        example     : 'btp59v60fgc1yc4f10wz81difv07t8jh3nmx737l1x0ga9fqy15xogqq4e029obgam9pa0lnt2my76elx497vnpbm0x7kd4xlpi18lnp6pdeqfto30lf1b7d2nqm9ro2okyvekvad23xrvtldirfnud3lnhiqplkxnefcv8k3po2bje12e56mncceis6fowmbla3l7h0uq37s4dts2r2nnd1qx5693ufe7ffesteaxqazqt3ldxwlvnekrjimsr'
    })
    folderPath: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'description [input here api field description]',
        example     : 'i26b4hrounrcotrd5n6eqoo5ovjq7kotvmuc8u3ujjxgzqd1t4s8mazsd86a9n6mltqka68zqotbw33i2yt9qzqv3iuzsptv48z1uekxxjei4ppoi1v6crozogv88xzpk75hrb1qljosw8lsjah6t5hwe6prmucdc9342smkuodcaxmwbol6xuorjghavmbcpgsqt09af2ytu8lvxk6ec4k6fi5lgbmxbners9zi9cjvzlnsgxycej0d5xrbn2z'
    })
    description: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'application [input here api field description]',
        example     : 'w57t4tz8bkibnb1yf1kwae0jw498wk6xd5cnf5c4gioil61an1j8bmym9q31'
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
        example     : true
    })
    isComplex: boolean;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'fieldGroupId [input here api field description]',
        example     : '0f49570a-fb86-434e-85a0-9c4dd9688a13'
    })
    fieldGroupId: string;
    
    
    
    @ApiProperty({
        type        : Object,
        description : 'data [input here api field description]',
        example     : { "foo" : "bar" }
    })
    data: any;
    
    
}
