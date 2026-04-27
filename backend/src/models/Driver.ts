import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from './sequelize';

interface DriverAttributes {
  driver_id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  vehicle_make: string;
  vehicle_model: string;
  license_plate: string;
  availability_status: string;
  rating: number;
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface DriverCreationAttributes extends Optional<DriverAttributes, 'driver_id' | 'rating' | 'availability_status' | 'status' | 'createdAt' | 'updatedAt'> {}

export class Driver extends Model<DriverAttributes, DriverCreationAttributes> implements DriverAttributes {
  public driver_id!: number;
  public first_name!: string;
  public last_name!: string;
  public email!: string;
  public phone_number!: string;
  public vehicle_make!: string;
  public vehicle_model!: string;
  public license_plate!: string;
  public availability_status!: string;
  public rating!: number;
  public status!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Driver.init(
  {
    driver_id: {
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
    vehicle_make: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    vehicle_model: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    license_plate: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    availability_status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'available',
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
    tableName: 'drivers',
    modelName: 'Driver',
    timestamps: true,
  }
);
