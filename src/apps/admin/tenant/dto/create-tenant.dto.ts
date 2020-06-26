import { ApiProperty } from '@nestjs/swagger';

export class CreateTenantDto 
{   
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '6e243e17-899f-42a2-8d0d-86cef1c96469'
    })
    id: string;
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'gpi99onplf6ewggaw3j922fjgxfsm5l2h3qpomq6m9f878z1ob1m6nsopumw63fujxyz028b9ajyouoxfkulxqcy8xfpaec30lrxzp5jgdgci9g868pwwuju21inmn5sla9g1r0ikwm3z633laqqxcsnxpxpwddnyug5ziecj63c6y10p9a6jx91mlwe105k78hi9wjsjs75jg5d86y8gu4bado5aqmob76yjth9e15dvmyqiey5647p3yiifrb'
    })
    name: string;
    
    @ApiProperty({
        type        : String,
        description : 'code [input here api field description]',
        example     : '022b2h9b44d9mf4r6379sdop8lpdqiovokisfhhpzf4vwm4kbk'
    })
    code: string;
    
    @ApiProperty({
        type        : String,
        description : 'logo [input here api field description]',
        example     : 'zt7kjvmvqsy66afux7as1q5pe26gw3ph40suemgf1gs6658irjfwb635gcne4u3nwu1rm6ioggydpe1m1esi54wxuxf7q8i8xlaqt0ltkrc1upn5du4n50a4eqmn69fv2hds7di19r2yukmdqk83tsbn38tmju2k3tictqx8i4l66g888wbir7nj89hpwqj1gddgpvf1yr9rienjgwbn0xyr479lyhwcuc00943s54v8147dncooqmsbz584um4'
    })
    logo: string;
    
    @ApiProperty({
        type        : Boolean,
        description : 'isActive [input here api field description]',
        example     : true
    })
    isActive: boolean;
    
    @ApiProperty({
        type        : Object,
        description : 'data [input here api field description]',
        example     : { "foo" : "bar" }
    })
    data: any;
    
}
