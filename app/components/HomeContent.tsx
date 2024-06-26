import { Flashy } from 'iconsax-react'
import React from 'react'
import { useDispatch } from 'react-redux'
import { getOptionData } from '../service/Redux/articleDetailSlice';

function HomeContent({ handleOpenArticle }: any) {
    const dispatch = useDispatch();
    return (
        <div className="relative before:hover:scale-105 before:transition-all overflow-hidden before:absolute z-0 before:top-0 before:start-1/2 before:bg-[url('https://preline.co/assets/svg/examples/squared-bg-element.svg')] before:bg-no-repeat before:bg-top before:size-full before:-z-[1] before:transform before:-translate-x-1/2">
            <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10">
                <div className="flex justify-center">
                    <a className="inline-flex items-center gap-x-2 bg-white border border-gray-200 text-xs text-gray-600 p-2 px-3 rounded-full transition hover:border-gray-300" href="#">
                        Create Your Documents
                        <span className="flex items-center gap-x-1" onClick={() => handleOpenArticle(null)}>
                            <span className="border-s border-gray-200 text-blue-600 ps-2">Create</span>
                            <svg className="flex-shrink-0 size-4 text-blue-600" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                        </span>
                    </a>
                </div>

                <div className="mt-5 max-w-2xl text-center mx-auto">
                    <h1 className="block font-bold text-gray-800 text-4xl md:text-5xl lg:text-6xl">
                        Supercharged <br></br> <span className='text-secondary'>BizBook</span> Experience
                    </h1>
                </div>

                <div className="mt-5 max-w-3xl text-center mx-auto">
                    <p className="text-lg text-gray-600">efficiently manage your documentation with ease. Streamline your workflow and ensure easy access to essential information. Start organizing your documents today.</p>
                </div>

                <div className="mt-8 gap-3 flex justify-center">
                    <a onClick={() => dispatch(getOptionData("PUBLIC"))} className="inline-flex justify-center items-center gap-x-3 text-center bg-gradient-to-tl from-blue-600 to-violet-600 hover:from-violet-600 hover:to-blue-600 border border-transparent text-white text-sm font-medium rounded-full py-3 px-4" href="#">
                        <Flashy />
                        BizBook Documents
                    </a>
                </div>
            </div>
        </div >
    )
}

export default HomeContent