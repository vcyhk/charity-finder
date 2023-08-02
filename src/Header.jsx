import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import causes from "./CausesList.json"

export default function Header(){
    const [display, setDisplay] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [searchList, setSearchList] = useState();
    const location = useLocation();

    useEffect(() => {
        setSearchInput('')
    }, [location]);



    function handleChange(e){
        setDisplay(true)
        setSearchInput(e.target.value)
        const causesList = causes.causes;
        if (causesList != null) {
            const result = causesList.filter(item => item.includes(searchInput)).slice(0, 10)
            setSearchList(result)
        }
    }

    function handleBlur(){
        setDisplay(false)
    }

    return(
        <header>
            <nav className="py-6 bg-[#FCFCFC] font-ubuntu">
                <div className="container mx-auto flex flex-wrap items-center justify-between">
                    <a href="/">
                        <div className="flex w-14 items-center">
                            <img className="w-10 h-10 mr-3" src="./src/assets/icon.svg"/>
                            <span className="self-center text-2xl font-bold whitespace-nowrap">Charity Finder</span>
                        </div>
                    </a>
                    <div className="drop-shadow-md">
                        <div className="relative">
                            <button type="button" className="absolute inset-y-0 right-0 flex items-center pr-3.5">
                                <img src="./src/assets/search.svg" className="w-5 h-5"/>
                            </button>
                            <input 
                                type="text"
                                onBlur = {() => setTimeout(handleBlur, 200)}
                                onChange={handleChange}
                                value={searchInput}
                                className="px-4 py-3 border border-gray-300 w-[28rem] rounded-md hover:outline outline-1 outline-[#32C8BB] focus:outline outline-offset-0" 
                                placeholder="Find a charity"/>
                        </div>
                        {display && 
                        <div className="flex flex-wrap absolute w-full h-fit bg-white border mx-auto rounded-b-lg p-2">
                                {searchList
                                    ?
                                    <>
                                        {(searchList).map((data, id) => (
                                                <Link 
                                                    to={"/search/"+data}
                                                    state={data}
                                                    key={id}
                                                    className="px-3 py-4 rounded-3xl hover:bg-slate-200 duration-300">
                                                    {data}
                                                </Link>
                                        ))}
                                    </>
                                    :
                                    <div className="w-full px-3 py-4">{searchInput}</div>
                                }
                        </div>
                        }
                    </div>
                    <Link to="/favorites">
                    <button type="button" className="flex space-x-2 items-center border-0 drop-shadow-md rounded-full p-3 bg-white hover:bg-slate-50 duration-300">
                        <div>
                            <img src="./src/assets/heart.svg" className="w-5 h-5"/>
                        </div>
                    </button>
                    </Link>
                </div>
            </nav>
        </header>
    );
}