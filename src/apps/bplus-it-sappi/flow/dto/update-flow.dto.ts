import { ApiProperty } from '@nestjs/swagger';

export class UpdateFlowDto 
{   
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '52ab0147-24ff-4651-bcb8-b0084ebb39cc'
    })
    id: string;
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'd32ae511-ac63-447c-8687-05a47a9c6f80'
    })
    tenantId: string;
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'fcd3c078-15da-4412-9f89-10406c5be431'
    })
    systemId: string;
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'owsdrsogx184689dfcqm'
    })
    systemName: string;
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : 'u7r6hiautnt9fvvune6dfpruq580qt44zre5xe8bdbpqx25icwmd4lfzmgho'
    })
    scenario: string;
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : '2sxnly4iv5e1rr2m88z4zmresbu8kxdthzkfruf86eqxkfejzyid8pmn2mg15jlmxcjxvzd10qqtb6s01xu3fnzhfed0ocu8jt1r7mhp9jogzvx7y80oca7522efvatm05maoc6fwg4c2916rkw7eodrjgzp2ng9'
    })
    party: string;
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : '9t0tlj8yn9tazj3khgnucbulprmk7pipx1fgxtocjwufhs7jsfctqyvx859hgo6ugy4wcs9x3ky6owt9gj2wan19lviid7htarzli03boktx0kpt4l62qia5pbcgyuedl49v1fwxmc9ri06pntik74egmgetzsv5'
    })
    component: string;
    
    @ApiProperty({
        type        : String,
        description : 'interfaceName [input here api field description]',
        example     : '8rzloofqzwr2ag51yd8bwazaatozutbyjp8qqopgvi74wkpssjfvzulkvtsm4z3q371075mhmqrzd741tc3fzvujsbjwd5os4lq7d92ew2trrlqgddkx2gqxlvxnvyz8bi85x3vpmf8maij9kvzcbzz8le81yg3v'
    })
    interfaceName: string;
    
    @ApiProperty({
        type        : String,
        description : 'interfaceNamespace [input here api field description]',
        example     : 'v22sm54fyop78slf3b147gumocgrm9gg77mazfjo4qykctapl5yqvhbh873l2l8iy79ksv43ftye5emcvgpu1x9l6qp3lfnjr40gy1d39togozlp4x5k5ycjgvijs2mjl25n7cmh4cq3f3kqonvx981r0lr9z8i9'
    })
    interfaceNamespace: string;
    
    @ApiProperty({
        type        : String,
        description : 'iflowName [input here api field description]',
        example     : 'o6udbo23w4h77agl8ht34qbdd3mikyp4jkk2vn9gb536zyrf4or42hgzoj0n672n4govejikyryuhd0ehkzbr07adie9d7xxb6tqx2qtjiyz41clrj0evmqk17jluakj0e6je8ijcsauh7o6isv8zu1urgd8dotv'
    })
    iflowName: string;
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccount [input here api field description]',
        example     : 'mb5kwqx443vjrcenbsop'
    })
    responsibleUserAccount: string;
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : 'zas2lmwn5lgi2od337s7'
    })
    lastChangeUserAccount: string;
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-07-06 09:59:43'
    })
    lastChangedAt: string;
    
    @ApiProperty({
        type        : String,
        description : 'folderPath [input here api field description]',
        example     : '4h57wcvq1tda351qkitjwve51jfxrjqbjpazxdt8uiepy2r3wg3t228jh7gf6aearzjb9qgy14c4sw4o8elnq8mcqmt66w7e373p3jc8ylzyy4ty6ruh9oszyponsapwoj25xujrkvn4bhi96y4d3t52g9fw85ae31clc5r0qqjjtlvfzjgz48h7q45fya0x2b518xs73qub67tur41xz8sojfhrtc1ecaj8ehajy9qx4se52c0r7aobh1mq764'
    })
    folderPath: string;
    
    @ApiProperty({
        type        : String,
        description : 'description [input here api field description]',
        example     : 'y0qylpcfhpwmtys1koapnfxx4uuwqtx8lqb2sirshkhminq43smt8morfx8i4ysiz9ibg1735l4xh3v9tyuhlbrjw0a6aikc1xrv6tvsvxftglz7ga9xzlxks18gysrl2i0daaywymsqetp5hqf7bp3e8sseqbf0oduoz7s467aq65ikyrtqaxs2zn4x9j6kbz2mo8sqwrpueozq7v6e4z9i3nnbayd5813yp4gy3kh4xrxz94uqqw44vpmi4it'
    })
    description: string;
    
    @ApiProperty({
        type        : String,
        description : 'application [input here api field description]',
        example     : 'dxy7cn88valaxtyvbi4irahfr9uxm0271j09wg6wili9dgp6bhwwuvrp9owi'
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
        example     : false
    })
    isComplex: boolean;
    
    @ApiProperty({
        type        : String,
        description : 'fieldGroupId [input here api field description]',
        example     : 'e92b3792-5b0b-4ede-adad-c9631564eab8'
    })
    fieldGroupId: string;
    
    @ApiProperty({
        type        : Object,
        description : 'data [input here api field description]',
        example     : { "foo" : "bar" }
    })
    data: any;
    
}
