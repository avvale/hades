import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '78782da7-e8aa-4668-84b5-0232a2a9039c'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'accountId [input here api field description]',
        example     : 'a19e48fd-b959-46ae-ad76-ebf13d1701fa'
    })
    accountId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'vrran7fkddav9hoaipkb0v7mk42c6e1qsrv7bcraxsctu9o2i0zo7j63rbs0n3zuu5hppvnxbnois1r0q8qxdp64sj2x0rz44tnzv061td4vjolgomotohfxeahkhvh47t4g8rgl9iqg6dss529o8j0jo3bpc1bzq0rq3vexkgzfi4mfmfgbrqg37c4n97rfk9gcnyrb4z3kd9w5l41bx1v0yx7tvlv6dam4lv1pm6rpjgiuwcib6eglmvevi6y'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'surname [input here api field description]',
        example     : '7nb1w5y9xzm6h03dv4xrt1li3yovggibojt1b9uqlvgfk0zex0rhqnmx074oau8c1bozd8pp9kmfk7q5zn1aff3m7e7pdye17kpc8sznkk0j1jqs1z0n37fjgcztesg9yuga017qv2s2938ju1smqt5zyo63m9hu5yv248fdkhvzsgpphdpxejejto1lp6hmq8khr4jmj6onjwkepjytbb091p62mdvpxtynz27jvc0t0ciwoul7zbctegdk96q'
    })
    surname: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'avatar [input here api field description]',
        example     : 'hhmw4dl5h8g8m9p0y98zza7ruo1tg0ajytns90wudwo2awah6l1lpx992xvmdhbimmg8tva53bhcw3o4yhybuosx5rjy4355gfbt77d1z4gdsn1358df3vajdhwbsifvrpmdyqnpijqd3j0ktfuf4mfbc5er2i39ez9hjo2xmxs7ewv2s4ccrmxu1cmmufqlaufut0ankgz2qqjgmvgp95fugg834lj6fqcws7fj5ul8df216avi7oi6u9dp5qj'
    })
    avatar: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'mobile [input here api field description]',
        example     : 'wcxye408fp681vhbvkcsumxyufuvc1z3u74dsk5dcfd84cdduh9iuphpmjl4'
    })
    mobile: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'langId [input here api field description]',
        example     : '4026894e-51dd-4542-9699-f2f32a5a6c8d'
    })
    langId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'username [input here api field description]',
        example     : 'ql9pdg5kgohlwb1mvad0rwulkszx45e6i8rlt3lwr6zk6kt66okqohdrfgvug9hfnz7ztvgf8o6d8vqongg5735noplswrrlxruseabfd2ux6cqxhzx092ak'
    })
    username: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'password [input here api field description]',
        example     : 'acjsswmgx2rdfzntg28la3c7jk4fu8ruq0k0j9p0ocvax55uopb2rrgoph0izofe02m8rro0ngllo9ot8p2g5rid4mlifa9pmq1vmov0eey1mu3mcwvg5ou0mooh6udmx3cve3pftf4w415qnrp84j0hzn6xo713p94hjoiup4lrwhbrig3d8ded9eekzviutrongv9wgpryt8dz53julvom7hxorev7z85sfkyls9lwokk4utmc1bvpj96gulz'
    })
    password: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'rememberToken [input here api field description]',
        example     : '9h8du8nkpbqezyspcbyvh2fuuoh5jcondelmam2vn8n2tybghgqf44aog01v484jtxyokndxysvl1xkie9lunby2yjj4amgd73oqsjjsc8lqi6xcv7j5nk9yz7p2d8dbigqvyc5bss03kisu8ltacio4uy5dbz1yuk44s7hdq1q6cndbd9ou3qfmf6chl9l7epjp0jde6y95wrp03vglj91mlmzk1n9z33r2ss54tdyibi9z4stt1xx5kg77qwv'
    })
    rememberToken: string;
    
    
    
    @ApiProperty({
        type        : Object,
        description : 'data [input here api field description]',
        example     : { "foo" : "bar" }
    })
    data: any;
    
    
}
