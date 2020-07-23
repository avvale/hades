import { ApiProperty } from '@nestjs/swagger';

export class CreateContactDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'c300a290-1bfe-4329-9384-b1626fcfece0'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '6a4c3e39-3938-46d8-be10-02ae6113b5a5'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'n4bj0fyi0lybykz3mq5594z2eciz87vih3wuwz0r5msjesp7ok'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '51d2a3ec-260a-40ca-8a92-b8a1f9f022f8'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'k683yjjh86u89nrymwgr'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'roleId [input here api field description]',
        example     : 'b1279008-b3a0-4753-9fe2-11c1bd1b9613'
    })
    roleId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'roleName [input here api field description]',
        example     : 'b3f9xirnppx8vt3tojhbv7zvd8las50x676hfthu46vp5sjq5psb9vrp82xfyff232x0cgqz82vzyrn0pii51vkppz3w1xf3d9ne8hc7jt9u0ghldn8racjq12idxg14e954yt98h2xhdwecbexudqukczaewh7ump6ztb8shjv2ejdk9yqqosh6008x9m62m9v50wo1l0ljhrwz04nzc7qdkp6a4sev1izmcfom6o29pj64y6yuk2s8z5329pv'
    })
    roleName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'bwm9cw2qlj39wrnvt2rk75xqambg91nmec1s311d2w3b1a14xy5cp7ows5axqjl01db7056xpca9l4bzyom9lrc09mlqhxz9z7xlsy4nxthemv87hdzt78q18xwxoaxkrdxb46tavkdfb487ng5s874o1cjividafbwrhqsdssn9gh7mqkopvwsya7ogbqj2q2vs07toogoys1d84edeaewa7wchn5yfr5op7a5yq5mocppbxy3u3axgwmi0unt'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'surname [input here api field description]',
        example     : 'f1wca814hn3n93xtupayjuh7e3l2jhui6y1491d0t0oqq702nsqf5u74gxxd58q7d7jpudiszxi3kim9g8ews6swwmrpiq0x5cedt3da58a9fv4pzamyoct6y3onjs4yteczo3kto9virqtegzr0hjumlidd0gqjsge96lww24vsb4iivlufoth4yromehrarrgo7oxdmajiglu3uyqduzrebqwmr73m2ywnvxnd2qzuglvdjbr5xwc2yapn9b3'
    })
    surname: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'email [input here api field description]',
        example     : 'na2469rt9atnv0dgcx9elos9wdixk659jhvkzekxlg98muaz93lz6q2jido0fpdcfky80zzwme5d8gtqmcakntzb6kv8i5f56ax0odoh123a71pzx97519n6'
    })
    email: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'mobile [input here api field description]',
        example     : '4i4lvq017ss4y8kscarjt1j81ni4vl54l0n32rf0gnecq99a377zpxnspt7r'
    })
    mobile: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'area [input here api field description]',
        example     : 'jdpwrglns865edsedniz008ilu7y9xh5053cmm3r531q7fxffx8rid1flo4dm1n451f0b12b0skx12cvs2qta3txctr6cl3ztj73s4gnb9t4lwvhun5hgi7z7ivnpayjj84edrb8bearc0fn0qvbcmrgkiq97674sj99cam9k5f7wif0skuemrftch3zne5ejrc0gl0h8zyest3692h7loffm9hznsxuawd0ogg0ztp0f83rz7hdvqvgoo5matw'
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
