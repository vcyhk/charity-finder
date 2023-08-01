import { useState, useEffect } from "react";
import { Link } from "react-router-dom";


export default function Header(){
    const [display, setDisplay] = useState(false);
    const [searchInput, setSearchInput] = useState('');

    useEffect(() => {
        if(searchInput ==''){
            setDisplay(false)
        }
    },[searchInput])

    function handleChange(event){
        setSearchInput(event.target.value)
        setDisplay(true)
    }

    return(
        <header>
            <nav className="py-6 bg-[#FCFCFC] font-ubuntu">
                <div className="container mx-auto flex flex-wrap items-center justify-between">
                    <Link to="./">
                    <div className="flex w-14 items-center">
                        <img className="w-10 h-10 mr-3" src="./src/assets/icon.svg"/>
                        <span className="self-center text-2xl font-bold whitespace-nowrap">Charity Finder</span>
                    </div>
                    </Link>
                    <div className="drop-shadow-md">
                        <div className="relative">
                            <button type="button" className="absolute inset-y-0 right-0 flex items-center pr-3.5">
                                <img src="./src/assets/search.svg" className="w-5 h-5"/>
                            </button>
                            <input 
                                type="text"
                                onChange={handleChange}
                                className="px-4 py-3 border border-gray-300 w-96 rounded-md transition hover:outline outline-1 outline-[#32C8BB] focus:outline outline-offset-0" 
                                placeholder="Find a charity"/>
                        </div>
                        {display && 
                        <Link to="/search">
                        <div className="absolute w-full h-fit bg-white border px-3 py-4 mx-auto rounded-b-lg hover:bg-slate-50">
                            {searchInput}
                        </div>
                        </Link>
                        }
                    </div>
                    <Link to="/favorites">
                    <button type="button" className="flex space-x-2 items-center border-0 drop-shadow-md rounded-full p-3 bg-white hover:bg-slate-50">
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