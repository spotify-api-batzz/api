export default `
query GetAllSongs($offset: number!, $first: number!) {
    songs(offset: $offset, first: $first {
      nodes {
        name
        id
        album {
          name
          createdAt
          thumbnails {
            nodes {
              url
            }
          }
        }
        artist {
          name
        }
      }
      pageInfo {
        hasNextPage
        startCursor
        hasPreviousPage
        endCursor
      }
      totalCount
    }
  }`;
