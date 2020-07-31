import { ApiProperty } from '@nestjs/swagger';

export class UpdateFlowDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'e9a9aae6-f0a9-4022-8682-4c8e0501460a'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'hash [input here api field description]',
        example     : 'jh6nqxye6esapadwdh8fz6k7guim95rrtihs2jhw'
    })
    hash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'a94c8494-b7e8-4cc1-bf93-8b77e8110c37'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'fbfu6fxl2yrfn0blmti6ak6ppd1ofm0s8bnp1bof1w9p57ic9v'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '7ebcfeb6-6479-47f8-9051-506ae6d3872a'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'vxo6icz1jxfnolx73pcp'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'cpfspsw18fpsz4s0jko8'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : 'hbrgvoutb56uz1o4nprvaubglegktkxhd5iz6tbxsr0sanqoxi0i91nzhsim'
    })
    scenario: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : 'mb6nbp0cosci6mgxw01yb0e8299ylpfq0klwxx7gobrwb8o9s33c19m8kpiafcrh4xsmojsf1pxi6bpx8k6m4cs7w0nnf0qzymx3kdrnxntqmq3zdr6pr77jvmyryz2saxatyakn4gp034au477r1238jkrasxz2'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : 'axhvsgmp31mtk9ztksg1hjf3c4fo591tohm9syldx4d9o0e17jiaqsr2vbqpfirbq6jxox0rneq9areazf9e8bzdp1ez5k5mwohxt4m46o0f0o4zbj64u6od8in1d41wxrqx0fmcxoqae6kc0i3rb5mq8nx5mlcj'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceName [input here api field description]',
        example     : 'b3pg2jcblz7rsvh0nt69c8mqg32v34qg9nfchqygiw6frl1bnskskxdr3o1n5u069pfmio5igqif5lx354jwfko6hlo307w55lwd8i069vu804md37ahszyxz0dzqnz04o5eahy7c8us12vzcpylucbk46uiurxf'
    })
    interfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceNamespace [input here api field description]',
        example     : 'auxzrr5b8icvxrn8arvpbdlpcgzi4r9i1iyqks02rwykuk0i9q9mj195abdnatsdlpg5ganfle1396hmbp4tj0g0631cyfxbkgq77o34gqrohsgmvxj00ni7emu7lprnkmfq7loj9ux49hyl2heul10jpbf5wy39'
    })
    interfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'iflowName [input here api field description]',
        example     : '7ddf7fjb80fyh7kgzdopsy5vbrkbc4hbisuju9lfssch3kea8p2ki2wz9zgp5pksbqgju9mm3mic5sedb5qjh222ecs3rluvtnhxvilow0uujv0coy2gg5yohaw35zeoypxjmbgzbdiu0hfhcq4enncw0u4ieo2t'
    })
    iflowName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccount [input here api field description]',
        example     : 'yn4jnjg0qlfp1nt6fvbk'
    })
    responsibleUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : 'y17wsev9ejhljzx2ka5v'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-07-31 03:56:26'
    })
    lastChangedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'folderPath [input here api field description]',
        example     : 'nxyocudhq9jibqw7eh7shbczc7lxizcsgb6g8ojvcc79bh0rgvfwafe6esf584tmusrs32l610usfkc521dcufympshbt2ywqrvmofmorkykbdde1ba0wzxgtbwva4o53kpmgoiixtu1y082w6hmzkydaemco2bgvqhaino29c4djma4ftn98z1m5dw6wl0rvh0djs60t6galr7sq8mxnzjravnw1alim2eiahoe09t31hp4319lwkfvhs8voi2'
    })
    folderPath: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'description [input here api field description]',
        example     : '1twulg0gpzpqtbqj81p1tw9wiy6f01aq6z76k3fiivctnuz253a7thobk15ymrjdlk4afgupzd3n8wqy2ah0kp1e87lr8hg4rdeir89hif2716ol4ul0ymb5dt8g4dguw6hgj43zbuei03jfca5varlbf6b78tmnc3n94xt3scsslswsvxu0w50wh9qur1565vpw088rsi1dwi9nkvfngkyvhtneldfssj851zcc8haenes1hagvdl6ggwjzehh'
    })
    description: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'application [input here api field description]',
        example     : 'o9lbei7e7ac566rf9mlg8e5ljbropbp87rqcnxbptt81fpwfme25humb79kg'
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
        example     : '106d932f-8e63-4b49-a441-13aec0deee54'
    })
    fieldGroupId: string;
    
    
    
    @ApiProperty({
        type        : Object,
        description : 'data [input here api field description]',
        example     : { "foo" : "bar" }
    })
    data: any;
    
    
}
