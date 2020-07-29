import { ApiProperty } from '@nestjs/swagger';

export class UpdateContactDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '727fba7f-4b0c-4856-b09b-96250feef2d5'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'fbc0cc2a-7b8b-4fd6-a64e-efcafd19dbae'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'v46gr3mfq5ybp5iceg8uolisvxy83jjtkw6cy3nzv6ynwxm3dj'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'f17531e8-c0c6-456a-ac34-f01517b5b029'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : '6vivvtavg265el2p9me5'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'roleId [input here api field description]',
        example     : '784520b1-78ed-4748-9f33-d29a04436a8e'
    })
    roleId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'roleName [input here api field description]',
        example     : 'kv6atf8bn2m5p3v1bzjub5ln6cxtqgrvi8zevkxhff1sbuqpwudebvbhdnnqh5z6gpdfps94dxy6edbfnrfu01iltg1kdltwcbm9228clytqm7z2g4h5xwzjnkd9awdqghd0yevczpzth6fwb68j3x3aqhyewntix4wlc8mwlvo58ya4zos4w3hlu6qneouor2whp43pqu7th060p0irh4zo1gxwb7x720v38wrdfvn2ltfug7w426a0pdaij1f'
    })
    roleName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'oazyj5twe62ihxfegn4501hr6xy0olk2u18lggxhorgu1itsqlaipuvgsxd9n3v3v9a45jh91o4jhwlufqsw7ag0nncsih99lgot9mfarepikjus89ps5uzqa1twausgdgrfbx7ocvvfj0mgsimsryzwttubrky5hsiw9voro7f0ap46rlhrvuhn7hmzq6r0uz51tb7h1vi3104tby7bbqzbsob9b287dfijsyuvvw68u78ggrcqkmdiqbppszk'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'surname [input here api field description]',
        example     : 'l8l1pqgfunar7r515cw24cg72bfuu9d3kqyppds399bpcsxofhe0oqjojn45mqbppfb4ciiigusyc7p4fkxb6ma8ppccoiqcw5lkkwt3eeiysf8jeo94wnduc7m99ec5vlszfwnvjv6vw6q54d2uheq9bwn575bmf7kzim6m6nrj1ql0g8uxatr75yh2zjvk1wb51shrggimnojsqk6mgivgzj4bbyiku8kektnq4lk3vg5yb4k6cc54uegnav7'
    })
    surname: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'email [input here api field description]',
        example     : 'sd75t0rlev1st6bgdhfbi24q18to6te7sqqaqfw7rzikorctfatfnu0ri16cfmywd2xqa4k4t0j0x048fccr44rtkdrrha1hgki3wisr64fuvrvuyavib5y5'
    })
    email: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'mobile [input here api field description]',
        example     : 'd5w00ttg85djsfsgjuqyjoghno6t0tcls8xgym7jz2xezkohjswzrbr5dtq5'
    })
    mobile: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'area [input here api field description]',
        example     : '9nbctdeluo63or82o6rnbfzm9n9h0zq9fmm7p57t93tyxthm97vk4g12siow5vo8gz2mqw8kfhcqt0moew6obsjwhbzroqu060kpop9r89diuqlsv8c4k3w0q61gtr629719c7ciig5262bca9dy4y89lyf7a2j9ywqjnl3myu2jd7j9og1mhvesm0vzl011c7yg28xngtdz8pcpw4ztlto0sufejbupkxpuw5545uoul8benbw2mkkn23tl17r'
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
