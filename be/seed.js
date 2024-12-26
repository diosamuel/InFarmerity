const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Insert dummy data
  const farmers = [
    {
      name: 'John Doe',
      cropType: 'Wheat',
      risk: 'Low',
      coordinate: '51.5074,-0.1278',
      wallet: '0xABC123456789',
      email: 'john.doe@example.com',
    },
    {
      name: 'Jane Smith',
      cropType: 'Corn',
      risk: 'Medium',
      coordinate: '34.0522,-118.2437',
      wallet: '0xDEF987654321',
      email: 'jane.smith@example.com',
    },
    {
      name: 'Alice Johnson',
      cropType: 'Rice',
      risk: 'High',
      coordinate: '35.6895,139.6917',
      wallet: '0xGHI456123789',
      email: 'alice.johnson@example.com',
    },
  ];

  for (const farmer of farmers) {
    await prisma.farmer.create({
      data: farmer,
    });
  }

  console.log('Dummy data inserted successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
