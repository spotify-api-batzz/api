import { Sequelize, DataTypes, Model } from "sequelize";

class Album extends Model {}

Album.init(
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.STRING(36),
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    spotifyId: {
      key: "spotify_id",
      type: DataTypes.STRING(36),
    },
    artistId: {
      key: "artist_id",
      type: DataTypes.STRING(36),
    },
    createdAt: {
      key: "created_at",
      type: DataTypes.DATE,
    },
    updatedAt: {
      key: "updated_at",
      type: DataTypes.DATE,
    },
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: "User", // We need to choose the model name
  }
);
