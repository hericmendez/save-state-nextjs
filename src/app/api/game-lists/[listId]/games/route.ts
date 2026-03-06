// app/api/game-lists/[listId]/games/route.ts

import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import { getUserId } from '@/lib/auth'
import { Game } from '@/lib/models/game'
import mongoose from 'mongoose'
import { GameList } from '@/lib/models/game-list'

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ listId: string }> }
) {
  await connectDB()

  const userId = await getUserId()
  if (!userId) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  const { listId } = await params

  if (!mongoose.Types.ObjectId.isValid(listId)) {
    return NextResponse.json(
      { error: 'Invalid listId' },
      { status: 400 }
    )
  }

  const listObjectId = new mongoose.Types.ObjectId(listId)

  // 🔎 Verifica se lista pertence ao usuário
  const listExists = await GameList.findOne({
    _id: listObjectId,
    userId
  }).lean()

  if (!listExists) {
    return NextResponse.json(
      { error: 'Lista não encontrada' },
      { status: 404 }
    )
  }

  // 🎮 Busca versão resumida dos jogos
  const games = await Game.find({
    userId,
    'player_data.listIds': listObjectId
  })
    .select({
      _id: 1,
      userId: 1,
      'game_data.name': 1,
      'game_data.cover.url': 1,
      'game_data.release_date': 1,
      createdAt: 1,
      updatedAt: 1
    })
    .lean()

  return NextResponse.json(games)
}