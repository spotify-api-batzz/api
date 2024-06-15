export default `
query GetTopArtists($first: Int!, $userId: String!, $startDate: Datetime!, $endDate: Datetime!, $period: String!)  {
    topArtists(first: $first,       
      filter: {
        userId: { equalTo: $userId }
        createdAt: {
          greaterThanOrEqualTo: $startDate
          lessThanOrEqualTo: $endDate
        }
      },
      orderBy:CREATED_AT_DESC) {
      nodes {
        user {
          username
        }
        createdAt
        topArtistData(first: 25, orderBy: ORDER_ASC, condition: {timePeriod: $period}) {
          nodes {
            order
            id
            artist {
              id
              name
              thumbnails {
                nodes {
                  url
                }
              }
            }
          }
        }
      }
    }
  }`;
