import { ApiProperty } from '@nestjs/swagger';

export class CreateFlowDto 
{   
    
        @ApiProperty({
            type        : String,
            description : 'id [input here api field description]',
            example     : 'fe52fd6c-2fe7-4ea0-a810-d1103fbcecab'
        })
        id: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'tenantId [input here api field description]',
            example     : '115d69a9-fab7-4051-9265-75375754b2e3'
        })
        tenantId: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'systemId [input here api field description]',
            example     : '709c6586-cc95-4d58-b738-eb8c23e06b09'
        })
        systemId: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'systemName [input here api field description]',
            example     : 'bluklh9okxlq78nzo0cs'
        })
        systemName: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'scenario [input here api field description]',
            example     : 'olrolp3mh4kcgdg9uqhvc8vqs5hcpv2v7ikpdecqvqygyxbx7cswg74nwjf0'
        })
        scenario: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'party [input here api field description]',
            example     : 'tb81wogbn8pwmubdps6943frlwkvzvva4hqyt2inz1g5nh63tkq8c4s4jct97ftgdk44icoubxvl3te5cfqy31d8z8uhgx0grdq4miccpkf9k0mq8nwh3ii28izn8xcb8fsq50xdohs90w5jag9o94e7vqo1p9q3'
        })
        party: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'component [input here api field description]',
            example     : 'swpbtrvl6fjj40nhudp89o4c19txrc32ysb907cz4t3n60bfm9beppbzyj26lhj0bfpbzaw7obu2why9imyjwt4xdhjylxe1d9e1shvkjzstz6viulauptrzsryyr0l60w19cyrhbje6oufj5c4vd9f3rdx4kc4k'
        })
        component: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'interfaceName [input here api field description]',
            example     : 'isc8xmewyqocp89ls2g3aoilhicib8mzfsi0bxotmi529q7cybwttz4e1vacfnsxeciuraf9llser91dfte6x4e51djy4klhq9o1dihuyhg3nf0lvfsvoidfsl0fdin5kmg7rdauczf3jnqfaiveh3ixbv5pda69'
        })
        interfaceName: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'interfaceNamespace [input here api field description]',
            example     : 'y6qtf2agc7szzztg32woj4blcf51goc8jv7rzfd9c6htydzi99rhuatvlkdrarmogj0lkk29mwwj6qw3wps6y9tn7cmqpi1tn84vi8821dwwrrut2uf0y0zwwvs9qorvkjx0c1nir1xzpywzqmfwfh7srw851twx'
        })
        interfaceNamespace: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'iflowName [input here api field description]',
            example     : '36l5z5wsw51t7g4fypdrwyhbltww0l4gnftfrtj9cs44tmqgqpgr86lka8e6y7aposp11qelgpfdnx65jfxxvz7gmdaklhc9b5s2h2k4xg6k0hcojslyffalbc4oi2fk5lztxq9shfb5dtot2kdbubhq30277iw9'
        })
        iflowName: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'responsibleUserAccount [input here api field description]',
            example     : 'n5hty88ddr6owd7h3gue'
        })
        responsibleUserAccount: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'lastChangeUserAccount [input here api field description]',
            example     : 'civ1fq8s5w67nm3w6jbl'
        })
        lastChangeUserAccount: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'lastChangedAt [input here api field description]',
            example     : '2020-07-21 08:09:51'
        })
        lastChangedAt: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'folderPath [input here api field description]',
            example     : '0lab2jitztp60he0nbs14iij2nyz6h3zzmy9j3zrqpdo9x3kbxz1l6o5oleb6ysy4yqz31op8vgok10kumrt2awkm48h9jpyrmiuv27xk74sqeboq92bmeyz9x7v8c5el0cjo6zuwcy5bydpfiqyfw08chs6bw2ug93puz3qi2ghk9krhhqus5493znnletrcp6glchy6pn6sa9aliq6bj81wtj1sz52p1moca7is4us83n57mujvhid7gotii5'
        })
        folderPath: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'description [input here api field description]',
            example     : 'lufhm8fafdqdh1ed37ukkabiwew7moneol8v3a9lm45vc8jubqlqfze0c2yn8y0zyeinamfk2jequlnsa2u2onyn6t65nsiz4e03trqem9c01ukttmd01uuq7tftmfvgmgd4zg5m8fdn3zlnb6syizs5sq7jg8vunhz0370eyasm7yc4dzoqsend76a3czknwhrpj4m7n65kz8f09nqqr8pdvcp3fng76pe7d0kw6kpclcewqtclw5gsbiclwjw'
        })
        description: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'application [input here api field description]',
            example     : 'hwhgw6wtbhukqeh3p9pnx8g4271r6g677u9poscnq1ngoznnqxg36q9u2c1p'
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
            example     : true
        })
        isComplex: boolean;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'fieldGroupId [input here api field description]',
            example     : 'e01330c6-950c-47db-94df-596b83e53e55'
        })
        fieldGroupId: string;
    
    
    
        @ApiProperty({
            type        : Object,
            description : 'data [input here api field description]',
            example     : { "foo" : "bar" }
        })
        data: any;
    
    
}
