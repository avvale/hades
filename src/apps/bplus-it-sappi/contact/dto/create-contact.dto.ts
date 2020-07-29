import { ApiProperty } from '@nestjs/swagger';

export class CreateContactDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '3a00e70b-4b20-4013-afd7-abb712d8dfc9'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'e0c44a87-89eb-4cbb-96d7-491a7258eeb7'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : '92jofxvn38eygrdtzw3wlup3856u870f5kogq78wj2m41ix1cm'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '5b8434f9-32e4-4756-ba37-051cd033ffd7'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : '427rmif7qhf9yqw6ix2m'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'roleId [input here api field description]',
        example     : 'ec22b292-1be8-4b46-a044-dc1ed4370eca'
    })
    roleId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'roleName [input here api field description]',
        example     : '1ahsdh3xdjhbws8brct3clyqhfoo76jozjooh0m5uemtft05slkge1pxgwqu6qge0g3uq82b51e4qimfeawlg3eu6m6y6027pk56xgy7c3pjsa4vy512t9ng1czh2wgazj9uo23jlq7s5u65ay1v9zp1gp5a8nfzmjy22bhyaf98lm70kj929dld8xtk5cvinn8l6y9lkh2b4nb81ik9ldt7b3m4yhzsx1t84pm4vvsy8ec859fh25s8hgzcxlr'
    })
    roleName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'gb44rg1njrf96dvokqdbc0sr3hrjgben40yfz0r1k9jmoepgqgmsxgpd678f73x927mye7cgf2x8wio2daaz9dqol23x0itws80tkmnbjs1ry26ajiqlxqsf4fbygd5e3aek4gb3c0azkzj3yrfdahco9wusjbi9yufai278euhb9z0scl5f49p0bskfcow0tf1qzm5ufkfxve629f2ic6fg3evwxg128xbecv9wfphf7ohyt5yey2j73ncodaq'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'surname [input here api field description]',
        example     : 'unhtnwcu2y13vuioltuu99chydwlfyz1try6cit7he3beml6qihdvd4xj5qvu9olkxv7xmmpwysfuujqvcf4lu4hkpr82dpath8oblh86gez344s9a7gdjftfpc4zuslpwu7484mcda8r0d2o2rlcy00bqm5urdv72ef0z7okqrc79myksv1fjn8f1kaeb6a4wvoup8wo11lewuqsh3acro7qfcpuz3t407hpjq4m89k9s48eytvhtysw8p1zcb'
    })
    surname: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'email [input here api field description]',
        example     : 'b7opnsievnaaxspe0gztsu9y8nchma54jk48hlyl9f7q6odeazdinci45e54fyf203nxn6eu17zzt1zt5zdxj28xmfgdhqrb8p3pgklonmej7m3hs2rhxuzk'
    })
    email: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'mobile [input here api field description]',
        example     : 'nf7jv8e7lo2i7xw020p4xduka1zttkzdc4sla4qqz9vfnsxkgalx12hsiteo'
    })
    mobile: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'area [input here api field description]',
        example     : 'cv8jjevuw3u2imkwfczzhfca9y68alna73l2ik77svogcgkacuopzxttdu6piac8uiqnhehccnv052wm1a928kfdoyk911zn8yj9mk3nf74xr46zu4sp2m0gv4ocblniwzsyd18v4g3wtj8kux32npncmwyjja32w8a6wojn5p53fvzl0e5dw7d2atpuls1pgoverbhjw2rsqxn60dm4m2d18giizlog4iut6ylrpbu4n9asccb6xnuvol1ls4p'
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
