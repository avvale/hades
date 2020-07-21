import { ApiProperty } from '@nestjs/swagger';

export class UpdateFlowDto 
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
            example     : '309ixe97f8dm4pff0juc'
        })
        systemName: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'scenario [input here api field description]',
            example     : 'r35rvjwtyk0ef8ejtq0lsdc0c0kpjhcakrxioi9j0efylrtjlo5a29t3en5q'
        })
        scenario: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'party [input here api field description]',
            example     : 's8t3aaf165xxlrg8kyzdfdpu8aqwqa4p6m7c9k8txdrdddi5skdg0jo9b0u7je03v0ww1dqqvr78q1rx90xjge008r68ptbvyzqkluyq3m13jwmysdicjpi8bxc6cqb07ot9py1lsvgy6pocjiwyly08g1mvedhh'
        })
        party: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'component [input here api field description]',
            example     : '7s02e5j98ou8jjp46nz8d8g5kt7v6ldwu8saucr7wz98s3cqk7874553btzjrv7rf8gptu8j3e94z1s8rl7p19gntako55f7bb5y1qk8e6zirejl2xkqwt3zkqhw9xy2jksqet5l2ens509x7hohol700njg41py'
        })
        component: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'interfaceName [input here api field description]',
            example     : 'db90c11ijiosjevirrehv3lfv8n4771hsjt5r7dq41a024yi76po1zm2bd6kg8zdobx6qhm4n87cgdflvmacb1as7duo2nsnawod6ijsysiulwcf9abq9m2owt8yu6ix4dh1tos46hifvmvqiebyswd75arlcjlr'
        })
        interfaceName: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'interfaceNamespace [input here api field description]',
            example     : '47pc6384sv85xuuvszoq25jrq0z03oeivlzzs7ymcbq61navs0rks1bhei115943b5sn3jdakffva5f72yw635kpvhcqn5sswzikpvfhrza4r7a7qm7ig3uhgtxlh9snvx8yopjqiu4tmgsk9xx4w3kncgz1r5zg'
        })
        interfaceNamespace: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'iflowName [input here api field description]',
            example     : '0u1pco3ujmzs20mqgjx1xaaes9zui7jgrjxzl78tvvf4ulkylbszakqi9v2fu49znnnuyb1o0rj0sahoxg3e74uc4mqzjzltfw4hs6xonng7duepl006xqq8iopoy6klrikw6q05xglrbhcfimx6nx89pd88uufu'
        })
        iflowName: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'responsibleUserAccount [input here api field description]',
            example     : 'nav26brfdwj7923znjji'
        })
        responsibleUserAccount: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'lastChangeUserAccount [input here api field description]',
            example     : 'cep4qktfa86seowopy2w'
        })
        lastChangeUserAccount: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'lastChangedAt [input here api field description]',
            example     : '2020-07-21 16:03:49'
        })
        lastChangedAt: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'folderPath [input here api field description]',
            example     : 'uuaszyp63ogh3z8fa7baegd54b2ji7oyhqcu57x2pd4mcdrimurvkghrvboal66lzt5woiib2m1l0kfheaxvmv9oevr22dele0nz3po0y4vvnzd6rb5swuu8r18vffj2pnfd5yhe2yev8hyx4kz3qdylavopcd3o2z3a31dc6fseggitxnbsnsmicxwmdteyem2n9fvydtcsagmzjraj9zhrg9ks4qfb4uxbrgk9d8t2v97o5qr3l75iw34pjmj'
        })
        folderPath: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'description [input here api field description]',
            example     : 'f6n6mkhq7aju840qheme98ezip42wrb5empp3phruke56bo4hx5k9c1f8g1mhfhhfakbhq4i0olcbdoco4o6546j7st7kfur0d3k0gm62dc829zlqnl95b1ix9fescm6sndr5k8ty8z4yfqu7f9vvypjkvdfwx7mnhyd9dw5e08d3hwvxqwxptt8v2ehmbqobwsilrfykjz3mzjat7ih6vvdw5hxk9232p4x3ncthg54r136ox3o38g2gxnp94r'
        })
        description: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'application [input here api field description]',
            example     : 'sz91woty9yv7clafiubueos6igjz6or0zgb8ywub596lh2ax6quhgtvgxlih'
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
