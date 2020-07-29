import { ApiProperty } from '@nestjs/swagger';

export class CreateContactDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'dbe69f0c-cd5c-462f-a0a8-9272af38ae04'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'e2ed561e-a846-4579-a079-859eb7083e8a'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'o9uiuru631i8514b22yihl8n9jkeqdh0irgcj9q0h02wsgc12b'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '1addf02c-db2e-42ae-9206-9f7f562cdd3a'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : '5abjkbahn5yw4wxs9s49'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'roleId [input here api field description]',
        example     : '5f65d68f-3728-45b5-a879-076e92098219'
    })
    roleId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'roleName [input here api field description]',
        example     : '6be96ybc6rn71fi0wj82ttjz7niqz925y44xdbco23j2bl2xyprxshtfemhjchreueacs3ws5fp34pi61tt87unjs1v9uwlpxpnh2y7j1qpf98s64dfkohsogy232vh9niro26cpdsfh4rrs0qh818lb6cwkke94yhdwmsrit3mgotjzf5h87etc9w1gmvskd1delsn52vicnohqbswsn2jjdaydt5cyxn3gdtfnh74x0car75u3jbt3efj4pnj'
    })
    roleName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '4sk13jvz1mytcuw9lz4x2xd1ic3cmk0og1rx3hcame6fsu6y0jclj5dmjuwzlgr1vup23r6pkhh8lr4gdywd7vxygrb7h7hizi694mslypxtqa91cfvyp76mcmrup4uxt0ircwnahwbr50nsznw9s97jhl4uvplzv7uozw1drp8xeey40955z15so8xznr9q63dc8cbassiy4bubjb0fus2e3afsybxro556jfma1he2tbkup767529pfcnheuv'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'surname [input here api field description]',
        example     : 'swwkc9gvoo28y4vvtlbflj18yk2qgp2lwccy6jakz7rlh39ud3j80p2n8vbhpwshtsb0z93h7izi4whhylaw6zzon7sbqu4iale8ug15x47t85rmfn25c6b8w2aekdvyhymxziob4b7vm800ds1euwl9ds85nr81xv8zyxf1qihtlv50ih7sc8dbzo10fzlaowfpf97jcj1vyyua9vn28ody56yhbygt1ofkeclezxn3re7ak5ksvdk2dgydw0x'
    })
    surname: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'email [input here api field description]',
        example     : '53tpeeoijx22375p7j1lmsq1fsozerryidfiy7wcpgqjv70hz2dw8bukzzlrxwtgfginekpdagckn7s6o4lau0es27m6ksbpv7fxm4bjy34neyvvbo30y4jd'
    })
    email: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'mobile [input here api field description]',
        example     : '3gbdpqvyqslgpp53s3l8iv5oy60xjqtlzww7e03eb3slpt0wetf0sjxg2iwk'
    })
    mobile: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'area [input here api field description]',
        example     : 'fl85wy8dwybt0viq1kc3e4diun9efskscaf7k92r1o83kwpk7bzhsxitw2adgaz6bukuvrfzevavo0mb4hioaf8bf05por189fi7gidn949xygi70cmuy4fqf1u6ts152r5xusvs9f3g9o4cig1ly13wqnuqmhiptdzpvwbi8gsz9k8fo1bq5c5agxvma03s7l6wtuejox5ih1bq0y0704yoyzfsd9nqce36h9ca5gpgdmmvrnnbh7d9uuvsigx'
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
