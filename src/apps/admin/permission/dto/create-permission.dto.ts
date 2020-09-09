import { ApiProperty } from '@nestjs/swagger';

export class CreatePermissionDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '563049ab-6a1d-4790-b182-2c1ac0a109b3'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'boundedContextId [input here api field description]',
        example     : '45489bf1-b3cd-492a-8510-413b42dfd34b'
    })
    boundedContextId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'uevpujzlne5dcw8so2knd5shfmufin4w97iaju1flz3ysgpbazr1corjjai7trjikra5kal1txe3xgt8usrr1xjt90evzp5mdy2vubop79mwkpzkej8i0958xgr1z1m9u7tnze8kyvx2xqh4pex2sqc4nfij15azoow6v603duknr1c9o7pahezzpy31n68qe1lifx18ncpko71erj9td4315uxhyxhrv7d93hozuv4r5idb0ipvr4j6cvy6ewe'
    })
    name: string;
    
    
}
