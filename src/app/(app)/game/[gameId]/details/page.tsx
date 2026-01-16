'use client'

import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Star } from 'lucide-react'
import { motion } from 'framer-motion'
import { ContentLayout } from "@/components/admin-panel/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import Link from "next/link";

interface GameData {
  _id: string
  game_data: {
    name: string
    cover: string
    genres: string[]
    platforms: string[]
    developer: string,
    release_date: string
    summary: string
  }
  player_data: {
    status: string
    hours_played: number
    times_finished?: number
    personal_rating?: number
    review?: string
    lists?: string[]
  }
}

const mockGame: GameData = {
  _id: 'hades-2',
  game_data: {
    name: 'Hades II',
    cover: 'https://upload.wikimedia.org/wikipedia/en/0/0c/Hades_2_cover_art.jpeg', // pode ser local ou remoto
    genres: ['Roguelike', 'Action RPG', 'Mythology'],
    platforms: ['PC'],
    developer: 'Supergiant Games',
    release_date: '2024',
    summary:
      'Hades II é a sequência do aclamado roguelike da Supergiant Games. Desta vez, você assume o papel de Melinoë, princesa do Submundo, em uma jornada para derrotar Cronos, o Titã do Tempo. O jogo expande o combate rápido e estilizado do original, adicionando novas mecânicas, armas, magia e uma narrativa ainda mais ambiciosa.'
  },
  player_data: {
    status: 'Jogando',
    hours_played: 42,
    times_finished: 1,
    personal_rating: 9.5,
    review:
      'A Supergiant conseguiu o impossível: evoluir tudo que já era excelente. Combate mais profundo, trilha sonora absurda e uma protagonista fantástica. Ainda em early access, mas já é um dos melhores roguelikes que já joguei.',
    lists: ['Favoritos', 'Jogando', 'Roguelikes']
  }
}

export default function GameDetailsPage() {
  const { game_data, player_data } = mockGame

  return (
    <ContentLayout title="New Post">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/game">Game</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Details</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    <div className="min-h-screen  text-white mt-5">
      {/* HEADER */}
      <div className="relative w-full h-[50vh] overflow-hidden">
        <Image
          src={game_data.cover}
          alt={game_data.name}
          fill
          className="object-cover opacity-30 blur-sm"
          priority
        />

        <div className="absolute inset-0 flex flex-col md:flex-row items-center gap-6 md:gap-12 px-6 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="relative w-72 h-96 shadow-2xl rounded-lg overflow-hidden border border-slate-800"
          >
            <Image
              src={game_data.cover}
              alt={game_data.name}
              fill
              className="object-cover"
              priority
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-5xl font-bold mb-3">{game_data.name}</h1>
            <p className="text-slate-200 text-sm mb-2">
              Lançamento: {game_data.release_date}
            </p>

            <div className="flex flex-wrap gap-2 mb-3">
              {game_data.genres.map((genre) => (
                <Badge
                  key={genre}
                  variant="outline"
                  className="dark:shadow-zinc-800 border-slate-600 text-slate-300"
                >
                  {genre}
                </Badge>
              ))}
            </div>

            <div className="flex gap-3 mt-3 text-slate-400">
              {game_data.platforms.map((platform) => (
                <span key={platform}>{platform}</span>
              ))}
            </div>

            <p className="mt-5 text-lg leading-relaxed max-w-2xl">
              {game_data.summary}
            </p>
          </motion.div>
        </div>
      </div>

      {/* CONTEÚDO */}
      <div className="mx-auto px-6 md:px-10 py-10">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Progresso */}
          <Card className="flex-1 dark:shadow-zinc-800 border-slate-800 p-6">
            <h2 className="text-xl font-semibold mb-4 text-slate-100">
              Progresso do Jogador
            </h2>

            <div className="space-y-2 text-slate-300">
              <p>
                <strong>Status:</strong> {player_data.status}
              </p>
              <p>
                <strong>Horas jogadas:</strong> {player_data.hours_played}h
              </p>

              {player_data.times_finished !== undefined && (
                <p>
                  <strong>Vezes zerado:</strong> {player_data.times_finished}
                </p>
              )}

              {player_data.personal_rating !== undefined && (
                <p className="flex items-center gap-2">
                  <strong>Nota pessoal:</strong>
                  <span className="flex items-center text-yellow-400">
                    <Star className="w-4 h-4 fill-yellow-400 mr-1" />
                    {player_data.personal_rating}
                  </span>
                </p>
              )}

              {player_data.lists && (
                <>
                  <Separator className="my-3 bg-slate-700" />
                  <div>
                    <strong>Listas:</strong>
                    <div className="flex gap-2 mt-2 flex-wrap">
                      {player_data.lists.map((list) => (
                        <Badge
                          key={list}
                          className="bg-slate-700 border-slate-600"
                        >
                          {list}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </Card>

          {/* Review */}
          {player_data.review && (
            <Card className="flex-1 dark:shadow-zinc-800 border-slate-800 p-6">
              <h2 className="text-xl font-semibold  text-slate-100 mb-4">Review Pessoal</h2>
              <p className="text-slate-300 text-lg leading-relaxed">
                {player_data.review}
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
    </ContentLayout>
  );
}
