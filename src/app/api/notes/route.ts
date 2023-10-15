import connect from "@/database/client";
import GoogleModel from "@/database/schemas/google";
import NotesModel, { TypeNotes } from "@/database/schemas/notes";
import sendResponse from "@/utils/server/send";
import getSession from "@/utils/server/session";
import randomString from "@/utils/tools/random";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const session = await getSession(request);

  if (session instanceof NextResponse) return session;
  else {
    console.log(session);
    const { username } = session;
    const found = await NotesModel.find({
      username,
    });

    const notes = found.map((note) => {
      return {
        title: note.title,
        id: note.id,
        content: note.content,
        categories: note.categories,
        isPrivate: note.isPrivate,
      };
    });

    return sendResponse(notes);
  }
}

export async function POST(request: NextRequest) {
  const session = await getSession(request);

  if (session instanceof NextResponse) return session;

  const content_type = request.headers.get("Content-Type");

  if (content_type !== "application/json") {
    return sendResponse(`Content-Type not accepted: ${content_type}`, 400);
  }

  const body = (await request.json()) as TypeNotes;

  if (Object.keys(body).length === 0) {
    return sendResponse("Empty body.", 400);
  }

  const { title, content, categories, isPrivate } = body;

  if (
    !title ||
    !content ||
    !categories ||
    isPrivate === null ||
    isPrivate === undefined
  ) {
    return sendResponse("Incomplete body", 400);
  }

  await connect();

  const newNote = new NotesModel({
    id: randomString(16),
    username: session.username,
    title,
    content,
    categories,
    isPrivate,
  });
  const saved = await newNote.save();

  const { _id, ...json } = saved.toJSON();

  return sendResponse(
    {
      message: "Created.",
      data: [json],
    },
    201
  );
}

export async function PUT(request: NextRequest) {
  const session = await getSession(request);

  if (session instanceof NextResponse) return session;

  const content_type = request.headers.get("Content-Type");

  if (content_type !== "application/json") {
    return sendResponse(`Content-Type not accepted: ${content_type}`, 400);
  }

  const body = (await request.json()) as TypeNotes;

  if (Object.keys(body).length === 0) {
    return sendResponse("Empty body.", 400);
  }

  const { id, title, content, categories, isPrivate } = body;

  if (!id) return sendResponse("Incomplete body.", 400);

  const found = await NotesModel.findOne({ id });

  if (!found) return sendResponse("Requested id not found.", 404);

  let update = {};

  if (title) update = { ...update, title };
  if (content) update = { ...update, content };
  if (categories) update = { ...update, categories };
  if (typeof isPrivate === "boolean") update = { ...update, isPrivate };

  await found.updateOne(update);

  const { _id, ...json } = found.toJSON();

  return sendResponse(
    {
      message: "Updated.",
      data: [
        {
          ...json,
          ...update,
        },
      ],
    },
    200
  );
}

export async function DELETE(request: NextRequest) {
  const session = await getSession(request);

  if (session instanceof NextResponse) return session;

  const id = new URL(request.url).searchParams.get("id");

  if (!id) return sendResponse("Query not completed.", 400);

  await connect();

  if (id === "all") {
    await NotesModel.deleteMany({ username: session.username });
    return sendResponse("Deleted all.", 200);
  }

  const found = await NotesModel.findOne({
    id,
  });

  if (!found) {
    return sendResponse("Requested id not found.", 404);
  }

  if (found.username !== session.username) {
    return sendResponse("Forbidden.", 403);
  }

  await found.deleteOne();

  return sendResponse("Deleted.", 200);
}
