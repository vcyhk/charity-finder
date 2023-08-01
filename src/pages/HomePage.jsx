import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { CausesList } from "../CausesList";

export default function HomePage(){
    const [lists, setLists] = useState({});
    const causes = ['animals','art', 'culture', 'disease', 'education', 'environment', 'health', 'humans', 'justice', 'religion', 'research'];
    
    useEffect(() => {
        var cause = causes[Math.floor(Math.random()*causes.length)];
        axios.get('https://partners.every.org/v0.2/search/' + cause +'?take=9&apiKey=' + import.meta.env.VITE_API_KEY)
        .then(res => {
            setLists(res.data.nonprofits);
        })
        .catch(err => console.log(err));
    }, []);

    return(
        <div className="mb-4">
            <div className="flex items-center justify-center w-full h-96 bg-gradient-to-r from-[#2AA57A]  to-[#248142]">
                <span className="font-prompt tracking-wider text-[#F7F7F7] font-bold text-2xl sm:text-5xl">
                    Changing The World Through Kindness
                </span>
            </div>
            <div className="mb-14">
                <h1 className="pt-8 text-3xl mt-2 font-semibold flex justify-center text-gray-700">
                    You May Interest
                </h1>
                {lists.length > 0
                ?
                <div className="px-20 mt-5 grid justify-items-center grid-cols-3 gap-10 sm:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3">
                    {lists.map((data, id) => (
                        <Link 
                            to={`/charity/${data.name}`}
                            state={data}
                            key={id} 
                            className="mt-5 px-5 py-5 w-full rounded-md bg-white shadow-lg hover:bg-[#FBFBFB]"
                        >
                            
                            <span className="flex items-center text-lg font-semibold">
                                {data.logoUrl
                                ?<img className="mr-3 rounded-full" src={data.logoUrl}/>
                                :<img className="mr-3 w-12 h-12 rounded-full" src="./src/assets/donateLogo.svg"/>
                                }
                                {data.name}
                            </span>
                            <div className="w-full my-3 border-b border-gray-300"></div>

                            <span className="flex items-center">
                                <img className="mr-2 w-5 h-5" src="./src/assets/location.svg"/>
                                {data.location
                                    ? <div>{data.location}</div>
                                    : <div>Unknown</div>
                                }
                                
                            </span>
                        </Link> 
                    ))}
                </div>
                :
                <div className="w-full my-16 flex flex-col items-center justify-center text-gray-400 font-bold">
                    <div className="text-xl">No Items Found</div>
                </div>
                }
                
            </div>
        </div>
    );
}