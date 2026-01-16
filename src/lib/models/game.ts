import mongoose from "mongoose";

const GameSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },

    // 🔹 Dados do jogo (imutáveis / descritivos)
    game_data: {
      name: {
        type: String,
        required: true,
      },
      cover: {
        type: String,
      },
      genres: {
        type: [String],
        default: [],
      },
      platforms: {
        type: [String],
        default: [],
      },
      developer: {
        type: String,
      },
      release_date: {
        type: String,
      },
      summary: {
        type: String,
      },
    },

    // 🔸 Dados do jogador (subjetivos / mutáveis)
    player_data: {
      status: {
        type: String,
      },
      hours_played: {
        type: Number,
        default: 0,
        min: 0,
      },
      times_finished: {
        type: Number,
        min: 0,
      },
      personal_rating: {
        type: Number,
        min: 0,
        max: 10,
      },
      review: {
        type: String,
      },

      // 🔗 Relação N:N com GameList
      listIds: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "GameList",
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

export const Game =
  mongoose.models.Game || mongoose.model("Game", GameSchema);
