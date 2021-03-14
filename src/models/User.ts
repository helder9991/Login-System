import { Entity, ObjectID, ObjectIdColumn, Column } from 'typeorm';

@Entity('users')
class User {
    @ObjectIdColumn({ nullable: false })
    id: ObjectID;

    @Column()
    nome: string;

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
