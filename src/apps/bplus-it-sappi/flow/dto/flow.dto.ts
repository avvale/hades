import { ApiProperty } from '@nestjs/swagger';

export class FlowDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '52ab0147-24ff-4651-bcb8-b0084ebb39cc',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'd32ae511-ac63-447c-8687-05a47a9c6f80',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'fcd3c078-15da-4412-9f89-10406c5be431',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : '93pwqyp0prxqw0ovltoo',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : 'qsem2ye92u59k1813utr4szw29zp7kr86avyjpt71gxrw3l0pp4z11gwqalx',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    scenario: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : 'vxlinb2vaj5zqbrge42c338r1ufl1c3580ecemekagvp7707lacgtcdnk443f5nb233416rwn0wk3k8pxftvh6tai0p0u1acpayu7upvoi5typd8xqqebtc8cqt0u4ze3jo1kpk6hgbii6vvu7mpcnbb56fwy3um',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : 'fy3ge8s5sqxztqugdsysb68qlxkqec2jn026e5n8ubcx1h9onnyg4v99siyuqmd954ld7zyen4d6euyvmcs3hm8se12lygaiezahk4c607x6wfooykoefeaje23ipj8zvjjot4365iik2ane6ga7webvzk2dvf9g',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceName [input here api field description]',
        example     : 'ph4uel6kkp9h2rg4xme6vxwkovx0rshmipbmv6ftkbipqbr90989r533cg4hiio1t8mqx4fxlum8cqe5vsyd5qnxazu9u6t66fzz8vuhpl9pygs4nm1g70obt8ln4u6sz6wyxstl5njkf5tihl9kbvfcq86sbo8q',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    interfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceNamespace [input here api field description]',
        example     : 'ckjfezjvvikzbelqbmm6zhripsocceaduhu6dhxdorgqqh37ol3rlbyvetqqfl8clg1mo6cmgbfe0x0qz7fhenfxymjgn407zww1u4tgywwv63nwndn5xgbpz4wct2owbheffamy1fg91fuo4sxgmf4jmnplnqns',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    interfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'iflowName [input here api field description]',
        example     : 'x4el67jt7nrizrair3i2v93l1fy54xv88l5hskp35vqeupzdu940r2ejf6e5540qtqzfkt1vv66x4fjftzj9f9rktu15jjpdoc05cetnn2gyyjq1pcyqy7arux7f9a6ubwgx1nt24i527w61qzs313aaoqn2eloa',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    iflowName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccount [input here api field description]',
        example     : 'rm4uhmecfgl4st1215k2',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    responsibleUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : '62vluq815u4sl3aczwbg',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-07-06 10:02:35',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    lastChangedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'folderPath [input here api field description]',
        example     : 'dii3t0plwd6p1rkowtzh55ibt3mdu9kbiwhtuv310f1k7hs1pib3a8krabgf9naob8xs0nsru6xf4ljrnv88ik1tt56g7crzzexfgt4o10eafxnxq2xqxnriurab0kmrb9ab34k84sfp7vvvjk83cgs3w288nrqonny69kxjaxam31zuyyfi9ymgwtmfol9ld22nva0vnfjf2327xpgr325cbhdvbre4iqg0aj2vwyea2ttedz0bzugpa7z4ml5',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    folderPath: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'description [input here api field description]',
        example     : 'abblqddmwhdmdmbk7vw4vsbq9v4m9zo6q8xiltuykdbo8wxn6vsqf7a1cdngcd72acoeso0mmg0iywfhn4ii1sbmre1jummp6rrwbnd8ve9rcemejamopfvz93pmo207wfrsnsmjaw15fqxm3ni6oi952jr834i0ybcsucrnpbj9q93pjxml94v19c9bgziffliausuv6d4nncyxknhzvuh6ttgu1v98yuj59hebymgrzu9wmx0wx11t7ugf1bq',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    description: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'application [input here api field description]',
        example     : 'de6xzrhiy3l4urwh6s7pithg03uyjug24dort9yg6z8lymlim034s8h5cgur',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    application: string;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isCritical [input here api field description]',
        example     : true,
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    isCritical: boolean;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isComplex [input here api field description]',
        example     : true,
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    isComplex: boolean;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'fieldGroupId [input here api field description]',
        example     : 'e92b3792-5b0b-4ede-adad-c9631564eab8',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    fieldGroupId: string;
    
    
    
    @ApiProperty({
        type        : Object,
        description : 'data [input here api field description]',
        example     : { "foo" : "bar" },
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    data: any;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-06 09:24:16',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-05 20:56:32',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-06 14:11:30',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    deletedAt: string;
    
    
}
