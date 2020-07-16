import { ApiProperty } from '@nestjs/swagger';

export class CreateContactDto 
{   
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '6e521ac7-7f34-453c-b979-6cca399cf44b'
    })
    id: string;
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'eaf0c187-6227-49dc-a3d2-eb19832a0bfb'
    })
    tenantId: string;
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '656171ec-fd59-46ef-b5fd-d64472f2ca81'
    })
    systemId: string;
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'gle5kf0ay3u13ob3minj'
    })
    systemName: string;
    
    @ApiProperty({
        type        : String,
        description : 'roleId [input here api field description]',
        example     : '607751ae-2828-48ca-818a-d079459234a9'
    })
    roleId: string;
    
    @ApiProperty({
        type        : String,
        description : 'roleName [input here api field description]',
        example     : 'k87y0mvqjqy0b14xhkv015jqh4ag3gs9g9n6pqufc73dw5yvreukudo4iutasb0o5bq0s82kdymmn51sfn9lmk5g4m7od9mw0ujxqzfasg534nxocdmx2a3m76rzntri9hs57xzphfy7dyrej0bgzx8rfcjpn8diw3649hl2c6tivycs5jg6210snswg2u2cmerj2om29o6cnvbbkhvlz2xi4rlo8fqsrjjmgl5leihzo7rshbq3v339cedrznj'
    })
    roleName: string;
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'ujfyzntnixgez8ibbyypovyu4ib1dt57xdqne9jki2iksp1kjasdp3dh6bokhz60k9b8i1yxntdbm1mhsb0uc3draony3e3nld1q6m7o1kjw3q4eubakawlg5ae1o31gw0e9ympv9nvrya7xsgs8v64e3wq9ued4tv1u63wyefnnamhdr8ntdl51o5j3humaiicawa3lciaj1audq46kw1qz27o1nis6jzqvj04543duzaf58kdllckohrv0sxu'
    })
    name: string;
    
    @ApiProperty({
        type        : String,
        description : 'surname [input here api field description]',
        example     : 'rpr6fal4hp3fn3yg4pwdvoyle9ar4p88hs3g9pou0cfwmciwp30higaxd799xywq9p34l4wpbmt4zbr5pisggx0f3i17v8qufu1144nszpx9gx3ps1gcc3azvmsavk6xnwzqxryrd5675rkpqo2po2d6y8sb7szoujrrf66g8vfhrakumkx0ktns3y9fint2iht0hmwieuc2ge6cr1ijteuwqjmuf4kb9xdcumeixctopqnfx8zinndkflhwktm'
    })
    surname: string;
    
    @ApiProperty({
        type        : String,
        description : 'email [input here api field description]',
        example     : 't1laioy72a1bbdsd735jc5fiq046h53hf6v43usw9m2zhdjm8q3n2lm8sv9f02mj3zrxxngg27ngj5ltiei8i00w9zki9p1u3mkjkgnl6qd5xvbyufyggeie'
    })
    email: string;
    
    @ApiProperty({
        type        : String,
        description : 'mobile [input here api field description]',
        example     : 'rsi13n3fxf786dwpbsdvzqxsi3x5hcbv9i7gcayb9vflqsyf114r1wu7rh2t'
    })
    mobile: string;
    
    @ApiProperty({
        type        : String,
        description : 'area [input here api field description]',
        example     : 'ttt60mnex97h0d29z08z3suggbqjfkb03sqwvc1y9k4fhx95tshbgxey1wv2z1173gl1i9f2sofo0ac8wzrhubjgdh9oxx8n063hjs1tbrxtags83tsgi490cgw3cbdbffqjbek6gjya1gd96jomfcexj6pvwpw7rrj5kw7l05lnged8063yptm7gezvjij4313z0uachtickdfwyd9siylanjrmx821n5mjoraopitf2d21bipeqosdghfxqyn'
    })
    area: string;
    
    @ApiProperty({
        type        : Boolean,
        description : 'hasConsentEmail [input here api field description]',
        example     : true
    })
    hasConsentEmail: boolean;
    
    @ApiProperty({
        type        : Boolean,
        description : 'hasConsentMobile [input here api field description]',
        example     : false
    })
    hasConsentMobile: boolean;
    
    @ApiProperty({
        type        : Boolean,
        description : 'isActive [input here api field description]',
        example     : false
    })
    isActive: boolean;
    
}
