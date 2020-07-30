import { ApiProperty } from '@nestjs/swagger';

export class UpdateContactDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '1d827279-ad49-431f-8224-8687a68c42c4'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'c8e58895-0f4e-43eb-a67c-670416817b9c'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'vtxnzjlddpyx02zqppzykhrtc8cdhby3odxlsmv9qmdh54urnz'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '8dec0054-8b60-46db-ae0e-f0c74ee1e3d2'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : '4mdwm0ok6belnyf6a5s5'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'roleId [input here api field description]',
        example     : '8687237a-648e-49c4-9e0d-2ef63aa02f59'
    })
    roleId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'roleName [input here api field description]',
        example     : 'u89mfftzgd12c7ydvuji2s6j2qvna8wu8dtvaatw13lxk2nxrzjqifaqqfwjsmwzlhppq9swfnbzq4yvlm08a31w4rif05gt0vv60ulazizt2p763hmwxb77ic4cvplj65z52zuuae3z9ach3h6k40rmhy0osbw5s17a2762er3zv5qid455zmgvd3z0ma6hscny4kdfroad9yvnx9qfr758vjy25vime7ii5804mu7o8ldanhvs6fdol2ljb8u'
    })
    roleName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '603cl8u03ida9wk639uuim6i3aiduyudoal3fz2ckyxm4napflaej3cnmirdkxndvtj6s3ot8qhxz25538kv1p7sklw91wbcdlxvxdhwttlsxhf18ffjrji8yjyns9gmw531swgd29rzupaoml4v0dyh19snhd3kbre6qjt1ovjxuo6bxl4zb5hrsdsu3sqi5koea1d4dcql98g5jlur887w6mrs6gjmup9vltvptos9dmhq418m0ptvar51kup'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'surname [input here api field description]',
        example     : '11oz2ktdqzg0xlewmrfp4375aenjdgs5x4qu3kq1vwu2q0y66qi968hx8zya43va8dqy6b1d9dzzhojk868mjbd3as22kt26jjhmr7vtu5ve97jsewa7c5vemqrvwb3iflb8eq7t2czxwiuhfi05n0szqxob2hpavwmvz0qzvypdw002o600xv04427w8l4zqdbp1xjre1z9mhljthruoqwuugqbi1grbviy4t9rjzchsuyp1mwy5fv9m1uy1s5'
    })
    surname: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'email [input here api field description]',
        example     : '6diol5r3woilognabzdlwwz1n6d5bepj39qom7jja8e2uyaxtrcna08j0iju1bj0f5ov6viujqr5o42qri7fz7ykxpocmhwnw3hrd37nfwwa23bgv8p6mp96'
    })
    email: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'mobile [input here api field description]',
        example     : 'u92d484turjuby8br0wwksbcehf8kb078er2gjs3sz04jak8f49cf7gxs1qy'
    })
    mobile: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'area [input here api field description]',
        example     : 'dcfh5uqjqy7oekya3qgktzbbhtd3y1ft8hop1b1ranxduk61510nd0c81sluml3q49xetq4lyijkbv2fqz7m4js0yg3tmhaim8el480fzvzvx4w40ar11ubjusd69n81oiprg1777jxr52hgkvcwgzf03a93c7iv5dbwc33dg4e0cx3fcctsuiahunnctgmhbrba66avh0kadm9ji7b530yoe03bxbkuvcij6xy5yhj7raoteapwgzbv9gn2ss1'
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
        example     : true
    })
    isActive: boolean;
    
    
}
