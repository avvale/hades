import { ApiProperty } from '@nestjs/swagger';

export class ContactDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'f0150f22-5d78-44ef-9051-af1f0e215b0a',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'd2966e7d-0ae0-4ade-87b0-55b8c2d396f5',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '121df1c1-08f1-42c0-bae4-4221ac7625aa',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'f6fum57zehu8khryuepk',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'roleId [input here api field description]',
        example     : '0db2de56-02b0-4e93-9015-bebd4285b8ea',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    roleId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'roleName [input here api field description]',
        example     : 'yu4lrdlji3ighbpg0mo9s79q427bfraixacyln1uqor7y4gtih0dfqs4abp9pr7y8hxam315pczvr2mi999y6d3ztm3e4wfkpacbhw1xtea5l4xgtgqfhffp6vkmpx3z008fq3mtjxdmpjdp1ce74ofutbkbm92a5msxax2nhex4kw39nb5tx0yr85ym0v8tc13kf71tqw4aq62rl3603b2k29j9d5jl211so00gbs165ui8ovkd3f3mrup8k9j',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    roleName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'ycbkw3dxizyqpxu3pqdko9wreo19s9vjjwgmdlntrizuen3dx7r21a5puwo6akeqyhq3g3iji71pjzf44aj7xnof069p3en46ofrdqe7tym0mmsnnias30a6vhcay2fmyyfxn08rej32h7gbbxq3r1674vkstrzxdcqza4kusip8ctk24op91zqe304hm5dvuk7yet9lhlmpopfwht00pyted63g1hcjc04gwr871sdw7wp3sve9reyj1mb52jl',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'surname [input here api field description]',
        example     : 'iqn9u4lrisuxbi2me1c15ff78ejx7tjw68ydxznr494bo190w0ejlu5ffgbonbcugtghk24xdo7ldlfs3a8d1v43m0qcermu5e0woommebzaogrecos85jkf3ieg6xdtay0rt3ju1o8lspii5bvsppuky9pc0l6bljft7ypjeuhq1ss4jf7m0eclq71m6lotknue5rup8xhhxe6xw4kv3jke1znw2z8sieywl4pabort35eoj9u75zdk4cluik3',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    surname: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'email [input here api field description]',
        example     : '4bn7a2npn8qe69jxqbthmieuh2v9b9f5v8fsqew5rkqcx0uzrbc5jksoapwu5szj9xf1wt68qa5p6nlv0wilnonmgx9fafj5l506uozgfzvas68ipbcwqrjq',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    email: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'mobile [input here api field description]',
        example     : 'dpeqn3kyjsvzhhjcuu9dqpqx0m8klxbtgu30il6zw55cw46jrkezgmtukv4u',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    mobile: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'area [input here api field description]',
        example     : 'm5aif0u77mny253h92a39klznx5t347uizbsurose2yty0qzahnyxv557l0wsx5emwx6z03aissyc435utdf1krlv0vbc89dssui64qhkwsta7221ij0v9gtrzi8bp206aemvwwy4vkspnxc6ykf0jd1aecuv8t9mtv2b2tns8nd8gogzykaslkx3sj6iqctg1bbz7f6oeqx3r01k3yzc1740l4o31cksejqkdp53gbi4d4u8lz4tx5d8a5xv9s',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    area: string;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'hasConsentEmail [input here api field description]',
        example     : false,
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    hasConsentEmail: boolean;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'hasConsentMobile [input here api field description]',
        example     : true,
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    hasConsentMobile: boolean;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isActive [input here api field description]',
        example     : false,
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    isActive: boolean;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-06 13:14:31',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-06 18:36:33',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-07 06:06:34',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    deletedAt: string;
    
    
}
