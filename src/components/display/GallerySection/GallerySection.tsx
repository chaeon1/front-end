import { useState } from 'react';
import ChevronLeft from '@icons/Chevron_LeftIcon';
import ChevronRight from '@icons/Chevron_RightIcon';
import useGallaryStore from '@store/useGallaryStore';
import { useOptionalFeatureStore } from '@store/OptionalFeature/useOptionalFeatureStore';
import CloseIcon from '@/components/icons/CloseIcon';
import { useLocation } from 'react-router';


export default function GallerySection() {
  const { images, grid } = useGallaryStore();

  const [modal, setModal] = useState(false)
  const { pathname } = useLocation()
  const isPreview = pathname == "/create"
  const handleModal = (index: number) => {
    //수정페이지 pathname 확인
    if (!isPreview) {
      setModal(!modal)
      setImageIndex(index)
    }
  }
  const [imageIndex, setImageIndex] = useState(0);
  const handlePrev = () => {
    if (imageIndex == 0) {
      setImageIndex(images.length - 1);
    } else setImageIndex((prev: number) => prev - 1);
  };
  const handleNext = () => {
    if (imageIndex == images.length - 1) {
      setImageIndex(0);
    } else setImageIndex((prev: number) => prev + 1);
  };

  const { selectedOptionalFeatures } = useOptionalFeatureStore();
  const isMainGalleryActive = selectedOptionalFeatures.gallery;
  return (
    <div className="bg-white w-full h-fit">
      {isMainGalleryActive && images ? (
        grid ? (
          <section className={`relative w-full grid grid-cols-3  ${isPreview ? "gap-3 " : "gap-y-3 px-2"}  justify-items-center items-center`}>
            {images.map((value, index) => {
              return (
                <button key={index} className="rounded-md w-24 h-32" onClick={() => handleModal(index)}>
                  <img key={index} src={value} alt="" className="rounded-md size-full object-center" />
                </button>
              );
            })}
            {
              modal && <button className='absolute top-2 right-2 z-10' onClick={() => handleModal(0)}>
                <CloseIcon className='text-white hover:bg-gray-400 rounded-full' />
              </button>
            }
            {
              modal &&
              <div className="absolute flex flex-row gap-2  justify-center items-center bg-black/70 size-full">
                <button onClick={handlePrev} className='bg-white h-6 rounded-full flex items-center justify-center'>
                  <ChevronLeft />
                </button>
                <img src={images[imageIndex]} alt="gallery-image" className='w-72 rounded-md' />
                <button onClick={handleNext} className='bg-white h-6 rounded-full flex items-center justify-center'>
                  <ChevronRight />
                </button>
              </div>
            }
          </section>
        ) : (
          <section className="flex flex-col w-full h-fit gap-2 px-3 justify-around items-center">
            <div className="w-full h-[450px]">
              <img src={images[imageIndex]} alt="" className='size-full rounded-md' />
            </div>
            <div className="flex flex-row  gap-4 justify-center">
              <button onClick={handlePrev}>
                <ChevronLeft className='' />
              </button>
              <div>{`${imageIndex + 1} / ${images.length}`}</div>
              <button onClick={handleNext}>
                <ChevronRight className='' />
              </button>
            </div>
          </section>
        )
      ) : (
        <div>NO IMAGES UPLOADED YET</div>
      )}
    </div>
  );
}
