module.exports = (sequelize, type) => {
    return sequelize.define('ADDRESS', {
        ID: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        ZIP_CODE: type.STRING,
        STREET: type.STRING,
        NUMBER: type.STRING,
        SUPPLEMENT: type.STRING,
        STATE: type.STRING,
        CITY: type.STRING
    }, {
        freezeTableName: true,
        timestamps: false
    });
}