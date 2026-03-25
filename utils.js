export const calculatePoints = (amount) => {
  let points = 0;
  const wholeDollars = Math.floor(amount);
  
  if (wholeDollars > 100) {
    points += (wholeDollars - 100) * 2;
    points += 50;
  } else if (wholeDollars > 50) {
    points += (wholeDollars - 50);
  }
  
  return points;
};

export const processTransactions = (transactions) => {
  const customers = {};

  transactions.forEach((txn) => {
    const { customerId, customerName, amount, date } = txn;
    
    const points = calculatePoints(amount);

    const txDate = new Date(date);
    const month = (txDate.getMonth() + 1).toString().padStart(2, '0');
    const year = txDate.getFullYear();
    const monthYear = `${month}/${year}`;

    if (!customers[customerId]) {
      customers[customerId] = {
        id: customerId,
        name: customerName,
        totalPoints: 0,
        monthlyPoints: {},
        transactions: []
      };
    }

    customers[customerId].transactions.push({
      ...txn,
      points
    });

    customers[customerId].totalPoints += points;

    if (!customers[customerId].monthlyPoints[monthYear]) {
      customers[customerId].monthlyPoints[monthYear] = 0;
    }
    customers[customerId].monthlyPoints[monthYear] += points;
  });

  return Object.values(customers);
};
