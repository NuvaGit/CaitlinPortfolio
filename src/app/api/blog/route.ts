import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const slug = searchParams.get("slug");

  if (slug) {
    const post = await db.post.findUnique({
      where: { slug },
      include: {
        author: {
          select: {
            name: true,
            image: true,
          },
        },
        categories: true,
        tags: true,
      },
    });

    if (!post) {
      return NextResponse.json(
        { error: "Post not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(post);
  }

  // Get all posts
  const published = searchParams.get("published") === "true";
  
  const posts = await db.post.findMany({
    where: published ? { published: true } : {},
    orderBy: { publishedAt: "desc" },
    include: {
      author: {
        select: {
          name: true,
          image: true,
        },
      },
      categories: true,
      tags: true,
    },
  });

  return NextResponse.json(posts);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const data = await req.json();

  try {
    const post = await db.post.create({
      data: {
        title: data.title,
        slug: data.slug,
        content: data.content,
        excerpt: data.excerpt,
        featuredImage: data.featuredImage,
        published: data.published || false,
        publishedAt: data.published ? new Date() : null,
        authorId: session.user.id,
        categories: {
          connectOrCreate: data.categories?.map((category: string) => ({
            where: { name: category },
            create: { 
              name: category, 
              slug: category.toLowerCase().replace(/\s+/g, '-') 
            },
          })),
        },
        tags: {
          connectOrCreate: data.tags?.map((tag: string) => ({
            where: { name: tag },
            create: { 
              name: tag, 
              slug: tag.toLowerCase().replace(/\s+/g, '-') 
            },
          })),
        },
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}