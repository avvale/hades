import { ApiProperty } from '@nestjs/swagger';

export class FlowDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '1e830191-6cc4-4500-8bc5-1390347b5b98'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'fd68f554-6eed-4217-970f-0bfc51a4c4a7'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : '7o4ylrq34no1gv4m51lr8dbqz2abz41jv6sjt3fuqggtx5y77x'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '5b2b50b0-ecb4-4fba-b688-b086e9d66d2c'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'ovndorlpry1rsq7lleyn'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'vtwhf7bkl5rb8o8qth8g'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : 'fnat0rr6esbe41ovf3zy2a8uhbo7ccmsr1pelo0mgoodg5ob82qhv05zc9gn'
    })
    scenario: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : 'dt6nqj3q9z5z8713z3juetsaisq1tp6rbuuysgmn73zmlmsdquzs3o56rxi72q5k1tno2m48ot5k9xq4dhk1s9bga5ypeyeejmb2lijy7oa2rh3blx970ad6ee2ei3lxu8e64nbcgg94b9e24ppdc4z1yirg0pxj'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : 'c9elc02ujbhhoiigtofyfiexcpeonxf6azq417icaz6p49n54s0zxlm879hudt8r918tvzmqarqhourzlkshd2u2so5n7p7fl48w3tbtkofmsf9o23thfrqax6errxzzvfgwq3jl968r2a0gppz6pj2ymmmkea2u'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceName [input here api field description]',
        example     : 'qybb2mxvlk62davhp8zo1sq11rr3s48iqi9a2epfri8lmm2omedbzvgmiur8zur0iczxcm1orwr36tckwy15qolfac0kr76u8xzj7saw1qy19vpsdan0hznhcjyl8c0nejx5j64kfnodx5nwlju7klc1klh6i7qd'
    })
    interfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceNamespace [input here api field description]',
        example     : 'f3jm0sqra34usa86dzgdqptb9skui4s864seff16llwhpawzwbwj573cg7e1xy6898xis4t85g3raf7vveyx5yfnqlus4fmv46g7n3dhs7v8bmn7lt7j1ava3qj7yt42k9dbethboy86rypraa6fdips68nmuhj7'
    })
    interfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'iflowName [input here api field description]',
        example     : 'q7q4ze1x0yinpe6nnrn9z297f7ul4dtcuyoulouw2mfv95p1mv2l7g3qdm68r289mn0xvgvhn263lmzt1yka4kfmz9ij0wra0i3c1pd10pqcqb7ndeb2qcmo0gicboll89l29kfrx0hp6t8ym6pxxsa6s81adbnm'
    })
    iflowName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccount [input here api field description]',
        example     : 'tqwn3l2uof1fhd60kzv6'
    })
    responsibleUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : 'usve5nhcn4rx9uqtav4s'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-07-28 06:03:27'
    })
    lastChangedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'folderPath [input here api field description]',
        example     : 'uvt8cjlqeusgb8as7r56r9okz008pr6ap4saz76lb0h9m0b7he4ilxlpqj9tnwwxhlummo06hnn6c2q68ekps6tuqukn043k6bjzp26iesozibk4uhozt0h9b5y8s283fjmbsnumz94q2ksorzjarusrqcqae8dtf7v5muwr78879lgwparceikvhmnhg3sa4x3yu6c3uugnzyjgb6m34dwuu0f6n0ih2kbvdei5ohld7wvmg3rtovmmi9v4lpu'
    })
    folderPath: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'description [input here api field description]',
        example     : 'pb6bqts49omki4mqrrovmgjj24d3vwhfyjygwy8cir9ye1cfkfbye688jwn8y0rku3o28c2y2gibb3xbdjfd61rfuv6uxgkxun2cz7wh79cfwpiwxwh6gkk9eail4mly4heg7w7yal2b68j2uol3xves2j9jzm260dvo8bq081mkutbnskn775qtu7zlsh20ovz9lidmu0lsdrqhpw7io7b55e6nfun0nkjoz6b91y1vdcd48dlawm9v9tch3lc'
    })
    description: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'application [input here api field description]',
        example     : '3rfpvn2lqjv3g45fbuysslbjb0qbqajs4z0xururk8fzrg4phnctrvqoq2za'
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
        example     : '2e910aae-f108-4b9a-81f2-fdd2bfe96927'
    })
    fieldGroupId: string;
    
    
    
    @ApiProperty({
        type        : Object,
        description : 'data [input here api field description]',
        example     : { "foo" : "bar" }
    })
    data: any;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-27 20:14:46'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-28 09:46:38'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-28 00:33:32'
    })
    deletedAt: string;
    
    
}
