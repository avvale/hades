import { ApiProperty } from '@nestjs/swagger';

export class UpdateFlowDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '049dfba2-c985-4a0d-9349-eacd2961a92d'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'hash [input here api field description]',
        example     : '3bg3oad1tgpqjygcle21g48213miokkcoiw7xyb9'
    })
    hash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '79b12cad-c428-42df-8f7b-411f865c3f47'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : '6tovh50nox8wen281jj7fk9t6r28uk1xhvnrvjz86lmbpl6qvr'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '62c34638-d7a4-463a-a635-5f070479bcb9'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : '24z2xdwskv5k9enib2wi'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'gwbobkactonn99q0mmu7'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : 'gqhfa2ekx4sqo0e8t13vnmmu6a9xq0y9d0yzy1220dl5kv2qsh7a8xuzqcld'
    })
    scenario: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : 'pxbhqo1iefbyib75xo2mgge6zj3crt65xmax3qthgtznrhe3kas4oqn75tpmmhbgyt1xxgnqsc9m3nz98j8rnyk0z2i592qb99ri2u59f30mdgf9zgz09vj2hdbhcq398q4g9q04swtbkhmysxuvhnuu3c5kgfqb'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : '8xn8swph1mspob2uqtlw344hrb9qm61n0d14o7fln2kqi472t9u0cd9shj5pnmg5mnsaaz5dqtfcjew9z8isb82xlg67ap7mr22uaegmcmu1m6jkvoy37q4o2yf6u8jk6fobxm3qumm88t159y6260ze1nw7r63j'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceName [input here api field description]',
        example     : 'gw0hzy6csjkfpmart8h3bq7dhifmy0x4simofa5mayftv2ia11nsq7xcbs8ife9yc9i4e4czk90kxx7w85g8ieyraonrodg7aonvl8t4v7hjx7ub1ojbm7blcf4we01fp6k9t9seu978hru2bex2ayo8amsa26ey'
    })
    interfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceNamespace [input here api field description]',
        example     : 'u4jspwlik24lgdu3e9r6kjw6qjj1gcv3q250xga7k3qpj5paqm4myorrnwyct46hwwqyvpz8zt5mgpwx4b1dl3o7zf5qqxxd2fynngt2kxuazduj7mxjvxjopcx826fdr2x8z0u1xyqdyxdvuby8vx1fbd9smksu'
    })
    interfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'iflowName [input here api field description]',
        example     : 'v9qll95o914n75yjc8mrvgcp67d3ed653xxvezc57h88qabmzgqbnuqkjttda75wig7ym696rmq7crc6iwqooxbaxphmutwpvofls3egftbj89wnfjpod2h9kcobivmxsqbzy3rlc7m9ahf80hliais4dbfxx22i'
    })
    iflowName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccount [input here api field description]',
        example     : 'cj5dfzwhceyz81alk9gb'
    })
    responsibleUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : 'sfp0dctfohdrn2p7m8bb'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-07-29 03:20:56'
    })
    lastChangedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'folderPath [input here api field description]',
        example     : 'tvoxvm60vsc29d60n6zlkbgwuua7rmd7ulhqkqsenq56sihq2i09d7rmfhx9xob5lnd9xsin9uaux6770jod0dpzswn02q09t8ufzsqeatenu3q6volghcap9m53lham8gdkzv9o7ey7j0783005ozh86gprsgmiy1cekx6cbflhy1mupu3d6y4pzl9c4e182z1xlue5ajc4mof4qc682y79qn7uqczxabw0z11ka1xzgwlf9cviuk9kxpoml1n'
    })
    folderPath: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'description [input here api field description]',
        example     : 'hk1hpmcwgq9jbh19a3t9svlib4owub2v55xxr996bkcmahvvceawahdjbbdls0r2x05l7qe58tnk4avvikcqxdv6lub4z23z4v1r1a1ue3uc67ulblx5t7qe7dtssyjf8f57x044hs676lria1l1j2fb2xxo6aq24n0op08tz266jcpj216wxq1oedpw4dj7tz9q1nrdh2hc0y2jti560les4vrcvs3ztujneznpe5k0cuhlv0vtl3asox6t7f0'
    })
    description: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'application [input here api field description]',
        example     : '5xcmmgsuzr5v0b05jk08vya2ugolvlw75141uyqu2y6qz45xiwltne7bxp6w'
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
        example     : '3eef28a7-6bce-4ae3-90fc-e9b5f58fed2c'
    })
    fieldGroupId: string;
    
    
    
    @ApiProperty({
        type        : Object,
        description : 'data [input here api field description]',
        example     : { "foo" : "bar" }
    })
    data: any;
    
    
}
