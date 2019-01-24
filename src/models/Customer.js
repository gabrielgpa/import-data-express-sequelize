module.exports = (sequelize, type) => {
    return sequelize.define('CUSTOMER', {
        ID: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        NAME: type.STRING,
        CPF: type.STRING,
        BIRTH_DATE: type.DATE,
        PHONE: type.STRING,
        CREATED_AT: type.DATE
    }, {
        freezeTableName: true,
        timestamps: false
    });
}