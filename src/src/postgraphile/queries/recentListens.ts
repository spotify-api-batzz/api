export default `
query GetRecentListens($offset: Int!, $first: Int!, $userId: String!) {
    recentListens(
      orderBy: PLAYED_AT_DESC
      condition: { userId: $userId }
      first: $first
      offset: $offset
    ) {
      nodes {
        id
            song {
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
            playedAt
        user {
          username
        }
      }
      pageInfo {
        startCursor
        hasPreviousPage
        hasNextPage
        endCursor
      }
      totalCount
    }
}
`;
