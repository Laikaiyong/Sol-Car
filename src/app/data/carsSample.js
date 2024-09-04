export const cars = [{
    id: 1,
    model: 'Tesla Model 3',
    plate: 'ABC123',
    color: 'Red',
    image: 'https://cdn.prod.website-files.com/60ce1b7dd21cd517bb39ff20/6153cdf8aec0a73b65af24c0_tesla-model-3.png',
    year: 2022,
    value: 45000,
    description: 'Electric sedan with advanced autopilot features',
    roadTax: {
      lastPaid: '2023-12-15',
      nextDue: '2024-12-15',
      amount: 200
    },
    insurance: {
      provider: 'SafeDrive Inc.',
      policyNumber: 'TES-2022-123456',
      expiryDate: '2024-06-30',
      monthlyPremium: 150
    },
    transactions: [
      { type: 'Road Tax', date: '2023-12-15', amount: 200, txHash: 'Gw6mNcCrXc...' },
      { type: 'Parking', date: '2024-03-10', amount: 15, txHash: 'J8nKm2pQrT...' },
      { type: 'Insurance', date: '2024-03-01', amount: 150, txHash: 'Lp3xYzWvU9...' },
      { type: 'Toll', date: '2024-02-28', amount: 5, txHash: 'Hq7bFdEvN4...' }
    ]
  },
  {
    id: 2,
    model: 'Toyota Camry',
    plate: 'XYZ789',
    color: 'Blue',
    image: 'https://di-uploads-pod7.dealerinspire.com/toyotachulavista/uploads/2023/07/Toyota-Camry-TRD-1024x676.png',
    year: 2021,
    value: 32000,
    description: 'Reliable mid-size sedan with excellent fuel efficiency',
    roadTax: {
      lastPaid: '2023-10-20',
      nextDue: '2024-10-20',
      amount: 180
    },
    insurance: {
      provider: 'AutoGuard',
      policyNumber: 'CAM-2021-789012',
      expiryDate: '2024-09-30',
      monthlyPremium: 120
    },
    transactions: [
      { type: 'Road Tax', date: '2023-10-20', amount: 180, txHash: 'Ks9mPqRtYu...' },
      { type: 'Parking', date: '2024-03-15', amount: 10, txHash: 'Nm2xZaWeR7...' },
      { type: 'Insurance', date: '2024-03-01', amount: 120, txHash: 'Bv4cLdKjH6...' },
      { type: 'Toll', date: '2024-03-05', amount: 3, txHash: 'Ft8gMhNpS2...' }
    ]
  },
  {
    id: 3,
    model: 'Ford Mustang',
    plate: 'DEF456',
    color: 'Yellow',
    image: 'https://www.cars.com/i/large/in/v2/stock_photos/90884105-7fd5-4da9-8479-27e482a4e479/2b678835-3279-4de7-8047-36484d4e2900.png',
    year: 2023,
    value: 55000,
    description: 'Powerful sports car with iconic design',
    roadTax: {
      lastPaid: '2024-01-05',
      nextDue: '2025-01-05',
      amount: 250
    },
    insurance: {
      provider: 'SpeedSure',
      policyNumber: 'MUS-2023-345678',
      expiryDate: '2024-12-31',
      monthlyPremium: 200
    },
    transactions: [
      { type: 'Road Tax', date: '2024-01-05', amount: 250, txHash: 'Dq1wXyZvT8...' },
      { type: 'Parking', date: '2024-03-18', amount: 20, txHash: 'Jm5nBcRfV2...' },
      { type: 'Insurance', date: '2024-03-01', amount: 200, txHash: 'Hp9kLmNrS4...' },
      { type: 'Toll', date: '2024-03-12', amount: 8, txHash: 'Gt3xCvBnM7...' }
    ]
  }];