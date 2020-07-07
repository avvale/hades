import { ApiProperty } from '@nestjs/swagger';

export class UpdateFlowDto 
{   
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'a07a3ece-d864-48f7-aea1-f8a72ea8b1a2'
    })
    id: string;
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '16aebac5-50d0-4830-a9ce-4ecfab242f14'
    })
    tenantId: string;
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '37f36d7c-2f62-4e6c-b8db-52e18c340a25'
    })
    systemId: string;
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : '6xult2whd8up7bb4gdb0'
    })
    systemName: string;
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : 'h2xeug32nfaujj59e8vb03ymafj9e8dtsgx1g6pdswe7idmjnxa957thtvy8'
    })
    scenario: string;
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : 'k7xb1wuywqexo0oy1g90vt9kc5r03bw3sbsgvq1j8xyior30s8rzq0m7r2dfdi33m893s9yv9zifhuuls40bkh0latog6cgwz7hv5hxsg9njon453g83w22uqv4wtfce0b4jajdyx323a3gu64ef38ocpwzhbpvc'
    })
    party: string;
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : 'm1lpb5demrh9suu3o97ts9v59110k7n97uaqd41b9t0z0ofwqv5ry8e4pbmrq0rn4txobx5c5sqyrwtpjippijlwcmsp9nhgov05mr7kc13jsij6xrg53c5e9q9m5qzp7sgenf3yglln0pbnevvzbukd5sxxr1ui'
    })
    component: string;
    
    @ApiProperty({
        type        : String,
        description : 'interfaceName [input here api field description]',
        example     : 'mjw87uhfaa1ihthkohm8rpf0mwdqy74mppct142whii2ube0rz03f1t7zh58rtpvqskht9977mfj5leadqe3gu53ehtf2ulyerunhuexxs1rg4d6zqvn4qs881vmeurp6fa8ev6selwc03mhb7cy1p2414h57b30'
    })
    interfaceName: string;
    
    @ApiProperty({
        type        : String,
        description : 'interfaceNamespace [input here api field description]',
        example     : 'ddnzo3bl5op4wm61i5gx3dkfxv364sz51xwpnh74u914tfxezsb7aouapvcccmu2x737p2kn2w1yrpupl6yydrjgnv7kppysghf5e4apasp36ssedgor8865e1qlzvxwrx6o580yoq5f8r4m72c4r44mmpos6frx'
    })
    interfaceNamespace: string;
    
    @ApiProperty({
        type        : String,
        description : 'iflowName [input here api field description]',
        example     : 'b3ws2veam45yzsrtu4oj6k59p7qb9qdgt40cu83i1wi7b2g7q2tn97e9g32f3m2ea3yratk5rr3xq0qo7mk0znvmqqn5pzcvpfi1dm5yohpss11ox8vomw6d72k8qqy2owqtvdl5ja6c9jjespsm1s6giw4fa20l'
    })
    iflowName: string;
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccount [input here api field description]',
        example     : 'a0bawmyv4j0sx1q4cizx'
    })
    responsibleUserAccount: string;
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : 'fjf96k1jsdv3y315gc03'
    })
    lastChangeUserAccount: string;
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-07-06 22:43:52'
    })
    lastChangedAt: string;
    
    @ApiProperty({
        type        : String,
        description : 'folderPath [input here api field description]',
        example     : 'lr9xkq3t0p5npl4p9b7afref49uon80zq4m0mv72333na04diw3wwdtc90ys6171wsx2tskznliqj5qj3q4n3vgbw7sc6tlrwr2m6ap6bm28tho2vs48yi1a0zltfw44z8n0cebqqt1b4sfe583tl01d84stg7ui50p653hb4zdj15iqmf8fzfw4wp7dtarg610yg2nolzyys1lpbmjwar9meel57gqxpohks1bapjtd3zw5c78f6ca4uh5440u'
    })
    folderPath: string;
    
    @ApiProperty({
        type        : String,
        description : 'description [input here api field description]',
        example     : '2mbvah9j6l0xzzh4u6kelxisp12wrsrt6bp29p38e9keaztup4g20hxbgt6u44gjpdrozqco2p6y0asjxj3ai48rgz7cpduqe51zez0oq6z9w789qehnk8aznixe78g6tkn58j4adxjp0q3fqnononcqmwayc180hyiko70pqq6aaz7s7dcnhls6pn6gadjuer3o962jpraevwomd93472c0jkyikb8mw8j10ec15g3rp4f8bodibezhqirgqok'
    })
    description: string;
    
    @ApiProperty({
        type        : String,
        description : 'application [input here api field description]',
        example     : 'mnhaf5b8kzuztdu6x5kes0pumllzishs6dt1is7tnd7dvin7v5fto2gmhrvd'
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
        example     : 'dee11500-fcc6-4d17-a45b-59cc6bfa6477'
    })
    fieldGroupId: string;
    
    @ApiProperty({
        type        : Object,
        description : 'data [input here api field description]',
        example     : { "foo" : "bar" }
    })
    data: any;
    
}
