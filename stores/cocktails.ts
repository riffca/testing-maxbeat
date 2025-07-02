export type DrinkResponse = {
    idDrink: string;
    strDrink: string;
    strDrinkAlternate: string | null;
    strTags: string | null;
    strVideo: string | null;
    strCategory: string;
    strIBA: string | null;
    strAlcoholic: string;
    strGlass: string;
    strInstructions: string;
    strInstructionsES: string | null;
    strInstructionsDE: string | null;
    strInstructionsFR: string | null;
    strInstructionsIT: string | null;
    strInstructionsZH_HANS: string | null;
    strInstructionsZH_HANT: string | null;
    strDrinkThumb: string;
    strImageSource: string | null;
    strImageAttribution: string | null;
    strCreativeCommonsConfirmed: string;
    dateModified: string;
    [key: `strIngredient${number}`]: string | null;
    [key: `strMeasure${number}`]: string | null;
  }

export enum CocktailTypes {
    margarita= 'margarita', 
    mojito = 'mojito', 
    a1 = 'a1', 
    kir= 'kir'
}

export const useCocktails = () => {
    const cockTailsMap = ref<Record<string, { drinks: DrinkResponse[]}>>({})

    const { get } = useHttp()
    const getLink = (name: string)=>`1/search.php?s=${name}`

    async function getCocktails(type: CocktailTypes){
        if(cockTailsMap.value[type])  {
            return { data: cockTailsMap.value[type], error: undefined }
        }
        const currentLink = getLink(type)
        const response =  await get<{drinks: DrinkResponse[]}>(currentLink)

        if(response.data) {
            cockTailsMap.value[type] = response.data
        }
        return response
    }

    return  {
        getCocktails,
        cockTailsMap
    }
}