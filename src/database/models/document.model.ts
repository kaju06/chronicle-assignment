import { DocumentVisibility } from '../../enum/document_visibility.enum';
import { Table, Column, DataType, Model } from 'sequelize-typescript';

import { IDocumentModel } from '../../interfaces/document.model';

@Table({
  tableName: 'document',
  timestamps: true,
  underscored: false,
  indexes: [{ fields: ['name'] }],
})
export default class DocumentModel extends Model<IDocumentModel> {
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
    field: 'name',
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'path',
  })
  path: string;

  @Column({
    type: DataType.ENUM(DocumentVisibility.Private, DocumentVisibility.Public),
    allowNull: false,
    field: 'visibility',
    defaultValue: DocumentVisibility.Private,
  })
  visibility: DocumentVisibility;

  @Column({
    type: DataType.ARRAY(DataType.STRING),
    allowNull: true,
    field: 'read_users',
  })
  readUsers: Array<string>;

  @Column({
    type: DataType.ARRAY(DataType.STRING),
    allowNull: true,
    field: 'write_users',
  })
  writeUsers: Array<string>;

  @Column({
    type: DataType.ARRAY(DataType.STRING),
    allowNull: false,
    field: 'owners',
  })
  owners: Array<string>;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    field: 'is_deleted',
    defaultValue: false,
  })
  isDeleted: boolean;

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
