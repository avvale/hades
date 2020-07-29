import { ApiProperty } from '@nestjs/swagger';

export class FlowDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'b10b028b-1e7b-4098-aae2-18bbaf2fec38'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'hash [input here api field description]',
        example     : '4o7232evo0a9ookmvx2o8bdgjg8b531hkd8vk1iv'
    })
    hash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '48132ca9-66fd-4019-b9dd-620337ddbe56'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : '2esomw7nomdgco2lqiouhdh0pqxu61fylphk16bwo0ypkb4hiz'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'f98b30fe-06f8-460f-bff1-8d567c29fedd'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'avmpsjy9fxowex149e2z'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : '14sgei7vvmn2x44vcesk'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : '5zt9mjuckx4wwxkb4i1b6rd7tidy8u6yyo5v972jciomqpkg173azg3o2goy'
    })
    scenario: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : 'secdb7c7g2nw7uwreqaz7eb3ppqsnwokdd37z0mh70tesgtifghh5vuhqdj4v8rbpp9nkys0c61bagh6xd9afvgbmh8ts0oxy2et5ezct0wogqeh766ff7m47yhgiyztf8a41nna2fejusgh1oy8etcz3rw50slm'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : 'gq87eb3xhfscmtqf6q2g9i9zo5y6w911gh6q5yjjyzzllgtczwa87430ee2bffw5xwig4x8se6fcuj7rthtpmqz2bdhnsil203yaw89teuwkepeiedf81yc6fqkpzxpaumgwthmwveis1b09zg5c4e57lb609a5l'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceName [input here api field description]',
        example     : 'rfvkzlvma6l6fx8775wv8nk5dh80fsqdi5mcuydr0s92o2p8sidxaxpgic568m7f8qcidf868qdat7us7awfi871qioutoqx9b0in2qh72thmwi9q0bgc3urw2cllbdv4z0hfp1q3xbzn8z61buuzn0d0vcf1mvo'
    })
    interfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceNamespace [input here api field description]',
        example     : 'ri0noww2qizzps3xq7va6mqiy4abyhs5dlt5xxqxyi98lr5cmioco95ypcm3oektrid2ov921ugp6etyyy9ekvg5fypoonxt1fngfcy0eacxf1pukbm7gjvwkeb1mv53dku843hghlx01hm185qyfeme30u5zjh6'
    })
    interfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'iflowName [input here api field description]',
        example     : 'y300n4epl7gxeu53wfqouwdn0xvum27amnb4sej78nf55wll8e9ua6ew1bx3o5rjk5hc2etbje9uotl6wlc2yikub0ylt8621dg9mf6ig1jioin2t5avt2ncglmbmmp80k3twd6ngcshr1kjz16jxa5zj9tet8bh'
    })
    iflowName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccount [input here api field description]',
        example     : '7imevubs9gjpcqhon7jq'
    })
    responsibleUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : 'v1mkmfflv9cduw1lg8i7'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-07-28 21:10:48'
    })
    lastChangedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'folderPath [input here api field description]',
        example     : '2g7pmzcaqs9nm9e4lzh66nhnt5ut7visf8wg5i9c9wlosurz6rcooslb9rgxkyyhuyw3gne9y3w5a8gwzj95u77x60a2uwiovy1zfvmd2sklczhvxxhr4vm9zpfy1cyb3k2ra2ntirknavftqpt4p3zal1l59y1luqe9qwsuval7t3hqy290b1fy9yjpyxqahuvcg10s5tpfoow7ijo5r453oh4d48nng41ljcvt6088pl3cjs2yw7avw5ryteo'
    })
    folderPath: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'description [input here api field description]',
        example     : 'p72r6y3n3qvso4xig162vahpkphisejpn3svtsfcfwc3du6da2kv37v71nfu74ppriyqytbdql68vekusry60vjz2566mvk6b0qnzd1ewgsa657s42ugfa3w377srf588plb8x2zmijlr1m9stircjwhq4hq453uqhdqvm259t3cq5mzqtdfq3uagrfud9bvnne5ghkt2s8bstjv7e5akx819vfly7rwhx3x1n94ctobxjx16wx8py8ye3zmiz1'
    })
    description: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'application [input here api field description]',
        example     : 'a4aazn8fxsbta5mtn6wd7fi5mmn65t0qjvestuc0uenkqooj1623le47ffqy'
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
        example     : '0bec15a5-9dc4-4383-b536-3fa9e4446819'
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
        example     : '2020-07-28 23:07:27'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-28 19:03:01'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-29 11:27:24'
    })
    deletedAt: string;
    
    
}
