import React, { useEffect, useState } from 'react'
import { Card, CardHeader, CardBody, CardFooter, Image, Stack, Heading, Text, Divider, ButtonGroup, Button, useDisclosure } from '@chakra-ui/react'
import { FaRegClock } from 'react-icons/fa';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'

const CardProvider = ({
    poster,
    title,
    year,
    runtime,
    rating
}) => {
    // const [isHover, setIsHover] = useState(false);

    // useEffect(() => {
    //     const movieCard = document.querySelectorAll("#movieCard");
    //     movieCard.forEach((card) => {
    //         card.addEventListener('mouseenter', (e) => {
    //             if (e.target == card) {
    //                 console.log('e.target', e.target)
    //                 setIsHover(true)
    //             }
    //         })
    //         card.addEventListener('mouseleave', (e) => {
    //             if (e.target == card) {
    //                 console.log('e.target', e.target)
    //                 setIsHover(false)
    //             }
    //         })
    //     })

    // }, [])

    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <div className="">

            <Card border="white" width='300px' align='center' bg='none' variant='outline' outlineColor='white' borderRadius='0px'>
                <CardBody>
                    <Image
                        w='300px'
                        h="400px"
                        src={poster}
                        alt={title}
                        borderRadius='lg'
                    />
                    <Stack mt='6' spacing='3' display='flex' flexDirection='row' justify='space-between' align='center'>
                        <Text color='white' fontWeight='bold' fontSize='20px'>{title}</Text>
                        <Text color='#ECC94B' fontSize='16px'>{year}</Text>
                    </Stack>
                    <Stack mt='6' spacing='3' display='flex' flexDirection='row' justify='space-between' align='center'>
                        
                        <Text fontSize='16px' display='flex' flexDirection='row' gap='5px' alignItems='center'>
                            <span className='text-[#ECC94B]'><FaRegClock /></span>
                            <span className='text-white'>{runtime}</span>
                            <span className='text-white'>min</span>
                        </Text>
                    </Stack>
                </CardBody>
            </Card>



            {/* <Modal isOpen={isHover} onClose={setIsHover(false)}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Neque, corrupti?
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button variant='ghost'>Secondary Action</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal> */}

        </div>
    )
}

export default CardProvider