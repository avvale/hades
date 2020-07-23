import { ApiProperty } from '@nestjs/swagger';

export class CreateFlowDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '3c4a0a1d-f3c3-4b94-abf3-3e9860af2735'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '3203f3b4-564b-4f6f-81bb-53e7bb4f6940'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : '4dseoapnvrnrv9ag4cih5des5ejakc2kvkp12ywr4zv074pu7m'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '7f1f5605-aecf-4cb7-8317-bbb853061653'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 's1krj25d6jhuw30uodnh'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : 'kitmpww6n51qyi8lr07hfp6csff3o4qz0mjbkuptgzpjxt0eb47e38cwu664'
    })
    scenario: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : 'pv0ts05f8s59rwwfdq93demh3v3esawdk1eteciaolbtxe97bxhvgf7607rnbpl7a4gsjfbmlw2cffux4hecshvugv49z1mekl0zsoa5p0dezr5o22quppmwq9eqjlvxca3qtk1bap0v82vl17nfij7fv0rnmwj9'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : '36gisg5r4j3s4m9zwhvlhpkbnn7jznllm4k9qnsd52nyhx8c1zsgnz3b6lgpr4l8sbpyv5xqz2l16dbeqvkv1u9z6gxhfj3cqx2bvrfd08d2vxmpcjqjydyiimwnk9neeo0ckcbj7wsl1prqyzi970avbdxh3beg'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceName [input here api field description]',
        example     : 'mwbltu61dhmarr9ano7eyhhugbxw3hk0xgu6uxjdky4rz6oastzzuq754i07omlcf10pa4h9xwd19nxj14kqlytj8dwfdrk90fxd9hjf0qv1e7foe84jxlxulmzkhh52s6anxe17888hm6p9ojeev02u4pj56ai4'
    })
    interfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceNamespace [input here api field description]',
        example     : 'oln85alalnij1eyozlrhlkeygwijhctf8luilalrdw705vtprspikh8ud3nk5yr89v7k5293mb2ltdyd090bei3pdxmpqcsiyzrqkcw76pka5xobup2usiqe6cwdyl0yxmdp5c82q91aojyilp3lqq681sgu7sn9'
    })
    interfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'iflowName [input here api field description]',
        example     : '6smgm8h6d1rz4j6hqkpe01il5webz9rboh6y4enuaxkkvsokuvbyrd8tbv5qynmlw2uwvnjpi1o1hssc7p78zehwbxvrssdyyikk4gmezxrdarrekxlnbrn41h3gnjvrqvvhudh8mfmkivrca6r7xl8j321qctwl'
    })
    iflowName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccount [input here api field description]',
        example     : '8plbostpbliv13zl01cp'
    })
    responsibleUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : '9l78qiceq7he7pm4nqsl'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-07-23 07:51:06'
    })
    lastChangedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'folderPath [input here api field description]',
        example     : '4l0emdgr0a7f20jyv15etsldztlra2y2v58sukxdg87wj8xlg45ljtbh9o8kksvzdkwp5ibww8l829tiufm6f6cxh4rzkd2scoo86zpljmfb8on3k5b2md8c4sdst04obfioc9fceok6dkb0mo6gz3llvfq92n6mf0fcx31xps1drwo91o30tkv9ncx2b3nw745amx2dmukmsi1bscxn6l1o5lk2uclmv9a0q2fck7qdheqcouusk9bs29m6wd9'
    })
    folderPath: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'description [input here api field description]',
        example     : 'hetj2nlms012lexppr7cypoznp6mk4q9i5fvd5gf6yyjb4c8xzgz8ko02xipe1jssxh3ug4schfuxq7hj0ep7jt9r9kiwjefvse2xs72jhijwm0spnhqrwrkfebukgpgzjliqe4w3avhe9spuhuubef5hq10ezszjdnpmh0yk66s3r59xzu7l2zfrxn9xu9u37ad73r42kxh9ec2cujridw4sobuupaed9p9ge4ia3dd2dvt0vxn125xv15fmqp'
    })
    description: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'application [input here api field description]',
        example     : 'kxyqlxu60ye9lbbga4ctmvozc51lraa143b97k24mcuvolc66zft64bbdvh7'
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
        example     : '08a26543-4686-4000-9f19-5f6f30c920d7'
    })
    fieldGroupId: string;
    
    
    
    @ApiProperty({
        type        : Object,
        description : 'data [input here api field description]',
        example     : { "foo" : "bar" }
    })
    data: any;
    
    
}
