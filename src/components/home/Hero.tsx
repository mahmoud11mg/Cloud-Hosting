import Image from 'next/image'
import { TiTick } from 'react-icons/ti'
import CloudImage from "../../../public/cloud-hosting.png"

const Hero = () => {
   return (
    <div className='flex flex-col lg:flex-row md:flex-row sm:flex-row items-center justify-center lg:space-x-1 text-neutral-900 p-2 lg:pr-8  m-2'>

        {/* Text Content */}
        <div className='font-bold text-xl text-black text-center lg:text-left p-4 lg:p-0 rounded-xl'>
            <h1 className='text-3xl'>Cloud Hosting</h1>
            <p className='mt-4'>The Best Web Hosting Solution For Your Online Success</p>
           
            {/* Feature List */}
            <div className='mt-4'>
                <div className="flex flex-col lg:flex-row md:flex-row sm:flex-row text-xl font-bold mb-1 text-neutral-600">
                    <div className="flex items-center mb-1 lg:mb-0">
                        <TiTick className="mr-2" /> Easy To Use Control Panel
                    </div>
                    <div className="flex items-center mb-1 lg:mb-0 ml-0 lg:ml-3">
                        <TiTick className="mr-2" /> Secure Hosting
                    </div>
                    <div className="flex items-center mb-1 lg:mb-0 ml-0 lg:ml-3">
                        <TiTick className="mr-2" /> Website Maintenance
                    </div>
                </div>
            </div>
        </div>

        {/* Image */}
        <div className='mt-4 lg:mt-0'>
            <Image
                src={CloudImage}
                alt="cloud-hosting"
                width={500}
                height={500}
                priority={true}
            />
        </div>
    </div>
);

    
}

export default Hero
