import { ApiProperty } from '@nestjs/swagger';

export class CreateFlowDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'de0f6cd8-466d-4003-9d01-84c94bbf9f40'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'hash [input here api field description]',
        example     : 'x4fidj2kra5ewv18fframr9mke3726yfq2oeor6i'
    })
    hash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '425ddd40-ebca-4a69-a093-3a3f40233b07'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'eduz7xl06cza1hah01ebg9k2st3b25q6dhgixnf46zvxxf95t1'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'd506aaeb-0823-4cb4-8dfe-9cc06ec3bd84'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'isnxoxk4ypqp7e8botck'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'goveg091x6j28o6a5xtz'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : 'nxieocu3i5emrb1d3pv0db9fxyjph7rw9w3oljmg61jrfeknw5nuoh9fe6py'
    })
    scenario: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : 'eniu6tqkyaci96zp8skgjj1h49cim7wssi5pgk1k7k6t8fci17k1xr14pqowedb33zwens423yd9e87kp1ycuh9w95smohag3wolbvp83knbcbjh72kiufh6gptoe99x1og5mqt1y74fpgzmj9jwmfene7qvcxk2'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : 'xtsznfryg6xcpf79s3qzdymhlhtqcjc8a7vj2wzt47m19l97r3ana91y02mote9arkpcb9lxr32fa83teqhfemy4tv1mj9wu8vxm4sl2j3yoegfcp3w28que6d42utbb39txqw6de9q9hx5nh55ml9tu3ykwby67'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceName [input here api field description]',
        example     : '26237at6lrxq15jofwckvlivd5kjj4ep7mwxzvskpb4v7leqcyxz6i3txnzg0z2j4gwththc6ay169a25l685leymxl7dy7qvnx71n2gs4043kii2bi4aiswm3u6gn50szxoi0udjripul6yiz9e05npxf6o2zuj'
    })
    interfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceNamespace [input here api field description]',
        example     : '70ghx3evh1ar0qt5w19ux5uw4v7zezurb5hsddl22qs9qqt7dpdzhuutqvnlv7hn1rewh5ioukp8ptnfkbgsx4k76t1ghbeu18s76gl808c657r8fmk2c403yi4lzq14h0r5c9hasn1x91vafjigsp9n5pv8qozr'
    })
    interfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'iflowName [input here api field description]',
        example     : '11f68d4c6jlrs272t1yrtwp2z8i0sbc9dykxt9xq6kutn7lyoth9dkkjinhr69auxslvax4cb2laoanyojwxv8ge97cto09foqm8e0aybsj9651ogbjhosotem6c4qw79fe8ii7157x7zscpbu52dtiowutr9w3h'
    })
    iflowName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccount [input here api field description]',
        example     : '3rb76pd9ifq3zn03tcfc'
    })
    responsibleUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : 'iw1bh6x2irqldh32bcbi'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-08-04 17:46:44'
    })
    lastChangedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'folderPath [input here api field description]',
        example     : 'tbcbo59wusfpweta24qti55h5j4f45ebyup3j1si9ttix53ke3y8juineh31kuu2g0el8strija5sqpgvk7teu886g47dxx0t1olhpynt17fcigbi2qwrdvmj94mojwejs38gd3ckyim00k8wfz8fouvjogb229t9w40ljure6t8g7hwpkgkt2ncso3crkvnp1y93g8nd7yyccp372f482hppzmqwqp89ymaa0yvy18yijkwhqhg18r37wngzzq'
    })
    folderPath: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'description [input here api field description]',
        example     : 'iwsqbx3su8lfctkvdsmkq5preef8nwy4kylwhj4lpdcas5ol2ufx6hzx2gwmvq507pala36j6ex8o1qes7i1dxyf6ix38slh7wf6j0nra2iteze0a3zffu5bfe98ebq5r6sbmvuyqo0wfxvjww3eyw28293b85g11rdeql3636nlnvo5rh63u3onb0g9lt4j4thocyg1ogh7x1jt2a2bujgws9mtt7917mzysruzv7bfeo6wo3wpyinkkbrwc0r'
    })
    description: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'application [input here api field description]',
        example     : 'oumcf3cxwxl05hvysu5gl4wgsl64bzbw6tro34kjusiekvv185r626bocg8s'
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
        example     : '41263fed-cc67-4ac0-a672-06fbd28045ed'
    })
    fieldGroupId: string;
    
    
    
    @ApiProperty({
        type        : Object,
        description : 'data [input here api field description]',
        example     : { "foo" : "bar" }
    })
    data: any;
    
    
}
