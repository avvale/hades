import { ApiProperty } from '@nestjs/swagger';

export class UpdateContactDto 
{   
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'a143a40d-d134-466f-9c31-4b59b9b1c36e'
    })
    id: string;
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '7c448cfa-3408-4102-9d45-ce46cbfc8ab1'
    })
    tenantId: string;
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '56504540-1964-434b-871f-afa892eb0e69'
    })
    systemId: string;
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : '8b0j3hrmhhqjwu8lw6dm'
    })
    systemName: string;
    
    @ApiProperty({
        type        : String,
        description : 'roleId [input here api field description]',
        example     : 'a14dd912-d135-49fe-b50d-0cfeea373155'
    })
    roleId: string;
    
    @ApiProperty({
        type        : String,
        description : 'roleName [input here api field description]',
        example     : 'yp9x2pt97htn9oimbz0d0iu8p57ttgztgwqufbzd3h2eu6xn06xe6maeb00ltzajwclf5lp5yo20ynbk0eezfz8igmemp7s1ht4ambg8bi7z32xagbsq3vwtxu7b6o39jyp2p8i0viiq4g6rqxc0uvl5a6kk4s79k26ccye6dyjq38s3qttp3pkq6mm8wlz7x1lyoelhq85y0gpsucyayggzpng2sd5pnu7ig75wp7isq64a1krrf81mq40wprr'
    })
    roleName: string;
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'pz5y94on3zmmc2h430avl1c5chtg2mwkfke0s2hmyyyg5gvogbcum5twnrhxvqo3r63n907hisewfurgtrhb6c2rlkd0s9yg2g2ycqhk7ok8isi54qyoka8xkauyp8uk189kxh3n17h63zxjunhvl49ccamfcxk9mwovhy6saurghnli4fz2f5p1209dmssxq4g9ghyknx9ffhod55lycw112ubp7kmlh0063s3ofqsfachioslg2fz04hchtik'
    })
    name: string;
    
    @ApiProperty({
        type        : String,
        description : 'surname [input here api field description]',
        example     : 'pxn7fwdsgsbd6ne9rc5yej6ox4e4de5aim54x73sjblv7hf4hzmc2fdqx1gok4yrvbqfjwdd19qcv7zfiipk6vhtdxe3ejp5shcfq2n2tymg1utlkpgr7ipnzyuhb37ytepvxbvmg0xte3dkjvi9x0i2oequ4jczqf7jxw191hoi6xt4mjdjxnzhkbtu572f9485ejl41s0km897tpio3ba8gubb0e8a35vln104s56e1mwnvea3s8yanubswtr'
    })
    surname: string;
    
    @ApiProperty({
        type        : String,
        description : 'email [input here api field description]',
        example     : 'mihzefuedqk7kxyno1xd3fofj4maqmfqq5niar5jcx8fpe990gmtceepf3jtan4lrw6g8a9kjppnbrwtnm5cg4ijabqrlo180n1rgrp3wwlzkasgqyi5ivau'
    })
    email: string;
    
    @ApiProperty({
        type        : String,
        description : 'mobile [input here api field description]',
        example     : 'sv3cypl0q6tk0e6d9zs1uvgh6v8tkcp8xqfndohvtl3fgvnob8kct7h94kp3'
    })
    mobile: string;
    
    @ApiProperty({
        type        : String,
        description : 'area [input here api field description]',
        example     : 'eoq016ml1dp7wgod10y44hg6g4abw8dbf88c2xmtu1g0jzfcociad2b05h2yib7t3635fhn51d40t5ryffeukrp630del5lan8cehfqcrw5u94jj3bc1hjck6d7t55ceqyjz9ty5e3xzt39y8pxs467cy9mn1pfyj0x5webp53664ofyghxl1g5e1m557ew5rgbboxgvnowo71njjll4c1imthh6u0q54cruqztfp37sowkxddqr34mzcvsx9pp'
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
        example     : true
    })
    isActive: boolean;
    
}
