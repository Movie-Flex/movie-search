import React, { useContext, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Stack,
  Heading,
  Text,
  Divider,
  ButtonGroup,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { FaRegClock, FaRegStar, FaStar } from "react-icons/fa";
import { FaArrowRotateRight } from "react-icons/fa6";
import axios from "axios";
import toast from "react-hot-toast";
import { UserContext } from "../context/UserContext.jsx";

const CardProviderOnHover = ({
  movie,
  poster,
  title,
  plot,
  genres,
  year,
  runtime,
  rating,
  setModalMovie,
  setIsModalOpen,
}) => {
  const { token } = useContext(UserContext);

  const [userRating, setUserRating] = useState(0);

  const handleRatingSubmission = async () => {
    try {
      const response = await axios.post(
        `https://movie-flex-open-soft2024-backend.vercel.app/api/rateMovie/${movie._id}/${userRating * 2}`,
        {},
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Successfully rated the movie");
      } else {
        toast.error("Error rating the movie");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteFromFavourites = async () => {
    try {
      const response = await axios.delete(
        `https://movie-flex-open-soft2024-backend.vercel.app/api/deleteFavouriteMovie/${movie._id}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Successfully deleted from Favorites");
        window.location.reload();
      } else {
        toast.error("Error deleting from Favorites");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteFromWatchLater = async () => {
    try {
      const response = await axios.delete(
        `https://movie-flex-open-soft2024-backend.vercel.app/api/deleteWatchLaterMovie/${movie._id}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Successfully deleted from Watch Later");
        window.location.reload();
      } else {
        toast.error("Error deleting from Watch Later");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Card
        width="300px"
        height="400px"
        align="center"
        bg="none"
        variant="elevated"
        borderRadius="0px"
      >
        <CardBody>
          <CardHeader
            display="flex"
            flexDirection="row"
            justifyContent="start"
            align="center"
          >
            <Text color="#ECC94B" fontWeight="bold" fontSize="20px">
              {title}
            </Text>
          </CardHeader>
          <Stack
            display="flex"
            gap="10px"
            flexDirection="row"
            justify="space-between"
            align="start"
          >
            <Image
              w="60px"
              h="60px"
              src={poster}
              alt={title}
              borderRadius="lg"
            />
            <Text color="white" fontSize="14px">
              {plot}
            </Text>
          </Stack>
          <Stack
            mt="6"
            spacing="3"
            display="flex"
            flexDirection="row"
            justify="space-between"
            align="center"
          >
            {/* <Button
              onClick={() => {
                setModalMovie(movie);
                setIsModalOpen(true);
              }}
              variant="solid"
              textColor="#171D21"
              colorScheme="yellow"
            >
              MORE INFO
            </Button> */}
            <Text
              fontSize="16px"
              display="flex"
              flexDirection="row"
              gap="5px"
              alignItems="center"
            >
              <span className="text-[#ECC94B]">
                <FaRegClock />
              </span>
              <span className="text-white">{runtime}</span>
              <span className="text-white">min</span>
            </Text>
          </Stack>
          <Stack
            marginTop="10px"
            display="flex"
            flexDirection="row"
            gap="5px"
            alignItems="center"
          >
            {genres.map((genre) => (
              <span className="text-white text-[14px]">{genre}</span>
            ))}
          </Stack>
          <Stack
            marginTop="10px"
            display="flex"
            flexDirection="row"
            gap="5px"
            alignItems="center"
          >
            <FaArrowRotateRight className="text-[#ECC94B] text-xl mx-1" />
            <Button
              onClick={() => {
                handleDeleteFromWatchLater();
              }}
              variant="solid"
              textColor="#171D21"
              colorScheme="yellow"
            >
              Delete from Watch Later
            </Button>
          </Stack>
          <Stack
            marginTop="10px"
            display="flex"
            flexDirection="row"
            gap="5px"
            alignItems="center"
          >
            <FaRegStar className="text-[#ECC94B] text-xl mx-1" />
            <Button
              onClick={() => {
                handleDeleteFromFavourites();
              }}
              variant="solid"
              textColor="#171D21"
              colorScheme="yellow"
            >
              Delete from Favorites
            </Button>
          </Stack>
          <Stack
            w="100%"
            marginTop="10px"
            display="flex"
            flexDirection="column"
            gap="5px"
            alignItems="start"
          >
            <Text
              fontSize="16px"
              display="flex"
              flexDirection="row"
              gap="5px"
              alignItems="center"
            >
              <span className="text-[#ECC94B]">Rate the movie</span>
            </Text>
            <div className="flex justify-around items-center w-full">
              <span
                onClick={() => {
                  setUserRating(1);
                }}
              >
                {userRating >= 1 ? (
                  <FaStar className="text-[#ECC94B] text-xl mx-1" />
                ) : (
                  <FaRegStar className="text-[#ECC94B] text-xl mx-1" />
                )}
              </span>
              <span
                onClick={() => {
                  setUserRating(2);
                }}
              >
                {userRating >= 2 ? (
                  <FaStar className="text-[#ECC94B] text-xl mx-1" />
                ) : (
                  <FaRegStar className="text-[#ECC94B] text-xl mx-1" />
                )}
              </span>
              <span
                onClick={() => {
                  setUserRating(3);
                }}
              >
                {userRating >= 3 ? (
                  <FaStar className="text-[#ECC94B] text-xl mx-1" />
                ) : (
                  <FaRegStar className="text-[#ECC94B] text-xl mx-1" />
                )}
              </span>
              <span
                onClick={() => {
                  setUserRating(4);
                }}
              >
                {userRating >= 4 ? (
                  <FaStar className="text-[#ECC94B] text-xl mx-1" />
                ) : (
                  <FaRegStar className="text-[#ECC94B] text-xl mx-1" />
                )}
              </span>
              <span
                onClick={() => {
                  setUserRating(5);
                }}
              >
                {userRating >= 5 ? (
                  <FaStar className="text-[#ECC94B] text-xl mx-1" />
                ) : (
                  <FaRegStar className="text-[#ECC94B] text-xl mx-1" />
                )}
              </span>
            </div>
            {userRating > 0 && (
              <Button
                onClick={() => {
                  handleRatingSubmission();
                }}
                marginTop="10px"
                variant="solid"
                textColor="#171D21"
                colorScheme="yellow"
              >
                Submit
              </Button>
            )}
          </Stack>
        </CardBody>
      </Card>
    </div>
  );
};

export default CardProviderOnHover;
