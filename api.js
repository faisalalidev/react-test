const mockTransactions = [
  { id: 1, customerId: 'C1', customerName: 'Alice', amount: 120, date: '2023-01-15' },
  { id: 2, customerId: 'C1', customerName: 'Alice', amount: 75, date: '2023-01-28' },
  { id: 3, customerId: 'C2', customerName: 'Bob', amount: 200, date: '2023-01-20' },
  { id: 4, customerId: 'C1', customerName: 'Alice', amount: 10, date: '2023-02-05' },
  { id: 5, customerId: 'C2', customerName: 'Bob', amount: 55, date: '2023-02-14' },
  { id: 6, customerId: 'C1', customerName: 'Alice', amount: 105, date: '2023-02-25' },
  { id: 7, customerId: 'C3', customerName: 'Charlie', amount: 300, date: '2023-02-10' },
  { id: 8, customerId: 'C2', customerName: 'Bob', amount: 95, date: '2023-03-01' },
  { id: 9, customerId: 'C3', customerName: 'Charlie', amount: 45, date: '2023-03-12' },
  { id: 10, customerId: 'C1', customerName: 'Alice', amount: 150, date: '2023-03-20' },
  { id: 11, customerId: 'C2', customerName: 'Bob', amount: 110, date: '2023-03-25' }
];

export const fetchTransactions = () => {
  return new Promise((resolve) => {
    const latency = Math.floor(Math.random() * 1000) + 500;
    setTimeout(() => {
      resolve(mockTransactions);
    }, latency);
  });
};
