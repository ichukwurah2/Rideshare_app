import sequelize from './sequelize';
import { Driver } from './Driver';
import { Rider } from './Rider';
import { Ride } from './Ride';

Rider.hasMany(Ride, {
  foreignKey: 'rider_id',
  sourceKey: 'rider_id',
  as: 'rides',
});

Driver.hasMany(Ride, {
  foreignKey: 'driver_id',
  sourceKey: 'driver_id',
  as: 'rides',
});

Ride.belongsTo(Rider, {
  foreignKey: 'rider_id',
  targetKey: 'rider_id',
  as: 'rider',
});

Ride.belongsTo(Driver, {
  foreignKey: 'driver_id',
  targetKey: 'driver_id',
  as: 'driver',
});

export default sequelize;
export { Driver, Rider, Ride };
