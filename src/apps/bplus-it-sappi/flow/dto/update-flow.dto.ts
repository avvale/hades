import { ApiProperty } from '@nestjs/swagger';

export class UpdateFlowDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '794001b9-8cf4-41dd-a73f-15418d3472de'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '782585c4-40cf-438a-b856-3d4028f1ec38'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'aq83idx47f61y11o4toyqascek2b31fpnb9q9tbwlkw8nodgbw'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'd2492e4f-c54d-432a-a1e7-5bf6fc002707'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'klnnd1zewtz2jv7mtrcx'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : 'lz7x1kr6vg54rom12obwoh7hazxl6tekxbufzurqtdsl2f0zyf5dqr8ubzwj'
    })
    scenario: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : 'fiul61mlvlqmq1c86vegm0uyzf2saclnrugcj9cun2leedz7se8ozr3kwv3vri7sn3ic8295kp41myqni6rdgdssvoa8qzfz33o2m1isy22qk6pp4y6admfi2sumusmzf784fbzuw6j8nn0yst94s7rk8ezfp3li'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : 'n4jhwnwi66m7y45ganvcka283wxrl39de8lrk10u3t7ylbkxcutyhf6zfaftpjomxlk4x8at3y4ec7s6r7rv9b6sikny9htyiwrgtii3cjpqmsnp4xttv5vupimfx0m45i1hbosmm914gfnr7bc1fsoa6jl1szqu'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceName [input here api field description]',
        example     : 'inf5l9ihhwbo21tzkt8b2gpu3i8sqwnwq8kkocnfq8gvchgfd0pnh2tyndn0iy8et1lu8qoig4sr3g2r90g3iqzxsm2zdcvbrc1ahrk0yctelu3xtv3zvbulat7x6wynilb702lfwb1im8kv4sx16271d8t0ty5d'
    })
    interfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceNamespace [input here api field description]',
        example     : 'ojqmroqijnznd721wjn09bbf69hve92gxmp1ismr1r2xxb3z4gz0zw8noyomcgqf88cgodi2v4sd5hpsba4itm8answvymc38w67e5col7c32gheclctzf5k5s2clfh6vpkmjex40y611skvi6clb1rnal4uw57l'
    })
    interfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'iflowName [input here api field description]',
        example     : 'lteienhe6h6q49txee56pvr1pls0djg9laffag0pjx0fibw120xfifs66g4vy0em8m7crmtl6sk0bvqw57rewzh1m7y9adlz2pp6we4r4f0kbrmpsgc5ywjter6q1innluowo510qdqz5477g8q9pd7ttlwyw5jn'
    })
    iflowName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccount [input here api field description]',
        example     : 'ael81oft1ai6wdmscifr'
    })
    responsibleUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : 't3sic4st9hb657awjy90'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-07-24 08:10:29'
    })
    lastChangedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'folderPath [input here api field description]',
        example     : 'hrzzoi85piw4pq1y03dfzw8l1kydrefmjl5c9frbv267tiyn3xdwzizkg1jwt885pf4qcbbh4nw96sozzrv40plbzdy7ca2egz31u2i6rv0x49bqlsm5j8c2p3598bauwa8zmcr4axt9cx2qdaok36wrdwdozpxr35ws49wq17weef7cwpm63wa3dgw8fzx2wjt0twm5ivnsdtk9f5qwivhwdwf3d00onpoqqbumx46nls4xc9qpy3pj46lh6j1'
    })
    folderPath: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'description [input here api field description]',
        example     : '1m2pzvikkbgm4ainmldjkw7x002if65rj09a52ds2kxob9nxicdfwu4tg4y4jnyr9tctuni5j76kojrurlr5621y38x9l53ob1wyh786wn983h2wnct2ap8yac7c1txfnzpryfj7kbwa4gzeveaqyrlstxbx8dtzl1ehxwkymx6nm9dz20u9n0iux4n7mlvnzff10eebmfjrvtj6qomym6aqtlg68ebwwtp67f0kivehtyncx7vptizxclspuhg'
    })
    description: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'application [input here api field description]',
        example     : 'lelzr9w270vs5obkkcjd5qt63nipwi6v3mxdjl3sbr45bfa93salo6kzasyg'
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
        example     : '9d3dc152-0f18-4ab1-8ae7-d75c5c6f7af0'
    })
    fieldGroupId: string;
    
    
    
    @ApiProperty({
        type        : Object,
        description : 'data [input here api field description]',
        example     : { "foo" : "bar" }
    })
    data: any;
    
    
}
