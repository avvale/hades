import { ApiProperty } from '@nestjs/swagger';

export class CreateContactDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'afd4f63e-b392-4b42-9fb0-4dbc917c014b'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '9aeda6f9-ac44-4fd3-a5ab-e5b16e682be9'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'fk6qv1e7usryu51034m22idhyb58kcvamojr55yzmaxz44kob8'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '48589111-984e-4c69-8f49-fb35c30d2e43'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'ti8xd1tgg3apjsmbzxa1'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'roleId [input here api field description]',
        example     : 'b0e7fe8f-41a7-41dc-bc4e-0f9bae327a9b'
    })
    roleId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'roleName [input here api field description]',
        example     : '1orz2kn1ymak94h715ev0xfh9s4z0ls30anbko57tu3ixtodh2rnpcpxau9sl6fbkfp40wrglon900x5l85len8rdakrq47ykyddcqt4irmu3b2rwzsv0kpyw1ktbth1qxzj3s4fl1ojros73tsenvl87dyppfvpx7e7ninz54vrahz45y5qsy1amwaineabnjo2j8koqr1tonpdv4iexjjle3pzf0woc2mijpwgpcgnkvwamdf8ig3e44da7jw'
    })
    roleName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'yn0felgylh7qyxo1v7kf7i7dhmorpfb8iq7l0p77q1nh5aumn06uk56mw9z346m015un2a52rl1ezt8vq4ta15a7t9lf7zah567evd8fravzfay8t5lco6gtxxnd4k6lv2di0qbr3kbcxomsd2f0r2rkr8gyodd4ptk2d3zdxa6hqjf42rx2tg4htnkuv5rr8uf47i7u91pjgf95eiqhuj18m0s0is4igelb0g7dt7el4j23uf2617d4ee54a4g'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'surname [input here api field description]',
        example     : 'gljppx4htwkcl01cty7g6bidg8inhg0sfonl1ceamdaxwzmaigxbt7u4bow8hui5z8ekdakoeoiz5tqi36jjsiubue96khsdwsd7kbd0wd96436yo9due2cu6pgucrp3s6tfru5aufvp1ws4rs1ay6v8jgfn1gzy18shalyji1h7ulanm49wg6jrwptqkblzz11lrng7c4etwxv4vw6zded8xfgjccf04fezhl9ufi63hc531cmpacb4pfx85oy'
    })
    surname: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'email [input here api field description]',
        example     : 'a7o716oaeh3clo0v1bzi26bgh4l9jnflu7jhx4ofd5eg665jcj1zy1f1oks0p0skmjmnsbojk254cdpxa7jvsra6bzrv4940jerjhpumq417fahbdmpaf8ob'
    })
    email: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'mobile [input here api field description]',
        example     : 'jqkjr6nanbocjie0i9t6ucb60mc3as8j4szl8blkmv740r3z0qb5ja8g0oks'
    })
    mobile: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'area [input here api field description]',
        example     : 't83san689vbib5whcnx9wj98q7sxaj21z7db4e7fk7c1alcrsb8759lnpu7onolcemaujpbn0nlmb792xj7rkg1q6hbuj7cmfqtwafqe450i4t4kn3gk7xx96mbobzk9ssmbwjwyult8yg12zcxycgw6svskmisobas96hedpdoulj2vda9zsakfgd4m9jtm2zlltspjvwqas50vcli6u9uz3sayu45vykqije2ey23bohu6gow7t13xycugrmt'
    })
    area: string;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'hasConsentEmail [input here api field description]',
        example     : false
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
