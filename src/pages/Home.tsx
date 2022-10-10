import { useEffect, useState } from "react";
import CocktailApi, { drink } from "../api/CocktailApi";
import {
  Box,
  Center,
  Flex,
  Image,
  SimpleGrid,
  Spinner,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import HomeHeader from "../components/HomeHeader";

const MotionBox = motion(Box);

const cocktailApi = new CocktailApi();

const Home = () => {
  const [drinks, setDrinks] = useState<drink[]>([]);
  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    getRandomCocktails();
  }, []);

  const getRandomCocktails = async () => {
    try {
      setIsloading(true);
      const _drinks = (await cocktailApi.fetchCocktails()) || [];
      setDrinks(_drinks);
      setIsloading(false);
    } catch (error) {
      console.error("getRandomCocktails ", error);
    }
  };

  return (
    <Flex
      direction="column"
      justifyItems="center"
      width="100%"
      padding={10}
      className="home"
    >
      <HomeHeader getRandomCocktails={getRandomCocktails} />
      {isLoading && (
        <Center h="80vh">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Center>
      )}
      {!isLoading && (
        <>
          <Flex alignContent="center" justifyContent="center" marginTop={5}>
            <SimpleGrid columns={3} spacing={10} width="100%">
              {drinks.map((drink: drink, key: number) => (
                <MotionBox
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.9 }}
                  key={key}
                >
                  <Center
                    padding={5}
                    border="0.2px solid white"
                    borderRadius="5px"
                  >
                    <Image
                      justifyItems="center"
                      alignItems="center"
                      key={key}
                      src={drink.strDrinkThumb}
                      alt="Drink name"
                      boxSize="70%"
                      objectFit="cover"
                    />
                  </Center>
                </MotionBox>
              ))}
            </SimpleGrid>
          </Flex>
        </>
      )}
    </Flex>
  );
};

export default Home;
