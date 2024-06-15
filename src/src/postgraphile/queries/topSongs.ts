export default `
query GetTopSongs($first: Int!, $userId: String!, $startDate: Datetime!, $endDate: Datetime!, $period: String!) {
    topSongs(
      first: $first
      filter: {
        userId: { equalTo: $userId }
        createdAt: {
          greaterThanOrEqualTo: $startDate
          lessThanOrEqualTo: $endDate
        }
      }
      orderBy: CREATED_AT_DESC
    ) {
      nodes {
        createdAt
        id
        user {
          username
        }
        topSongData(first: 25, orderBy: ORDER_ASC, condition: {timePeriod: $period}) {
          nodes {
            order
            id
            song {
              id
              name
              artist {
                name
              }
              album {
                name
                thumbnails{
                  nodes {
                    url
                    height
                    width
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  `;
