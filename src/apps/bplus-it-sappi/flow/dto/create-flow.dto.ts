import { ApiProperty } from '@nestjs/swagger';

export class CreateFlowDto 
{   
    
        @ApiProperty({
            type        : String,
            description : 'id [input here api field description]',
            example     : '3ffa9d65-7f08-401f-abf9-e69f80fc8282'
        })
        id: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'tenantId [input here api field description]',
            example     : '3a116be2-2f49-4115-af91-34ce2adf98e3'
        })
        tenantId: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'systemId [input here api field description]',
            example     : '6da34e26-9c61-436a-931b-51706f8ebdd3'
        })
        systemId: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'systemName [input here api field description]',
            example     : 'hiqsxsn51c30u8it6f8g'
        })
        systemName: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'scenario [input here api field description]',
            example     : 'szuihqzuf1qbevhg34qmw21d8nwfcs8a5nc7aaepotmyi90cimt5e7sha24d'
        })
        scenario: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'party [input here api field description]',
            example     : '1907f5y13165qy8mq9mqbvrqe01schhu4n9gjeqjoubeu30hrltclt0m55lp3ul7ny5qvu6d5en7u3jn5st7213ehlthz47431zhoc83xmdxj0e0nbuhw1ptu302uq2fq0sjtxpzjpy8qmc162z03sors2z9jpoz'
        })
        party: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'component [input here api field description]',
            example     : 'xa931ecpv1i6ib9p04i5flym9fm4vv0wm2fzje1hbjrg2kf2vos58umaslivlfd1mdgpwjy9tysh81wtezd0rte0orfp17vlmkmu2kpquzo3732gjrq3m1uoeer6nsa9sqwf76saegx1edkegpxkasazq0rtmb3o'
        })
        component: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'interfaceName [input here api field description]',
            example     : 'amaeuajrkwdlii17ygy6g8kd1374oxuv4gseg76b3uhc37vfwdmkgm6awx2cqtepi77hzpvqfuqylfbpexxwt6x9t7c9bqfztwzdp2hnlyhqiw10bim3n86z4ytgo83fxnr5pwwou613d3n7si5frrxpc9iqrrmj'
        })
        interfaceName: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'interfaceNamespace [input here api field description]',
            example     : 'g02jf87mgchpgvqypyn31rw1imdwxopul4g3uychfr6hvs27i56okoxt1k7zz81mwzmxamee675ohxt8tjmj2kl0j3yntm296zllz1mj01q6s65c86q2ozgbx7tnvysc6ob5rcjuaz6090ce43kee9c9ujexmtt6'
        })
        interfaceNamespace: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'iflowName [input here api field description]',
            example     : 'osjgrz8xsxiawoimjuxxxk8tgsninwhaiaae6d7llgblchvcewxsadnbrr6qlvd015zju9fnrzwjwbt6xpy1wkj3z114lwdb3lgmjsnk5pr943r6vp117erqp3gb8b9yecwpofqzvn8vev13q3n8w6jx5fxi67cb'
        })
        iflowName: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'responsibleUserAccount [input here api field description]',
            example     : 'tckeb84j50xz1oeb2x3g'
        })
        responsibleUserAccount: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'lastChangeUserAccount [input here api field description]',
            example     : 'cb05i1tphtcerfnrg6x4'
        })
        lastChangeUserAccount: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'lastChangedAt [input here api field description]',
            example     : '2020-07-21 22:04:57'
        })
        lastChangedAt: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'folderPath [input here api field description]',
            example     : 'djhnt4wuwqzkr4pyn0n3uiogybkn1kkhtalf90on8v37gcavonptz2022nhk6jycwxot1ef4z2v7076k9tr4fot5u7uj4ol85uw47pvyvoxlrh8hsrpmlimq5t064tob25r51lk4s5rwozmq78jwrswjv8uatq3xfc8nbrjl5ux65kev32xs4y81mas0e5ejhv4irki9e3wzcf1bqo20hi1e0r3e2jfotrocs5prg6gpc1jsmclrr633js84vgo'
        })
        folderPath: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'description [input here api field description]',
            example     : 'jw64a5yqwwct7zjr3v97eshtj9538iyv36c6df277ly2rj3e1l9v6g6j1kv9ukjvddlwme5inxcs82rbubo3zg21462ahc4zb9h30rk7dtmttzy4f81ki63rt3vi21661wkgbrdbkvlsb24nfh1de78b9p3us8g2xfsnbeogykv7pqtvqc6wd03lfjax6at65subiimitxvrxsi7mh50047iz41ra5rq31hcqdbcwuhav9g0hfba2n6t5qv6fp1'
        })
        description: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'application [input here api field description]',
            example     : 'z5i9virte20ghla0brzqn2ciiuuqya0lhqrcf8r325y9ptkucpu2d74eukod'
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
            example     : '091fcd92-24d1-4939-8766-08f3d7da9f96'
        })
        fieldGroupId: string;
    
    
    
        @ApiProperty({
            type        : Object,
            description : 'data [input here api field description]',
            example     : { "foo" : "bar" }
        })
        data: any;
    
    
}
