import axios from "axios"
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom"

export default function CharityCausesPage() {
    const location = useLocation();
    const props = location.state;

    const [lists, setLists] = useState({});

    useEffect(() => {
        axios.get('https://partners.every.org/v0.2/search/' + props +'?take=30&apiKey=' + import.meta.env.VITE_API_KEY)
        .then(res => {
            setLists(res.data.nonprofits);
        })
        .catch(err => console.log(err));
    }, [location]);

    return (
        <div className="container mx-auto">
        <h1 className="text-3xl pt-10 pl-6 tracking-wide font-semibold text-gray-800">
            Search results for: {props}
        </h1>
        <div className="flex items-center my-10 w-full">
            {lists.length > 0 ?
                <div className="grid w-full justify-items-center grid-cols-1 gap-10 px-6 sm:grid-cols-1 lg:grid-cols-3">
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
                                :<img className="mr-3 w-12 h-12 rounded-full" src="../src/assets/donateLogo.svg"/>
                                }
                                {data.name}
                            </span>
                            <div className="w-full my-3 border-b border-gray-300"></div>

                            <span className="flex items-center">
                                <img className="mr-2 w-5 h-5" src="../src/assets/location.svg"/>
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