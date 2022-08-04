import { IUserModel } from 'interfaces/user.model';
import { Table, Column, DataType, Model } from 'sequelize-typescript';

@Table({
  tableName: 'user',
  timestamps: true,
  underscored: false,
  indexes: [{ fields: ['email'] }],
})
export default class UserModel extends Model<IUserModel> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    autoIncrementIdentity: true,
    allowNull: false,
    primaryKey: true,
    field: 'id',
  })
  id?: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'email',
  })
  email: string;

  @Column({
    type: DataType.DATE,
    field: 'created_at',
  })
  createdAt: Date;

  @Column({
    type: DataType.DATE,
    field: 'updated_at',
  })
  updatedAt: Date;
}
