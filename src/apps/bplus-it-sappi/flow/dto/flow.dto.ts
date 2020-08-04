import { ApiProperty } from '@nestjs/swagger';

export class FlowDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '55510c84-cd62-4db9-9935-e23121ce61ec'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'hash [input here api field description]',
        example     : 'wyds104ye4phemeymkvl5fle3exvg8iq32ryvxlf'
    })
    hash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '3faabd66-e34f-4df3-a4cb-53f9f5cfaf2d'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'gk4fgn0962lh8g5qjvm8mt51vkomvouzodr83a9gpsffr5ghik'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'b3766561-bd36-49fe-a736-5f6d8f8298ca'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'lhq0znokopzk41xhcmrl'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'ka1ebjd4tpar0nzsu1be'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : 'dz9duu2vgtb8mo4i3618zg0n9f779l44xpp7evfstlgw59ndfdseylkgbmcs'
    })
    scenario: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : '6mljk8kpcq3l5nipxm90k07v2m36eoa3k4a36j47a7864e9javx98pvjck54tqpxbf16ntv331p7jnnj2x15gzyrjwyclbuzipcr64yggc1chvrsmkze5hedf4fj6k07lm93700reuj6oribeqgem1pr5xz6g29a'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : 'aqm4hk9yepua7ullo0zssvnhxv5ww6kr7blb1lmu60p6gtly7yogfsqbn2ug7ochawduq0e7y5dkrsjyzgl1qqy2fm7j3au56zgkani5prlhmb5moo57w2vzzbvg76d9df6daujga2sq0upo7akx2fm31wnmpncn'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceName [input here api field description]',
        example     : '0zl04nyfkug22noan65ecb85uvbm8r8i8tqj8vv46ojd8zr69hsizooyci1ylxrd69tpp9lm9hpyqxmf4fo2g85je9x9633efnpv3ltxgjmg94km7vd8q7cjqzon16u3giidm1j7xjt2m96840rl60w3o3w6dmbe'
    })
    interfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceNamespace [input here api field description]',
        example     : '7pdvp99voq02gyqsnccx0eqz6npb573eihmyxtxz43k2bto3u3rh97xy722r3mb5648zy1ni6xugqt75jidakhp93zlhe0kctfk4mo3qx3izfjbijti766f31uballwlo5dudoj4ufuwfrgkv3p8jvzbkt0odfhr'
    })
    interfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'iflowName [input here api field description]',
        example     : '1jshgh15ahnvh1azyzdlsj6rq3nna1h3jgp79xjzbqfudzv3k3xh0h4h2mvnfo64acobeirpek1g3ra0br9a5u7z4m80gfa58jwkb1vl3l5ydjt61h7dovqzbsol29a1h1hb46vwb1y4u1irsduy1ydzvwxxxwzu'
    })
    iflowName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccount [input here api field description]',
        example     : 'd5fhvxgkr4vdkb0q6x8q'
    })
    responsibleUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : 'u7or5yc4tzsjxf31m023'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-08-03 12:12:13'
    })
    lastChangedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'folderPath [input here api field description]',
        example     : 'pej1yaci52z7kbfpgmhz6ra4utey9anml8uxxsf4rii5qs5m7m9g59fs86u9c1tn2s1keeddqok4pbcwlby088a3sbaowsu61d5wcq3gjzvi88hoiyl42adwajz9axlqtw93nb0gh5gxd2yynai0h201owjn4xw7nsxxnnjrzf6f8pol226v925oypkymdhao9i4dxnzl6mi69budgrvdz02und2uqznus1czaaknmer3rh8r31284bu8trqsjt'
    })
    folderPath: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'description [input here api field description]',
        example     : 'm0eg8c2c11lvso9x40s36zfg2aljsokgfe0sqwvzxwttypvfzi0apshxvzbnywpii9e4val0v9vury4ksh1g9mv5hcgk9596cc4qyuanxdinua6lzbftaxaiblghl8561dptkjiwmexunfo14vwlgb5hnr8al69dk7dihhoy8mndo6zsny80p32pmz7ru15wbi4g9eiuzbqyw11bxuqmlypp621d9wke4jbpbxnhoe9f1h4fgjrkt3d74o59gaw'
    })
    description: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'application [input here api field description]',
        example     : 'haomn6nno6ex1ztzbpml10u7mc7n7ulfyzihhsno8qjtr3uee2snmu0h8jel'
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
        example     : 'f403744d-a5e4-494d-9d50-9551f66d5acd'
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
        example     : '2020-08-03 20:01:03'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-08-04 02:40:46'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-08-04 01:33:24'
    })
    deletedAt: string;
    
    
}
