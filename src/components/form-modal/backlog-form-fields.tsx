// src/components/form-modal/backlog-form-fields.tsx
"use client";

import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea
} from "@/components/ui/input-group";

import { useGameListsStore } from "@/stores/useGameListsStore";
import { useEffect, useState } from "react";

import { useFormContext } from "react-hook-form";
import { gameFormSchema } from "./form-props";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import GameCoverSearch from "../game-cover-search-test";
type FormData = z.infer<typeof gameFormSchema>;

export default function BacklogFormFields() {
  const { control, watch } = useFormContext<FormData>();
  const { lists, loadLists } = useGameListsStore();
  const gameName = watch("game_data.name");

  useEffect(() => {
    loadLists();
  }, [loadLists]);

  return (
    <>
      <Card className="p-5">
        <CardHeader>
          <CardTitle>Dados do jogo</CardTitle>
          <CardDescription>
            Metadados do jogo, como nome, data de lançamento, devs/publishers, e
            nota geral.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Controller
            name="game_data.name"
            control={control}
            render={({ field, fieldState }) => (
              <Field className="pb-5" data-invalid={fieldState.invalid}>
                <FieldLabel>Nome do jogo</FieldLabel>
                <Input {...field} placeholder="Ex: Metroid Prime 4" />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="game_data.developers"
            control={control}
            render={({ field, fieldState }) => (
              <Field className="pb-5" data-invalid={fieldState.invalid}>
                <FieldLabel>Desenvolvedores</FieldLabel>
                <Input {...field} placeholder="Desenvolvedor(es) do jogo" />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="game_data.publishers"
            control={control}
            render={({ field, fieldState }) => (
              <Field className="pb-5" data-invalid={fieldState.invalid}>
                <FieldLabel>Publishers</FieldLabel>
                <Input {...field} placeholder="Empresa que publicou o jogo" />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="game_data.id"
            control={control}
            render={({ field }) => (
              <Field className="pb-5 hidden">
                <FieldLabel>ID do jogo (IGDB)</FieldLabel>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  placeholder="Ex: 123456"
                />
              </Field>
            )}
          />
          <Controller
            name="game_data.release_date"
            control={control}
            render={({ field }) => (
              <Field className="pb-5">
                <FieldLabel>Ano de lançamento</FieldLabel>
                <Input
                  type="number"
                  placeholder="Ex: 2024"
                  {...field}
                  onChange={(e) =>
                    field.onChange(
                      e.target.value ? Number(e.target.value) : undefined
                    )
                  }
                />
              </Field>
            )}
          />

          <Controller
            name="game_data.total_rating"
            control={control}
            render={({ field }) => (
              <Field className="pb-5">
                <FieldLabel>Nota geral (0–100)</FieldLabel>
                <Input
                  type="number"
                  min={0}
                  max={100}
                  {...field}
                  onChange={(e) =>
                    field.onChange(
                      e.target.value ? Number(e.target.value) : undefined
                    )
                  }
                />
              </Field>
            )}
          />
          <Controller
            name="game_data.cover"
            control={control}
            render={({ field }) => (
              <Field className="pb-5">
                <FieldLabel>Capa do jogo</FieldLabel>

                <GameCoverSearch
                  query={gameName}
                  value={field.value}
                  onChange={field.onChange}
                />

                {field.value?.url && (
                  <p className="text-xs text-muted-foreground mt-2">
                    Fonte: {field.value.source} · confiança{" "}
                    {Math.round(field.value.confidence * 100)}%
                  </p>
                )}
              </Field>
            )}
          />

          <Controller
            name="game_data.summary"
            control={control}
            render={({ field }) => (
              <Field className="pb-5">
                <FieldLabel>Resumo</FieldLabel>
                <InputGroup>
                  <InputGroupTextarea
                    {...field}
                    rows={4}
                    className="resize-none"
                    placeholder="Descrição do jogo"
                  />
                  <InputGroupAddon align="block-end">
                    <InputGroupText>
                      {field.value?.length ?? 0}/500
                    </InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
              </Field>
            )}
          />
        </CardContent>
      </Card>
      <Card className="p-5">
        <CardHeader>
          <CardTitle>Dados do jogador</CardTitle>
          <CardDescription>
            Suas experiências e impressões gerais sobre o jogo.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Controller
            name="player_data.status"
            control={control}
            render={({ field, fieldState }) => (
              <Field className="pb-5" data-invalid={fieldState.invalid}>
                <FieldLabel>Game status</FieldLabel>
                <Input
                  {...field}
                  placeholder="Ex: jogando, zerado, dropado, etc."
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="player_data.hours_played"
            control={control}
            render={({ field, fieldState }) => (
              <Field className="pb-5" data-invalid={fieldState.invalid}>
                <FieldLabel>Horas jogadas</FieldLabel>
                <Input
                  type="number"
                  min={0}
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  placeholder="Ex: 40"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="player_data.rating"
            control={control}
            render={({ field }) => (
              <Field className="pb-5">
                <FieldLabel>Sua nota (0–10)</FieldLabel>
                <Input
                  type="number"
                  min={0}
                  max={10}
                  step={0.5}
                  {...field}
                  onChange={(e) =>
                    field.onChange(
                      e.target.value === "" ? undefined : Number(e.target.value)
                    )
                  }
                  placeholder="Ex: 8.5"
                />
              </Field>
            )}
          />

          <Controller
            name="player_data.review"
            control={control}
            render={({ field }) => (
              <Field className="pb-5">
                <FieldLabel>Review pessoal</FieldLabel>
                <InputGroup>
                  <InputGroupTextarea
                    {...field}
                    rows={5}
                    className="resize-none"
                    placeholder="O que você achou do jogo?"
                  />
                  <InputGroupAddon align="block-end">
                    <InputGroupText>
                      {field.value?.length ?? 0}/500
                    </InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
                <FieldDescription>
                  Impressões pessoais, sem compromisso com a crítica.
                </FieldDescription>
              </Field>
            )}
          />
          <Controller
            name="player_data.gameListId"
            control={control}
            render={({ field }) => (
              <Field className="pb-5">
                <FieldLabel>Adicionar à lista</FieldLabel>
                <Select>
                  <SelectTrigger className="w-full ">
                    <SelectValue placeholder="Select a timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {lists.map((list) => (
                        <SelectItem key={list._id} value={list._id}>
                          {list.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>
            )}
          />
        </CardContent>
      </Card>
    </>
  );
}
