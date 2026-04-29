import Image from "next/image";
import loadingImage from '../../public/assets/icons/loader.svg'
const Loading = () => {
    return (
        <div className='w-full flex items-center justify-center py-10'>
            <Image
                src={loadingImage}
                width={150}
                height={150}
                alt='loader'
                className='object-contain'
            />
        </div>
    );
};

export default Loading;
