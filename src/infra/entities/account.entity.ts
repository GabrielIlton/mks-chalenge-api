import { Exclude } from 'class-transformer';
import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Entity,
  Column,
  BeforeInsert,
} from 'typeorm';

import { HashPipe } from 'src/common/pipes/hash.pipe';

@Entity({ name: 'accounts' })
export class AccountEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', length: 100, nullable: false })
  name: string;

  @Column({ name: 'email', length: 70, nullable: false })
  email: string;

  @Exclude()
  @Column({ name: 'password', length: 255, nullable: false })
  password: string;

  @BeforeInsert()
  async hashPasswordBeforeInsert() {
    this.password = await new HashPipe().transform(this.password);
  }

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;
}
