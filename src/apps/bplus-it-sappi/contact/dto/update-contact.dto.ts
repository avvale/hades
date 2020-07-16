import { ApiProperty } from '@nestjs/swagger';

export class UpdateContactDto 
{   
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '6e521ac7-7f34-453c-b979-6cca399cf44b'
    })
    id: string;
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'eaf0c187-6227-49dc-a3d2-eb19832a0bfb'
    })
    tenantId: string;
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '656171ec-fd59-46ef-b5fd-d64472f2ca81'
    })
    systemId: string;
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'ijrxqex7rtw5kylyq6ny'
    })
    systemName: string;
    
    @ApiProperty({
        type        : String,
        description : 'roleId [input here api field description]',
        example     : '607751ae-2828-48ca-818a-d079459234a9'
    })
    roleId: string;
    
    @ApiProperty({
        type        : String,
        description : 'roleName [input here api field description]',
        example     : 'xi2mo4q2drf1ceusiv5ccqw4wk17s7czaqftaaai3tadainhtc809kf3shujnbwxa1ynd4pe4g124fq5u034t8ezsam0e5ie374zmt7gfuy72ybzb4ougkc2l8jsmw09zoz3t1402euxuedaqqcv1sjygql1cf0af7ea5hotuf6tfyarlm1s9frfps0cdavwgi1ks7nhl4r56uaf246k99fxk8ynn1p60dsq2if79f33wyux5mirlo91ew9b51i'
    })
    roleName: string;
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '8vphwk0rofz2c4vyvgvrp6omkoo0wcxh3tbbbzr3knqnihjze0ksh1m4nat2m1d5zxlpqvt42dr0gpiug8uy8m4da9msyqk28yw3tv129st2k6ddsvnm6yc2j193kjb6sk790uvhwxnij3geqn6tebg08hycitkkbon5o2rcus2tqypcipjwtrp5qkhzz524t9lxy8xup8qzclj7u7qoljbd2l2belg1yzluqwmg8hn8298qbm5xrjwqa0kay3c'
    })
    name: string;
    
    @ApiProperty({
        type        : String,
        description : 'surname [input here api field description]',
        example     : '0ozqb75worwiexlrrq3ei2cr0jdgmc1mnrhn9f4dj0aknd9bqlk2bhlzs09jsu7fkb8bb8mfyg8wgxp73zs9cfb4butukpammfb5o1ciyjpnddvvs9lzvnqheymvuc8kxbkdzbd5khae82q9iqhi7b6yjvq9ptlomt8nq9tvjp1og0f31qdqh8xajsr39vlgeda76eywe4zucttysviykx8y5wqvk79y024ced1h2lmtz0krn7hpdbwv72pl42m'
    })
    surname: string;
    
    @ApiProperty({
        type        : String,
        description : 'email [input here api field description]',
        example     : 'omr07z4nlsja8dn4ktvygjnr84snqoixek2b7nzdgwory9i7el1b86yz39qgpehi6aa14kywtlradlw4raenzn5m7mdd5e61732himjlkq3mfeg3vj5zz4yg'
    })
    email: string;
    
    @ApiProperty({
        type        : String,
        description : 'mobile [input here api field description]',
        example     : 'ueje7vf5dw510cyqe1cs4mplzcyr79ginvhy76p85k8v4707fulgt5kzebhc'
    })
    mobile: string;
    
    @ApiProperty({
        type        : String,
        description : 'area [input here api field description]',
        example     : 'a0n0nys4qegld3yecpp0jgzzu5haqri3l72ap8zslikqbusv0v8qftkeja9oi0u9g7mrrrqpqd4zd12kl1frnrw8g564m6gdol1st4lqf17up671fp0qq2lnikljsmo039lh8zk3f7b76gr5njup0x70hjnf0f2vretlrzgvb7l5pz8svc8buvra80ta0jqqwmdfwz5s6ahhd6w8sac57yefa7l95ha0oc9l9k5ybof7gwt7bwbq6rhkzk3djgp'
    })
    area: string;
    
    @ApiProperty({
        type        : Boolean,
        description : 'hasConsentEmail [input here api field description]',
        example     : true
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
        example     : true
    })
    isActive: boolean;
    
}
