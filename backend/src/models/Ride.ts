import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from './sequelize';

interface RideAttributes {
  ride_id: number;
  rider_id: number;
  driver_id?: number | null;
  pickup_location: string;
  dropoff_location: string;
  request_time: Date;
  pickup_time?: Date | null;
  dropoff_time?: Date | null;
  fare: number;
  ride_status: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface RideCreationAttributes extends Optional<RideAttributes, 'ride_id' | 'driver_id' | 'pickup_time' | 'dropoff_time' | 'fare' | 'ride_status' | 'createdAt' | 'updatedAt'> {}

export class Ride extends Model<RideAttributes, RideCreationAttributes> implements RideAttributes {
  public ride_id!: number;
  public rider_id!: number;
  public driver_id?: number | null;
  public pickup_location!: string;
  public dropoff_location!: string;
  public request_time!: Date;
  public pickup_time?: Date | null;
  public dropoff_time?: Date | null;
  public fare!: number;
  public ride_status!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Ride.init(
  {
    ride_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    rider_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'riders',
        key: 'rider_id',
      },
    },
    driver_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'drivers',
        key: 'driver_id',
      },
    },
    pickup_location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dropoff_location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    request_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    pickup_time: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    dropoff_time: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    fare: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    },
    ride_status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'requested',
    },
  },
  {
    sequelize,
    tableName: 'rides',
    modelName: 'Ride',
    timestamps: true,
  }
);
