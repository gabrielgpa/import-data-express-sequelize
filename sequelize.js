const Sequelize = require('sequelize');
const CustomerModel = require('./src/models/Customer');
const AddressModel = require('./src//models/Address');

const sequelize = new Sequelize('<scheme>', '<user>', '<password>', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    logging: false
});

const Customer = CustomerModel(sequelize, Sequelize);
const Address = AddressModel(sequelize, Sequelize);

Customer.belongsTo(Address, { foreignKey: 'ADDRESS_ID', onCreate: 'CASCADE' });

sequelize.sync({ force: false })
.then(() => {
    console.log(`Database & tables created!`)
}, (err) => {
    console.log(`Error => ${err}`)
});

module.exports = { Customer, Address }