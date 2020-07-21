import { ApiProperty } from '@nestjs/swagger';

export class CreateContactDto 
{   
    
        @ApiProperty({
            type        : String,
            description : 'id [input here api field description]',
            example     : '32ec5b5c-16a3-4070-9194-b71ff8e678cb'
        })
        id: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'tenantId [input here api field description]',
            example     : '31088825-f57c-4fa3-9757-103a534e9206'
        })
        tenantId: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'systemId [input here api field description]',
            example     : '3f34a134-de5e-403f-b00a-95954bf10fa4'
        })
        systemId: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'systemName [input here api field description]',
            example     : '1522dtga4erzdc8235kf'
        })
        systemName: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'roleId [input here api field description]',
            example     : '329b2892-f556-451b-8d96-e301f8b7a390'
        })
        roleId: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'roleName [input here api field description]',
            example     : 'iszwe77t91by0hgm1fcergzm5hitvdqhxaz0e9t4nyehv82zh7c7t0sggifa76qxr4o7yfv4scxhhfkp07rat6r0b49acrhb4fm9nm3l56qa4hrdniptli06lt0c19ybmfywurwxqqaqtguhjl6nr78q9hhok5dsf3rd3ccayjof2acmnq1dl2ahjahvuabxclfq0eai31x8b7ovbt4jo1min9cdamgkdzfntbjj2x0ky2x41w61qim8es0qd9t'
        })
        roleName: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'name [input here api field description]',
            example     : '2mvzwuxp6tyctbxs65l0q80j1fc8yqujsva7ust47be7gno4nike4hlyklia6kxtfnbd2ekpatg8860i05jdbcrcwr7cvt6jraafv9tqti1m70vyb1lk95cf9cibk2kyt1pwro90ukra95t2ut9lo68j6iuw6cwd6kjg56lqmxeijl69q0569k52yfd6u93vzjl1crwzky3dxd7pm8uaws2d37jn2eu4jfdkbauybs7eso4fsll9c4hqsdzi47g'
        })
        name: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'surname [input here api field description]',
            example     : '401oyuvtdv5zfco8cn890pxqa8qwlpnczohfhwjppodmz7bb2drq8z3xeh6q0mrx01zcyq43tzhz6rqhmedqlngwxuadqpsvsdx3gu7kqxjrve2vh6d55vtxebw8a7db2ewia8yhvr235jkbp5f46ael8o2addk2rnz36vi0onz6c7ecn0e7tw44855oqfpnt6e84p5777e16yl7h4fkqoaioztc27a6lf8bu8eagukypk8y8u7ipwdwkjph6hn'
        })
        surname: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'email [input here api field description]',
            example     : 'u5q7ndb0kc9ntwm3dnckyv2sb6eszdtyl8lqy09l17o5cwvzs1o65d6ac91dwqaq4fx3k1c8b6ff5tqqh74zkif9hluwaocwefh6mi6tvsy312dxsclsvuon'
        })
        email: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'mobile [input here api field description]',
            example     : 'svdnn09g4wb9ujjchri1ub6g1hjsw4j3j68p6btpgpql08ff05tuquf3k87u'
        })
        mobile: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'area [input here api field description]',
            example     : '1mlzn9auakseu8128trqcytpua70eyw66cplrwh7fine3tbqn4qu71c0ogg2qgkdwjyed54zi8mw4sh7zl3otz7cu5czybjxr954kcg33mtcrcwzmvlag43z5w0zhkbme68pszsbn367ss1affnq096qcbdl4p69ew9m9ihu9kaplh78svvsmeu6pi58zp6archejl43cgw6upaiimakf8a7p0j970e8sxskiwsul5twlrme9x8it3upriplj0m'
        })
        area: string;
    
    
    
        @ApiProperty({
            type        : Boolean,
            description : 'hasConsentEmail [input here api field description]',
            example     : false
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
