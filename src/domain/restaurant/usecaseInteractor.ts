export interface UsecaseInteractor {
  getCategories(req: QueryCategoryRequest): Category[];
  getSituations(req: QuerySituationRequest): Situation[];
  getRecommendRestaurant(req: QueryRecommendRestaurantRequest): Restaurant;
}
