
import { DataTypes, Model, Sequelize } from 'sequelize';
import { RentAttributes } from './Interfaces';

interface UserInstance extends Model<RentAttributes>, RentAttributes { }

const Rent = (sequelize: Sequelize) => {
    sequelize.define<UserInstance>('Rent', {

        rent_id: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            allowNull: false
        },
        start_date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        end_date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        payment_status: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        Payment_date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        creation_date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue:false,
            allowNull: false
        }
    }
    )
}

export default Rent