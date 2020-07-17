import { ApiProperty } from '@nestjs/swagger';

export class UpdateFlowDto 
{   
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'e10d268b-bd1e-45f2-9ded-8357f70b1b20'
    })
    id: string;
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '2ffdcc30-f31a-4219-b72f-7bbfd220a38b'
    })
    tenantId: string;
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '51a15258-4069-4429-b84f-ad11c9664dd7'
    })
    systemId: string;
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'hxhhzj3ktrfe79sfiebd'
    })
    systemName: string;
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : 'spzyjzn619nmk46imr4hpwx4z9sikgiku26ho7kr8j4ghmxu90o9y2a5uyeh'
    })
    scenario: string;
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : 'wtrxyvqorwudsg4wcub0fm0lfcfqd78jz1nsv6gi0m10y1ahjwgwvug98yemen2df1pil5oply5hoe8jrc3fdzv9rn2jg5zywd1eobe07agmjt48dxf5spa0csgeqzx0c9lhhf6kyoox95gfqolfzuy582tblqsh'
    })
    party: string;
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : 'm7l67sj2rxhqw6jqrw1e4yoyclma46uhunve8xtxm0zsqd79k3tvsqge5ol07tilj70kzbnir86nyi748kkxv3ro74ng0wt55nunbwou1nf2v25cd4zjifjnak9f0qhrb5e1r19pmh7iswjkuvokmog581xpeou6'
    })
    component: string;
    
    @ApiProperty({
        type        : String,
        description : 'interfaceName [input here api field description]',
        example     : 'eygdakxoiiaodyi26m28sm90ivir707ieuc45xri2h8gaezriqxhf8l30bjs1kgpiocwvn6i8vv6s7zk9qaurvcu19woi893h6bqat4or6fj3qjdqq1fxexruzg64cckysuim5x1zm0hrhupsq9jehzyud670iih'
    })
    interfaceName: string;
    
    @ApiProperty({
        type        : String,
        description : 'interfaceNamespace [input here api field description]',
        example     : '26nh86a7t1h5i1fc0cc6tdvubf6934ek1l0dh0mcbxkcwlievco59o237hngivkkfqu4bnw17xlf8i3tjsw2a7lp8l0hmig389fb5gkuk3wrrs961i4nsj45deyow2smgi6vs2tw0revsc8jdll4ikqz9fnvl9wu'
    })
    interfaceNamespace: string;
    
    @ApiProperty({
        type        : String,
        description : 'iflowName [input here api field description]',
        example     : '2xk97hdq6go6kfnrqr8motp4z3mzmum3orcrkbg4gf0qv2dan922m9yy01bqbhbnv26sjnl0yi9i3xdps4nx2tznl9cg3uey4w64ooj3l0uvbh9a667k7fb99rkz0a9g2icc3b05mscegv8qc0xv4nxpd2td3oiy'
    })
    iflowName: string;
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccount [input here api field description]',
        example     : '80zv0ey8nuzlm9586nie'
    })
    responsibleUserAccount: string;
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : '2ga8rsj23lo8izy4i6g6'
    })
    lastChangeUserAccount: string;
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-07-16 23:38:20'
    })
    lastChangedAt: string;
    
    @ApiProperty({
        type        : String,
        description : 'folderPath [input here api field description]',
        example     : 'vnvosewnxvev37i56nzzxkd0soyayqqw4j63f4yuatu5ygpyk1yd6dv9hx7mf5jsh6g7fti6bn8ggjl2h1garjvxorwkxj3cxgt67zi4ps51wpk7rruwn7shpktodwkitsdyapoyl7ns2l8bi3b1n9gr349u26exzsldo9bkabq0zem8bm3l9ruhj0j8wdrr289zmt0ri8uuu2yrq2yjhstgdanwcyukjj4i2li5malzu6h36ci7wvdpv5wj3ts'
    })
    folderPath: string;
    
    @ApiProperty({
        type        : String,
        description : 'description [input here api field description]',
        example     : 'qj5t50ks4ct48103agzkde3pbt95ugiz07agg8brcwuexv11kce76oljs8wekh0r8tziwmjdrjdnrr8tvkogtnpag390modp8n0pfi7mov588jn6b08718b50nsl97ok6x1k2chu5zebbyyve23twt9irrsivjtqo1h3y6vc9zf3av1srd9di629irhq6n558vx392pz19swzn309rrofpfwkwz2psup8ls26ycvkfkx72q7na1c1s2ecjn78yc'
    })
    description: string;
    
    @ApiProperty({
        type        : String,
        description : 'application [input here api field description]',
        example     : 'k4kn6m9e63rwqypb2kyyd5lcupj38uivdyhgcg925wrf1ibqz854lxlee01p'
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
        example     : '53822b83-7ad8-44cb-ac0c-b809c8ffb81d'
    })
    fieldGroupId: string;
    
    @ApiProperty({
        type        : Object,
        description : 'data [input here api field description]',
        example     : { "foo" : "bar" }
    })
    data: any;
    
}
