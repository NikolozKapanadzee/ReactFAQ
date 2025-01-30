import "../paragraph/Paragraph.css";
import ghost from '../../assets/images/ghostImg.svg';
import mainImg from '../../assets/images/mainImg.svg';
import arrowImg from '../../assets/images/arrowImg.png';
import { useEffect, useState } from "react";
import deskGhost from '../../assets/images/deskGhost.svg';
import deskMain from '../../assets/images/deskMainImg.svg';



function Paragraph() {
    const [data, setData] = useState([]);
    const [clickedIndex, setClickedIndex] = useState(false); 

    async function fetchData() {
        try {
            const response = await fetch("https://dummyjson.com/quotes");
            const result = await response.json();
            setData(result.quotes.slice(0, 5));
        } catch (error) {
            console.log(error);
        }
    }

    function smoothClick(index) {
        setClickedIndex(clickedIndex === index ? false : index); 
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <div className="main">
                <img  className="desk_ghost" src={deskGhost}/>
                <img  className="desk_main" src={deskMain}/>
                <div className="container">
                    <img className="ghost_img" src={ghost} alt="Ghost" />
                    <img className="main_img" src={mainImg} alt="Main" />
                    <h1 className="title">FAQ</h1>
                    <div className="content_div">
                        {data.map((item, index) => (
                            <div
                                className={`quote_box ${clickedIndex === index ? "clicked" : ""}`}
                                key={index}
                                onClick={() => smoothClick(index)}
                            >
                                <div className="quote_and_arrow">
                                    <p className="author">{item.author}</p>
                                    <img className="arrow" src={arrowImg} alt="Arrow" />
                                </div>
                                <p className="quote">{item.quote}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Paragraph;
