import { ApiProperty } from '@nestjs/swagger';

export class CreateCredentialDto
{
    @ApiProperty({
        type        : String,
        description : 'grantType [input here api field description]',
        example     : 'PASSWORD',
        enum        : ['AUTHORIZATION_CODE','CLIENT_CREDENTIALS','PASSWORD']
    })
    grantType: string;

    @ApiProperty({
        type        : String,
        description : 'username [input here api field description]',
        example     : 'john@gmail.com'
    })
    username: string;

    @ApiProperty({
        type        : String,
        description : 'password [input here api field description]',
        example     : '123456'
    })
    password: string;

    @ApiProperty({
        type        : String,
        description : 'email [input here api field description]',
        example     : 'john@gmail.com'
    })
    email: string;

    @ApiProperty({
        type        : String,
        description : 'clientSecret [input here api field description]',
        example     : 'ktjfde3ibcxglzz7glw6ehoibcn4olk8yitqaqtlvpaot7n0514wdzayzmss7cd15abiohcfwzjh4i3a7q48ss8vfk'
    })
    clientSecret: string;

    @ApiProperty({
        type        : String,
        description : 'accessTokenId [input here api field description]',
        example     : '077e099f-2640-4f12-b1d8-eef80ee8cff9'
    })
    accessTokenId: string;

    @ApiProperty({
        type        : String,
        description : 'refreshToken [input here api field description]',
        example     : 'Cum aliquid numquam nulla vel fuga ducimus alias et molestiae. Accusantium vel nesciunt sed. Numquam quam corrupti iusto ipsam nesciunt facere voluptatem. Officia velit eaque. Quas dolore qui voluptas doloremque doloremque blanditiis qui et. Non architecto eveniet cumque nihil odit et non explicabo.'
    })
    refreshToken: string;

    @ApiProperty({
        type        : String,
        description : 'redirect [input here api field description]',
        example     : 'z712mh21s0t0bbwi9f5cn2r9kphy7gtqx1bt0ghinw1gv93s1bv7irggh8t4aauqj3ozad3yshhaw50q33ybiy7znph3gkafwlhr80e3gy5bx46zj3t44oq7s4vo6refqnmzm2rhkpq16hb2cb6lvr046kz578o0rlg0pghtzsk7iloktxy6atxmr8eoehrh3i3zekr0aybg05orxyrro6p87mktc2cmfla9i3qjwy89q60mu38m98dizzz20cmehisi18krece6g2gqf7tivsj8uaoulj9v65cqn2cgx0uzh3uyd4jegyb52mb653fea3onuhts9zju7knaozc50bivcpvwk21wnvlmyr77lstt2779ep94vw0jbw05lpov19po4pfz4vkntd5fujbew0uhs861uk0n2x747nr231uofm83uu3m2cu777vbpe9gpiqguwir4rlah55ek5ejn54q9idad63s57finwtbj2yspfdo723pg2im0saa5pt3r39jcv89cokr1cs0wcdc81bqjttjbpk9p3b1uxwz7ycx6evyy25rr0eqg5qyakggne7vn1l7helotz2dzypo1937mjsekkua98yngjcku3t5l2rg2hjbnwaqupf326yjugkikggdvku3elbaqchvesxkx8czdt69x7clhwxpkxa6wthpng0t21vzxzax175fdceg7og4893mkj8567w6orxc1fcyz0h29vmyfd89sqpiyx0fzpwqx8rqkjmhfhr4jh03paz7plqw8grl8qfbplowvqygrzvb2qs0ih1pkp8gg6vy5hpr0fkdqtxk9j3nzhndoijiywv7zdriacb632xdn7pftiqfo5n5w42jgeubk42gpz1ds9cnsxowxfxmapmt0hupc03e6sxgykw05zcg2x2z35o5ao9qs6wpgebkpbiyh1c31qojoheixzdrxvfaoettsfx4kdq52fs15kxrkeml15h2x4qqy5e5aa1arpa03vp6vs2yrduul4hg7kiw4qy2h23djeqhfnaxdss2yps7ntbbjw46cl1aj1ar74x50itme85p19j9c26ywk34nhjwha3og3jzjbyppd974xp1hnh1qy0uauw7vkxhx05vhy4dafgr15cyg7ij8zhxaihh5mrqala4vnuo800dbrkcrb9sk0c9wxrso55up17bdkel0ad6f353vh0ixq3eac3e33u04bvp8by1e8dq8izcd2pf9vpkjhbz02ggknsoeneaw9z1h0dvy6diwmh1v2ycdiiffeirl5x6sefmihoqcb4trs3rqinmhssray57q7aftsfknghlvodmbu1nmywjtg8s2g7it03976niy3jko58vclekxp70xaact60g5losaysefh3p1lx1yw8njfrip5atn6pnjx5t5c4cbin8bpmw8twyrb0f2n2ktev21pgmp0q0ych1xd82slz6zoyji8mplty4lqjk79vs6sfa6gxw3m7s4crytmti51zna2job7lhnwzjeliits1m0ij65cg0oulvhyk0zb754yxfac781ibxdi6js784wuzzshd9l7hhqm2xkgy06plx2o715w5zuvwwf5f2mr51wp1ap7cgiiaoptrsqo49o1tuadgtbakb67n56qwvfomyophmu4wppmm7h6v1opff6zozwclj422m579ljwxd2b5xgi3m5dm6h8s1883eiqiiu7u53ck93xl83zv1dtyl3vzoa43ml0ltrb2m4n2mppyln47ge5h3tfg8ffupzw4em6kuihkarnbd7up9dsjk1ww0ztxburq06ma1bgf7srblv3myb41t8iwq5y5yx1mpixbwvbbkyr6ragg3iq4puksd0qj3aoz74qi67i4gzr7ls4z71isqgiqdj4l2omk1i57g86paj3ezcxmm1gvoeyz2c0lu2kkyhbeehrxjwu1la9ctwqvdqlxbafp47boiwhiqdb6qz5cgv7mfpuvgqmizlf7xocwuogloqvfx8ylaxwvp4gddsssqc6ec'
    })
    redirect: string;
}
