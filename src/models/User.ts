import { Entity, ObjectID, ObjectIdColumn, Column } from 'typeorm';

@Entity('users')
class User {
    @ObjectIdColumn({ nullable: false })
    id: ObjectID;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    senha: string;

    @Column()
    telefones: [
        {
            numero: string;
            ddd: string;
        },
    ];
}

export default User;
