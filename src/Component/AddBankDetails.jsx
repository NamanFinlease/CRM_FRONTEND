import React, { useState } from 'react';

const AddBankDetails = () => {
  const [ifscCode, setIfscCode] = useState('');
  const [bankDetails, setBankDetails] = useState({
    ifsc: '',
    bankName: '',
    branch: '',
    state: '',
    district: '',
    city: '',
    address: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBankDetails({
      ...bankDetails,
      [name]: value
    });
  };

  const handleIfscSearch = () => {
    console.log('Searching for IFSC code:', ifscCode);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Bank details submitted:', bankDetails);
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '600rem', margin: '0 auto' }}>
      <form onSubmit={handleSubmit} className="p-4 shadow rounded bg-light" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h2 className="text-center mb-5" style={{color:'black'}}>Add Bank Details</h2>

        <div className="form-group mb-4">
          <label htmlFor="ifscCode">Search by IFSC Code</label>
          <div className="d-flex">
            <input
              type="text"
              className="form-control"
              id="ifscCode"
              value={ifscCode}
              onChange={(e) => setIfscCode(e.target.value)}
              placeholder="Enter IFSC Code"
            />
            <button type="button" className="btn btn-primary ms-2" onClick={handleIfscSearch}>
              Search
            </button>
          </div>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="ifsc">Bank IFSC</label>
          <input
            type="text"
            className="form-control"
            id="ifsc"
            name="ifsc"
            value={bankDetails.ifsc}
            onChange={handleInputChange}
            placeholder="Enter Bank IFSC"
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="bankName">Bank Name</label>
          <input
            type="text"
            className="form-control"
            id="bankName"
            name="bankName"
            value={bankDetails.bankName}
            onChange={handleInputChange}
            placeholder="Enter Bank Name"
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="branch">Bank Branch</label>
          <input
            type="text"
            className="form-control"
            id="branch"
            name="branch"
            value={bankDetails.branch}
            onChange={handleInputChange}
            placeholder="Enter Bank Branch"
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="state">Bank State</label>
          <input
            type="text"
            className="form-control"
            id="state"
            name="state"
            value={bankDetails.state}
            onChange={handleInputChange}
            placeholder="Enter Bank State"
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="district">Bank District</label>
          <input
            type="text"
            className="form-control"
            id="district"
            name="district"
            value={bankDetails.district}
            onChange={handleInputChange}
            placeholder="Enter Bank District"
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="city">Bank City</label>
          <input
            type="text"
            className="form-control"
            id="city"
            name="city"
            value={bankDetails.city}
            onChange={handleInputChange}
            placeholder="Enter Bank City"
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="address">Bank Address</label>
          <input
            type="text"
            className="form-control"
            id="address"
            name="address"
            value={bankDetails.address}
            onChange={handleInputChange}
            placeholder="Enter Bank Address"
          />
        </div>
        <div className="d-flex justify-content-center">
          <button type="submit" className="btn btn-success w-50">Add Bank Detail</button>
        </div>      </form>
    </div>
  );
};

export default AddBankDetails;
