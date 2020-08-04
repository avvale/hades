import { ApiProperty } from '@nestjs/swagger';

export class CreateFlowDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'be3941e3-5c2f-4d8a-a17d-5f5c55c2d5b0'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'hash [input here api field description]',
        example     : '738eb0ef697al2mrvdizru6ifasmdwxdhy7n8nbw'
    })
    hash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '7d1f2f5b-6953-4b64-a3c4-1efe8420b250'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'ws113ht562kknh4jbsnota0cf8qeqixkg2zltwyxkum6mprkjm'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '55e451c6-b6d8-4fc4-bee2-b7453d913dc7'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'r1rv8uhgovf9a5z9sbio'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'z7vevdu0zas75lnnkz07'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : '2m4vsqo9i2wnhqc3ekzrhj3cv2gr3vui6tyrmp0txe02extoxjfr7e6klrqm'
    })
    scenario: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : 'ieq3abwp9xc7a2wpns336yf41opigt0estpdkaitjm4tdo83uhusnfo4x7r1zb53l8p5qm1d4o9hox7ut41rv0yiteozrya0okgy9il45deda6qjt6s01gc22vqqqvpqutnswzz3plmws8wxm4co4jpecrullesj'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : '732cmz7zztdyzjpzcme3ff5cf6ynfqen5jkw2gdalgvc5w48poyvkgyvnl9kp9pi910girf4ud4qvzkl80wvkh5bazc3f8wbd11sw7k3r64yyy35v08ds7dbe8tflnsoncdjll9sfu4shwk7acz8qsxrqel3k6h6'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceName [input here api field description]',
        example     : 'b9ud0ae9ropra3ydskcjndt1wmwpokef6v0gjybtt35c5inntssq9hjzyyzxtg5xd4gickucqptuy571dby8x3jhcluzbo3gadsx2i2gmti2py4pu2r3anlztphoyrztyvfdv9mfurcq3o5n0s6a6q7b30zj1f8g'
    })
    interfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceNamespace [input here api field description]',
        example     : 'rl495201qbr86aunnuhk0zqbcg5p0xbs6k2eh4dna2i6cv4hfmxv808docfahdwww5xhq1dmaow0lql2lsj7z73qfh7blt5kpkrtqchbsbfw9njrnbie8b8eqf5idhixa2i151bdo03hm2o2t4zb5bhq1hmz44af'
    })
    interfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'iflowName [input here api field description]',
        example     : 'pozv7zbab0yakub9pkvmc759xc6wxwwxg79nhp7i51qqugk5vy28y60ik619i68sve1bouxf3bdim6d7pypmigayk7b16n5wzmb5151ebzo8zf8o5yi9q0213g0fs96qiyqysdncwwgfbnfri8bbawofciygqx06'
    })
    iflowName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccount [input here api field description]',
        example     : '23y1gqnayepv7xvtcizg'
    })
    responsibleUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : '2gpt5poxiaaw1olg70xy'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-08-04 01:01:04'
    })
    lastChangedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'folderPath [input here api field description]',
        example     : 'c12yl75k0as5be2r1tbl80grvyqnrm9zb6cxxnr54l8k31w9dm08espahc9whs8tzfcxo099mbmai18ghtk7bu8j7rck5tz4dc1xok0zk449sjtjgzwovmwl17xtwry8g2r62x0nnwod1w18uwyxyy2v5lsa1kikkfw11ddl95nf6xufos9cenol2klipr4a7nt35t77zhcs4wzyqvkpx2xemvf1k4v53p0b0kzkwdh1c2sej82ulmq3duwmqsb'
    })
    folderPath: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'description [input here api field description]',
        example     : 'o63dr67ns5jh97j1fcmxavp5jcctvcz7z1kd3hnk7onpalvbx40npjkauz7xhvbjqatzdc5v1wnvt5ljndhhjn8a4m5nn9bc2zy4qgrwzhsyefoidzk8l7ggw6o6n66ppzdix94vlq7cnuou7qpjmawx5mypt5n6zvwdzqcs735m9zbcilbvtihqbgflgz8kju8q51dys2tthz2dk3tx7zxa1eg1u9374azss0f1nbr927jglxuiqyl3jpl707i'
    })
    description: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'application [input here api field description]',
        example     : 'crinjkly2lc2c8pfv7rhihlak82ndu1xttd5oa3ez84u55hyxc7e7xrbps7b'
    })
    application: string;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isCritical [input here api field description]',
        example     : false
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
        example     : '5027767b-a6fe-4195-8385-616d62c8cd97'
    })
    fieldGroupId: string;
    
    
    
    @ApiProperty({
        type        : Object,
        description : 'data [input here api field description]',
        example     : { "foo" : "bar" }
    })
    data: any;
    
    
}
