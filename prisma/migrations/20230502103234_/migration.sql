-- CreateTable
CREATE TABLE "User" (
    "user_id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Linktreelink" (
    "linktreeid" SERIAL NOT NULL,
    "linktreelink" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Linktreelink_pkey" PRIMARY KEY ("linktreeid")
);

-- CreateTable
CREATE TABLE "Category" (
    "catid" SERIAL NOT NULL,
    "catname" TEXT NOT NULL,
    "linktreelinkLinktreeid" INTEGER NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("catid")
);

-- CreateTable
CREATE TABLE "Link" (
    "link_id" SERIAL NOT NULL,
    "linkname" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "linktreelinkLinktreeid" INTEGER,

    CONSTRAINT "Link_pkey" PRIMARY KEY ("link_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_user_id_key" ON "User"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Linktreelink_userId_key" ON "Linktreelink"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Category_linktreelinkLinktreeid_key" ON "Category"("linktreelinkLinktreeid");

-- CreateIndex
CREATE UNIQUE INDEX "Link_categoryId_key" ON "Link"("categoryId");

-- AddForeignKey
ALTER TABLE "Linktreelink" ADD CONSTRAINT "Linktreelink_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_linktreelinkLinktreeid_fkey" FOREIGN KEY ("linktreelinkLinktreeid") REFERENCES "Linktreelink"("linktreeid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Link" ADD CONSTRAINT "Link_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("catid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Link" ADD CONSTRAINT "Link_linktreelinkLinktreeid_fkey" FOREIGN KEY ("linktreelinkLinktreeid") REFERENCES "Linktreelink"("linktreeid") ON DELETE SET NULL ON UPDATE CASCADE;
