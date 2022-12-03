import React from 'react'
import ImageUploader from "react-images-upload";




const ChangeImg: React.FC = () => {

   

    return (
        <>
            <div className='fixed  w-4/5 top-20  left-20 bg-[#96b6c8] rounded-lg z-50' >
                <div className="md:grid md:grid-cols-3 md:gap-6">
                    <div className="md:col-span-1 flex flex-col justify-between items-center h-full">
                        <img 
                            className='justify-between align-center m-auto'
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Google_Chat_logo_%282017-2020%29.svg/2560px-Google_Chat_logo_%282017-2020%29.svg.png" 
                            alt="" 
                            style={{width: "350px"}}
                        />
                    </div>
                    <div className="mt-5 md:col-span-2 md:mt-0">
                    <form action="#" method="POST">
                        <div className="shadow sm:overflow-hidden sm:rounded-md">
                        <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                            <div className="grid grid-cols-3 gap-6">
                            
                            </div>

                            <div>
                            
                            
                            </div>

                            <div>
                            <label className="block text-sm font-medium text-gray-700">Photo</label>
                            <div className="mt-1 flex items-center">
                                
                                <ImageUploader
                                    withIcon={false}
                                    withLabel={false}
                                    withPreview={true}
                                    buttonText={"Add photos"}
                                    fileSizeError={"File size is too big!"}
                                    fileTypeError={"This extension is not supported!"}
                                    onChange={(e) => {
                                        console.log(e)
                                    }}
                                />
                            </div>
                            </div>

                            <div>
                                
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                            <button
                            type="submit"
                            className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                            Save
                            </button>

                        </div>
                        </div>
                    </form>
                    </div>
                </div>
            </div>

            
        </>
    )
}

export default ChangeImg
