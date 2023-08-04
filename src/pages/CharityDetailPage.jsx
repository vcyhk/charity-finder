import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"; 

export default function CharityDetailPage() {
    let navigate = useNavigate();
    const location = useLocation();
    const props = location.state;
    const [addBtn, setAddBtn] = useState(true)
    const [msg, setMsg] = useState(false);

    const data = localStorage.getItem("favoriteList");
    const cacheData = data ? JSON.parse(data) : []

    useEffect(() => {
        const data = localStorage.getItem("favoriteList");
        const cacheData = data ? JSON.parse(data) : []
        if(cacheData.length > 0){
            for(var i =0; i<cacheData.length; i++){
                if(cacheData[i].ein == props.ein){
                    setAddBtn(false)
                    break;
                }else{
                    setAddBtn(true)
                }
            }
        }
    },[cacheData])

    const favItem = {
        ein: props.ein,
        coverImageUrl: props.coverImageUrl,
        logoUrl: props.logoUrl,
        name: props.name,
        location: props.location,   
        description: props.description,
        profileUrl: props.profileUrl,
        tags: props.tags
    };

    function addFav(){
        setMsg(true)
        setAddBtn(false)
        cacheData.push(favItem);
        localStorage.setItem('favoriteList', JSON.stringify(cacheData))
    }

     function rmFav(){
        const index = cacheData.findIndex(obj => obj.ein === props.ein);
        cacheData.splice(index, 1);
        localStorage.setItem('favoriteList', JSON.stringify(cacheData))
        setAddBtn(true)
        setMsg(false)
    }

    return (
        <div className="container justify-center mb-8 px-4 grid grid-cols-1 gap-8 mx-auto sm:grid-cols-1 md:grid-cols-3 mt-10">
            <div className="col-span-2 rounded-md shadow-md">
                <div>
                    <img className="rounded-t-lg" src={props.coverImageUrl} />
                </div>
                <div className="p-8">
                    <h1 className={"flex flex-wrap justify-center items-center text-3xl tracking-wide font-semibold text-gray-800 md:justify-normal"}>
                        {props.logoUrl
                            ? <img className="mr-3 mb-3 rounded-full md:mb-0" src={props.logoUrl} />
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
                    <div className="w-full">
                        <p className="text-fit">{props.description}</p>
                    </div>
                </div>
            </div>
            <div className="p-6 col-span-2 h-fit rounded-md shadow-md md:col-span-1">
                <div>
                    {msg &&
                    <div className={"flex mb-6 justify-center font-bold "}>
                    This Charity Added To Your Favorite !
                    </div>
                    }
                    
                    {addBtn ?
                    <a>
                        <button
                        className="w-full bg-[#F14040] rounded-sm py-4 text-white font-bold hover:bg-[#D31616] duration-300"
                        onClick={addFav}>
                            Add to favorites
                        </button>
                    </a>
                    :
                    <a>
                     <button
                         className="w-full bg-[#2D59AF] rounded-sm py-4 text-white font-bold hover:bg-[#0F3D97] duration-300"
                         onClick={rmFav}
                     >
                         Remove from favorites
                     </button>
                    </a>
                    }
                   
                </div>
                <div className="mt-4">
                    <a href={props.profileUrl} target="_blank">
                        <button className="w-full bg-emerald-800 rounded-sm py-4 text-white font-bold hover:bg-emerald-950 duration-300">
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
                                    <Link to={"/search/"+data}
                                        state={data} 
                                        key={id} 
                                        className="bg-slate-500 text-white px-3 py-2 m-2 rounded-3xl shadow-md hover:bg-slate-600 duration-300">
                                        {data}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    }

                </div>
            </div>
        </div >
    );
}