import Api from "./Api";

export type drink = {
  idDrink: string;
  strDrinkThumb: string;
  strDrink: string;
};

interface GetCocktailResponse {
  drinks: drink[];
}

class CocktailApi {
  api: Api;
  constructor() {
    this.api = new Api();
  }

  cocktails: drink[] = [];

  fetchCocktails = async () => {
    try {
      let drinks: any = [];
      for (let x = 0; x < 5; x++) {
        const res = await new Api().get<GetCocktailResponse>({
          path: "/random.php",
          contentType: "application/json",
        });
        drinks.push(res.drinks[0]);
      }
      return drinks || [];
    } catch (error) {
      console.error(error);
    }
  };

  searchCocktails = async (cocktailName: string) => {
    try {
      const res = await new Api().get<GetCocktailResponse>({
        path: `/search.php?s=${cocktailName}`,
        contentType: "application/json",
      });
      return res.drinks || [];
    } catch (error) {
      console.error(error);
    }
  };
}

export default CocktailApi;
