// Seed script to populate the database with initial Product data
// Run with: bun run db:seed (or `npx prisma db seed`)

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const products = [
  {
    name: "Nike Air Max 270",
    description:
      "Breathable mesh upper with a large visible Air unit for all‑day comfort.",
    price: 159.99,
  },
  {
    name: "Nike Air Force 1 '07",
    description:
      "Classic hoops style with crisp leather and durable cushioning.",
    price: 119.99,
  },
  {
    name: "adidas Ultraboost 22",
    description:
      "Responsive BOOST midsole with Primeknit upper for a snug fit.",
    price: 179.99,
  },
  {
    name: "adidas Stan Smith",
    description: "Timeless court style with clean lines and everyday comfort.",
    price: 99.99,
  },
  {
    name: "New Balance 990v5",
    description: "Premium suede upper with ENCAP midsole cushioning.",
    price: 184.99,
  },
  {
    name: "ASICS GEL‑Kayano 30",
    description: "Stability running shoe with FF BLAST+ cushioning.",
    price: 159.95,
  },
  {
    name: "PUMA Suede Classic",
    description: "Iconic suede upper with rubber outsole for everyday wear.",
    price: 74.99,
  },
  {
    name: "Reebok Classic Leather",
    description:
      "Soft leather upper with EVA midsole for lightweight cushioning.",
    price: 79.99,
  },
  {
    name: "Converse Chuck Taylor All Star",
    description: "Canvas high‑top with vulcanized rubber sole.",
    price: 64.99,
  },
  {
    name: "Vans Old Skool",
    description: "Skate classic with signature side stripe and waffle outsole.",
    price: 69.99,
  },
  {
    name: "HOKA Clifton 9",
    description: "Lightweight daily trainer with plush, rockered ride.",
    price: 144.99,
  },
  {
    name: "Saucony Endorphin Speed 3",
    description:
      "Nylon plate with PWRRUN PB foam for fast training and racing.",
    price: 169.99,
  },
  {
    name: "On Cloudswift 3",
    description: "Helion superfoam with CloudTec for a smooth urban run.",
    price: 159.99,
  },
  {
    name: "Jordan 1 Retro High OG",
    description: "Heritage style with premium materials and Air cushioning.",
    price: 179.99,
  },
  {
    name: "adidas Samba OG",
    description: "Leather upper with suede overlays—classic terrace style.",
    price: 99.99,
  },
];

async function main() {
  console.log(`Seeding ${products.length} products...`);
  for (const p of products) {
    // Idempotent-ish: create if a product with the same name doesn't already exist
    const existing = await prisma.product.findFirst({
      where: { name: p.name },
    });
    if (!existing) {
      await prisma.product.create({ data: p });
      console.log(`  ✔ Created: ${p.name}`);
    } else {
      console.log(`  ↺ Skipped (exists): ${p.name}`);
    }
  }
  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
