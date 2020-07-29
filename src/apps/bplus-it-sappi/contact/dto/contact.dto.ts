import { ApiProperty } from '@nestjs/swagger';

export class ContactDto 
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
        example     : '9qy1myxb6t7ecae5lif7v8myxiaa1z2cvu8rktgbaoyu33wszx'
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
        example     : '9j2wneff2jwox3lw24ne'
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
        example     : 'akujst8q5auiqhn761vml37c1kryqqfz53kxr0iot6qcevatdgb559fqmrr1camplb2jr71yu0mbtmyh8zjytwppkf30lsto7pgv1oawu52s1bb916bbc7whhgo4epce87k6ccjuft6f6mnxtzwiox1qrcny1ugilpkg37zjnvjx14uxltwfykvxiv0uddo2h9ovv9c3insebfidx9cu4kv9pjdlfjteuirtwpg1k9sauxyz8h8hj052lzqc8ei'
    })
    roleName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'tmfb4qdur3w26ofr3xncifb4xqltbyyazahbr40k0byeai49qwu2o8556i82946u8wnh3uz6ipeq36umivejgpg9i9xs5xehei5oaf98fuz2olxu87qyq6qaa39nahcgul1b0gl7kkuo0no2xhx5ttro41ttl5a55p9dtex8sta2srwleiww8r6g960gewffm6h73pjj8hp1xm090h40gamt2k588e17moilhy5k85rcgwgd87ef8f1xwi6ffkk'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'surname [input here api field description]',
        example     : 'cr5cmtl57nyi84aa7vhsvanfxqyi8xx4k4yuo7q27vmvdnwumue1b7mprwitlw1bzqpquwn3m312ywjhpkuqsvbu0ox7svh97lulmet6rw9yuuwknpgbfs0yzc3cskal00u3rixqycjrz53r47806s56gw99f09oj7668vhzane0211vtf6eg68q864f0wuryzft6o8nju0ni2zr5ilnkf39376v6cpnh970gviwa8m4aua7170g30ltuj3f41t'
    })
    surname: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'email [input here api field description]',
        example     : '18ds71mhhuis9ij7yfiki76i9y90v3binlw9f2cipl703icov5vw6m3t86y6tcyuc76osh5cp6siyrhs02cv1x7hq9jxpeejl2e3syuqfbe8i7gskd82468m'
    })
    email: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'mobile [input here api field description]',
        example     : 'pvv5nip5nvwge5g8ohfqei7m1c2nfvejmiihwtc0fwej4so5rfssmzytgh9c'
    })
    mobile: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'area [input here api field description]',
        example     : 'o35xtx33t5u5qe7hr3wqtoq58hfyuym4abyjqttqgpt5lwa3otkp80m0xh9w4utzfhahu96anqi0rqg4no1k5mjcwm0or6lt6j8a9ep2y8jmso48gakhhjujzyu8jv3uapghext4wyft0neklydnqr179kw6wir7rl9thg0l6gtmnxbhlzz7zg2pma4t32gz3ws7ubanbtksiticcvcj6lnwm6pdqickzjws6d0m4z157vaur1wa3xayw0j605o'
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
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-28 19:24:37'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-28 19:14:12'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-28 19:07:17'
    })
    deletedAt: string;
    
    
}
