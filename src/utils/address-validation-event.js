const addressValidationEvent = address => `validate_address:${address}`;

const emitAddressValidation = (emitter, data) => {
  emitter.emit(addressValidationEvent(data.address), data);
};

module.exports = { addressValidationEvent, emitAddressValidation };
