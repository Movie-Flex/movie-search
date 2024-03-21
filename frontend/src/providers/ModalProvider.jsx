import React from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    Image
} from '@chakra-ui/react'

const ModalProvider = ({
    movie,
    isModalOpen,
    setIsModalOpen
}) => {
    console.log('movie', movie)
    console.log('movies.genres', movie.genres)
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <div className=''>
            {movie && isModalOpen && (
                <Modal
                    isCentered
                    onClose={() => { setIsModalOpen(false) }}
                    isOpen={isModalOpen}
                    scrollBehavior='inside'
                >
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader fontSize='20px'>Movie: {movie.title}</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Image
                                w='80vw'
                                h="400px"
                                objectFit='fill'
                                src={movie.poster}
                                alt={movie.title}
                                borderRadius='lg'
                            />

                            <div className="flex flex-col items-start justify-center mt-3">
                                <div className="flex justify-center items-center gap-2">
                                    <span>Rating: </span>
                                    <span>{movie.imdb.rating}</span>
                                </div>
                                <div className="flex justify-center items-center gap-2">
                                    <span>Genre: </span>
                                    <span className='flex justify-center items-center gap-2'>
                                        {movie.genres.map(genre => {
                                            console.log('genre', genre)
                                            return <span>{genre}</span>
                                        })}
                                    </span>
                                </div>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme='blue' mr={3} onClick={() => { setIsModalOpen(false) }}>
                                Close
                            </Button>
                            <Button variant='ghost'>Secondary Action</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            )}
        </div>
    )
}

export default ModalProvider