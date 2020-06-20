const NUM_EVENTS_IN_PAGE = 10;

export const paginateAggregate = (page: number) => [
  {
    $skip: page > 0 ? ((page - 1) * NUM_EVENTS_IN_PAGE) : 0
  },
  {
    $limit: NUM_EVENTS_IN_PAGE
  }
]
