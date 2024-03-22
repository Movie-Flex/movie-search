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
import { FaAngleDoubleRight, FaRegStar, FaStar } from 'react-icons/fa'

const ModalProvider = ({
    movie,
    isModalOpen,
    setIsModalOpen
}) => {
    console.log('movie', movie)
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
                    <ModalContent className='max-w-[90vw] min-w-[90vw] max-h-[95vh] min-h-[95vh]'>
                        <ModalHeader fontSize='20px'>
                            <div className="flex items-center">
                                <span className='px-3 border-2 border-black rounded-lg bg-[#171D21] text-[#ECC94B]'>{movie.title}</span>
                            </div>
                        </ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Image
                                w='80vw'
                                h="400px"
                                margin='auto'
                                objectFit='fill'
                                src={movie.poster}
                                alt={movie.title}
                                borderRadius='lg'
                            />
                            

                            <div className="flex flex-col items-start justify-center mt-5 gap-3">
                                <div className="flex justify-center items-center gap-2 bg-[#ECC94B] p-2 px-4 rounded-3xl font-semibold">
                                    <span>Rating </span>
                                    <span><FaStar /></span>
                                    <span className='text-[#171D21]'>{movie.imdb.rating}</span>
                                </div>
                                <div className="flex justify-center items-center gap-2 ">
                                    <span className='bg-black pr-2 rounded-3xl font-semibold flex gap-1 items-center'><span className='bg-[#ECC94B] p-2 px-6 rounded-3xl font-semibold'>Genre</span><span><FaAngleDoubleRight className='text-white' /></span>  </span>
                                    <span className='flex justify-center items-center gap-2 '>
                                        {movie.genres.map(genre => {
                                            return <span className='bg-[#ECC94B] p-2 px-4 rounded-3xl font-semibold text-[#171D21]'>{genre}</span>
                                        })}
                                    </span>
                                </div>

                                <div className="flex flex-col bg-[#ECC94B] p-3 rounded-xl w-full">
                                    <div className="text-xl text-[#171D21] font-bold border-b-2 border-[#171D21]">Plot</div>
                                    <div className="font-semibold mt-2">{movie.fullplot}</div>
                                </div>

                                <div className="flex flex-col bg-[#ECC94B] p-3 rounded-xl w-full">
                                    <div className="text-xl text-[#171D21] font-bold border-b-2 border-[#171D21]">Cast</div>
                                    {movie.cast.map((actor => (
                                        <div className="font-semibold mt-2">{actor}</div>
                                    )))}
                                </div>

                                <div className="flex flex-col bg-[#ECC94B] p-3 rounded-xl w-full">
                                    <div className="text-xl text-[#171D21] font-bold border-b-2 border-[#171D21]">Directors</div>
                                    {movie.directors.map((actor => (
                                        <div className="font-semibold mt-2">{actor}</div>
                                    )))}
                                </div>

                                <div className="flex flex-col bg-[#ECC94B] p-3 rounded-xl w-full">
                                    <div className="text-xl text-[#171D21] font-bold border-b-2 border-[#171D21]">Writers</div>
                                    {movie.writers.map((actor => (
                                        <div className="font-semibold mt-2">{actor}</div>
                                    )))}
                                </div>

                            </div>
                        </ModalBody>
                    </ModalContent>
                </Modal>
            )}
        </div>
    )
}

export default ModalProvider