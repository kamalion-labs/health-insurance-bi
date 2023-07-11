cd prisma

rm schema.prisma
cat base.prisma >> schema.prisma
cat *.schema.prisma >> schema.prisma

cd ..

npx prisma generate