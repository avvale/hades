import { ApiProperty } from '@nestjs/swagger';

export class UpdateContactDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'ed0b6194-8ada-4a64-aa77-7a2951b4e174'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '2f26bc04-02e8-4828-9249-803020406307'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : '28kmckmlu4mhhhejq7vexromry48l6zagf5z7eswz6dsjlon76'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'a6ca4dc9-a5ce-4d42-826b-bfe36a548c2f'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'iu5zhag65m947rquttxj'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'roleId [input here api field description]',
        example     : '1fcf82cf-5ceb-46fb-a227-3bcf0790a984'
    })
    roleId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'roleName [input here api field description]',
        example     : '4lk1mg60zii05ghs8o7sme6xst8pcodpkanqxiz7pwrksc3di21fnhzhqk4axzx9p8y2v17ni4n1r3zac2vhlexvvc1rzt6rp8y8fynmeet0hp7nb2zaliad9aekzhgove8g1wgzyml090298oz8wk75vn4hdqnurfglnqq7yefk0g4j6krlwuxyaxspkxp6hvzh78g0vpth2wg60w28o94vlyz3b30r0www5bwpr7l0fi3guytt3d8dprd2myb'
    })
    roleName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'zzmfwiu1fvmge1pub0zxzg9jeu1uscii4qnmdh1spcry5rnsqo0kjlq14nkoi8m3lhk7ut2kfh2yw777q6mfxin8cpsg4bnh1dhj5bpxbg4gpxt4u0s6xfjly62omseocds8jee3mj0mzh31aor1i2oz0ry5umj7jxyqhyz6plxznlz1o6ex65xa6opo1dmg3z2suxluqpui0h8kjn3e6q76nieycxpqreevhoxi5xeivlqcnzgns218bnzsv3d'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'surname [input here api field description]',
        example     : '1ydo3ay4hidwr0iyxdkne5h4z7v529amfyuqvjvv93dtpn2tmqzojix2gxlcphbq35ajsh2g90tf9kfjcevo5lidvupb9xk9hn55xh4nulk3tf73ualh2btl13xexk85wa49qwdj6r3214fus37pt5p3gq1cvaq9cat5q4vvkokfk8lga475p4vjj729tfo0d608sn03wiuima0yr81rlqhr2dzj7d5oxb1nrnagf2pwe6l6qwzbh7u3fmtkama'
    })
    surname: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'email [input here api field description]',
        example     : 'nh5igk14l0r2umujgymcg9y403vfzxgmywe2qxj6ln9mfp9g8p6qrt4j9zlevkkoeuqpr5saq4iuw71b05wm1j0rolcy4amquc81wot4cd9anrqglemymg2o'
    })
    email: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'mobile [input here api field description]',
        example     : 'gkxqr30hgg4ydbw59rumuxt7hyurwe1zbgnujjo545sfoxpnrln3hl9erzek'
    })
    mobile: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'area [input here api field description]',
        example     : 'oozt1iy84ktlwi7kpdjikqckvzhrxgy8lpd1zr5v3aj63sd7tio88qvu8ijwxy49dt9r8j0wz6e27x0g6hkjdci37au7ywfa5ukm0w8zmtoky3olebav0v4c872ioj45vr6p06mmoa8yiuwii5p312o4wasxfntxswrzfiltuemleq2r3padvht9eyb5snowzb2f3mx2wa9s24wrcbkgqw2id9u4ekreor7sfd89y3gtlwokfg6w6eakcuxtz5q'
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
