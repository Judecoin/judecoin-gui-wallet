export default {
  methods: {
    buildDialogFields(val) {
      const {
        feeList,
        amountList,
        destinations,
        priority,
        isSweepAll,
        address
      } = val.txData;

      const totalFees = feeList.reduce((a, b) => a + b, 0) / 1e9;
      const totalAmount = amountList.reduce((a, b) => a + b, 0) / 1e9;
      let destination;
      if (isSweepAll) {
        destination = address;
      } else if (destinations.length === 1) {
        destination = destinations[0].address;
      } else {
        destination = destinations.map(d => d.address).join("\n");
      }
      const isBlink = [0, 2, 3, 4, 5].includes(priority) ? true : false;
      const confirmFields = {
        isBlink,
        destination,
        totalAmount,
        totalFees
      };
      return confirmFields;
    }
  }
};
