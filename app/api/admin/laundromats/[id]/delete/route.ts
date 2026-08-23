import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
export async function POST(request:NextRequest,{params}:{params:{id:string}}){const prisma=new PrismaClient();await prisma.laundromat.delete({where:{id:Number(params.id)}});await prisma.$disconnect();return NextResponse.redirect(new URL("/admin",request.url),303);}
