import { ApiProperty } from '@nestjs/swagger';

export class UpdateFlowDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'fd6a6d4d-73a9-47a0-b819-f1999bfb5eab'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'hash [input here api field description]',
        example     : '66mltvssv6e1ofsdqaa4toaudabx41cl28j88vdt'
    })
    hash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'e100c5c7-62a9-4d07-a293-08d41b59792f'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'wogf65e5cvbxd17l570wmx8oh42gf1w48ewrvygysbwgtso00e'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'd2cdf6a6-c106-4e6f-8319-041619fc96ba'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : '3ndbeo181t1knhwxwyp4'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'bc7p4fh49hcbov1zgn61'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : 's4l4g5z44a0pzurgsc909n417he4id2xxmgxvqe5c4tul5794xmeu4th8rlr'
    })
    scenario: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : 'wug0vdbe983wi14iwy1rlugma17inwts2d67i29zip1n484wqtt9qa7dcm648b0ullozqhiylg8n91qwp2ra055zc1ugmwz7eo33a7yedpadzyvm3ptcy1slo6urspgkkqorehy6h3cqm8ij7qvzom9m97b8blek'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : 'vtb0862o03ilqekmzat8zgys82pcbsux2ypj76nrgm87mz9feg8juvkrovxrqlyqec4injp3z49dibrxt7bhmd1bqojh0pkpju0tn9zxi1budw8qsdqgn216krwvg1yqtab4g9ilpmjeic28837mnvvdt28vzssd'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceName [input here api field description]',
        example     : 'm0wp49up8epk3cwf1x0djxbknjmqy1732nb2w9g0c0pkl8v7qbc0qdg0mnd54uuusv95s1vv2qq9vew8z2pz9pzel22wwpi86io09cgm847qrfydrcpwzaxoi3jowkxelexcw90undyhx486d4tez27df67afdjk'
    })
    interfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceNamespace [input here api field description]',
        example     : 'fxr1apky6kg4m0t9gg1s3v1fpgho6hqvrfuoz0iwzhwu5p7tsh2ti1a6302qgmi97vqz0z01mc3hshuqivk81dvd1aypoger46k1rb8j3ua90s5t7x4wgrcwk1pybm6y4menui5xqclftddm5p7c6whwnrcpyenk'
    })
    interfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'iflowName [input here api field description]',
        example     : '9no5n6l0jg6t94c1ey51xp024u5jy3urkfrkrscn388i9d5oftmvy8vjhjgn4ep13mvrpqdmesx7w5fowmrenqxqnskc2421m0xoqxt52uqyc3f33mq906s5hdfwzxdl7vk5fgx4pofy7ltc9v5lleh3e0ymcd0b'
    })
    iflowName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccount [input here api field description]',
        example     : 'hs9236zjqhqxvme791lx'
    })
    responsibleUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : 'z8npsxc91yos1j3i0dzq'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-07-28 20:10:42'
    })
    lastChangedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'folderPath [input here api field description]',
        example     : '702v7xtzdjo51w835i69qd2mr28y6cvtluipqq7k10g02dyipu49luzwpsf72lwdlxy210hk502s4bopkni2xpazss2pcahpeq4mzdgvhygryqb6hn4rvvr00id5w5iuywqvnydx3qjss4f62l0mc1s6inj24z1soyhjkd9rsprcndpbtf51tyoq577eq8ar80e83f6ifsum9ne0u8x7ecxpqj2yr3xe41s3ekqlwb5r17gtmp9v0p0zrsibpr8'
    })
    folderPath: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'description [input here api field description]',
        example     : '9pfudr01ry3asmu0monw5rryuf6q02rem2bbk8l6yi90xdxdft5bpqoxo6nn48831bmlu5ribgff8nuwdy8dvyu7jsq4un3w99ikqcxljzb85jd8s0p8kzerkssfpn6p934ehbl6kdvjkocbyix1s7zbvuuj8zg8a97aklkcu7fsaxsdmeczye6xct26z27fjng9jp4fy7cvmc8j31fqrwt0qjddxehwr5lchy3iz11fde0i5h7cvrs7jlfj6j8'
    })
    description: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'application [input here api field description]',
        example     : 'iii7xddnku6jqvm5wj7375t6rd4gb18q1l08i8aqg4euckngroyndzm06fyt'
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
        example     : false
    })
    isComplex: boolean;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'fieldGroupId [input here api field description]',
        example     : 'e314c0e9-7531-4753-9e17-85f341a25a6a'
    })
    fieldGroupId: string;
    
    
    
    @ApiProperty({
        type        : Object,
        description : 'data [input here api field description]',
        example     : { "foo" : "bar" }
    })
    data: any;
    
    
}
