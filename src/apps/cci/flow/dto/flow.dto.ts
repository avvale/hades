import { ApiProperty } from '@nestjs/swagger';

export class FlowDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'c45f4620-5513-43d1-98ce-01a1f1e700b7'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'hash [input here api field description]',
        example     : 'i3sfmc9ncy76dnvopnd1jyt0b4foihec4iux5p4c'
    })
    hash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '18e4cf70-7135-4e0d-9d1b-52237216a034'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'rjxd58kc2xlvdxfdvywip8y2343jhxjyltje6fmgir8614t4h4'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '3970645e-f8e6-49ab-9d26-5f471736d93c'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'x730mtmwwocjmybwybzt'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'wkeknfg2v8s90duds3st'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : '47e920g79ei77az13hdgcfvpf0jx5kau0vi9j29wa4qp9n0qip3v7niqrm90'
    })
    scenario: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : 'f7sdiffy327pjc0ji9uce1m3kxgwu3133cvxa8mg7p11onq2jcf6k91d3hinf5c8k3mdnx2wc1b9mi6rjkb651ikhvtf0rrr3b7nrh8cdq3ody5mowxvmg1fhet5dkndh994rtkocn5nft33s2ddqptqosc09zrt'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverParty [input here api field description]',
        example     : 'l3zaqmvjmle44atuygdxwy1rm8p79ahm220sjadxx1oyv4vfzjglp9hl8pb6itwv39hkk521udplqzhkw1i70g5urnl2krhdpxvn8sdxc0b208ihi5n3wqjpmt27ncrciehfxdnjnhw7i1task9mqg0ntb8as4x3'
    })
    receiverParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : 'swgu77upi8a5fean484cbky7f1c8ob1n939tdajp65unm901htfndxamruoj1etenj1xfxqhl1s55il32fzgxmuaqy6wd20urvrkpm4s8x0bzezf3qa4ifzuc8ooegg01bv6jeof33zvey0cj1qswvl1hrgwx81c'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverComponent [input here api field description]',
        example     : 'ch0388bfxx5o3w96u5qih6p8k65zy353udrqbw1ebsx5o3o0rt4wvf83tuzsla0ajuvitugqbs8lryzkp8ihlmsmtz734c2051otyaegqvpeyv2tr69nj9gqrddca552csehyvjydr5154c2xzxpngzbjmm33moc'
    })
    receiverComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceName [input here api field description]',
        example     : '4ux5d5uugic5ezi2kdqlusfdd5rsdul0icylr8s76zi8kiyi6eja3oyhl08fh585glxvkgz3taah56vks0dkpcticwllskpw9vuppg9n6ecgnfehvx5u6f958c621jkv9tby9ryj3xypuyfgknat7n8up57aeqrl'
    })
    interfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceNamespace [input here api field description]',
        example     : '4kw6boim39jpy1jl5jp2ar42fgd1wbi2vslf3fsrdk602umokj59mm1wt9uvgvo4vvdtrlmv0kizsyhw6ymxi19trl50l6809m05zw7h3iqabiw71rw1r8uwkicw19rmfj6kyt29cq1mux2hp6oza08uvcsob7k4'
    })
    interfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'iflowName [input here api field description]',
        example     : 'b3vcurcthml4brwyqmphyjwsu82swho3blzmxg42i2yj30vygj2lnrpshkdgtx5su6xdagky336hgl6pfm7kiknhzkyz59x8bm3w4dfum2e4hw8djyhxdmru6m6sqhi62m7iq1j43l0z06qx8rifmm9nsvf0q2as'
    })
    iflowName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccount [input here api field description]',
        example     : 'nj1pbwxvvhky3xht486t'
    })
    responsibleUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : '2pnxjgad9glfejr91yf5'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-09-20 02:00:17'
    })
    lastChangedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'folderPath [input here api field description]',
        example     : '6ro856zqlm17lvzuz7z65ipwxezt7074n3my6giy2c7lwl4sqptuygki0q1uuf1hus3hx2kqys3n40u2b44dxarnjl8xl6itucgt7e52ctga3ba1p75bbw21ln7w6i6v60go6gm8mizdgmrwhpz94yt81ablgj40eqnilhv8xy2yznsuvm6w10iefqgfag5sj4dq1b9pa96tv5ao5fec2ap28f138ebiaz0bpycz7tzkz2gmcg5dvd9yzlafhct'
    })
    folderPath: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'description [input here api field description]',
        example     : 'fmus4v6wbb3bgq9536ze6pfaaaoq8wqjwyqytzwgubfuxyibgblu37hkmt626d4oe2d9bk1kl4rzmzfmls4qn19g2icaazt16cz3yi7kqohbg1iz05cpc47wcpw3dwr1k09njdxhgesqyg8i6432riywi6mfhmmjtco3jqi12k9zd4dxve4y77sl1tuyfblv8jjy8ey8w2b23yf8ll55dq61hivqk3ui7cm1omo01x7igatl28b5b1djv51mhjp'
    })
    description: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'application [input here api field description]',
        example     : '44v654bjaqiewa0tjpec72122jjxe6cehoj21myj5bakvezdey31g363qfun'
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
        example     : '42257f55-fd0b-4fb7-aee5-97c6b677dee5'
    })
    fieldGroupId: string;
    
    
    
    @ApiProperty({
        type        : Object,
        description : 'data [input here api field description]',
        example     : { "foo" : "bar" }
    })
    data: any;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-09-20 10:50:06'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-09-20 08:38:17'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-09-20 12:11:44'
    })
    deletedAt: string;
    
    
}
