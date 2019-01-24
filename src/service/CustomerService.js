import async from 'async';
import Moment from 'moment';
import { Customer, Address } from '../../sequelize';

const CustomerService = {
    
    /**
    * @returns {void} return statuc code 204
    */
    import(req, res) {
        var fs = require('fs'); 
        var parse = require('csv-parse');
        var customers = [];
        var customersError = [];
        var customerExists = [];
        var count = 0;
        
        fs.createReadStream(__dirname + '/../../archive/ss.csv', {encoding: 'latin1'}).pipe(parse({delimiter: ','}))
        .on('data', (row) => {
            var customer = {};
            var address = {};
            
            // Customer
            customer.NAME = row[1];
            customer.CPF = onlyNumbers(row[2]);
            customer.BIRTH_DATE = formatDate(row[3]);
            customer.PHONE = row[4];

            // Address
            address.ZIP_CODE = row[5];
            address.STREET = row[6];
            address.NUMBER = row[7];
            address.SUPPLEMENT = row[8];
            address.STATE = row[9];
            address.CITY = row[10];

            customer.address = address;
            
            if (onlyNumbers(customer.CPF) && customer.CPF.length > 10) {
                customers.push(customer);
            } else {
                customersError.push(customer);
            }
        })
        .on('end',() => {
            var size = customers.length;
            
            async.map(customers, (customer, callback) => {
                Customer.findOne({ where: { CPF: customer.CPF } }).then((ctm) => {
                    
                    if (!ctm) {
                        Address.create(customer.address).then((adrs) => {
                            customer.CREATED_AT = Moment();
                            customer.ADDRESS_ID = adrs.ID;
                            Customer.create(customer);
                        });

                        count++;
                    } else {
                        customerExists.push(customer);
                    }

                    callback();
                });
            }, (err, results) => {
                if (err) {
                    console.log('ERR', err);
                    res.status(400).send('Error!');
                    return;
                }
                
                console.log('Founds: ', count + '/' + size);
                console.log('Not founds: ', customersError.length);
                console.log('ALREADY EXISTS: ', customerExists.length);
                console.log('\n');
                console.log('\n');

                console.log('################## NOT FOUNDS #################');
                customersError.forEach((log) => {
                    console.log(log.NAME);
                    
                });

                console.log('\n');
                console.log('\n');

                console.log('################## ALREADY EXISTS #################');
                customerExists.forEach((log) => {
                    console.log(log.NAME);
                    
                });

                res.send();
            });
        });
    }
}

function onlyNumbers (value) {
    var result;

    if (value) {
        result = value.replace(/[^0-9]+/g, '');
    }

    return result;
}

function formatDate(dateStr) {
    if (dateStr && dateStr.length === 10) {
        let dateSplit = dateStr.split('/');
        let dd =  dateSplit[0];
        let MM = dateSplit[1];
        let yyyy = dateSplit[2];

        return `${ yyyy }-${ MM }-${ dd }`;
    }

    return undefined;
}

export default CustomerService;