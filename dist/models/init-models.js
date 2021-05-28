"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initModels = exports.users = exports.top_songs = exports.top_song_data = exports.top_artists = exports.top_artist_data = exports.thumbnails = exports.songs = exports.recent_listens = exports.recent_listen_data = exports.artists = exports.albums = void 0;
const albums_1 = require("./albums");
Object.defineProperty(exports, "albums", { enumerable: true, get: function () { return albums_1.albums; } });
const artists_1 = require("./artists");
Object.defineProperty(exports, "artists", { enumerable: true, get: function () { return artists_1.artists; } });
const recent_listen_data_1 = require("./recent_listen_data");
Object.defineProperty(exports, "recent_listen_data", { enumerable: true, get: function () { return recent_listen_data_1.recent_listen_data; } });
const recent_listens_1 = require("./recent_listens");
Object.defineProperty(exports, "recent_listens", { enumerable: true, get: function () { return recent_listens_1.recent_listens; } });
const songs_1 = require("./songs");
Object.defineProperty(exports, "songs", { enumerable: true, get: function () { return songs_1.songs; } });
const thumbnails_1 = require("./thumbnails");
Object.defineProperty(exports, "thumbnails", { enumerable: true, get: function () { return thumbnails_1.thumbnails; } });
const top_artist_data_1 = require("./top_artist_data");
Object.defineProperty(exports, "top_artist_data", { enumerable: true, get: function () { return top_artist_data_1.top_artist_data; } });
const top_artists_1 = require("./top_artists");
Object.defineProperty(exports, "top_artists", { enumerable: true, get: function () { return top_artists_1.top_artists; } });
const top_song_data_1 = require("./top_song_data");
Object.defineProperty(exports, "top_song_data", { enumerable: true, get: function () { return top_song_data_1.top_song_data; } });
const top_songs_1 = require("./top_songs");
Object.defineProperty(exports, "top_songs", { enumerable: true, get: function () { return top_songs_1.top_songs; } });
const users_1 = require("./users");
Object.defineProperty(exports, "users", { enumerable: true, get: function () { return users_1.users; } });
function initModels(sequelize) {
    albums_1.albums.initModel(sequelize);
    artists_1.artists.initModel(sequelize);
    recent_listen_data_1.recent_listen_data.initModel(sequelize);
    recent_listens_1.recent_listens.initModel(sequelize);
    songs_1.songs.initModel(sequelize);
    thumbnails_1.thumbnails.initModel(sequelize);
    top_artist_data_1.top_artist_data.initModel(sequelize);
    top_artists_1.top_artists.initModel(sequelize);
    top_song_data_1.top_song_data.initModel(sequelize);
    top_songs_1.top_songs.initModel(sequelize);
    users_1.users.initModel(sequelize);
    return {
        albums: albums_1.albums,
        artists: artists_1.artists,
        recent_listen_data: recent_listen_data_1.recent_listen_data,
        recent_listens: recent_listens_1.recent_listens,
        songs: songs_1.songs,
        thumbnails: thumbnails_1.thumbnails,
        top_artist_data: top_artist_data_1.top_artist_data,
        top_artists: top_artists_1.top_artists,
        top_song_data: top_song_data_1.top_song_data,
        top_songs: top_songs_1.top_songs,
        users: users_1.users,
    };
}
exports.initModels = initModels;
//# sourceMappingURL=init-models.js.map