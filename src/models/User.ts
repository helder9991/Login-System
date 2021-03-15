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

    @Column({ type: 'date' })
    data_criacao: Date;

    @Column({ type: 'date' })
    data_atualizacao: Date;

    @Column({ type: 'date' })
    ultimo_login: Date;

    @Column()
    token: string;
}

export default User;
