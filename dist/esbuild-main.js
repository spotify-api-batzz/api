var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, {enumerable: true, configurable: true, writable: true, value}) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __markAsModule = (target) => __defProp(target, "__esModule", {value: true});
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, {get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable});
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? {get: () => module2.default, enumerable: true} : {value: module2, enumerable: true})), module2);
};

// src/db.ts
var import_sequelize = __toModule(require("sequelize"));
var instance;
var ConnectToDB = (connstring) => {
  if (!instance) {
    instance = new import_sequelize.Sequelize(connstring);
  }
};

// src/app.ts
var import_express = __toModule(require("express"));

// src/models/albums.ts
var import_sequelize2 = __toModule(require("sequelize"));
var albums = class extends import_sequelize2.Model {
  static initModel(sequelize) {
    albums.init({
      id: {
        type: import_sequelize2.DataTypes.TEXT,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: import_sequelize2.DataTypes.TEXT,
        allowNull: true
      },
      spotify_id: {
        type: import_sequelize2.DataTypes.TEXT,
        allowNull: true
      },
      artist_id: {
        type: import_sequelize2.DataTypes.TEXT,
        allowNull: true
      },
      created_at: {
        type: import_sequelize2.DataTypes.DATE,
        allowNull: true
      },
      updated_at: {
        type: import_sequelize2.DataTypes.DATE,
        allowNull: true
      }
    }, {
      sequelize,
      tableName: "albums",
      schema: "public",
      underscored: true,
      timestamps: false,
      indexes: [
        {
          name: "albums_pkey",
          unique: true,
          fields: [{name: "id"}]
        }
      ]
    });
    return albums;
  }
};

// src/models/artists.ts
var import_sequelize3 = __toModule(require("sequelize"));
var artists = class extends import_sequelize3.Model {
  static initModel(sequelize) {
    artists.init({
      id: {
        type: import_sequelize3.DataTypes.TEXT,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: import_sequelize3.DataTypes.TEXT,
        allowNull: true
      },
      spotify_id: {
        type: import_sequelize3.DataTypes.TEXT,
        allowNull: true
      },
      created_at: {
        type: import_sequelize3.DataTypes.DATE,
        allowNull: true
      },
      updated_at: {
        type: import_sequelize3.DataTypes.DATE,
        allowNull: true
      }
    }, {
      sequelize,
      tableName: "artists",
      schema: "public",
      underscored: true,
      timestamps: false,
      indexes: [
        {
          name: "artists_pkey",
          unique: true,
          fields: [{name: "id"}]
        }
      ]
    });
    return artists;
  }
};

// src/models/recent_listen_data.ts
var import_sequelize4 = __toModule(require("sequelize"));
var recent_listen_data = class extends import_sequelize4.Model {
  static initModel(sequelize) {
    recent_listen_data.init({
      id: {
        type: import_sequelize4.DataTypes.TEXT,
        allowNull: false,
        primaryKey: true
      },
      song_id: {
        type: import_sequelize4.DataTypes.TEXT,
        allowNull: true
      },
      recent_listen_id: {
        type: import_sequelize4.DataTypes.TEXT,
        allowNull: true
      },
      played_at: {
        type: import_sequelize4.DataTypes.DATE,
        allowNull: true
      },
      created_at: {
        type: import_sequelize4.DataTypes.DATE,
        allowNull: true
      },
      updated_at: {
        type: import_sequelize4.DataTypes.DATE,
        allowNull: true
      }
    }, {
      sequelize,
      tableName: "recent_listen_data",
      schema: "public",
      underscored: true,
      timestamps: false,
      indexes: [
        {
          name: "recent_listen_data_pkey",
          unique: true,
          fields: [{name: "id"}]
        }
      ]
    });
    return recent_listen_data;
  }
};

// src/models/recent_listens.ts
var import_sequelize5 = __toModule(require("sequelize"));
var recent_listens = class extends import_sequelize5.Model {
  static initModel(sequelize) {
    recent_listens.init({
      id: {
        type: import_sequelize5.DataTypes.TEXT,
        allowNull: false,
        primaryKey: true
      },
      user_id: {
        type: import_sequelize5.DataTypes.TEXT,
        allowNull: true
      },
      created_at: {
        type: import_sequelize5.DataTypes.DATE,
        allowNull: true
      },
      updated_at: {
        type: import_sequelize5.DataTypes.DATE,
        allowNull: true
      }
    }, {
      sequelize,
      tableName: "recent_listens",
      schema: "public",
      underscored: true,
      timestamps: false,
      indexes: [
        {
          name: "recent_listens_pkey",
          unique: true,
          fields: [{name: "id"}]
        }
      ]
    });
    return recent_listens;
  }
};

// src/models/songs.ts
var import_sequelize6 = __toModule(require("sequelize"));
var songs = class extends import_sequelize6.Model {
  static initModel(sequelize) {
    songs.init({
      id: {
        type: import_sequelize6.DataTypes.TEXT,
        allowNull: false,
        primaryKey: true
      },
      spotify_id: {
        type: import_sequelize6.DataTypes.TEXT,
        allowNull: true
      },
      album_id: {
        type: import_sequelize6.DataTypes.TEXT,
        allowNull: true
      },
      artist_id: {
        type: import_sequelize6.DataTypes.TEXT,
        allowNull: true
      },
      name: {
        type: import_sequelize6.DataTypes.TEXT,
        allowNull: true
      },
      created_at: {
        type: import_sequelize6.DataTypes.DATE,
        allowNull: true
      },
      updated_at: {
        type: import_sequelize6.DataTypes.DATE,
        allowNull: true
      }
    }, {
      sequelize,
      tableName: "songs",
      schema: "public",
      underscored: true,
      timestamps: false,
      indexes: [
        {
          name: "songs_pkey",
          unique: true,
          fields: [{name: "id"}]
        }
      ]
    });
    return songs;
  }
};

// src/models/thumbnails.ts
var import_sequelize7 = __toModule(require("sequelize"));
var thumbnails = class extends import_sequelize7.Model {
  static initModel(sequelize) {
    thumbnails.init({
      id: {
        type: import_sequelize7.DataTypes.TEXT,
        allowNull: false,
        primaryKey: true
      },
      entity: {
        type: import_sequelize7.DataTypes.TEXT,
        allowNull: true
      },
      entity_id: {
        type: import_sequelize7.DataTypes.TEXT,
        allowNull: true
      },
      width: {
        type: import_sequelize7.DataTypes.SMALLINT,
        allowNull: true
      },
      height: {
        type: import_sequelize7.DataTypes.SMALLINT,
        allowNull: true
      },
      url: {
        type: import_sequelize7.DataTypes.TEXT,
        allowNull: true
      },
      created_at: {
        type: import_sequelize7.DataTypes.DATE,
        allowNull: true
      },
      updated_at: {
        type: import_sequelize7.DataTypes.DATE,
        allowNull: true
      }
    }, {
      sequelize,
      tableName: "thumbnails",
      schema: "public",
      underscored: true,
      timestamps: false,
      indexes: [
        {
          name: "thumbnails_pkey",
          unique: true,
          fields: [{name: "id"}]
        }
      ]
    });
    return thumbnails;
  }
};

// src/models/top_artist_data.ts
var import_sequelize8 = __toModule(require("sequelize"));
var top_artist_data = class extends import_sequelize8.Model {
  static initModel(sequelize) {
    top_artist_data.init({
      id: {
        type: import_sequelize8.DataTypes.TEXT,
        allowNull: false,
        primaryKey: true
      },
      artist_id: {
        type: import_sequelize8.DataTypes.TEXT,
        allowNull: true
      },
      top_artist_id: {
        type: import_sequelize8.DataTypes.TEXT,
        allowNull: true
      },
      time_period: {
        type: import_sequelize8.DataTypes.TEXT,
        allowNull: true
      },
      order: {
        type: import_sequelize8.DataTypes.INTEGER,
        allowNull: true
      },
      created_at: {
        type: import_sequelize8.DataTypes.DATE,
        allowNull: true
      },
      updated_at: {
        type: import_sequelize8.DataTypes.DATE,
        allowNull: true
      }
    }, {
      sequelize,
      tableName: "top_artist_data",
      schema: "public",
      timestamps: false,
      underscored: true,
      indexes: [
        {
          name: "top_artist_data_pkey",
          unique: true,
          fields: [{name: "id"}]
        }
      ]
    });
    return top_artist_data;
  }
};

// src/models/top_artists.ts
var import_sequelize9 = __toModule(require("sequelize"));
var top_artists = class extends import_sequelize9.Model {
  static initModel(sequelize) {
    top_artists.init({
      id: {
        type: import_sequelize9.DataTypes.TEXT,
        allowNull: false,
        primaryKey: true
      },
      user_id: {
        type: import_sequelize9.DataTypes.TEXT,
        allowNull: true
      },
      created_at: {
        type: import_sequelize9.DataTypes.DATE,
        allowNull: true
      },
      updated_at: {
        type: import_sequelize9.DataTypes.DATE,
        allowNull: true
      }
    }, {
      sequelize,
      tableName: "top_artists",
      schema: "public",
      underscored: true,
      timestamps: false,
      indexes: [
        {
          name: "top_artists_pkey",
          unique: true,
          fields: [{name: "id"}]
        }
      ]
    });
    return top_artists;
  }
};

// src/models/top_song_data.ts
var import_sequelize10 = __toModule(require("sequelize"));
var top_song_data = class extends import_sequelize10.Model {
  static initModel(sequelize) {
    top_song_data.init({
      id: {
        type: import_sequelize10.DataTypes.TEXT,
        allowNull: false,
        primaryKey: true
      },
      song_id: {
        type: import_sequelize10.DataTypes.TEXT,
        allowNull: true
      },
      top_song_id: {
        type: import_sequelize10.DataTypes.TEXT,
        allowNull: true
      },
      order: {
        type: import_sequelize10.DataTypes.INTEGER,
        allowNull: true
      },
      time_period: {
        type: import_sequelize10.DataTypes.TEXT,
        allowNull: true
      },
      created_at: {
        type: import_sequelize10.DataTypes.DATE,
        allowNull: true
      },
      updated_at: {
        type: import_sequelize10.DataTypes.DATE,
        allowNull: true
      }
    }, {
      sequelize,
      tableName: "top_song_data",
      schema: "public",
      underscored: true,
      timestamps: false,
      indexes: [
        {
          name: "top_song_data_pkey",
          unique: true,
          fields: [{name: "id"}]
        }
      ]
    });
    return top_song_data;
  }
};

// src/models/top_songs.ts
var import_sequelize11 = __toModule(require("sequelize"));
var top_songs = class extends import_sequelize11.Model {
  static initModel(sequelize) {
    top_songs.init({
      id: {
        type: import_sequelize11.DataTypes.TEXT,
        allowNull: false,
        primaryKey: true
      },
      user_id: {
        type: import_sequelize11.DataTypes.TEXT,
        allowNull: true
      },
      created_at: {
        type: import_sequelize11.DataTypes.DATE,
        allowNull: true
      },
      updated_at: {
        type: import_sequelize11.DataTypes.DATE,
        allowNull: true
      }
    }, {
      sequelize,
      tableName: "top_songs",
      schema: "public",
      underscored: true,
      timestamps: false,
      indexes: [
        {
          name: "top_songs_pkey",
          unique: true,
          fields: [{name: "id"}]
        }
      ]
    });
    return top_songs;
  }
};

// src/models/users.ts
var import_sequelize12 = __toModule(require("sequelize"));
var users = class extends import_sequelize12.Model {
  static initModel(sequelize) {
    users.init({
      id: {
        type: import_sequelize12.DataTypes.TEXT,
        allowNull: false,
        primaryKey: true
      },
      spotify_id: {
        type: import_sequelize12.DataTypes.TEXT,
        allowNull: true
      },
      username: {
        type: import_sequelize12.DataTypes.TEXT,
        allowNull: true
      },
      password: {
        type: import_sequelize12.DataTypes.TEXT,
        allowNull: true
      },
      created_at: {
        type: import_sequelize12.DataTypes.DATE,
        allowNull: true
      },
      updated_at: {
        type: import_sequelize12.DataTypes.DATE,
        allowNull: true
      }
    }, {
      sequelize,
      tableName: "users",
      schema: "public",
      underscored: true,
      timestamps: false,
      indexes: [
        {
          name: "users_pkey",
          unique: true,
          fields: [{name: "id"}]
        }
      ]
    });
    return users;
  }
};

// src/models/init-models.ts
function initModels(sequelize) {
  albums.initModel(sequelize);
  artists.initModel(sequelize);
  recent_listen_data.initModel(sequelize);
  recent_listens.initModel(sequelize);
  songs.initModel(sequelize);
  thumbnails.initModel(sequelize);
  top_artist_data.initModel(sequelize);
  top_artists.initModel(sequelize);
  top_song_data.initModel(sequelize);
  top_songs.initModel(sequelize);
  users.initModel(sequelize);
  albums.hasMany(thumbnails, {
    foreignKey: "entity_id",
    constraints: false,
    scope: {
      entity: "album"
    }
  });
  albums.belongsTo(artists);
  artists.hasMany(thumbnails, {
    foreignKey: "entity_id",
    constraints: false,
    scope: {
      entity: "artist"
    }
  });
  artists.hasOne(albums);
  thumbnails.belongsTo(artists, {
    foreignKey: "entity_id",
    constraints: false
  });
  thumbnails.belongsTo(albums, {foreignKey: "entity_id", constraints: false});
  songs.belongsTo(artists);
  songs.belongsTo(albums);
  return {
    albums,
    artists,
    recent_listen_data,
    recent_listens,
    songs,
    thumbnails,
    top_artist_data,
    top_artists,
    top_song_data,
    top_songs,
    users
  };
}

// src/app.ts
var import_ramda = __toModule(require("ramda"));
var app = (0, import_express.default)();
ConnectToDB("postgres://test:123@192.168.0.27:5432/spotify");
var models = initModels(instance);
var parseIncludes = (joins) => {
  let includes = {include: []};
  joins.forEach((join) => {
    let modelList = join.split(".");
    let baseInclude = {};
    if (modelList.length === 0)
      return "";
    modelList.forEach((item, i) => {
      baseInclude = (0, import_ramda.assocPath)(new Array(i).fill(1).map((i2) => "include"), {model: models[modelList[i]]}, baseInclude);
    });
    includes.include.push(baseInclude);
  });
  return includes;
};
Object.keys(models).forEach((key) => {
  app.get(`/${key}`, async (req, res) => {
    let items = await models[key].findAll(__spreadValues(__spreadValues({}, (0, import_ramda.pick)(["limit", "offset"], req.query)), parseIncludes(req.query.joins.split(","))));
    res.send(items);
  });
});
app.listen(3e3);
//# sourceMappingURL=esbuild-main.js.map
