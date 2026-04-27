import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from './sequelize';

interface RiderAttributes {
  rider_id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  payment_method: string;
  rating: number;
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface RiderCreationAttributes extends Optional<RiderAttributes, 'rider_id' | 'rating' | 'status' | 'createdAt' | 'updatedAt'> {}

export class Rider extends Model<RiderAttributes, RiderCreationAttributes> implements RiderAttributes {
  public rider_id!: number;
  public first_name!: string;
  public last_name!: string;
  public email!: string;
  public phone_number!: string;
  public payment_method!: string;
  public rating!: number;
  public status!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Rider.init(
  {
    rider_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    payment_method: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'active',
    },
  },
  {
    sequelize,
    tableName: 'riders',
    modelName: 'Rider',
    timestamps: true,
  }
);
