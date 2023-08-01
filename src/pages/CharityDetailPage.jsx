import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function CharityDetailPage() {
    const location = useLocation();
    const props = location.state;
    const [display, setDisplay] = useState(true);
    const [disMsg, setDisMsg] = useState(false);
    const [check, setCheck] = useState(false);

    const data = localStorage.getItem("favoriteList");
    const cacheData = data ? JSON.parse(data) : []

    useEffect(() => {
        if(cacheData.length > 0)
        for(var i =0; i<cacheData.length; i++){
            if(cacheData[i].ein == props.ein){
                setCheck(true)
                setDisplay(false)
            }
        }
    },[cacheData])

    const [favItem, setfavItem] = useState({
        ein: props.ein,
        coverImageUrl: props.coverImageUrl,
        logoUrl: props.logoUrl,
        name: props.name,
        location: props.location,   
        description: props.description,
        profileUrl: props.profileUrl,
        tags: props.tags
    });

    function addFav(){
        setDisplay(false)
        cacheData.push(favItem);
        localStorage.setItem('favoriteList', JSON.stringify(cacheData))
        setDisMsg(true);
    }

    function rmFav(){
        if(cacheData.length>0){
            const indexObject = cacheData.findIndex(object =>{
                return object.ein = props.ein;
            })
            cacheData.splice(indexObject, 1);
            localStorage.setItem('favoriteList', JSON.stringify(cacheData))
            console.log(cacheData)
        }
        setDisMsg(false)
        setDisplay(true)
    }

    return (
        <div className="container mb-8 grid grid-cols-3 gap-14 mx-auto sm:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3">
            <div className="mt-10 col-span-2 rounded-md shadow-md">
                <div>
                    <img className="rounded-t-lg" src={props.coverImageUrl} />
                </div>
                <div className="p-8">
                    <h1 className={"flex items-center text-3xl tracking-wide font-semibold text-gray-800"}>
                        {props.logoUrl
                            ? <img className="mr-3 rounded-full" src={props.logoUrl} />
                            : <img className="mr-3 w-12 h-12 rounded-full" src="../src/assets/donateLogo.svg" />
                        }
                        {props.name}
                    </h1>
                    <div className="flex items-center my-6">
                        <img className="mr-2 w-5 h-5" src="../src/assets/location.svg" />
                        {props.location
                            ? <div>{props.location}</div>
                            : <div>Unknown</div>
                        }
                    </div>
                    <div className="">
                        <p className="text-xl pr-32">{props.description}</p>
                    </div>
                </div>
            </div>
            <div className="mt-10 p-6 h-fit rounded-md shadow-md">
                <div>
                    {disMsg &&
                    <div className={"flex mb-6 justify-center font-bold "}>
                    This Charity Added To Your Favorite !
                    </div>
                    }
                    
                    {display ?
                     <a>
                     <button
                         className="w-full bg-[#F14040] rounded-sm py-4 text-white font-bold hover:bg-[#ED2F2F]"
                         onClick={addFav}
                     >
                         Add to favorites
                     </button>
                    </a>
                    :
                    <a>
                     <button
                         className="w-full bg-[#2D59AF] rounded-sm py-4 text-white font-bold hover:bg-[#1E499F]"
                         onClick={rmFav}
                     >
                         Remove from favorites
                     </button>
                    </a>
                    }
                   
                </div>
                <div className="mt-4">
                    <a href={props.profileUrl} target="_blank">
                        <button className="w-full bg-emerald-800 rounded-sm py-4 text-white font-bold hover:bg-emerald-900">
                            Check it in Every.org
                        </button>
                    </a>
                </div>
                <div className="mt-2 flex flex-wrap">
                    {props.tags
                        &&
                        <div className="mt-6">
                            <span className="font-semibold text-lg">Tag:</span>
                            <div className="flex flex-wrap mt-1">
                                {(props.tags).map((data, id) => (
                                    <div key={id} className="bg-slate-500 text-white px-3 py-2 m-2 rounded-md shadow-md">
                                        {data}
                                    </div>
                                ))}
                            </div>
                        </div>
                    }

                </div>
            </div>
        </div >
    );
}