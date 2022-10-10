import {
  Box,
  Divider,
  Flex,
  Image,
  Input,
  List,
  ListItem,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import CocktailApi, { drink } from "../api/CocktailApi";
import addIcon from "../icons/add.svg";
const cocktailApi = new CocktailApi();

interface Props {
  addCocktailToFavourite: (cocktail: drink) => void;
  displaySearch: boolean;
  setDisplaySearch: (status: boolean) => void;
}

const SearchBox: React.FC<Props> = ({
  addCocktailToFavourite,
  displaySearch,
  setDisplaySearch,
}) => {
  const [searchResult, setSearchResult] = useState<drink[]>([]);
  const [searchText, setSearchText] = useState<string>("");

  const searchCockTails = async (query: string) => {
    try {
      if (query === "") {
        setSearchResult([]);
        return false;
      }
      const _searchResult = (await cocktailApi.searchCocktails(query)) || [];
      setSearchResult(_searchResult);
    } catch (error) {
      console.error("searchCockTails ", error);
    }
  };

  useEffect(() => {
    if (searchText !== "") {
      const timeoutId = setTimeout(() => {
        searchCockTails(searchText);
      }, 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [searchText]);

  return (
    <Box width="100%">
      <Input
        type={"text"}
        placeholder="Search for cocktails"
        onFocus={() => setDisplaySearch(true)}
        onChange={(e: any) => setSearchText(e.target.value)}
      />
      {displaySearch && searchResult.length > 0 && (
        <Box>
          <List
            spacing={3}
            zIndex={2}
            position="absolute"
            bg="#832852"
            width="275px;"
            marginTop={5}
            maxH="500px"
            overflow="scroll"
            test-id="search-list"
          >
            <Divider />
            {searchResult.map((cocktail: drink, key: number) => (
              <Box key={key}>
                <ListItem>
                  <Flex
                    gap={5}
                    alignItems="center"
                    justifyContent="space-between"
                    paddingLeft={5}
                    paddingRight={5}
                    paddingBottom={3}
                  >
                    <Flex gap={5}>
                      <Image
                        src={cocktail.strDrinkThumb}
                        width={35}
                        height={35}
                        cursor="pointer"
                      />
                      {cocktail.strDrink}
                    </Flex>
                    <Image
                      src={addIcon}
                      width={30}
                      height={30}
                      onClick={() => addCocktailToFavourite(cocktail)}
                      cursor="pointer"
                      className="add-favourite-img"
                    />
                  </Flex>
                </ListItem>
                <Divider />
              </Box>
            ))}
          </List>
        </Box>
      )}
    </Box>
  );
};

export default SearchBox;
