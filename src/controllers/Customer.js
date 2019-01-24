import CustomerService from '../service/CustomerService';

const Customer = {
  
  /** 
   * @param {object} req 
   * @param {object} res
   * @returns {void} return statuc code 204
   */
  import(req, res) {
    const Customer = CustomerService.import(req, res);
    
    return res.status(201).send(Customer);
  },
}

export default Customer;