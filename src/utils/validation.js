exports.validateTaxiRegistration = (data) => {
  const { registrationNumber, driverId } = data;
  
  if (!registrationNumber) {
    return 'Registration number is required';
  }
  if (!driverId) {
    return 'Driver ID is required';
  }
  return null;
};

exports.validateDocument = (data) => {
  const { type, url } = data;
  
  if (!type) {
    return 'Document type is required';
  }
  if (!url) {
    return 'Document URL is required';
  }
  return null;
};

exports.validateSubscriptionPayment = (amount) => {
  if (!amount || amount < 0) {
    return 'Valid payment amount is required';
  }
  if (amount !== 60) {
    return 'Subscription amount must be 60 DT';
  }
  return null;
};