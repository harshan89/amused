import {
  Box,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Image,
  List,
  ListItem,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { drink } from "../api/CocktailApi";
import favouriteIcon from "../icons/heart.svg";
import refreshIcon from "../icons/refresh.svg";
import deleteIcon from "../icons/delete.svg";
import SearchBox from "./SearchBox";

interface Props {
  getRandomCocktails: () => void;
}

const HomeHeader: React.FC<Props> = ({ getRandomCocktails }) => {
  const [favourites, setFavourites] = useState<drink[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [displaySearch, setDisplaySearch] = useState(false);
  const toast = useToast();

  const addCocktailToFavourite = (cocktail: drink) => {
    try {
      setFavourites([...favourites, cocktail]);
      toast({
        title: "Added to favourite list",
        description: "Favourite item added to the list.",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });
      setDisplaySearch(false);
    } catch (error) {
      console.error("addCocktailToFavourite", error);
    }
  };

  const removeFavouriteCocktail = (cocktail: drink) => {
    try {
      const _favourites = favourites.filter(
        (c: drink) => c.idDrink !== cocktail.idDrink
      );
      setFavourites(_favourites);
    } catch (error) {
      console.error("removeFavouriteCocktail", error);
    }
  };

  return (
    <Flex gap={5} alignItems="center" justifyContent="center" h="10vh">
      <Image
        src={refreshIcon}
        width="2.5em"
        height="2.5em"
        onClick={() => getRandomCocktails()}
        cursor="pointer"
        className="refreshIcon"
      />
      <SearchBox
        addCocktailToFavourite={addCocktailToFavourite}
        displaySearch={displaySearch}
        setDisplaySearch={setDisplaySearch}
      />
      <Image
        src={favouriteIcon}
        width="2.5em"
        height="2.5em"
        cursor="pointer"
        className="favouriteIcon"
        onClick={() => onOpen()}
      />
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
        <DrawerOverlay />
        <DrawerContent bg="#45182c" color="#fff">
          <DrawerCloseButton />
          <DrawerHeader>Favourite List</DrawerHeader>
          <DrawerBody>
            {favourites.length > 0 && (
              <Box marginTop={5}>
                <List spacing={3} zIndex={2} width="100%">
                  {favourites.map((cocktail: any, key: number) => (
                    <Box key={key}>
                      <ListItem>
                        <Flex
                          gap={5}
                          alignItems="center"
                          paddingBottom={2}
                          justifyContent="space-between"
                        >
                          {cocktail.strDrink}
                          <Image
                            src={deleteIcon}
                            width={30}
                            height={30}
                            onClick={() => removeFavouriteCocktail(cocktail)}
                            cursor="pointer"
                            className="deleteIcon"
                          />
                        </Flex>
                      </ListItem>
                      <Divider />
                    </Box>
                  ))}
                </List>
              </Box>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
};

export default HomeHeader;
