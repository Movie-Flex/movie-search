import React from 'react'
import { Card, CardHeader, CardBody, CardFooter, Image, Stack, Heading, Text, Divider, ButtonGroup, Button, useDisclosure } from '@chakra-ui/react'
import { FaRegClock } from 'react-icons/fa';
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
    setIsModalOpen
}) => {
    return (
        <div>
            <Card width='300px' height='400px' align='center' bg='none' variant='elevated' borderRadius='0px'>
                <CardBody>
                    <CardHeader display='flex' flexDirection='row' justifyContent='start' align='center'>
                        <Text color='#ECC94B' fontWeight='bold' fontSize='20px'>{title}</Text>
                    </CardHeader>
                    <Stack display='flex' gap='10px' flexDirection='row' justify='space-between' align='start'>
                        <Image
                            w='60px'
                            h="60px"
                            src={poster}
                            alt={title}
                            borderRadius='lg'
                        />
                        <Text color='white' fontSize='14px'>{plot}</Text>
                    </Stack>
                    <Stack mt='6' spacing='3' display='flex' flexDirection='row' justify='space-between' align='center'>
                        <Button onClick={()=>{setModalMovie(movie);setIsModalOpen(true)}} variant='solid' textColor='#171D21' colorScheme='yellow'>
                            MORE INFO
                        </Button>
                        <Text fontSize='16px' display='flex' flexDirection='row' gap='5px' alignItems='center'>
                            <span className='text-[#ECC94B]'><FaRegClock /></span>
                            <span className='text-white'>{runtime}</span>
                            <span className='text-white'>min</span>
                        </Text>
                    </Stack>
                    <Stack marginTop='10px' display='flex' flexDirection='row' gap='5px' alignItems='center'>
                        {
                            genres.map((genre) => (
                                <span className='text-white text-[14px]'>{genre}</span>
                            ))
                        }
                    </Stack>
                </CardBody>
            </Card>
        </div>
    )
}

export default CardProviderOnHover