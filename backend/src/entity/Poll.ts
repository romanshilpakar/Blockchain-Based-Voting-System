import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Candidate } from "./Candidate";

@Entity()
export class Poll extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @OneToMany(() => Candidate, (candidate) => candidate.poll)
  candidates!: Candidate[];
}
