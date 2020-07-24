import { ApiProperty } from '@nestjs/swagger';

export class UpdateContactDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '2035d416-8470-47b9-81bc-b04e47fb2331'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '580d0264-3741-489b-8e34-26bbd434caf1'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'h65htovedcjwok2kgh3nw9jmhtcc4zeoqcfi47a1sknd8mrek0'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '11386785-b7df-4a1b-9ad5-72a80d67e95c'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'w8iylkug78gzxd8jy4on'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'roleId [input here api field description]',
        example     : '30f03758-c225-422b-8bd5-d17425ca3e86'
    })
    roleId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'roleName [input here api field description]',
        example     : 'acze60n9tsmftr5kpnn9qs16da179imjto9ehb86r5n3plmnwmwh4imti35ex1ues56e4f1kz2fo3ud6lqmxkgmaaok98h5i52rq023ew76tn5ovfj0nve70wkw36wqbtzvskfdmnxs3atpd04kg6491e1n0ub53tk9qmnbqgjjxuoh1yfpzebioiyd8kive5za8so8pw2e3uqrgakaiizorcuhac7dlytmqyz6dttppo78cvgie03cvb06s8uh'
    })
    roleName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'yqkz9vfdab67hkxybgnx1tz5gnb6zbc9g5qd1fc9xoa81zrspnphjosq3rv8yhubgmo7n6vvu25fhqx3stm1g4psjz4x81gvf58aezksq6vo6fxjdn4b07tvucbdvrkllcrp5gbhdn5d6fxhnb7bbsmv0kig59b9zs6lrl8uhy7u15rkjvjv1myz3x1a267cqk1ns9f8u50g0dicvruulh10r4mxbkz61xgub7saxks7mo9gs1jgtpsw7fjncih'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'surname [input here api field description]',
        example     : '7mjfgj6l5xs7pm9l9r3zmcc5vsta19rislomdjkpcemfivai05gm62rxfvg3bhen7addn5se5f0ibeotpz1j1un4zvi4tjrjjs4o43xpd3ly2rttimjcpl3n79xlpeg93auflhi2tgnj20wfzae7b1vaznc1v6nfcec13lan06oav08xuwlnfajlp74nostghtfpyx0c6yx8bmbmjz9k5rcrur92ucxrfy38ttf37m0ddn1ch62zt90fqgtj4vj'
    })
    surname: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'email [input here api field description]',
        example     : 'jng6e22kpubp91epxl7pg7oxpe012ko1wqwmjhkgp3fan35ypucoa3efva0fjabl1l465hzd5h5jfvprjug5gficvsxlnj7veoe1kwr1f9webt8y4m10g5q9'
    })
    email: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'mobile [input here api field description]',
        example     : 'd5035kgurjaja0almccox037vrkrtbjw0g14ic54w0act6ko8s2r9561568h'
    })
    mobile: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'area [input here api field description]',
        example     : 'vnbiotji5qveg8y7xfhpu3ajuvdt8s62w2ge62cgy8tgzbdtm9vmh29slzkvia8jcm3n9mtum4i0rn6l26upqvsvhogbwr9r7i8ev84fbs1mde376ffa5oqjc6fvmyncs9nkzalwcqemw89pgqdw2xi2rfyzxfn77v9jfur045w5zxwn4x5veubadge9l1jww54qvpqrikf0r4oqrcaj3ecc1y51l1yyzrh6q9kz9rqep7362luuh4tz0ultfb4'
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
        example     : true
    })
    hasConsentMobile: boolean;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isActive [input here api field description]',
        example     : false
    })
    isActive: boolean;
    
    
}
